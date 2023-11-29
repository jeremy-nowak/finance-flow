import React from 'react';
import Transaction from './Transaction'; // Assuming Transaction component is in a separate file

export default function TransactionList() {
    return (
        <div>
            <h2 className="text-white text-2xl">Transactions</h2>
            <div className='p-2 m-2 flex flex-col items-center'>
                <Transaction
                    Category="shopping"
                    Pill="income"
                    Date="03/12/2023"
                    Title="Anniversaire"
                    Amount="233" />

                <Transaction
                    Category="shopping"
                    Pill="income"
                    Date="03/12/2023"
                    Title="Anniversaire"
                    Amount="233" />
            </div>
        </div>
    );
}
