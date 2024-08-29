import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/ServicesCatalog.css";

function ServicesCatalog() {
  return (
    <div className="ServicesCatalog">
      <header className="ServicesCatalog-header">
        <p>
          Services Catalog
        </p>
        <Link to="/">Home</Link>
      </header>
    </div>
  );
}

export default ServicesCatalog;