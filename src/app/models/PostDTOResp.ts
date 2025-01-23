import {PostType} from './PostType';

export interface PostDTOResp {
  id: number;
  profileId: number;
  type: PostType;
  publicationDate: string;
  content: string;
  image: string;
  achievement: string;
}
