import multer from "multer";
import ImageKit from "imagekit";

import { ENV } from "./env.js";

export const upload = multer({ storage: multer.memoryStorage() });

export const imageKit = new ImageKit({
  publicKey: ENV.IMAGEKIT_PUBLIC_KEY,
  privateKey: ENV.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: ENV.IMAGEKIT_URL_ENDPOINT,
});
