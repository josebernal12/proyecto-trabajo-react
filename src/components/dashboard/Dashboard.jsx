import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./Header";

export const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col p-0">
          {/* <Header /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
