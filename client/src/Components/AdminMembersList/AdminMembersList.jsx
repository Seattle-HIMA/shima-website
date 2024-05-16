import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { getAdminMembershipList } from "../Services/Message.service";
import './AdminMembersList.css';

function AdminMembersList() {
    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10; // Number of users to display per page
    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        let isMounted = true;

        const getUserList = async () => {
            const accessToken = await getAccessTokenSilently();
            const {data, error} = await getAdminMembershipList(accessToken);

            if (!isMounted) return;
            if (data) setUserList(data);
            if (error) setUserList(data);
        };

        getUserList();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredUserList = userList.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.firstName && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.membershipType && user.membershipType.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUserList.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUserList.length / usersPerPage);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="admin-members-list">
            <div className="admin-members-list-wrapper">
                <div className={"admin-members-list-title-section"}>
                    <div>
                        <div className={"admin-members-list-title"}>Members</div>
                        <div className={"admin-members-list-subtitle"}>Active Members</div>
                    </div>

                    <div className="admin-members-list-search-container">
                        <input
                            type="text"
                            className="admin-members-list-search-input"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button className="admin-members-list-search-button">
                            <i className="fa fa-search" aria-hidden="true"/>
                            <span>Search</span>
                        </button>
                    </div>
                </div>

                <div className={"admin-members-list-table-wrapper"}>
                    <table className={"admin-members-list-table"}>
                        <thead className={"admin-members-list-header"}>
                        <tr>
                            <th className={"admin-members-list-header-item"}>Email</th>
                            <th className={"admin-members-list-header-item"}>First Name</th>
                            <th className={"admin-members-list-header-item"}>Last Name</th>
                            <th className={"admin-members-list-header-item"}>Membership</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentUsers.map(user => (
                            <tr key={user._id} className={"admin-members-list-rows"}>
                                <td className={"admin-members-list-row-item"}>{user.email}</td>
                                <td className={"admin-members-list-row-item"}>{user.firstName || 'N/A'}</td>
                                <td className={"admin-members-list-row-item"}>{user.lastName || 'N/A'}</td>
                                <td className={"admin-members-list-row-item"}>{user.membershipType || 'none'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="admin-members-list-pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>

        </div>
    );
}

export default AdminMembersList;
