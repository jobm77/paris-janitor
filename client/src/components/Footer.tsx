// src/components/Footer.tsx
import React from 'react';
import './../styles/Footer.css'; // Assurez-vous que le CSS est correct

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Paris-Janitor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
