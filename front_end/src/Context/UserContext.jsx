import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    login: null,
    id_user: null,
    solde: null,
  });
  const [data, setData] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [connected, setConnected] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  const PATH = import.meta.env.VITE_PATH;

  const fetchUser = async () => {
    try {
      let data = new FormData();
      data.append("user", user.login);
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
    try {
      let data = new FormData();
      data.append("user", user.login);
      data.append("context", "fetchMonthly");

      const response = await fetch(`${PATH}controller/authController.php`, {
        method: "POST",
        body: data,
      });
      const res = await response.json();
      if (res) {
        setMonthlyData(res);
      }
    } catch (err) {
      console.log(err);
    }
    try {
      let data = new FormData();
      data.append("user", user.login);
      data.append("context", "fetchYearly");

      const response = await fetch(`${PATH}controller/authController.php`, {
        method: "POST",
        body: data,
      });
      const res = await response.json();
      if (res) {
        setYearlyData(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setConnected(false);
    localStorage.removeItem("login");
    localStorage.removeItem("id_user");
    localStorage.removeItem("solde");
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
      setUser({
        login: localStorage.getItem("login"),
        id_user: localStorage.getItem("id_user"),
        solde: localStorage.getItem("solde"),
      });

      setConnected(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        data,
        monthlyData,
        yearlyData,
        connected,
        setConnected,
        handleLogout,
        displayForm,
        setDisplayForm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
