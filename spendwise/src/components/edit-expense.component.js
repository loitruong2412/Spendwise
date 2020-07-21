import React, { Component } from 'react';
import axios from 'axios';

export default class EditExpense extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      type: '',
      types: ['Education', 'Entertainment', 'Food', 'Miscellaneous', 'Personal', 'Transportation'],
      month: '',
      year: 0,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      years: [2020, 2021, 2022]
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/expenses/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          title: res.data.title,
          type: res.data.type,
          month: res.data.month,
          year: res.data.year
        })
      })
      .catch((err) => {
        console.log(err);
      }) 

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }

  onChangeMonth(e) {
    this.setState({
      month: e.target.value
    });
  }

  onChangeYear(e) {
    this.setState({
      year: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const expense = {
      title: this.state.title,
      type: this.state.type,
      month: this.state.month,
      year: this.state.year,
    }

    console.log(expense);

    axios.post('http://localhost:5000/expenses/update/'+this.props.match.params.id, expense)
      .then(res => console.log(res.data));

    window.location = '/expense';
  }

  render() {
    return (
      <div>
        <h3>Edit Expense Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Type: </label>
            <select ref="typeInput"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}>
              {
                this.state.types.map(type => {
                  return <option
                    key={type}
                    value={type}>{type}
                    </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Month: </label>
            <select ref="monthInput"
              required
              className="form-control"
              value={this.state.month}
              onChange={this.onChangeMonth}>
              {
                this.state.months.map(month => {
                  return <option
                    key={month}
                    value={month}>{month}
                    </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Year: </label>
            <select ref="yearInput"
              required
              className="form-control"
              value={this.state.year}
              onChange={this.onChangeYear}>
              {
                this.state.years.map(year => {
                  return <option
                    key={year}
                    value={year}>{year}
                    </option>;
                })
              }
            </select>
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Expense" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}