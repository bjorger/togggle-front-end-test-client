import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { FormControl, Input, InputLabel, Button, Select, MenuItem, TextField } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import styled from "styled-components";
import { useForm } from "react-hook-form";
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
    const { register, handleSubmit } = useForm();
    const [dob, setDoB] = React.useState<string>("");

    console.log(oidcConfig);

    const onSubmit = async (data: any) => {
        Object.assign(data, {
            dob,
        });
        console.log(data);

        const userIdentity = "IXAyomy9AAaX9sJi154vvqE";

        const accessToken =
            "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3QiOnsic3ViIjoiQTZMVkRydm5CVDVTUksxWFhjenBtdkUiLCJpc3MiOiJodHRwczovL2F1dGgub2FzaXNsYWJzLmNvbSJ9LCJhdWQiOlsiaHR0cHM6Ly9hcGkub2FzaXNsYWJzLmNvbS9wYXJjZWwiXSwiY2xpZW50X2lkIjoiQ0x2N0tQTXY0VFJUWFB6ZVFCZm1XWWUiLCJleHAiOjE2NDgxMzQyNjMsImlhdCI6MTY0ODEzMDY2MywiaXNzIjoiaHR0cHM6Ly9hdXRoLm9hc2lzbGFicy5jb20iLCJqdGkiOiJlYzA2ZGI3ZC1kMjI4LTQ4YWYtOWEzMy1mYjRjNzc0OTE4MDIiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHBhcmNlbC5wdWJsaWMgcGFyY2VsLmZ1bGwiLCJzdWIiOiJJWEF5b215OUFBYVg5c0ppMTU0dnZxRSJ9.7ERpaSyOatY3MP2BI0Dy4DENODWxpiJCR6DZExu1r9LmTfL-PNBH8M3JDCxEGz1JhP3wg971VWcqxMnaR5Pwew";

        await fetch("http://localhost:3001/oasis/upload-data", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ accessToken, userIdentity, data }),
        });
    };

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
            <Wrapper onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input {...register("name")} id="name" aria-describedby="name" />
                </FormControl>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select {...register("gender")} labelId="gender" label="Gender">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        onChange={(newValue) => {
                            console.log(newValue?.toString());
                            setDoB(newValue ? newValue.toString() : "");
                        }}
                        value={dob}
                        label="DoB"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <FormControl>
                    <InputLabel htmlFor="street">Street</InputLabel>
                    <Input {...register("address.street")} id="street" aria-describedby="street" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="postalcode">Postalcode</InputLabel>
                    <Input {...register("address.postalcode")} id="postalcode" aria-describedby="postalcode" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Input {...register("address.state")} id="state" aria-describedby="state" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="country">Country</InputLabel>
                    <Input {...register("address.country")} id="country" aria-describedby="country" />
                </FormControl>
                <Button type="submit">Click me!</Button>
            </Wrapper>

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

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 300px;

    .MuiFormControl-root {
        margin: 20px 0;
    }
`;
