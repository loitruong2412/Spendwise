import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Income = props => (
  <tr>
    <td>{props.income.title}</td>
    <td>{props.income.type}</td>
    <td>{props.income.amount}</td>
    <td>{props.income.month}</td>
    <td>{props.income.year}</td>
    <td>
      <Link to={"/editincome/"+props.income._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteIncome(props.income._id) }}>Delete</a>
    </td>
  </tr>
);

export default class IncomeList extends Component {
  constructor(props) {
    super(props);

    this.deleteIncome = this.deleteIncome.bind(this);
    
    this.state = {incomes: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/incomes/')
      .then(res => {
        this.setState({ incomes: res.data})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteIncome(id) {
    axios.delete('http://localhost:5000/incomes/'+id)
      .then(res => console.log(res.data));

    this.setState({
      incomes: this.state.incomes.filter(income => income._id !== id)
    });
  }

  incomeList() {
    return this.state.incomes.map(currentIncome => {
      return <Income income={currentIncome} deleteIncome={this.deleteIncome} key={currentIncome._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>My Income</h3>
        <div style={{marginBottom: "10px"}}>
          <Link to={"/addincome"}><button type="button" class="btn btn-success">Add Income</button></Link>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Month</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.incomeList() }
          </tbody>
        </table>
      </div>
    )
  }
}