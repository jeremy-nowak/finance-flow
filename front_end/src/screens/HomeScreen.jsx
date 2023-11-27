import { useContext } from "react";

import { UserContext } from "../Context/UserContext";

import DisplaySolde from "../components/DisplaySolde";
import ButtonAdd from "../components/ButtonAdd";
import FormScreen from "./FormScreen";
import DecoButton from "../components/DecoButton";

export default function HomeScreen() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>HomeScreen</h1>
      <p>Bonjour {user}</p>
      <DisplaySolde />
      <ButtonAdd />
      <FormScreen />
      <DecoButton />
    </div>
  );
}
