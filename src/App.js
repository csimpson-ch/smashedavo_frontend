import Index from "./components/Index";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import BlogPosts from "./components/BlogPosts";
import Create from "./components/Create";
import CreateExpense from "./components/CreateExpense";
import Expenses from "./components/Expenses";
import RegularPayments from "./components/RegularPayments";
import { Routes, Route } from "react-router-dom";


function App() {

  const urlBackend = 'http://127.0.0.1:8000/backend/';
  const urlExpenseCreate = urlBackend + 'expense/create/';
  const urlExpenseCategoryChoices = urlBackend + 'expense_category_choices/';
  const urlExpenses = urlBackend + 'expenses/';
  const urlRegularPayments = urlBackend + 'regularpayments/';

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blog" element={<BlogPosts />} />
      <Route path="/create" element={<Create />} />
      <Route path="/create/expense" element={
        <CreateExpense
          urlExpenseCreate={urlExpenseCreate}
          urlExpenseCategoryChoices={urlExpenseCategoryChoices}
          urlRegularPayments={urlRegularPayments}
        />
      } />
      <Route path="/expenses" element={<Expenses urlAPI={urlExpenses} />} />
      <Route path="/regularpayments" element={<RegularPayments urlAPI={urlRegularPayments} />} />
    </Routes>
  );
}

export default App;
