import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Expense = props => (
  <tr>
    <td>{props.expense.title}</td>
    <td>{props.expense.type}</td>
    <td>{props.expense.month}</td>
    <td>{props.expense.year}</td>
    <td>
      <Link to={"/editexpense/"+props.expense._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteExpense(props.expense._id) }}>Delete</a>
    </td>
  </tr>
);

export default class ExpenseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExpense = this.deleteExpense.bind(this);
    
    this.state = {expenses: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/expenses/')
      .then(res => {
        this.setState({ expenses: res.data})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteExpense(id) {
    axios.delete('http://localhost:5000/expenses/'+id)
      .then(res => console.log(res.data));

    this.setState({
      expenses: this.state.expenses.filter(expense => expense._id !== id)
    });
  }

  expenseList() {
    return this.state.expenses.map(currentExpense => {
      return <Expense expense={currentExpense} deleteExpense={this.deleteExpense} key={currentExpense._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>My Expense</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Month</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.expenseList() }
          </tbody>
        </table>
      </div>
    )
  }
}