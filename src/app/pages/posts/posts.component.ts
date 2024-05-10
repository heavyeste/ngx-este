import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  data: Post[];
  post: Post = new Post();
  constructor(public postService: PostService) {}

  ngOnInit() {
    this.postService.Get().then((res: Post[]) => {
      this.data = res;
    });
  }
}
