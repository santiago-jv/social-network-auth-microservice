import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsService {

    getPosts(): Promise<Post[]> {
        return Promise.resolve([]);
    }
}
