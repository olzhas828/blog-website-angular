import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  blogPost : BlogPost = new BlogPost();
  tags : string;

  constructor(private postS : PostService, private route : Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date();
    this.blogPost.postedBy = "WEB422 Student";
    this.blogPost.views = 0;
    this.postS.newPost(this.blogPost).subscribe(()=> this.route.navigate(['admin']));

  }
}
