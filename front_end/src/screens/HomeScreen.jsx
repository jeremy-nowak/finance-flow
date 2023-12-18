import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import FormDesktopScreen from "./FormDesktopScreen";
import DecoButton from "../components/DecoButton";
import Footer from "../components/Footer";
import SpendDonut from "../components/SpendDonuts";
import IncomeDonut from "../components/IncomeDonut";
// import DateButton from "../components/DateButton";
import TransactionList from "../components/TransactionList";
import RecapBar from "../components/RecapBar";
import DisplaySolde from "../components/DisplaySolde";
import TransactionsScreen from "./TransactionsScreen";

export default function HomeScreen() {
  const { user, displayForm } = useContext(UserContext);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [total, setTotal] = useState(0);
  const [displayAll, setDisplayAll] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  const getTotals = () => {
    setTotal(totalIncome - totalSpend);
  };

  useEffect(() => {
    getTotals();
  }, [totalIncome, totalSpend]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (displayAll) {
    return <TransactionsScreen setDisplayAll={setDisplayAll} />;
  } else {
    return (
      <div>
        <div>
          <div className="flex justify-between p-5 items-center">
            <h2 className="text-white text-2xl">Bonjour {user.login}</h2>
            <DecoButton />
          </div>

          {/* <div className="m-10 bg-white bg-opacity-25 rounded-xl">
            <DateButton />
          </div> */}

          <div className="lg:hidden xs:flex flex-col bg-white bg-opacity-25 rounded-xl p-2 m-5">
            <p className="text-white text-3xl p-5">Total</p>
            <div className="flex justify-center">
              <p className="text-5xl text-white p-2 mb-5">
                <DisplaySolde />
              </p>
            </div>
          </div>

          <section className="lg:m-10 xs:m-5 flex lg:flex-row xs:flex-col">
            <div className="w-full">
              <div className="flex flex-col bg-white bg-opacity-25 rounded-xl">
                <div>
                  <h3 className="text-white lg:text-3xl xs:text-xl p-2 m-5">
                    Monthly Recap
                  </h3>
                </div>
                <div className="flex lg:flex-row xs:flex-col justify-around">
                  <div className="lg:w-1/3 xs:w-full flex flex-col items-center py-2">
                    <SpendDonut
                      totalSpend={totalSpend}
                      setTotalSpend={setTotalSpend}
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="bg-white bg-opacity-25 rounded-xl p-3 lg:mb-5 xs:m-5 flex flex-col items-center">
                      <p className="text-white m-2 text-bold">
                        Monthly balance
                      </p>
                      <p className="text-4xl text-white">{total}€</p>
                    </div>
                  </div>
                  <div className="lg:w-1/3 xs:w-full flex flex-col items-center py-2">
                    <IncomeDonut
                      totalIncome={totalIncome}
                      setTotalIncome={setTotalIncome}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-25 rounded-xl lg:mr-5 lg:mt-10 xs:my-5 p-5 flex justify-center w-full">
                <div className="lg:w-3/4 xs:w-full">
                  <RecapBar />
                </div>
              </div>
            </div>

            <div>
              <div className="lg:flex xs:hidden flex-col bg-white bg-opacity-25 rounded-xl ml-5 p-2 mb-5">
                <p className="text-white text-3xl p-5">Total</p>
                <div className="flex justify-center">
                  <p className="text-5xl text-white p-2 mb-5">
                    <DisplaySolde />
                  </p>
                </div>
              </div>
              <div>
                <FormDesktopScreen />
              </div>
              <div className="bg-white bg-opacity-25 rounded-xl lg:ml-5 p-2">
                <TransactionList setDisplayAll={setDisplayAll} />
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }
}
