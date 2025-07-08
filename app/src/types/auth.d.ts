interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  followers: string[];
  following: string[];
  status: string;
  privacy: ["public", "private", "friends"];
  friends: string[];
  status: ["offline", "online"];
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
}
