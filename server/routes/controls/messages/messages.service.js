import axios from "axios";
import { API_SERVER_URL } from "../../../constants.js";

const getPublicMessage = () => {
    return {
        text: "This is a public message.",
    };
};

const getProtectedMessage = () => {
    return {
        text: "This is a protected message.",
    };
};

const getAdminMessage = () => {
    return {
        text: "This is an admin message.",
    };
};

const getMembershipList = async () => {
    try {
        const response = await axios.get(`${API_SERVER_URL}/routes/users/allMembers`);
        return response.data;
    } catch (error) {
        console.error(`Error retrieving membership list: ${error}`);
        throw error;
    }
}

export {
    getPublicMessage, getProtectedMessage, getAdminMessage, getMembershipList
};
