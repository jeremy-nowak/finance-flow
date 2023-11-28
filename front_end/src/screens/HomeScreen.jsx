import { useContext } from "react";

import { UserContext } from "../Context/UserContext";

import DisplaySolde from "../components/DisplaySolde";
import FormScreen from "./FormScreen";
import DecoButton from "../components/DecoButton";
import Footer from "../components/Footer";
import SpendDonut from "../components/SpendDonuts";
import IncomeDonut from "../components/IncomeDonut";
import DateButton from "../components/DateButton";

export default function HomeScreen() {
  const { user } = useContext(UserContext);

  

  return (
    <div>
      
      <div className="flex justify-between p-5 items-center">
      <p className="text-white text-xl">Bonjour {user}</p>
      <DecoButton />
      </div>
      <div>
        <DateButton /> 
      </div>
      <div>
       <SpendDonut />
      <IncomeDonut />
      </div>
      <DisplaySolde />
      <FormScreen />
      
      <Footer />
    </div>
  );
}
