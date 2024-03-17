import { Router } from "express";
import { createWebUserController, deleteWebUserController, forgetPassword, loginWebUserController, myProfileWebUserController, readAllWebUserController, readSpecificWebUserController, resetPassword, updatePasswordController, updateProfileController, updateWebUserController, verifyEmail } from "../controller/webUserCOntroller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import authorized from "../middleware/authorized.js";
let webUserRouter = Router();
webUserRouter
  .route("/")
  .post(createWebUserController)
  .get(isAuthenticated,authorized(["admin","superadmin"]),readAllWebUserController);

webUserRouter.route("/verify-email").patch(verifyEmail);
webUserRouter.route("/login").post(loginWebUserController);
webUserRouter
  .route("/my-profile")
  .get(isAuthenticated, myProfileWebUserController);

webUserRouter
  .route("/update-profile")
  .patch(isAuthenticated, updateProfileController);
webUserRouter
  .route("/update-password")
  .patch(isAuthenticated, updatePasswordController);

webUserRouter.route("/forget-password").post(forgetPassword);
webUserRouter.route("/reset-password").patch(isAuthenticated, resetPassword);



webUserRouter
  .route("/:id")
  .get(isAuthenticated,authorized(["admin","superadmin"]),readSpecificWebUserController)
  .patch(isAuthenticated,authorized(["admin","superadmin"]),updateWebUserController)
  .delete(isAuthenticated,authorized(["superadmin"]),deleteWebUserController);

export default webUserRouter;
