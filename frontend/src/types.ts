export type Post = {
  ID: number;
  UserID: number;
  Date: string;
  Description: string;
  Images: Image[];
  Likes: number;
  Comments: number;
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
  Image: string;
}

export type UserData = {
  user: User;
  posts: Post[];
}

export type ScrollPost = {
  ID: number;
  Date: string;
  Description: string;
  LikesCount: number;
  CommentsCount: number;
  AlreadyLiked: boolean;
  Images: string[];
  User: {
    Username: string;
    ProfileImage: string;
  }
}

export type ProfilePost = {
  ID: number;
  Images: string[];
}

export type ProfileData = {
  User: {
    Username: string;
    ProfileImage: string;
    Bio: string;
  }
  Posts: ProfilePost[];
}

export type DialogPost = {
  ID: number;
  Date: string;
  Description: string;
  LikesCount: number;
  CommentsCount: number;
  AlreadyLiked: boolean;
  RawImages: string[];
  User: {
    Username: string;
    ProfileImage: string;
  }
  Comments: Array<{
    ID: number;
    ParentCommentID: number;
    Date: string;
    Comment: string;
    User: {
      Username: string;
      ProfileImage: string;
    }
  }>
}
