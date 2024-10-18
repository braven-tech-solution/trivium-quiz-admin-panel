import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";
import DashBoard from "../pages/DashBoard/DashBoard";
import ManagePassword from "../pages/ManagePassword/ManagePassword";
import ManageQuizQuestion from "../pages/ManageQuizQuestion/ManageQuizQuestion";
import ManageScheduleQuestion from "../pages/ManageScheduleQuestion/ManageScheduleQuestion";
import ManageQuizLevel from "../pages/ManageQuizLevel/ManageQuizLevel";
import ManageQuizCategory from "../pages/ManageQuizCategory/ManageQuizCategory";
import UserHistory from "../pages/UserHistory/UserHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute>
      <MainLayout />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/add-quiz-category",
        element: <ManageQuizCategory />,
      },
      {
        path: "/add-quiz-level",
        element: <ManageQuizLevel />,
      },
      {
        path: "/manage-quiz-question",
        element: <ManageQuizQuestion />,
      },

      {
        path: "/manage-schedule-question",
        element: <ManageScheduleQuestion />,
      },
      {
        path: "/users-history",
        element: <UserHistory />,
      },
      {
        path: "/setting",
        element: <h1>Working </h1>,
      },
      {
        path: "/manage-password",
        element: <ManagePassword />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
