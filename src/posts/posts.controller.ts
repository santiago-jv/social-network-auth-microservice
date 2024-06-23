import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Post } from './post.entity';

@Controller('/v1/posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('')
  @ApiOperation({ summary: 'List posts' })
  @ApiResponse({ status: 200, description: 'Post found' })
  async getPosts(): Promise<Post[]> {
    return this.postService.getPosts();
  }
}
