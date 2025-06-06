import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Cutsomers from "./pages/Cutsomers";
import Products from "./pages/Products";
console.log(import.meta.env.BASE_URL);
function App() {
  return (
    <>
      <Routes>
        <Route path={import.meta.env.BASE_URL} element={<MainLayout />}>
          <Route path="" element={<Navigate to={"dashboard"} />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Cutsomers />} />
        </Route>
        <Route path="admin/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
