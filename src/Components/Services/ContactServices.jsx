import axios from "axios"

export class ContactServices {
    static serverURL = " http://localhost:9000"

    //  GET ALL CONTACTS
    static getAllContacts() {
        let dataURL = `${this.serverURL}/contacts`
        return axios.get(dataURL)
    }

    // GET SINGLE CONTACT
    static getContact(contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`
        return axios.get(dataURL)
    }

    // GET ALL GROUPS
    static getAllGroups() {
        let dataURL = `${this.serverURL}/groups`
        return axios.get(dataURL)
    }

    // POST/CREATE CONTACT
    static createContact(contact) {
        let dataURL = `${this.serverURL}/contacts`
        return axios.post(dataURL, contact)
    }

    // PUT/UPDATE/ CONTACT
    static updateContact(contact,contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`
        return axios.put(dataURL, contact)
    }

    // DELETE CONTACT
    static deleteContact(contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`
        return axios.delete(dataURL)
    }
}