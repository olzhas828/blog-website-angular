import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {
  blogPosts : Array<BlogPost> = [];
  private sub : any;
  constructor(private postS : PostService, private router : Router) {}

  ngOnInit(): void {
    this.sub = this.postS.getAllPosts().subscribe(data=>this.blogPosts = data);
    
  }
  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }
  rowClicked(e, id){
    e.preventDefault();
    this.router.navigate(['/admin/post', id]);
  }
  
}
