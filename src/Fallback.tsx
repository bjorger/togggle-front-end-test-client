import React from "react";
import { oidcConfig } from "./App";
import { OidcClient } from "oidc-client";

const Fallback: React.FC = () => {
    const [token, setToken] = React.useState<string>("");
    const [identity, setIdentity] = React.useState<string>("");

    React.useEffect(() => {
        (async () => {
            const oidcClient = new OidcClient(oidcConfig);

            const response = await oidcClient.processSigninResponse(window.location.href);
            const idToken = response.profile;

            console.log(idToken.sub);
            console.log(response.access_token);

            setIdentity(idToken.sub);
            setToken(response.access_token);
        })();
    }, [token, identity]);

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <p style={{ textAlign: "center", margin: "50px 0", width: "500px", wordBreak: "break-all" }}>
                Identity: <br /> {identity} <br /> <br />
                token: <br />
                <br />
                {token}
            </p>
        </div>
    );
};

export default Fallback;
