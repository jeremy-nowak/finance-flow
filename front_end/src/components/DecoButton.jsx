import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const DecoButton = () => {
  const { handleLogout } = useContext(UserContext);
  return (
    <div className="deco-button">
      <button className=" xs:w-2/3" onClick={handleLogout}><img src="/out.svg"></img></button>
    </div>
  );
};

export default DecoButton;
