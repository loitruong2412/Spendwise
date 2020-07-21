import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Spendwise</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/income" className="nav-link">Income</Link>
            </li>
            <li className="nav-item">
              <Link to="/expense" className="nav-link">Expense</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">Report</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}