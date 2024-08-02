import Root from "./components/Root";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import BlogPosts from "./components/BlogPosts";
import Create from "./components/Create";
import Expenses, { loader as loaderExpenses } from "./components/Expenses";
import ExpensesCreate, { loader as loaderExpensesCreate, action as actionExpensesCreate } from "./components/ExpensesCreate";
import ExpensesCreateSuccess from "./components/ExpensesCreateSuccess";
import ExpensesSelect, { loader as loaderExpensesSelect } from "./components/ExpensesSelect";
import ExpensesEdit, { action as actionExpensesEdit } from "./components/ExpensesEdit";
import ExpensesDelete, { action as actionExpensesDelete } from "./components/ExpensesDelete";
// import RegularPayments, { loader as loaderRegularPayments } from "./components/RegularPayments";
// import RegularPaymentsCreate, { loader as loaderRegularPaymentsCreate, action as actionRegularPaymentsCreate } from "./components/RegularPaymentsCreate";
// import RegularPaymentsSelect, { loader as loaderRegularPaymentsSelect } from "./components/RegularPaymentsSelect";
// import RegularPaymentsEdit, { action as actionRegularPaymentsEdit } from "./components/RegularPaymentsEdit";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


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
        // {
        //   path:'regularpayments',
        //   element: <RegularPayments />,
        //   loader: loaderRegularPayments,
        //   errorElement: <ErrorPage />,
        // },
        // {
        //   path:'regularpayments/create',
        //   element: <RegularPaymentsCreate />,
        //   loader: loaderRegularPaymentsCreate,
        //   action: actionRegularPaymentsCreate,
        // },
        // {
        //   path: 'regularpayments/:regularpaymentId',
        //   element: <RegularPaymentsSelect />,
        //   loader: loaderRegularPaymentsSelect,
        //   errorElement: <ErrorPage />,
        // },
        // {
        //   path: 'regularpayments/:regularpaymentId/edit',
        //   element: <RegularPaymentsEdit />,
        //   loader: loaderRegularPaymentsSelect,
        //   action: actionRegularPaymentsEdit,
        //   errorElement: <ErrorPage />,
        // },
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
