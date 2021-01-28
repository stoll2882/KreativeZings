import baseUrl from '../baseurl';
var axios = require('axios');
const { Util } = require('reactstrap');

export default class UtilityService {

    static EMAIL_REGEX_PATTERN = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

    static async contactMeRequest(contactName, contactEmail, contactReason, contactMessage) {

        if (contactReason == "" || contactReason == undefined || contactReason == null) {
            contactReason = "no reason";
        }

        var request = {
            name: contactName,
            email: contactEmail,
            reasonForContact: contactReason,
            message: contactMessage
        }

        try {
            var response = await axios.post(baseUrl() + 'contactMe/', request);
            console.log("UTILITYSERVICE(contactMeRequest): Succesfully submitted");
        } catch(error) {
            console.log("UTILITYSERVICE(contactMeRequest): ERROR: "+error);
            throw error;
        }
    }
}

