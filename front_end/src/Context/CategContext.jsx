import { createContext, useState, useEffect, useContext } from "react";

export const CategContext = createContext();

const CategProvider = ({ children }) => {
    const [categ, setCateg] = useState({
        income: [],
        outgoing: [],
    });

    const PATH = import.meta.env.VITE_PATH;

    const fetchCateg = async () => {

        try{

            const response = await fetch(`${PATH}controller/categController.php?categ`);
            const res = await response.json();
            // console.log("res", res);

            const incomeTemp= [];
            const outgoingTemp = [];

            res.map((item) => {
                // console.log("item", item.name);
                if (item.type == "credit") {
                    incomeTemp.push(item.name);
                } else {
                    outgoingTemp.push(item.name);
                }

                // si la length de income et outgoingTemp est égale à 4, on set les states
                if (incomeTemp.length == 4 && outgoingTemp.length == 4) {
                    setCateg({
                        ...categ,
                        income: incomeTemp,
                        outgoing: outgoingTemp,
                    }); 
                }
            });

        }catch (err){
            console.log(err);

        }
        

}

    useEffect(() => {
        fetchCateg();
    }, []);

    useEffect(() => {
        console.log("🚀 ~ file: CategContext.jsx:63 ~ CategProvider ~ categ:", categ)
    }, [categ]);



    return(

        <CategContext.Provider value={{ categ, setCateg }}>
            {children}
        </CategContext.Provider>
    
    )

}

export default CategProvider;