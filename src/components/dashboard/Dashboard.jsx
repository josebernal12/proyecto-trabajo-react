import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./Header";
import { ModalSeeActivityVulnerable } from "../ModalSeeActivityVulnerable";
import { ModalAllCollaborators } from "../ModalAllCollaborators";

export const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col p-0">
          {/* <Header /> */}
          <Outlet />
          <ModalSeeActivityVulnerable />
          <ModalAllCollaborators />
        </div>
      </div>
    </div>
  );
};
