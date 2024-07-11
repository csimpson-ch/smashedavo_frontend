import Index from "./components/Index";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import BlogPosts from "./components/BlogPosts";
import Create from "./components/Create";
import CreateExpenseAdhoc from "./components/CreateExpenseAdhoc";
import ExpenseUpdate from "./components/ExpenseUpdate";
import Expenses from "./components/Expenses";
import RegularPayments from "./components/RegularPayments";
import BackendLoader from "./components/BackendAPI";
import { Route, useRouteError, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {

  const urlBackend = 'http://127.0.0.1:8000/backend/';
  const urlExpenses = urlBackend + 'expenses/';
  const urlExpenseCreate = urlBackend + 'expense/create/';
  const urlExpenseUpdate = urlBackend + 'expense/update/';
  const urlExpenseCategoryChoices = urlBackend + 'expense_category_choices/';
  const urlRegularPayments = urlBackend + 'regularpayments/';

  const ErrorBoundary = () => {
    let error = useRouteError();
    console.error(error);
    // Uncaught ReferenceError: path is not defined
    return <div>Error in fetch from backend!</div>;
  }


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          path:'expenses',
          element: <Expenses />,
          loader: () => BackendLoader(urlExpenses),
        },
        {
          path:'regularpayments',
          element: <RegularPayments />,
          loader: () => BackendLoader(urlRegularPayments),
          errorElement: <ErrorBoundary />,
        }

      ]
    },
  ])

    // createRoutesFromElements(
    //   <Route path="/" element={<Navbar />}>
    //     <Route index element={<Index />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/logout" element={<Logout />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/blog" element={<BlogPosts />} />
    //     <Route path="/create" element={<Create />}/>
    //     <Route
    //       path="/expenses"
    //       element={<Expenses/>}
    //       loader={backendLoader urlAPI={urlExpenses}}
    //     />
    //     <Route path="/expenses/create" element={<CreateExpenseAdhoc urlExpenseCreate={urlExpenseCreate} urlExpenseCategoryChoices={urlExpenseCategoryChoices} />}/>
    //     <Route path="/expenses/:expenseId/edit" element={<ExpenseUpdate urlExpenseUpdate={urlExpenseUpdate} urlExpenseCategoryChoices={urlExpenseCategoryChoices} />}/>
    //     <Route path="/regularpayments" element={<RegularPayments urlAPI={urlRegularPayments} />} />
    //     <Route path="*" element={<p>There's nothing here: 404!</p>} />
    //   </Route>
    // )
  

  return (
    <RouterProvider router={router} />
  );
}

export default App;
