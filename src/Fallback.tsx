import React from "react";
import { useSearchParams } from "react-router-dom";
import { oidcConfig } from "./App";
import { OidcClient } from "oidc-client";

const Fallback: React.FC = () => {
    let [searchParams] = useSearchParams();
    const oidcClient = new OidcClient(oidcConfig);

    (async () => {
        const response = await oidcClient.processSigninResponse(window.location.href);
        const idToken = response.profile;
        console.log(idToken.sub);
        console.log(response.access_token);
    })();

    return <div></div>;
};

export default Fallback;
