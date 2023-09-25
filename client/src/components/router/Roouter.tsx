import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { BaseLayout } from "../baseLayout";
import { AuthPage } from "../auth";

import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { CategoriesPage } from "../categories";

import { SprintsPage, AllSprintsPage, StartSprintPage } from "../sprints";
import {
  AllTransactionsPage,
  CreateTransactionPage,
  TransactionsPage,
} from "../transactions";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/sprints"} />,
      },
      {
        path: "/sprints",
        element: (
          <ProtectedRoute>
            <SprintsPage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AllSprintsPage />,
          },
          {
            element: <StartSprintPage />,
            path: "new",
          },
        ],
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/transactions",
        element: (
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AllTransactionsPage />,
          },
          {
            path: "create",
            element: <CreateTransactionPage />,
          },
        ],
      },
      {
        path: "/auth",
        children: [
          {
            path: "/auth",
            index: true,
            element: <Navigate to="/auth/signin" />,
          },
          {
            path: "/auth/:action",
            element: <AuthPage />,
          },
        ],
      },
    ],
  },
]);

export const RootRouter = () => <RouterProvider router={routes} />;
