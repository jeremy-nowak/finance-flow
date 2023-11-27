import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const DecoButton = () => {
  const { handleLogout } = useContext(UserContext);
  return (
    <div className="deco-button">
      <button onClick={handleLogout}>Deco</button>
    </div>
  );
};

export default DecoButton;
