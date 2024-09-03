import React, { useEffect, useState } from 'react';
import '../styles/FinancialSummary.css';

const FinancialSummary: React.FC = () => {
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinancialSummary = async () => {
      try {
        const response = await fetch('http://localhost:8082/payments');
        if (response.ok) {
          const data = await response.json();
          setTotalSpent(data.totalSpent);
        } else {
          setError('Erreur lors de la récupération des données financières.');
        }
      } catch (err) {
        console.error('Error fetching financial summary:', err);
        setError('Erreur lors de la récupération des données financières.');
      }
    };

    fetchFinancialSummary();
  }, []);

  return (
    <div className="financial-summary">
      <div className="summary-content">
        {error && <p className="error-message">{error}</p>}
        <p className="total-amount">
          <strong>Total Dépensé:</strong> {totalSpent.toFixed(2)}€
        </p>
      </div>
    </div>
  );
};

export default FinancialSummary;
