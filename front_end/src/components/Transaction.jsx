export default function Transaction({
  Category,
  Pill,
  DateTransaction,
  Title,
  Amount,
}) {
  Pill = Pill === "debit" ? "spend" : "income";
  let pillColor = Pill === "income" ? "bg-green-600" : "bg-red-600";
  pillColor += " px-2 rounded-xl mr-9";
  let borderStyle = Pill === "income" ? "border-green-600" : "border-red-600";
  borderStyle += " border-2 text-white my-4 p-2 rounded-xl bg-black";

  // format de la date : dd/mm/yyyy
  const date = new Date(DateTransaction);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  DateTransaction = `${day}/${month}/${year}`;
  return (
    <div className={borderStyle}>
      <div className="flex flex-row">
        <div className="flex flex-row">
          <p className="mr-2">{Category}</p>
          <p className={pillColor}>{Pill}</p>
        </div>
        <div>
          <p>{DateTransaction}</p>
        </div>
      </div>
      <div>
        <h3 className="text-xl my-2">{Title}</h3>
      </div>
      <div className="flex justify-end">
        <p className="text-2xl">{Amount} €</p>
      </div>
    </div>
  );
}
