

function Cell({ type, name, amount }) {
  // type: income or spend
  // name: category name
  // amount: total amount for this category

  const src = name + ".svg";

  return (
    <div className="text-white flex flex-row bg-white bg-opacity-5 m-5 rounded-xl justify-between">
      <div  className="ml-5 my-5 bg-white bg-opacity-10 flex items-center justify-center w-30 rounded-md">
        <img className="w-15 h-15 p-2" src={src} alt="category Logo" />
      </div>

      <div className="flex flex-col m-5 w-1/3 items-start" >
        <p className="text-bold">{name}</p> 
        <p className="text-xl " >{amount}€</p> 
      </div>
    </div>
  );
}

export default Cell;
