import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Booking {
  id: number;
  propertyId: number;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  property: {
    address: string;
    announcement: string;
  };
}

const ManageAccount: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      fetch(`http://localhost:8082/users/${userId}/bookings`)
        .then(response => response.json())
        .then(data => setBookings(data))
        .catch(err => {
          console.error('Error fetching bookings:', err);
          setError('Erreur lors de la récupération des réservations');
        });
    } else {
      setError('Utilisateur non connecté');
    }
  }, [navigate]);

  const handleCancel = (bookingId: number) => {
    // Fonction pour annuler la réservation
    fetch(`http://localhost:8082/bookings/${bookingId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      } else {
        setError('Erreur lors de l\'annulation de la réservation');
      }
    })
    .catch(err => {
      console.error('Error canceling booking:', err);
      setError('Erreur lors de l\'annulation de la réservation');
    });
  };

  return (
    <div className="manage-account">
      <h2>Mes Réservations</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {bookings.map(booking => (
          <li key={booking.id} className="booking-item">
            <h3>Réservation #{booking.id}</h3>
            <p><strong>Propriété :</strong> {booking.property.address}</p>
            <p><strong>Annonce :</strong> {booking.property.announcement}</p>
            <p><strong>Date de début :</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
            <p><strong>Date de fin :</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
            <p><strong>Statut :</strong> {booking.status}</p>
            {booking.status === 'pending' && (
              <button onClick={() => handleCancel(booking.id)} className="cancel-button">Annuler</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAccount;
