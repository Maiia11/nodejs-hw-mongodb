import { Router } from "express";
import { getContactsController, getContactByIdController, createContactController,patchContactController, deleteContactByIdController, } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, patchContactSchema, } from "../validation/students.js";
import { isValid } from "../middlewares/isValidId.js";

const router = Router();

router.get("/",ctrlWrapper(getContactsController) );

router.get("/:contactId", isValid, ctrlWrapper(getContactByIdController));

router.post("/", validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch("/:contactId", isValid, validateBody(patchContactSchema), ctrlWrapper(patchContactController));

router.delete("/:contactId", isValid, ctrlWrapper(deleteContactByIdController));

export default router;
