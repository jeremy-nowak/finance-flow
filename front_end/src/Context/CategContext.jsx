import { createContext, useState, useEffect, useContext } from "react";

export const CategContext = createContext();

const CategProvider = ({ children }) => {
    const [incomeCateg, setIncomeCateg] = useState([]);
    const [outgoingCateg, setOutgoingCateg] = useState([]);
    const [categ, setCateg] = useState({
        income: [],
        outgoing: [],
    });

    const PATH = import.meta.env.VITE_PATH;

    const fetchCateg = async () => {

        try{

            const response = await fetch(`${PATH}controller/categController.php?categ`);
            const res = await response.json();
            console.log("res", res);
            // mettre les catégories ayant pour type "crédit" dans le state "income", et les autres dans le state "outgoing"
            const income= [];
            const outgoing = [];
            res.map((item) => {
                console.log("item", item.name);
                if (item.type == "credit") {
                    income.push(item.name);
                    console.log("income", income);
                } else {
                    outgoing.push(item.name);
                    console.log("outgoing", outgoing);
                }

                // si la lenght de income est égale à 4, on met income dans le state incomeCateg
                if (income.length == 4) {
                    setIncomeCateg(income);
                }
                // si la lenght de outgoing est égale à 4, on met outgoing dans le state outgoingCateg
                if (outgoing.length == 4) {
                    setOutgoingCateg(outgoing);
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
        setCateg({
            income: incomeCateg,
            outgoing: outgoingCateg,
        });

    }, [incomeCateg, outgoingCateg]);



    return(

        <CategContext.Provider value={{ categ, setCateg }}>
            {children}
        </CategContext.Provider>
    
    )

}

export default CategProvider;