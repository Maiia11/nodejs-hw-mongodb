import { Router } from "express";
import { getContactsController, getContactByIdController, createContactController,patchContactController, deleteContactByIdController, } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, patchContactSchema, } from "../validation/students.js";
import { isValid } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.use(authenticate);

router.get("/",ctrlWrapper(getContactsController) );

router.get("/:contactId", isValid,  ctrlWrapper(getContactByIdController));

router.post("/",  upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch("/:contactId", isValid, upload.single('photo'), validateBody(patchContactSchema), ctrlWrapper(patchContactController));

router.delete("/:contactId", isValid, ctrlWrapper(deleteContactByIdController));

export default router;
