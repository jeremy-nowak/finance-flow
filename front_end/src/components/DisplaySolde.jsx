import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";

function DisplaySolde() {
  const { data, user } = useContext(UserContext);

  return (
    <>
      {data.solde}€
    </>
  );
}
export default DisplaySolde;
