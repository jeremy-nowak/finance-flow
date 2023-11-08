import { useState } from "react";
// import { PATH } from "../../config";

export default function AuthScreen() {
  // ________________________
  // Variables
  const [connexion, setConnexion] = useState({
    login: "",
    password: "",
  });

  const [inscription, setInscription] = useState({
    login: "",
    password: "",
    confirmation: "",
  });

  const [errorRegister, setErrorRegister] = useState({
    login: null,
    password: null,
    confirmation: null,
  });

  const PATH = import.meta.env.VITE_PATH;

  // ________________________
  // Fonctions

  const handleRegister = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("login", inscription.login);
    data.append("password", inscription.password);
    data.append("confirmation", inscription.confirmation);
    data.append("register", "register");

    // envoyer des données vers le back (addresse : http://localhost/finance-flow/back_end/controller/ )
    const response = await fetch(`${PATH}controller/authController.php`, {
      method: "POST",
      body: data,
    });

    const text = await response.text();
    console.log("text", text);
  };

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

  const verifyLogin = async (e) => {
    e.preventDefault();
    console.log("verifyLogin");

    let data = new FormData();
    data.append("login", inscription.login);
    data.append("register", "login");

    // envoyer des données vers le back (addresse : http://localhost/finance-flow/back_end/controller/ )
    const response = await fetch(`${PATH}controller/authController.php`, {
      method: "POST",
      body: data,
    });

    const text = await response.text();
    console.log("text", text);

    if (text === "ok") {
      setErrorRegister({
        ...errorRegister,
        login: null,
      });
    } else if (text === "Ce login est déjà utilisé") {
      setErrorRegister({
        ...errorRegister,
        login: text,
      });
    } else if (text === "Champ vide") {
      setErrorRegister({
        ...errorRegister,
        login: "veuillez remplir ce champ",
      });
    }
  };

  const verifyBlank = (e, champ) => {
    e.preventDefault();

    // verifier que le champ en question n'est pas vide et afficher le message d'erreur de l'input en question
    if (champ === "password") {
      if (inscription.password === "") {
        setErrorRegister({
          ...errorRegister,
          password: "veuillez remplir ce champ",
        });
      } else {
        verifyPassword(e, inscription.password);
      }
    } else if (champ === "confirmation") {
      if (inscription.confirmation === "") {
        setErrorRegister({
          ...errorRegister,
          confirmation: "veuillez remplir ce champ",
        });
      } else {
        setErrorRegister({
          ...errorRegister,
          confirmation: null,
        });
      }
    }
  };

  const verifyPassword = (e, value) => {
    e.preventDefault();

    // Regex pour vérifier que le mot de passe contient au moins une majuscule, une minuscule et un chiffre (pas de nombre minimum de caractères)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

    if (value === "") {
      verifyBlank(e, "password");
      console.log("verifyBlank");
    } else {
      if (!regex.test(value)) {
        console.log("regex");
        setErrorRegister({
          ...errorRegister,
          password:
            "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
        });
      } else if (regex.test(value)) {
        console.log("regex ok");
        setErrorRegister({
          ...errorRegister,
          password: null,
        });
      }
    }
  };

  const verifyConfirmation = (e, value) => {
    e.preventDefault();

    if (inscription.password !== value) {
      setErrorRegister({
        ...errorRegister,
        confirmation: "Les mots de passe ne correspondent pas",
      });
    } else {
      setErrorRegister({
        ...errorRegister,
        confirmation: null,
      });
    }
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
              onBlur={verifyLogin}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(e) => {
                setInscription({
                  ...inscription,
                  password: e.target.value,
                });
                verifyPassword(e, e.target.value);
              }}
              onBlur={(e) => {
                verifyBlank(e, "password");
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
                verifyConfirmation(e, e.target.value);
              }}
              onBlur={(e) => {
                verifyBlank(e, "confirmation");
              }}
            />
            <input
              type="submit"
              value={"S'inscrire"}
              onClick={handleRegister}
            />
          </form>
          {errorRegister.login && <p>{errorRegister.login} (Login)</p>}
          {errorRegister.password && (
            <p>{errorRegister.password} (mot de passe)</p>
          )}
          {errorRegister.confirmation && (
            <p>{errorRegister.confirmation} (confirmation)</p>
          )}
        </div>
      </section>
    </>
  );
}
