import {Router} from "express";
import { infoUser, login, register, refreshToken } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";
import { requireToken } from "../middlewares/requireToken.js";


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
router.get('/protected', requireToken, infoUser);
router.get('/refresh', refreshToken);


export default router;
