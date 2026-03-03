export type Post = {
  ID: number;
  UserID: number;
  Date: string;
  Description: string;
  images: Array<{ ID: number; PostID: number; image: string }>;
};
