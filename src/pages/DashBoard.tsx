function DashBoard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 p-2"> DsshBoard </h2>
      <div className="p-2">
        <div>
          <span className="font-bold "> Customers : </span>
          <span className="text-gray-600 font-bold"> 5000 Customers</span>
        </div>
        <div>
          <span className="font-bold "> Sellings </span>
          <span className="text-gray-600 font-bold"> 100000.5 $ </span>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
