import {Router} from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";


const router = Router();

router.post(
  "/register",
  [body("password")
  .isLength({ min: 8 })
  .withMessage("the password must be greater than 7 characters.")],
  validationResultExpress,
  register
);
router.post("/login", login);

export default router;
