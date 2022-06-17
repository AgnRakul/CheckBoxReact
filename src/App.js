import Invite from "./Invite";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [Permission, setPermission] = useState();

  const getPermissions = () => {
    axios
      .get("./src/data.json")
      .then((response) => {
        setPermission(response.data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPermissions();
  }, []);

  console.log(Permission);

  return (
    <div className="App">
      <Invite
        permissions={Permission}
        loading={loading || !Permission}
        fetchingError={error}
      />
    </div>
  );
}

export default App;
