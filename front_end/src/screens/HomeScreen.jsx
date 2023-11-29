import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

import FormScreen from "./FormScreen";
import DecoButton from "../components/DecoButton";
import Footer from "../components/Footer";
import SpendDonut from "../components/SpendDonuts";
import IncomeDonut from "../components/IncomeDonut";
import DateButton from "../components/DateButton";

export default function HomeScreen() {
  const { user, displayForm } = useContext(UserContext);

  return (

    <div className="h-screen">
      <div className="h-[90%]">
      <div className="flex justify-between p-5 items-center">
        <p className="text-white text-xl">Bonjour {user.login}</p>
        <DecoButton />
      </div>
      <div>
        <DateButton />
      </div>
      <div className="recap">
        <div className="xs:w-1/2 lg:w-1/4">
          <SpendDonut />
        </div>
        <div className="xs:w-1/2 lg:w-1/4">
          <IncomeDonut />
        </div>
      </div>
      
      {displayForm && 
     
        <FormScreen />
      
      }
      </div>
      <Footer/>
    </div>
  );
}
