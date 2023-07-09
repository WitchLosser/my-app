import { Link } from "react-router-dom";
import ProductListPage from "../product/list/ProductListPage";

const HomePage = () => {
  
  return (
    <>
      <h1>Головна сторінка</h1>
      <Link to={"/admin"} className={"btn btn-success"}>
        Адмін панель
      </Link>
      <ProductListPage/>
    </>
  );
};
export default HomePage;
