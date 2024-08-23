import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";


export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = '_id', sortOrder = SORT_ORDER.ASC, filter = {}, userId, }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find({userId});

    if (filter.type) {
        contactsQuery.where('contactType').equals(filter.type);
    }

    if (filter.isFavourite !== undefined) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }


    const [contactsCount, contacts] = await Promise.all([ContactsCollection.find().merge(contactsQuery).countDocuments(),
        contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec()]);

    const paginationData = calculatePaginationData(contactsCount, page, perPage);


    return {
        data: contacts,
        ...paginationData,
    };
};

export const getAllContactById = async (contactId, userId) => {
    const contact = await ContactsCollection.findOne({
        _id: contactId,
        userId,
    });
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, userId, payload, options ={}) => {
    const contact = await ContactsCollection.findOneAndUpdate({_id: contactId, userId, }, payload, {
        new: true,
        ...options
    });

    if (!contact) return null;

    return {
        contact: contact,
     };

};

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsCollection.findOneAndDelete({_id: contactId, userId, });
    return contact;
};
