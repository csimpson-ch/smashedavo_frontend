import Root from "./components/Root";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import BlogPosts from "./components/BlogPosts";
import Create from "./components/Create";
import CreateExpenseAdhoc from "./components/CreateExpenseAdhoc";
import Expenses, { loader as loaderExpenses } from "./components/Expenses";
import ExpensesCreate, { loader as loaderExpensesCreate, action as actionExpensesCreate } from "./components/ExpensesCreate";
import ExpensesCreateSuccess from "./components/ExpensesCreateSuccess";
import ExpensesSelect, { loader as loaderExpensesSelect } from "./components/ExpensesSelect";
import ExpensesEdit, { action as actionExpensesEdit } from "./components/ExpensesEdit";
import ExpensesDelete, { action as actionExpensesDelete } from "./components/ExpensesDelete";
import ExpensesDeleteSuccess from "./components/ExpensesDeleteSuccess";
import RegularPayments, { loader as loaderRegularPayments } from "./components/RegularPayments";
import ErrorPage from "./components/ErrorPage";
import { Route, useRouteError, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'logout',
          element: <Logout />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'blog',
          element: <BlogPosts />,
        },
        {
          path: 'create',
          element: <Create />,
        },
        {
          path:'expenses',
          element: <Expenses />,
          loader: loaderExpenses,
        },
        {
          path:'expenses/create',
          element: <ExpensesCreate />,
          loader: loaderExpensesCreate,
          action: actionExpensesCreate,
        },
        {
          path:'expenses/create/success',
          element: <ExpensesCreateSuccess />,
        },
        {
          path: 'expenses/:expenseId',
          element: <ExpensesSelect />,
          loader: loaderExpensesSelect,
          errorElement: <ErrorPage />,
        },
        {
          path: 'expenses/:expenseId/edit',
          element: <ExpensesEdit />,
          loader: loaderExpensesSelect,
          action: actionExpensesEdit,
          errorElement: <ErrorPage />,
        },
        {
          path: 'expenses/:expenseId/delete',
          element: <ExpensesDelete />,
          loader: loaderExpensesSelect,
          action: actionExpensesDelete,
          errorElement: <ErrorPage />,
        },
        {
          path:'regularpayments',
          element: <RegularPayments />,
          loader: loaderRegularPayments,
          errorElement: <ErrorPage />,
        }

      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
