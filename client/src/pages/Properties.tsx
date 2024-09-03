import React, { useEffect, useState } from 'react';
import '../styles/Properties.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

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

const stripePromise = loadStripe('pk_test_51Pj4RIP5xGbYEsCfFsggJoonAtlybm0VVHuzX5NFmp7T0NwCgVDlMcSXJWd3oQV0g9dnlYiiLQH05wCaiTkfGRS600berydBPt');

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8082/properties')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  const handleBooking = async (property: Property, date: string) => {
    setSelectedProperty(property);
    setSelectedDate(date);

    try {
      const response = await fetch('http://localhost:8082/payments/processPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property.id,
          amount: property.pricePerNight,
        }),
      });

      //const { url } = await response.json();

      //window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
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
                        <button onClick={() => handleBooking(property, date)}>
                          Réserver
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {selectedProperty?.id === property.id && (
              <div className="payment-section">
                <h3>Confirmation de réservation pour {selectedProperty.address}</h3>
                <Elements stripe={stripePromise}>
                  <CheckoutForm property={selectedProperty} date={selectedDate} />
                </Elements>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
