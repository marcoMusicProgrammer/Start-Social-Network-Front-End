import {PostType} from './PostType';

export interface PostDTOResp {
  id: number;
  profileId: number;
  type: PostType;
  publicationDate: Date;
  content: string;
  image: string;
  achievement: string;
}
