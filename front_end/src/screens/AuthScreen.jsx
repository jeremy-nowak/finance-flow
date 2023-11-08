import { useState } from "react";
// import { PATH } from "../../config";

export default function AuthScreen() {
  const [connexion, setConnexion] = useState({
    login: "",
    password: "",
  });

  const [inscription, setInscription] = useState({
    login: "",
    password: "",
    confirmation: "",
  });

  const PATH = import.meta.env.VITE_PATH;

  const handleConnection = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("login", connexion.login);
    data.append("password", connexion.password);
    data.append("connection", "verif");

    // envoyer des données vers le back (addresse : http://localhost/finance-flow/back_end/controller/ )
    const response = await fetch(`${PATH}controller/authController.php`, {
      method: "POST",
      body: data,
    });

    const text = await response.text();
    console.log("text", text);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("login", inscription.login);
    data.append("password", inscription.password);
    data.append("confirmation", inscription.confirmation);
    data.append("register", "verif");

    // envoyer des données vers le back (addresse : http://localhost/finance-flow/back_end/controller/ )
    const response = await fetch(`${PATH}controller/authController.php`, {
      method: "POST",
      body: data,
    });

    const text = await response.text();
    console.log("text", text);
  };

  return (
    <>
      <section>
        <div id="connexion">
          <form method="post">
            <input
              id="login"
              type="text"
              placeholder="Pseudonyme"
              onChange={(e) => {
                setConnexion({
                  ...connexion,
                  login: e.target.value,
                });
              }}
            />
            <input
              id="password"
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => {
                setConnexion({
                  ...connexion,
                  password: e.target.value,
                });
              }}
            />
            <input
              type="submit"
              value={"Se connecter"}
              onClick={handleConnection}
            />
          </form>
        </div>

        <div id="inscription">
          <form action="" method="post">
            <input
              id="login_insc"
              type="text"
              placeholder="Pseudonyme"
              onChange={(e) => {
                setInscription({
                  ...inscription,
                  login: e.target.value,
                });
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => {
                setInscription({
                  ...inscription,
                  password: e.target.value,
                });
              }}
            />
            <input
              type="password"
              placeholder="Confirmation"
              onChange={(e) => {
                setInscription({
                  ...inscription,
                  confirmation: e.target.value,
                });
              }}
            />
            <input
              type="submit"
              value={"S'inscrire"}
              onClick={handleRegister}
            />
          </form>
        </div>
      </section>
    </>
  );
}
