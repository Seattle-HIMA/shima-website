import { callExternalApi } from "./ExternalApi.service";
import { API_SERVER_URL } from "../../constants";

const apiServerUrl = API_SERVER_URL;

export const getCurrentUser = async (accessToken, email) => {
    const config = {
        url: `${apiServerUrl}/routes/users/currentUser`, method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            email: email
        },
    };

    const {data, error} = await callExternalApi({config});

    return {
        data: data || null, error,
    };
};
