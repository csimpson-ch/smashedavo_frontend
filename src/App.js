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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {

  const urlBackend = 'http://127.0.0.1:8000/backend/';
  const urlExpenseCreate = urlBackend + 'expense/create/';
  const urlExpenseUpdate = urlBackend + 'expense/update/';
  const urlExpenseCategoryChoices = urlBackend + 'expense_category_choices/';
  const urlExpenses = urlBackend + 'expenses/';
  const urlRegularPayments = urlBackend + 'regularpayments/';


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<BlogPosts />} />
          <Route path="/create" element={<Create />}/>
          <Route path="/expenses" element={<Expenses urlAPI={urlExpenses} />}/>
          <Route path="/expenses/create" element={<CreateExpenseAdhoc urlExpenseCreate={urlExpenseCreate} urlExpenseCategoryChoices={urlExpenseCategoryChoices} />}/>
          <Route path="/expenses/:expenseId/edit" element={<ExpenseUpdate urlExpenseUpdate={urlExpenseUpdate} urlExpenseCategoryChoices={urlExpenseCategoryChoices} />}/>
          <Route path="/regularpayments" element={<RegularPayments urlAPI={urlRegularPayments} />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
