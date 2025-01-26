export interface FriendSummuryDTO {
  id: number;
  steamId: string;
  followersCount: number;
  followingCount: number;
  favoriteVideogameAppId: number | null; // Use `null` if Long values are nullable
  lastPlayedVideogameAppId: number | null;
  profileName: string;
  // Uncomment if needed in the future
  // steamName?: string;
  // playstationName?: string;
  // xboxName?: string;
  profileImgId: number | null;
  profileBackdropImgId: number | null;
  lastPlayedGameImgUrl: string | null; // Nullable if no URL is available
  lastPlayedGameName: string | null;
}
