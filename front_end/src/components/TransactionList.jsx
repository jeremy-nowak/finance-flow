import React, { useState, useContext, useEffect } from "react";
import Transaction from "./Transaction"; // Assuming Transaction component is in a separate file
import { UserContext } from "../Context/UserContext";

export default function TransactionList() {
  const { latestTransactions } = useContext(UserContext);

  useEffect(() => {
    console.log(latestTransactions);
  }, [latestTransactions]);
  return (
    <div>
      <h2 className="text-white text-3xl p-5">Transactions</h2>
      <div className="lg:p-2 lg:m-2 flex flex-col items-center">
        {latestTransactions.map((transaction) => {
          return (
            <Transaction
              key={transaction.id_transaction}
              Category={transaction.category}
              Pill={transaction.type}
              DateTransaction={transaction.date}
              Title={transaction.title}
              Amount={transaction.amount}
            />
          );
        })}
        {/* <Transaction
          Category="shopping"
          Pill="income"
          Date="03/12/2023"
          Title="Anniversaire"
          Amount="233"
        />

        <Transaction
          Category="shopping"
          Pill="spend"
          Date="03/12/2023"
          Title="Anniversaire"
          Amount="233"
        /> */}
      </div>
    </div>
  );
}
