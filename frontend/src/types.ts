export type Post = {
  ID: number;
  UserID: number;
  Date: string;
  Description: string;
  images: Image[];
};

export type User = {
  ID: number;
  HashedPassword: string;
  Username: string;
  ProfileImage: string;
  Bio: string;
};

export type Image = {
  ID: number;
  PostID: number;
  image: string;
}

export type UserData = {
  user: User;
  posts: Post[];
}
