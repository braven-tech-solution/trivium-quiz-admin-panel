import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";
import DashBoard from "../pages/DashBoard/DashBoard";
import Register from "../pages/Register";
import CreateNewFood from "../pages/CreateNewFood/CreateNewFood";
import CreateNewBanner from "../pages/CreateNewBanner/CreateNewBanner";
import ManageAllFood from "../pages/ManageAllFood/ManageAllFood";
import ManageAllBanner from "../pages/ManageAllBanner/ManageAllBanner";
import ManagePassword from "../pages/ManagePassword/ManagePassword";
import ManageFeedback from "../pages/ManageFeedback/ManageFeedback";
import AddQuizCategory from "../pages/AddQuizCategory/AddQuizCategory";
import ManageQuizQuestion from "../pages/ManageQuizQuestion/ManageQuizQuestion";
import AddScheduleQuiz from "../pages/AddScheduleQuiz/AddScheduleQuiz";
import ManageScheduleQuestion from "../pages/ManageScheduleQuestion/ManageScheduleQuestion";
import AddQuizLevel from "../pages/AddQuizLevel/AddQuizLevel";

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
        element: <AddQuizCategory />,
      },
      {
        path: "/add-quiz-level",
        element: <AddQuizLevel />,
      },
      {
        path: "/manage-quiz-question",
        element: <ManageQuizQuestion />,
      },
      {
        path: "/add-schedule-quiz",
        element: <AddScheduleQuiz />,
      },
      {
        path: "/manage-schedule-question",
        element: <ManageScheduleQuestion />,
      },
      {
        path: "/setting",
        element: <h1>Working </h1>,
      },
      {
        path: "/manage-all-food",
        element: <ManageAllFood />,
      },

      {
        path: "/create-new-banner",
        element: <CreateNewBanner />,
      },
      {
        path: "/manage-all-banner",
        element: <ManageAllBanner />,
      },
      {
        path: "/manage-password",
        element: <ManagePassword />,
      },
      {
        path: "/manage-feedback",
        element: <ManageFeedback />,
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
