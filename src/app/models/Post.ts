import {PostType} from './PostType';

export interface Post{
  id: number;
  type: PostType;
  date: Date;
  content: string;
  image: string;
  achievement: string;
}
