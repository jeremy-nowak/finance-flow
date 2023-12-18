import React, { useState, useContext, useEffect } from "react";
import Transaction from "./Transaction"; // Assuming Transaction component is in a separate file
import { UserContext } from "../Context/UserContext";

export default function TransactionList({
  isMobile = false,
  filteredData = null,
  setDisplayAll,
}) {
  const { latestTransactions } = useContext(UserContext);

  return (
    <div>
      {!isMobile ? (
        <>
          <div className="flex flex-row items-end">
            <h2 className="text-white text-2xl p-5 mb-2">Latest Transactions</h2>

            <button className="text-white underline underline-offset-1 " onClick={() => setDisplayAll(true)}>See all...</button>

          </div>
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
        <div className="lg:p-2 lg:m-2 flex flex-col items-center bg-white bg-opacity-20 h-full mt-5 rounded-xl">
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
