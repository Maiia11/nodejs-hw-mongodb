import { ContactsCollection } from "../db/models/contacts.js";

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getAllContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload, options ={}) => {
    const contact = await ContactsCollection.findByIdAndUpdate( contactId, payload, {
        new: true,
        ...options
    });

    if (!contact) return null;

    return {
        contact: contact,
     };

};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findByIdAndDelete({_id: contactId });
    return contact;
};
