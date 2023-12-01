import React from 'react';

export default function TransactionsScreen() {
  const transactionsData = [
    { id: 1, categorie: 'Alimentation', titre: 'Achat de nourriture', montant: 50, date: '2023-12-01' },
    { id: 2, categorie: 'Transport', titre: 'Essence', montant: 30, date: '2023-12-02' },
    // Ajoute d'autres transactions selon tes besoins
  ];

  return (
    <>
      <button>Retour</button>
      <h1>Transactions</h1>
      <section className='bg-opacity-25 bg-white'>
        <table className='border-collapse border w-full'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border p-2'>ID</th>
              <th className='border p-2'>Catégorie</th>
              <th className='border p-2'>Titre</th>
              <th className='border p-2'>Montant</th>
              <th className='border p-2'>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.map((transaction) => (
              <tr key={transaction.id}>
                <td className='border p-2'>{transaction.id}</td>
                <td className='border p-2'>{transaction.categorie}</td>
                <td className='border p-2'>{transaction.titre}</td>
                <td className='border p-2'>{transaction.montant}</td>
                <td className='border p-2'>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
