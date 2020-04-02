import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {
  post : BlogPost;
  commentName: string;
  commentText: string;
  private querySub : any;
  constructor(private postS: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      //TODO: Get post by Id params['id'] and store the result in this.post
      this.querySub = this.postS.getPostbyId(params['id']).subscribe(data => {
        this.post = data;
        this.post.views++;
        this.postS.updatePostById(this.post._id, this.post).subscribe();
      });
     })
  }
  ngOnDestroy():void{
    if(this.querySub) this.querySub.unsubscribe();
  }
  submitComment(){
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date : new Date()
    })
    this.postS.updatePostById(this.post._id, this.post).subscribe(()=>{
      this.commentName='';
      this.commentText='';
    })
  }

}
