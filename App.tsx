import { Providers } from "@microsoft/mgt-element";
import { useEffect, useState } from "react";

const App = () => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState<string>(null);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    const client = Providers.globalProvider.graph;
    client.api("/me").get().then(r => {
      console.log(r);
      setProfile(r);
    }).catch(e => {
      console.error(e);
      setError(JSON.stringify(e));
    })

    Providers.globalProvider.getAccessToken().then(t => {
      setToken(t);
    })
  }, [])

  return (
    <div>
      <h1>My App</h1>
      <hr />
      <h2>Profile:</h2>
      { profile == null ? <span>Loading</span> : <span>{profile.userPrincipalName}</span> }
      <h2>Error:</h2>
      { error == null ? <span>None</span> : <span>{error}</span> }
      <h2>Token:</h2>
      { token == null ? <span>Loading</span> : <span>{token}</span> }
    </div>
  );
}
export default App;