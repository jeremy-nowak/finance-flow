import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import TransactionList from "../components/TransactionList";

export default function TransactionsScreen() {
  const { yearlyData } = useContext(UserContext);
  const [filter, setFilter] = useState("all");
  const [mobile, setMobile] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);

  const [filteredData, setFilteredData] = useState([]);

  const filterData = (e) => {
    setFilter(e.target.value);
    if (e.target.value == "all") {
      setFilteredData(yearlyData);
    } else {
      if (e.target.value == "credit") {
        setFilteredData(yearlyData.filter((item) => item.type == "credit"));
      } else if (e.target.value == "debit") {
        setFilteredData(yearlyData.filter((item) => item.type == "debit"));
      } else {
        setFilteredData(
          yearlyData.filter((item) => item.id_categ == e.target.value)
        );
      }
    }
  };

  const getFilteredData = () => {
    setFilteredData(yearlyData);
  };

  useEffect(() => {
    getFilteredData();
  }, [yearlyData]);

  useEffect(() => {
    if (filteredData.length > 0) {
      setIsLoading(false);
    }
  }, [filteredData]);

  useEffect(() => {
    if (width < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  if (isLoading) {
    return (
      <>
        <button>Retour</button>
        <h1>Transactions</h1>
        <h3>Loading...</h3>
      </>
    );
  } else {
    return (
      <>
        <button>Retour</button>
        <h1>Transactions</h1>
        <section className="flex justify-center items-center">
          {/* boutons qui serviront à filtrer grâce à un data */}
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="all"
          >
            All
          </button>
          {/* ------------------------------ */}
          {/* Income */}
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="credit"
          >
            Income
          </button>
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="5"
          >
            Salary
          </button>
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="6"
          >
            Transfert
          </button>
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="7"
          >
            Interest
          </button>
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="8"
          >
            Others
          </button>
          {/* -------------------------- */}
          {/* Spend */}
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="debit"
          >
            Spend
          </button>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="1"
          >
            Essentials
          </button>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="2"
          >
            Hobbies
          </button>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="3"
          >
            Saves
          </button>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md mr-3"
            onClick={filterData}
            value="4"
          >
            Others
          </button>
        </section>
        {!mobile ? (
          <section className="bg-opacity-25 bg-white">
            <table className="border-collapse border w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">In/out</th>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => {
                  let pillColor =
                    item.type === "credit" ? "bg-green-600" : "bg-red-600";
                  pillColor +=
                    " px-2 rounded-xl mr-9 flex justify-center items-center";

                  let date = new Date(item.date);
                  let day = date.getDate();
                  let month = date.getMonth() + 1;
                  let year = date.getFullYear();
                  let dateTransaction = `${day}/${month}/${year}`;

                  return (
                    <tr key={item.id_transaction}>
                      <td className="border p-2">
                        <div className={pillColor}>
                          <p className="">{item.type}</p>
                        </div>
                      </td>
                      <td className="border p-2">{item.id_transaction}</td>
                      <td className="border p-2">{item.name}</td>
                      <td className="border p-2">{item.title}</td>
                      <td className="border p-2">{item.amount} €</td>
                      <td className="border p-2">{dateTransaction}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        ) : (
          <TransactionList isMobile={mobile} filteredData={filteredData} />
        )}
      </>
    );
  }
}
