import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

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

  const [errorConnection, setErrorConnection] = useState({
    login: null,
    password: null,
  });

  const [signUp, setSignUp] = useState(false);

  const { setUser, setConnected } = useContext(UserContext);

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
    if (text === "Les deux mots de passe ne correspondent pas") {
      setErrorRegister({
        ...errorRegister,
        confirmation: text,
      });
    } else if (text === "Ce login est déjà utilisé") {
      setErrorRegister({
        ...errorRegister,
        login: text,
      });
    } else if (text === inscription.login) {
      setErrorRegister({
        ...errorRegister,
        login: null,
        password: null,
        confirmation: null,
      });
      setConnexion({
        ...connexion,
        login: inscription.login,
      });
      setInscription({
        ...inscription,
        login: "",
        password: "",
        confirmation: "",
      });
      setSignUp(!signUp);
    }
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

    const text = await response.json();
    console.log("text", text.id_user);
    if (text === "Veuillez remplir tous les champs") {
      setErrorConnection({
        ...errorConnection,
        login: text,
        password: text,
      });
    } else if (text === "Les informations de connexion sont incorrectes") {
      setErrorConnection({
        ...errorConnection,
        login: text,
        password: text,
      });
    } else if (text.id_user) {
      setErrorConnection({
        ...errorConnection,
        login: null,
        password: null,
      });
      setUser({
        login: text.login,
        id_user: text.id_user,
        solde: text.solde,
      });
      // mettre le login et l'id dans le local storage
      localStorage.setItem("login", text.login);
      localStorage.setItem("id_user", text.id_user);
      localStorage.setItem("solde", text.solde);
      setConnexion({
        ...connexion,
        login: "",
        password: "",
      });
      setConnected(true);
    }
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
    } else if (champ === "login_connection") {
      if (connexion.login === "") {
        setErrorConnection({
          ...errorConnection,
          login: "veuillez remplir ce champ",
        });
      } else {
        setErrorConnection({
          ...errorConnection,
          login: null,
        });
      }
    } else if (champ === "password_connection") {
      if (connexion.password === "") {
        setErrorConnection({
          ...errorConnection,
          password: "veuillez remplir ce champ",
        });
      } else {
        setErrorConnection({
          ...errorConnection,
          password: null,
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
    <div>
      <div className="xs:h-1/2"></div>
      <section className=" xl:w-96 xs:w-full sm:w-screen bg-opacity-20 bg-white lg:rounded-lg xs:rounded-t-2xl">
        {signUp ? (
          <div id="inscription" className="h-full">
            <h1 className="m-5 text-white text-3xl">Register</h1>

            <form action="" method="post">
              <div className="relative p-12 rounded-md">
                <div className="inset-y-0 left-0 flex-col items-center p-3">
                  <label className="block text-xl font-medium leading-6 text-white mb-2">
                    Login
                  </label>

                  <input
                    id="login_insc"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-2 "
                    value={inscription.login || ""}
                    onChange={(e) => {
                      setInscription({
                        ...inscription,
                        login: e.target.value,
                      });
                    }}
                    onBlur={verifyLogin}
                  />

                  {errorRegister.login && (
                    <p className="text-white mb-2">
                      {errorRegister.login} (Login)
                    </p>
                  )}

                  <label className="block text-xl font-medium leading-6 text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-2"
                    value={inscription.password || ""}
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
                  {errorRegister.password && (
                    <p className="text-white mb-2">
                      {errorRegister.password} (mot de passe)
                    </p>
                  )}
                  <label className="block text-xl font-medium leading-6 text-white mb-2">
                    Confirmation
                  </label>
                  <input
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-4"
                    value={inscription.confirmation || ""}
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
                  {errorRegister.confirmation && (
                    <p className="text-white mb-2">
                      {errorRegister.confirmation} (confirmation)
                    </p>
                  )}
                  <input
                    type="submit"
                    className="block w-full rounded-md border-0 bg-[#181E5A] py-1.5 text-xl text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    value={"Sign up"}
                    onClick={handleRegister}
                  />

                  <div className="flex justify-center mt-9">
                    <p className="text-white">
                      Already a member ?{" "}
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          setSignUp(!signUp);
                        }}
                        className="text-blue-400 underline cursor-pointer"
                      >
                        Sign in
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div id="connexion" className="h-full">
            <form method="post">
              <h1 className="m-5 text-white text-3xl">Login</h1>
              <div className="relative p-12 rounded-md">
                <div className="inset-y-0 left-0 flex-col items-center p-3">
                  <label className="block text-xl font-medium leading-6 text-white mb-2">
                    Login
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-2"
                    id="login"
                    type="text"
                    value={connexion.login || ""}
                    onChange={(e) => {
                      setConnexion({
                        ...connexion,
                        login: e.target.value,
                      });
                    }}
                    onBlur={(e) => {
                      verifyBlank(e, "login_connection");
                    }}
                  />

                  <label className="block text-xl font-medium leading-6 text-white mb-2">
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-4"
                    value={connexion.password || ""}
                    onChange={(e) => {
                      setConnexion({
                        ...connexion,
                        password: e.target.value,
                      });
                    }}
                    onBlur={(e) => {
                      verifyBlank(e, "password_connection");
                    }}
                  />

                  <input
                    type="submit"
                    className="block w-full rounded-md border-0 bg-[#181E5A] py-1.5 text-xl text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    value={"Sign in"}
                    onClick={handleConnection}
                  />
                  <div className="flex justify-center mt-9">
                    <p className="text-white">
                      Not a member ?{" "}
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          setSignUp(!signUp);
                        }}
                        className="text-blue-400 underline cursor-pointer"
                      >
                        Sign up
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
