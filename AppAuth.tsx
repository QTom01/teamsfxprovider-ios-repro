import { useEffect, useState } from "react";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import config from "../../config";
import { Spinner, SpinnerSize } from "@fluentui/react";
import { ProviderState, Providers } from "@microsoft/mgt-element";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import Login from "./Login";
import App from "../App";

const userScopes = [
    "User.Read.All",
    "Contacts.ReadWrite",
    "People.Read"
]

const AppAuth = () => {
    const [providerLoading, setProviderLoading] = useState(true);
    const [loginNeeded, setLoginNeeded] = useState(false);
    const [silentLoginError, setSilentLoginError] = useState(null);

    const { loading: credLoading, teamsUserCredential } = useTeamsUserCredential({
        initiateLoginEndpoint: config.initiateLoginEndpoint!,
        clientId: config.clientId!
    });

    const onProviderReady = () => {
        Providers.globalProvider.setState(ProviderState.SignedIn);
        setProviderLoading(false);
        setLoginNeeded(false);
    }

    useEffect(() => {
        if (!credLoading) {
            const provider = new TeamsFxProvider(teamsUserCredential!, userScopes);
            Providers.globalProvider = provider;

            // Attempt to get token silently
            teamsUserCredential
                .getToken(userScopes)
                .then(() => onProviderReady())
                .catch((e) => {
                    // If silent token fails then interactive login required
                    setSilentLoginError(e);
                    setLoginNeeded(true);
                })
        }
    }, [credLoading, teamsUserCredential]);

    if (loginNeeded)
        return <Login teamsUserCredential={teamsUserCredential} onLogin={onProviderReady} userScopes={userScopes} silentError={silentLoginError} />

    if (credLoading || providerLoading)
        return (
            <div className="spinnerContainer">
                <Spinner
                    className="h-100"
                    size={SpinnerSize.large}
                    label="Loading..."
                    ariaLive="assertive"
                    labelPosition="right"
                />
            </div>
        )

    return <App />
};
export default AppAuth;
