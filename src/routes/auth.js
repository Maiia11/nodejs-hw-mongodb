import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../validation/auth.js";
import { registerUserController, loginUserController } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { logoutUserController } from "../controllers/auth.js";
import { refreshUsersSessionController } from "../controllers/auth.js";
const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUsersSessionController));
export default router;
