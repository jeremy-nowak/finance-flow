import { useState } from "react"

export default function AuthScreen () {
    const [connexion, setConnexion] = useState({
        login: "",
        password: ""
    })

    const handleConnexion = async (e) => {
        e.preventDefault()


        let data = new FormData();
        data.append("login", connexion.login);
        data.append("password", connexion.password);
        data.append("connection", "verif")
        
        // envoyer des données vers le back (addresse : http://localhost/finance-flow/back_end/controller/ )
        const response = await fetch("http://localhost/finance-flow/back_end/controller/", {
            method: "POST",
            body: data
        })
        
        const text = await response.text();
        console.log("text", text)
    }


    return (
        <>
            <section>
                
                <div id="connexion">
                    <form method="post">
                        <input id="login"
                        type="text"
                        placeholder="Pseudonyme" 
                        onChange={(e) => {
                            setConnexion({
                                ...connexion,
                                login: e.target.value
                            })
                        }}
                        />
                        <input id="password" 
                        type="password" 
                        placeholder="Mot de passe"
                        onChange={(e) => {
                            setConnexion({
                                ...connexion,
                                password: e.target.value
                            })
                        }}/>
                        <input type="submit" value={"Se connecter"} onClick={handleConnexion}/>
                    </form>
                </div>
                
                <div id="inscription">
                    <form action="" method="post">
                        <input id="login_insc" type="text" placeholder="Pseudonyme"/>
                        <input type="password" placeholder="Mot de passe"/>
                        <input type="password" placeholder="Confirmation"/>
                        <input type="submit" value={"S'inscrire"}/>
                    </form>
                </div>
            </section>
        </>
    )
}