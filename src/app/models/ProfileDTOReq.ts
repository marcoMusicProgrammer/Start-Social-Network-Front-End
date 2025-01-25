export interface ProfileDTOReq {
  id: number;
  steamId: number;
  followersCount: number;
  followingCount: number;
  lastPlayedVideogameAppId: number;
  profileName: string;
  steamName: string;
  playstationName: string;
  xboxName: string;
}
