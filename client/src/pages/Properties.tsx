import React, { useEffect, useState } from 'react';
import '../styles/Properties.css';

interface Availability {
  date: string;
  available: boolean;
}

interface Property {
  id: number;
  address: string;
  announcement: string;
  pricePerNight: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  availabilityCalendar: Availability[];
  images?: string[];
}

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8082/properties')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  const handleReservation = async (propertyId: number) => {
    if (!selectedDate) {
      alert('Veuillez sélectionner une date.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8082/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId, date: selectedDate }),
      });

      if (response.ok) {
        alert('Réservation effectuée avec succès !');
      } else {
        alert('Erreur lors de la réservation.');
      }
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('Erreur lors de la réservation.');
    }
  };

  return (
    <div className="properties">
      <div className="properties-list">
        {properties.map(property => (
          <div key={property.id} className="property-item">
            <div className="property-content">
              {property.images && property.images.length > 0 && (
                <img src={property.images[0]} alt={property.address} className="property-image" />
              )}
              <h3>{property.address}</h3>
              <p>{property.announcement}</p>
              <p>Type: {property.type}</p>
              <p>Prix par nuit: {property.pricePerNight}€</p>
              <p>Chambres: {property.bedrooms}</p>
              <p>Salles de bain: {property.bathrooms}</p>
              <p>Superficie: {property.area} m²</p>
              
              <div className="availability">
                <h4>Disponibilités:</h4>
                <ul>
                  {property.availabilityCalendar.map(({ date, available }) => (
                    <li key={date} className={available ? 'available' : 'unavailable'}>
                      {new Date(date).toLocaleDateString('fr-FR')} - {available ? 'Disponible' : 'Non disponible'}
                      {available && (
                        <button onClick={() => { setSelectedPropertyId(property.id); setSelectedDate(date); }}>
                          Réserver
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="reservation">
              {selectedPropertyId === property.id && (
                <button
                  onClick={() => handleReservation(property.id)}
                  disabled={!selectedDate}
                >
                  Réserver pour {new Date(selectedDate).toLocaleDateString('fr-FR')}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
