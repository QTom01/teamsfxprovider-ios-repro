import { useEffect, useState } from "react";
import { app } from "@microsoft/teams-js";
import { Spinner, SpinnerSize } from "@fluentui/react";
import AppAuth from "./AppAuth";

const AppRoot = () => {
    const [appInitializing, setAppInitializing] = useState(true);

    useEffect(() => {
        app.initialize().then(() => {
            app.notifySuccess();
            app.getContext().then(c => {
                setAppInitializing(false);
            })
        })
    }, []);

    if (appInitializing)
        return <div className="spinnerContainer">
            <Spinner size={SpinnerSize.large} />
        </div>

    return <AppAuth />
}
export default AppRoot;