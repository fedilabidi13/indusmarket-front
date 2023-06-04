import {User} from "./user";
import {Post} from "./post";
import {PostComment} from './postComment';
import {ReactType} from "./enumerations/ReactType";


export class React {
  id!: number;
  type!:string
  user!: User;
  postComments!: PostComment;
  post!: Post;


}
