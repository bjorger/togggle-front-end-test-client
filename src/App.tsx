import React from "react";
import "./App.css";
import { Button } from "@mui/material";
import Oidc from "oidc-client";

export const oidcConfig = {
    authority: process.env.REACT_APP_PARCEL_AUTH_URL,
    // Replace with your app's frontend client ID.
    client_id: process.env.REACT_APP_PARCEL_FRONTEND_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_PARCEL_REDIRECT_URI,
    response_type: "code",
    scope: "openid profile email parcel.public parcel.full",
    filterProtocolClaims: false,
    loadUserInfo: false,
    extraQueryParams: {
        audience: process.env.REACT_APP_PARCEL_AUDIENCE_URI,
    },
    extraTokenParams: {
        audience: process.env.REACT_APP_PARCEL_AUDIENCE_URI,
    },
};

function App() {
    const login = async () => {
        const oidcClient = new Oidc.UserManager(oidcConfig);
        oidcClient.signinRedirect();
    };

    const logout = async () => {
        const oidcClient = new Oidc.UserManager(oidcConfig);
        oidcClient.signoutRedirect();
    };

    return (
        <div className="App">
            <Button onClick={login} variant="contained">
                Login to Oasis
            </Button>
            <Button onClick={logout} variant="contained">
                Logout
            </Button>
        </div>
    );
}

export default App;
