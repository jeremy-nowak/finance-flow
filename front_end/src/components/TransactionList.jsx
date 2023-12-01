import React, { useState, useContext, useEffect } from "react";
import Transaction from "./Transaction"; // Assuming Transaction component is in a separate file
import { UserContext } from "../Context/UserContext";

export default function TransactionList({
  isMobile = false,
  filteredData = null,
}) {
  const { latestTransactions } = useContext(UserContext);

  return (
    <div>
      {!isMobile ? (
        <>
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
          </div>
        </>
      ) : (
        <div className="lg:p-2 lg:m-2 flex flex-col items-center">
          {filteredData.map((transaction) => {
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
        </div>
      )}
    </div>
  );
}
