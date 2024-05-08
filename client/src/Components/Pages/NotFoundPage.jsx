import React from "react";

export const NotFoundPage = (props) => {
    props.setShowFooter(false);

    const styles = {
        notFound: {
            paddingTop: "130px",
            padding: "30px",
            height: "90vh"
        }
    }
    return (
        <div className={"not-found-page"} style={styles.notFound}>
            Page Not Found :(
        </div>
    );
};
