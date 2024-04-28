import { useEffect, useState } from "react";
import { getPublicResource } from "../Services/Message.service";

export const PublicPage = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const { data, error } = await getPublicResource();

            if (!isMounted) {
                return;
            }

            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }

            if (error) {
                setMessage(JSON.stringify(error, null, 2));
            }
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div>this is a public page available to anyone</div>
    );
};