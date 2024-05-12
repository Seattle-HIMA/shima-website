import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { getAdminMembershipList } from "../Services/Message.service";
import './AdminMembersList.css';

function AdminMembersList(props) {
    props.setShowFooter(true);
    const isAdmin = props.isAdmin // TODO: if user is not an admin display a no access message

    const [userList, setUserList] = useState([]);
    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        let isMounted = true;

        const getUserList = async () => {
            const accessToken = await getAccessTokenSilently();
            const {data, error} = await getAdminMembershipList(accessToken);

            console.log('Data received:');
            data.forEach(item => {
                console.log(JSON.stringify(item));
            });

            if (!isMounted) return;
            if (data) setUserList(data);
            if (error) setUserList(data);
        };

        getUserList();

        return () => {
            isMounted = false;
        };
    }, []);

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
                    {userList.map(user => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.firstName || 'N/A'}</td>
                            <td>{user.lastName || 'N/A'}</td>
                            <td>{user.membershipType || 'none'}</td>
                            <td>{user.paidWorkshops && user.paidWorkshops.length > 0 ? user.paidWorkshops.join(', ') : 'none'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default AdminMembersList;
