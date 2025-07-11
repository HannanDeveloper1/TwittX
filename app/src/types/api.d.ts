type ServerResponse = {
  success: boolean;
  message?: string;
  user?: User;
  posts?: Post[];
};
