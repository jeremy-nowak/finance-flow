function Cell({ type, name, amount }) {
  // type: income or spend
  // name: category name
  // amount: total amount for this category

  return (
    <div>
      <h1>Cell</h1>
      <p>{name}</p>
      <p>{amount}</p>
    </div>
  );
}

export default Cell;
