import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { getAdminMembershipList } from "../Services/Message.service";
import './AdminMembersList.css';

function AdminMembersList(props) {
    props.setShowFooter(true);
    const isAdmin = props.isAdmin


    const [message, setMessage] = useState();

    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getAccessTokenSilently();
            const {data, error} = await getAdminMembershipList(accessToken);

            console.log(`data: ${JSON.stringify(data)}`)

            if (!isMounted) {
                return;
            }

            if (data) {
                setMessage(JSON.stringify(data));
            }

            if (error) {
                setMessage(JSON.stringify(data));
            }
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, []);

    const userList = message

    return (
        <div className="admin-members-list-wrapper">
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Membership</th>
                        <th>Registered Workshops</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{message.map(user => (*/}
                    {/*    <tr key={user._id}>*/}
                    {/*        <td>{user.email}</td>*/}
                    {/*        <td>{user.firstName || 'N/A'}</td>*/}
                    {/*        <td>{user.lastName || 'N/A'}</td>*/}
                    {/*        <td>{user.membershipType || 'none'}</td>*/}
                    {/*        <td>{user.paidWorkshops && user.paidWorkshops.length > 0 ? user.paidWorkshops.join(', ') : 'none'}</td>*/}
                    {/*    </tr>*/}
                    {/*))}*/}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default AdminMembersList;
