import React from 'react';
import Transaction from './Transaction'; // Assuming Transaction component is in a separate file

export default function TransactionList() {
    return (
        <div>
            <h2 className="text-white text-3xl p-5">Transactions</h2>
            <div className='lg:p-2 lg:m-2 flex flex-col items-center'>
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
