import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component.js";
import IncomeList from "./components/income-list.component";
import ExpenseList from "./components/expense-list.component";
import AddIncome from "./components/add-income.component";
import AddExpense from "./components/add-expense.component";
import EditIncome from "./components/edit-income.component";
import EditExpense from "./components/edit-expense.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={IncomeList} />
        <Route path="/income" component={IncomeList} />
        <Route path="/editincome/:id" component={EditIncome} />
        <Route path="/expense" component={ExpenseList} />
        <Route path="/editexpense/:id" component={EditExpense} />
        <Route path="/addincome" component={AddIncome} />
        <Route path="/addexpense" component={AddExpense} />
      </div>
    </Router>
  );
}

export default App;
