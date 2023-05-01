import {User} from "./user";
import {Post} from "./post";
import {Media} from "./media";


export class PostComment {
  id!: number;
  commentBody!: string;
  commentedAt!: string;
  user!: User;
  postComments!: PostComment[];
  post!: Post;
  medias!: Media[];


}
