import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const [connected, setConnected] = useState(false);

  const PATH = import.meta.env.VITE_PATH;

  const fetchUser = async () => {
    try {
      let data = new FormData();
      data.append("user", user);
      data.append("context", "fetchUser");

      const response = await fetch(`${PATH}controller/authController.php`, {
        method: "POST",
        body: data,
      });
      const res = await response.json();
      if (res) {
        setData(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    } else {
      setData({});
    }
  }, [user]);

  // si l'utilisateur est en localstorage, on le connecte automatiquement
  useEffect(() => {
    if (localStorage.getItem("login")) {
      setUser(localStorage.getItem("login"));
      setConnected(true);
    }
  });

  return (
    <UserContext.Provider
      value={{ user, setUser, data, connected, setConnected }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
