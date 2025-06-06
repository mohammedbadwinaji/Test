import { useRef, useState } from "react";
import Button from "../components/core/Button";
import Box from "@mui/material/Box";
import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";
import { assets } from "../assets/assets";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

type Customer = {
  id: number | string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
};




const initialRowsData = [
  {
    id: 1,
    image: assets.course_4,
    firstName: "Mohammed",
    lastName: "Naji",
    email: "Mohammed@gmail.com",
  },
  {
    id: 2,
    image: assets.course_4,
    firstName: "yaya",
    lastName: "Naji",
    email: "yaya@gmail.com",
  },
  {
    id: 3,
    image: assets.course_4,
    firstName: "ahmad",
    lastName: "Naji",
    email: "ahmad@gmail.com",
  },
];




function Cutsomers() {
  const [showEditCustomerInfo, setShowEditCustomerInfo] = useState(false);
  const [rowsData, setRowsData] = useState(initialRowsData);
  const CurrentCustomer = useRef(rowsData[0]);

  if(false) {
    setRowsData([]);
  }
  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon" },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei" },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime" },
  //   { id: 4, lastName: "Stark", firstName: "Arya" },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys" },
  // ];

  // const getFullName: GridValueGetter<(typeof rows)[number], unknown> = (
  //   value,
  //   row
  // ) => {
  //   return `${row.firstName || ""} ${row.lastName || ""}`;
  // };

  const columns: GridColDef[] = [
    // {
    //   field: "image",
    //   headerName: "Image",
    //   renderCell: (params: GridRenderCellParams<any, Date>) => (
    //     <strong>
    //       {/* {params.value.getFullYear()} */}
    //       <img src={assets.course_4} />
    //     </strong>
    //   ),
    // },
    {
      field: "firstName",
      headerName: "First name",
      hideable: false,
      flex: 1,
    },
    { field: "lastName", headerName: "Last name", flex: 1, hideable: false },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   valueGetter: getFullName,
    //   flex: 1,
    // },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      // minWidth: 100,
    },
    {
      field: "actions",
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center mt-4">
            <Button
              type="icon"
              icon={<DeleteTwoToneIcon className="text-red-900 p-0" />}
              onClick={() => {
                console.log(params.row);
                window.alert("Delete Button Clicked");
              }}
              className="mr-1 ml-1"
              style={{ padding: "0" }}
            />
            <Button
              type="icon"
              icon={<EditTwoToneIcon className="text-blue-900 p-0" />}
              onClick={() => {
                setShowEditCustomerInfo(true);
                CurrentCustomer.current = params.row;
              }}
              className="mr-1 ml-1"
              style={{ padding: "0" }}
            />
          </div>
        );
      },
      flex: 1,
      disableColumnMenu: true,

      disableReorder: true,
      disableExport: true,
    },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 p-2"> Customer </h2>
      <Box sx={{ minHeight: 200 }} className="w-full md:w-[80%] m-auto flex-1">
        <DataGrid
          rows={rowsData}
          columns={columns}
          rowCount={rowsData.length}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          rowHeight={70}
          rowSelection={false}
          pageSizeOptions={[]}
        />
      </Box>
      {showEditCustomerInfo && (
        <EditCustomerInfoPopup
          {...CurrentCustomer.current}
          onClose={() => {
            setShowEditCustomerInfo(false);
          }}
          onEdit={(newData: Customer) => {
            console.log(newData);
          }}
        />
      )}
    </div>
  );
}

type EditCustomerInfoPopupProps = {
  id: number | string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  onClose: () => void;
  onEdit: (newData: Customer) => void;
};
function EditCustomerInfoPopup({
  id,
  image,
  firstName,
  lastName,
  email,
  onClose,
  onEdit,
}: EditCustomerInfoPopupProps) {
  const [customerData, setCustomerData] = useState({
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    image: image,
  });
  const [errors, setErrors] = useState<{
    firstName: string | null;
    lastName: string | null;
  }>({ firstName: null, lastName: null });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { firstName: string | null; lastName: string | null } = {
      firstName: "",
      lastName: "",
    };
    if (!customerData.firstName.trim()) {
      newErrors.firstName = "You Must Enter Value For First Name ";
    } else if (!customerData.lastName.trim()) {
      newErrors.lastName = "You Must Enter Value For Last Name ";
    }
    setErrors(newErrors);
    const result = newErrors.firstName === "" && newErrors.lastName === "";
    return result;
  };

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/40">
      <div className="bg-white w-full md:w-[500px] relative p-2 rounded-sm">
        <h3 className="text-xl overflow-auto text-center mb-5 font-bold">
          {" "}
          Change Customer Info{" "}
        </h3>
        <Button
          type="icon"
          icon={<CloseTwoToneIcon />}
          className="absolute top-0 right-0"
          onClick={onClose}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validate()) {
              onEdit(customerData);
            }
          }}
        >
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className={`border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400
                 ${
                   errors?.firstName
                     ? "border-red-500 focus:ring-1 focus:ring-red-400"
                     : "border-gray-300"
                 }
                 ${
                   errors.firstName === ""
                     ? "border-green-500 focus:ring-1 focus:ring-green-400"
                     : "border-gray-300"
                 }`}
              type="text"
              value={customerData.firstName}
              onChange={handleChange}
              placeholder="Chane First Name"
              name="firstName"
              id="firstName"
            />
            {errors?.firstName && (
              <p className="text-red-600 text-sm mt-1 font-semibold">
                {errors.firstName}
              </p>
            )}
            {errors.firstName === "" && (
              <p className="text-green-600 text-sm mt-1 font-semibold">
                Success
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="lastName"
            >
              last Name
            </label>
            <input
              className={`border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400
                 ${
                   errors?.lastName
                     ? "border-red-500 focus:ring-1 focus:ring-red-400"
                     : "border-gray-300"
                 }
                 ${
                   errors.lastName === ""
                     ? "border-green-500 focus:ring-1 focus:ring-green-400"
                     : "border-gray-300"
                 }`}
              type="text"
              value={customerData.lastName}
              onChange={handleChange}
              placeholder="Chane First Name"
              name="lastName"
              id="lastName"
            />
            {errors?.lastName && (
              <p className="text-red-600 text-sm mt-1 font-semibold">
                {errors.lastName}
              </p>
            )}
            {errors.lastName === "" && (
              <p className="text-green-600 text-sm mt-1 font-semibold">
                Success
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black/90 hover:bg-black cursor-pointer text-white font-semibold py-2 rounded transition-colors duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
export default Cutsomers;
