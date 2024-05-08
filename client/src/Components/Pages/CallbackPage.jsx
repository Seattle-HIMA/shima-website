import { useAuth0 } from "@auth0/auth0-react"
import React from "react"

export const CallbackPage = () => {
    const {error} = useAuth0()

    if (error) return (
        <div className={"error-page-not-found"}>
            <h1>
                Error
            </h1>
            <p>
                <span>{error.message}</span>
            </p>
        </div>
    )
}