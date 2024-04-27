import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ProtectedPage = () => {
    const [message, setMessage] = useState('');
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getAccessTokenSilently();
            const { data, error } = await getProtectedResource(accessToken)

            if (!isMounted) return;

            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }

            if (error) {
                setMessage(JSON.stringify(error, null, 2));
            }
        }

        getMessage();

        return () => {
            isMounted = false;
        }

    }, [getAccessTokenSilently]);

    return (
        <div>Only authorized users can visit this page</div>
    )

}