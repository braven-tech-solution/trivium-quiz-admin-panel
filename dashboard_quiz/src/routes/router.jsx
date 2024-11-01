import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";
import DashBoard from "../pages/DashBoard/DashBoard";
import ManagePassword from "../pages/ManagePassword/ManagePassword";
import ManageQuizQuestion from "../pages/ManageQuizQuestion/ManageQuizQuestion";
import ManageQuizLevel from "../pages/ManageQuizLevel/ManageQuizLevel";
import ManageQuizCategory from "../pages/ManageQuizCategory/ManageQuizCategory";
import UserHistory from "../pages/UserHistory/UserHistory";
import ManageLiveQuizQuestion from "../pages/ManageLiveQuizQuestion/ManageLiveQuizQuestion";

import AboutUs from "../pages/Setting/AboutUs/AboutUs";
import TermsAndCondition from "../pages/Setting/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "../pages/Setting/PrivacyPolicy/PrivacyPolicy";
import ChangePassword from "../pages/Setting/ChangePassword/ChangePassword";
import ManageLiveQuiz from "../pages/ManageLiveQuiz/ManageLiveQuiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
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
        path: "/manage-live-quiz",
        element: <ManageLiveQuiz />,
      },
      {
        path: "/manage-live-quiz-question",
        element: <ManageLiveQuizQuestion />,
      },
      {
        path: "/users-history",
        element: <UserHistory />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
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
