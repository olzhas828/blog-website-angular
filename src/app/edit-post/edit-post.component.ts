import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost : BlogPost;
  tags : string;
  constructor(private postS : PostService, private router : Router, private active : ActivatedRoute) { }
  private sub : any;
  ngOnInit(): void {
    this.sub = this.postS.getPostbyId(this.active.snapshot.params['id']).subscribe(data=>{
      this.blogPost = data;
      this.tags = this.blogPost.tags.toString();
    });
  }
  ngOnDestroy():void{
    this.sub.unsubscribe();
  }
  formSubmit(){
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.postS.updatePostById(this.blogPost._id, this.blogPost).subscribe(()=>this.router.navigate(['admin']))
  }
  deletePost(){
    this.postS.deletePostById(this.blogPost._id).subscribe(()=>this.router.navigate(['admin']));
  }
}
