import { getAllContacts, getAllContactById, createContact, updateContact, deleteContact} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder, filter, userId});

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });

};


export const getContactByIdController = async (req, res, next) => {

    const { contactId } = req.params;
    const  userId = req.user._id;

    const contact = await getAllContactById(contactId, userId);

    if (!contact) {
        throw createHttpError(404, "Contact not found");

        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact
        });

};

export const createContactController = async (req, res) => {
    const contactData = {
        ...req.body,
        userId: req.user._id,
    };
    const contact = await createContact(contactData);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact
    });


};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const photo = req.file;

     let photoUrl;

     if (photo) {
       photoUrl = await saveFileToUploadDir(photo);
     }

    const updatedContact = await updateContact(contactId, userId, {
        ...req.body,
        photo: photoUrl,
    });
    if (!updatedContact) {
        return next(createHttpError(404, "Contact not found"));
    }

    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data: updatedContact.contact,
    });


};
export const deleteContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const  userId = req.user._id;

    const contact = await deleteContact(contactId, userId);

    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    }

    res.status(204).end();
};

