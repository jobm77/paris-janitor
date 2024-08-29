import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/ManageAccount.css";

function ManageAccount() {
  return (
    <div className="ManageAccount">
      <header className="ManageAccount-header">
        <p>
          Manage Account
        </p>
        <Link to="/">Home</Link>
      </header>
    </div>
  );
}

export default ManageAccount;