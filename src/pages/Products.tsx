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

type Product = {
  id: number | string;
  productName: string;
  image: string;
};


const initialRowsData = [
  {
    id: 1,
    image: assets.course_4,
    productName: "product 1",
  },
  {
    id: 2,
    image: assets.course_4,
    productName: "product 2",
  },
  {
    id: 3,
    image: assets.course_4,
    productName: "product 3",
  },
];

function Products() {
  const [showEditProductInfo, setShowEditProductInfo] = useState(false);
  const [rowsData, setRowsData] = useState(initialRowsData);
  const CurrentProduct = useRef(rowsData[0]);

  if(false) {
    setRowsData([]);
  }
  // const getFullName: GridValueGetter<(typeof rows)[number], unknown> = (
  //   value,
  //   row
  // ) => {
  //   return `${row.firstName || ""} ${row.lastName || ""}`;
  // };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      renderCell: () => (

        <strong>
          <img src={assets.course_4} />
        </strong>
      ),
      flex: 1.5,
    },
    {
      field: "productName",
      headerName: "Product Name",
      hideable: false,
      flex: 1,
    },

    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   valueGetter: getFullName,
    //   flex: 1,
    // },

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
                setShowEditProductInfo(true);
                CurrentProduct.current = params.row;
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
      <h2 className="text-2xl font-bold mb-4 p-2"> Products </h2>
      <Box sx={{ minHeight: 200 }} className="w-full md:w-[80%] m-auto flex-1">
        <DataGrid
          rows={rowsData}
          columns={columns}
          rowCount={rowsData.length}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          rowHeight={90}
          rowSelection={false}
          pageSizeOptions={[]}
        />
      </Box>
      {showEditProductInfo && (
        <EditProductInfoPopup
          {...CurrentProduct.current}
          onClose={() => {
            setShowEditProductInfo(false);
          }}
          onEdit={(newData: Product) => {
            console.log(newData);
          }}
        />
      )}
    </div>
  );
}

type EditProductInfoPopupProps = {
  id: number | string;
  image: string;
  productName: string;
  onClose: () => void;
  onEdit: (newData: Product) => void;
};
function EditProductInfoPopup({
  id,
  image,
  productName,
  onClose,
  onEdit,
}: EditProductInfoPopupProps) {
  const [ProductData, setProductData] = useState({
    id: id,
    productName: productName,
    image: image,
  });
  const [errors, setErrors] = useState<{
    image: string | null;
    productName: string | null;
  }>({ image: null, productName: null });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type !== "file") {
      setProductData({ ...ProductData, [e.target.name]: e.target.value });
    } else {
      const file = e.target.files && e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductData({ ...ProductData, image: reader.result as string });
          setErrors({ ...errors, image: null });
        };
        reader.readAsDataURL(file);
        
        
      } else {
        setProductData({ ...ProductData, image: image });
        setErrors({ ...errors, image: "You Must Choose Image" });
      }
    }
  };

  const validate = () => {
    const newErrors: { productName: string | null; image: string | null } = {
      productName: "",
      image: "",
    };
    if (!ProductData.productName.trim()) {
      newErrors.productName = "You Must Enter Product Name";
    } else if (!ProductData.image.trim()) {
      newErrors.image = "You Must Enter An Image ";
    }
    setErrors(newErrors);
    const result = newErrors.productName === "" && newErrors.image === "";
    return result;
  };

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/40">
      <div className="bg-white w-full md:w-[500px] relative p-2 rounded-sm">
        <h3 className="text-xl overflow-auto text-center mb-5 font-bold">
          {" "}
          Change Product Info{" "}
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
              onEdit(ProductData);
            }
          }}
        >
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              className={`border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400
                 ${
                   errors?.productName
                     ? "border-red-500 focus:ring-1 focus:ring-red-400"
                     : "border-gray-300"
                 }
                 ${
                   errors.productName === ""
                     ? "border-green-500 focus:ring-1 focus:ring-green-400"
                     : "border-gray-300"
                 }`}
              type="text"
              value={ProductData.productName}
              onChange={handleChange}
              placeholder="Chane Product Name"
              name="productName"
              id="productName"
            />
            {errors?.productName && (
              <p className="text-red-600 text-sm mt-1 font-semibold">
                {errors.productName}
              </p>
            )}
            {errors.productName === "" && (
              <p className="text-green-600 text-sm mt-1 font-semibold">
                Success
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              image
            </label>
            <input
              className={`border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400
                 ${
                   errors?.image
                     ? "border-red-500 focus:ring-1 focus:ring-red-400"
                     : "border-gray-300"
                 }
                 ${
                   errors.image === ""
                     ? "border-green-500 focus:ring-1 focus:ring-green-400"
                     : "border-gray-300"
                 }`}
              type="file"
              onChange={handleChange}
              name="image"
              id="image"
              multiple={false}
            />
            <img src={ProductData.image} />
            {errors?.image && (
              <p className="text-red-600 text-sm mt-1 font-semibold">
                {errors.image}
              </p>
            )}
            {errors.image === "" && (
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
export default Products;
