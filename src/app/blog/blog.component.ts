import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPosts: Array<BlogPost>;
  page : number = 1;
  tag : string = null;
  category : string = null;
  private querySub : any;
  constructor(private postS: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if(params['tag']){
        this.tag = params['tag'];
      }
      else{
        this.tag = null;
      }
      if(params['category']){
        this.category = params['category']; 
      }
      else{
        this.category = null;
      }

      this.getPage(+params['page'] || 1);
     });
  }
  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }
  getPage(num){
    this.querySub = this.postS.getPosts(num, this.tag, this.category).subscribe(data=>{
      if(data.length>0){
        console.log(data.length);
        this.blogPosts = data;
        this.page=num;
      }
    });
  }
}
