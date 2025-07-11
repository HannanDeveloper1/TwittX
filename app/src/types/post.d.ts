interface Post {
  _id: string;
  content: string;
  media: string[];
  privacy: string;
  user: string;
  comments: string[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}
