export interface VideogameDetailDTO {
  id:number;
  nameVideogame:string;
  developers:string;
  publishers:string;
  preferred:boolean;
  releaseDate:string;
  starReviews:number;
  genre:string;
  appId:number;

  requiredAge:number;
  detailedDescription:string;
  shortDescription:string;
  supportedLanguages:string;
  headerImageUrl:string;
  website:string;
  price:string;
  platforms:string;
}
