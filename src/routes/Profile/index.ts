import { Router } from "express";

import multer from "multer";
import ProfileController from "../../controller/Profile";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default Router()
  .post("/avatar/:userId", upload.single("avatar"), ProfileController.uploadAvatar)
