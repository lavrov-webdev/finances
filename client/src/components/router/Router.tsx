import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { BaseLayout } from "../baseLayout/index.ts";
import { AuthPage } from "../auth/index.ts";

import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { CategoriesPage } from "../categories/index.ts";

import { SprintsPage, AllSprintsPage, StartSprintPage, SprintPage, CurrentSprintPage } from "../sprints/index.ts";
import {
  AllTransactionsPage,
  CreateTransactionPage,
  TransactionsPage,
} from "../transactions/index.ts";

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
            element: <SprintPage/>,
            path: ":id"
          },
          {
            element: <StartSprintPage />,
            path: "new",
          },
          {
            element: <CurrentSprintPage/>,
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
