import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/FinancialSummary.css"

function FinancialSummary() {
  return (
    <div className="FinancialSummary">
      <header className="FinancialSummary-header">
        <h1>Financial Summary</h1>
      </header>
      <div className="FinancialSummary-body">
        <p>Financial Summary page body content</p>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default FinancialSummary;