import { useContext } from "react";

import { UserContext } from "../Context/UserContext";

export default function HomeScreen() {
  const { user } = useContext(UserContext);
  console.log("user", user);

  return (
    <div>
      <h1>HomeScreen</h1>
      <p>Bonjour {user}</p>
    </div>
  );
}
