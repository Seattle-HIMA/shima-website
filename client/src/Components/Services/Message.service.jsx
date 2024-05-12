import { callExternalApi } from "./ExternalApi.service";
import { API_SERVER_URL } from "../../constants";

const apiServerUrl = API_SERVER_URL;

export const getPublicResource = async () => {
    const config = {
        url: `${apiServerUrl}/routes/messages/public`, method: "GET", headers: {
            "content-type": "application/json",
        },
    };

    const {data, error} = await callExternalApi({config});

    return {
        data: data || null, error,
    };
};

export const getProtectedResource = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/routes/messages/protected`, method: "GET", headers: {
            "content-type": "application/json", Authorization: `Bearer ${accessToken}`,
        },
    };

    const {data, error} = await callExternalApi({config});

    return {
        data: data || null, error,
    };
};

export const getAdminResource = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/routes/messages/admin`, method: "GET", headers: {
            "content-type": "application/json", Authorization: `Bearer ${accessToken}`,
        },
    };

    const {data, error} = await callExternalApi({config});

    return {
        data: data || null, error,
    };
};

export const getAdminStatus = async (accessToken) => {
    const config = {
        url: `${apiServerUrl}/routes/users/adminStatus`, method: "GET", headers: {
            "content-type": "application/json", Authorization: `Bearer ${accessToken}`,
        },
    };

    const {data, error} = await callExternalApi({config});

    return {
        data: data || null, error,
    };
}




