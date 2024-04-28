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

export {
    getPublicMessage,
    getProtectedMessage,
    getAdminMessage
};
