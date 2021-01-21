import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";

import authMiddleware from "@modules/users/infra/http/middlewares/auth";
import FilesController from "../controllers/FilesController";



const upload = multer(uploadConfig);
const filesRouter = Router();
const filesController = new FilesController();

filesRouter.post(
  "/arquivo/:id_arquivo",
  upload.single("avatar"),
  filesController.compare,
);

filesRouter.put(
  "/cache",
  filesController.cache,
);

filesRouter.get(
  "/cache/:id",
  filesController.getCache,
);

filesRouter.use(authMiddleware);

filesRouter.get("/", filesController.index);

filesRouter.patch(
    "/avatar",
    authMiddleware,
    upload.single("avatar"),
    filesController.update,
  );

filesRouter.put(
    "/arquivo/:id_arquivo",
    authMiddleware,
    upload.single("avatar"),
    filesController.updateFile,
);



filesRouter.delete("/:id_arquivo", filesController.delete);


export default filesRouter;
