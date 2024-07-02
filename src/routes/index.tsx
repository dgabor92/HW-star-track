import { lazy, FC } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Checklist from "@/pages/ Checklist";
import SelectedChecklist from "@/pages/SelectedChecklist";

const NotFound = lazy(() => import("../pages/404"));

const routeList: RouteObject[] = [
  {
    path: "/",
    element: <Checklist />,
  },
  {
    path: "/check/start/:driveNumber",
    element: <SelectedChecklist />,
  },
  {
    path: "/admin/dashboard",
    element: <PrivateRoute />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
