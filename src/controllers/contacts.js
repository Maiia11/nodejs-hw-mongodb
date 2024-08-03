import { getAllContacts, getAllContactById, createContact, } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
        const contacts = await getAllContacts();

        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });

};


export const getContactByIdController = async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getAllContactById(contactId);

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
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact
    });


};

