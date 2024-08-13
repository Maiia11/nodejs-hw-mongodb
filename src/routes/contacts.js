import { Router } from "express";
import { getContactsController, getContactByIdController, createContactController,patchContactController, deleteContactByIdController, } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, patchContactSchema, } from "../validation/students.js";
import { isValid } from "../middlewares/isValidId.js";

const router = Router();

router.get("/contacts",ctrlWrapper(getContactsController) );

router.get("/contacts/:contactId", isValid, ctrlWrapper(getContactByIdController));

router.post("/contacts", validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch("/contacts/:contactId", isValid, validateBody(patchContactSchema), ctrlWrapper(patchContactController));

router.delete("/contacts/:contactId", isValid, ctrlWrapper(deleteContactByIdController));

export default router;
