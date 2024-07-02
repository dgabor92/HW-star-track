import { FC } from "react";
import Dashboard from "../components/Dashboard";

const PrivateRoute: FC = () => {
  return (
    <Dashboard>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"></div>
    </Dashboard>
  );
};

export default PrivateRoute;
