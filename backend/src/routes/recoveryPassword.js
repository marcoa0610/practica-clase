import express from "express"
import recoveryPasswordController from "../controllers/recoveryPasswordController.js";

const router = express.Router();

router.route("/requestCode").post(recoveryPasswordController.requestCode);
//router.router("/verifyCode").post();
//router.router("/newPassword").post();


export default router;