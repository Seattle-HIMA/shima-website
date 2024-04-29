import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { getAdminResource } from "../Services/Message.service";
import './AdminMembersList.css';

function AdminMembersList(props) {
    props.setShowFooter(true);

    const [message, setMessage] = useState("");

    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getAccessTokenSilently();
            const {data, error} = await getAdminResource(accessToken);

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
    }, [getAccessTokenSilently]);

    return (
        <div className="admin-members-list-wrapper">
            this should only be visible to admins
            <div>
                {message}
            </div>
        </div>
    )
}

export default AdminMembersList;
