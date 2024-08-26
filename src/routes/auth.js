import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../validation/auth.js";
import { registerUserController, loginUserController } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { logoutUserController } from "../controllers/auth.js";
import { refreshUsersSessionController } from "../controllers/auth.js";
import { requestResetEmailSchema } from "../validation/auth.js";
import { requestResetEmailController } from "../controllers/auth.js";
import { resetPasswordController } from "../controllers/auth.js";
import { resetPasswordSchema } from "../validation/auth.js";


const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUsersSessionController));

router.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

router.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default router;
