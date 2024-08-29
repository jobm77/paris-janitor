import React from 'react';
import '../styles/Home.css'; // Assurez-vous que le chemin du CSS est correct

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to MyAirbnb</h2>
        <p>Manage your properties, bookings, and much more.</p>
      </section>

      {/* Grid Section */}
      <section className="grid">
        <div className="grid-item">
          <h3>Manage Your Properties</h3>
          <p>Create, modify, and track your property listings with ease.</p>
        </div>
        <div className="grid-item">
          <h3>Manage Your Calendar</h3>
          <p>View and manage bookings, block dates, and more.</p>
        </div>
        <div className="grid-item">
          <h3>Financial Summary</h3>
          <p>Access subscription payments and non-rental fees.</p>
        </div>
        <div className="grid-item">
          <h3>Services Catalog</h3>
          <p>Explore and manage additional services offered.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
