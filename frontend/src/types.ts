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
  };
};

export type ProfileUser = {
  Username: string;
  ProfileImage: string;
  Bio: string;
};

export type ProfilePost = {
  ID: number;
  RawImages: string[];
};

export type ProfileData = {
  User: ProfileUser;
  Posts: ProfilePost[];
  AlreadyFollowing: boolean;
  FollowersCount: number;
  FollowingCount: number;
};

export type DialogComment = {
  ID: number;
  ParentCommentID: number;
  Date: string;
  Comment: string;
  CommentUser: {
    Username: string;
    ProfileImage: string;
  };
};

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
  };
  Comments: DialogComment[];
}

export type User = {
  ID: number;
  Username: string;
  ProfileImage: string;
  Bio: string;
}

