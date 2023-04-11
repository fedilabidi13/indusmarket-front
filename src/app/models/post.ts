import {PostComment} from './postComment';
import {User} from './user';

import {Media} from "./media";
import {React} from "./react";


export class Post {
  id!: number;
  body!: string;
  createdAt!: string;
  postTitle!: string;
  postComment!: PostComment[];
  user!: User;
  media!: Media[];
  react!:React[];

}
