import { useState } from "react";
import { TeamsUserCredential } from "@microsoft/teamsfx";

const Login = (props: LoginProps) => {
    const [ error, setError ] = useState('');

    const login = () => {
        props.teamsUserCredential.login(props.userScopes)
            .then(() => {
                props.onLogin();
            })
            .catch((e: Error) => {
                if (!e.message.includes("CancelledByUser")) {
                    setError("An error occurred");
                }
            })
    }

    return <div>
        <p>Silent login failed: {props.silentError != null && JSON.stringify(props.silentError)}</p>
        <h1>Please Login</h1>
        <button onClick={() => login()}>Login</button>
        {error && <div>{error}</div>}
    </div>
}
export default Login;

interface LoginProps {
    teamsUserCredential: TeamsUserCredential;
    onLogin: () => any;
    userScopes: string[];
    silentError: any;
}