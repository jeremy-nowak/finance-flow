import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

import FormScreen from "./FormScreen";
import DecoButton from "../components/DecoButton";
import Footer from "../components/Footer";
import SpendDonut from "../components/SpendDonuts";
import IncomeDonut from "../components/IncomeDonut";
import DateButton from "../components/DateButton";
import TransactionList from "../components/TransactionList";
import RecapBar from "../components/RecapBar";

export default function HomeScreen() {
  const { user, displayForm } = useContext(UserContext);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [total, setTotal] = useState(0);

  const getTotals = () => {
    setTotal(totalIncome - totalSpend);
  };

  useEffect(() => {
    getTotals();
  }, [totalIncome, totalSpend]);

  return (
    <div>
      <div>
        <div className="flex justify-between p-5 items-center m-5">
          <h2 className="text-white text-2xl">Bonjour {user.login}</h2>
          <DecoButton />
        </div>

        <div className="m-10 bg-white bg-opacity-25 rounded-xl">
          <DateButton />
        </div>

        <section className="m-10 flex flex-row">
          <div className="w-full">
            <div className="flex flex-row bg-white bg-opacity-25 rounded-xl justify-evenly mr-5">
              <div className="w-2/5 flex flex-col items-center p-2">
                <SpendDonut
                  totalSpend={totalSpend}
                  setTotalSpend={setTotalSpend}
                />
              </div>
              <p>Month's total: {total}€</p>
              <div className="w-2/5 flex flex-col items-center p-2">
                <IncomeDonut
                  totalIncome={totalIncome}
                  setTotalIncome={setTotalIncome}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-25 rounded-xl mr-5 mt-10 p-5 flex justify-center">
              <div className="w-3/4">
                <RecapBar />
              </div>
            </div>
          </div>
          <div>
            <div>
              <FormScreen />
            </div>
            <div className="bg-white bg-opacity-25 rounded-xl ml-5 p-2">
              <TransactionList />
            </div>
          </div>
        </section>
        {displayForm && <FormScreen />}
      </div>

      <Footer />
    </div>
  );
}
