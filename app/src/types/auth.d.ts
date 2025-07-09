interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  password: string;
  profilePicture: string;
  posts: string[];
  followers: string[];
  following: string[];
  privacy: ["public", "private", "friends"];
  friends: string[];
  status: ["offline", "online"];
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
}
