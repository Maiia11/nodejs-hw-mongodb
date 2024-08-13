import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = '_id', sortOrder = SORT_ORDER.ASC, }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();
    const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();
    const paginationData = calculatePaginationData(contactsCount, page, perPage);


    return {
        data: contacts,
        ...paginationData,
    };
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
