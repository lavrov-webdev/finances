import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { BaseLayout } from "../baseLayout/index.ts";
import { AuthPage } from "../auth/pages/index.ts";

import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { CategoriesPage } from "../categories/pages/index.ts";

import { SprintsPage, AllSprintsPage, SprintPage, CurrentSprintPage, StartSprintPage } from "../sprints/pages/index.ts";
import {
  AllTransactionsPage,
  CreateTransactionPage,
  TransactionsPage,
} from "../transactions/pages/index.ts";

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
            element: <SprintPage />,
            path: ":id"
          },
          {
            element: <StartSprintPage />,
            path: "new",
          },
          {
            element: <CurrentSprintPage />,
            path: "current"
          }
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
