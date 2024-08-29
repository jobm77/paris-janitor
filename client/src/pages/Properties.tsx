import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './../styles/Properties.css';

// Stripe public key
const stripePromise = loadStripe('pk_test_51Pj4RIP5xGbYEsCfFsggJoonAtlybm0VVHuzX5NFmp7T0NwCgVDlMcSXJWd3oQV0g9dnlYiiLQH05wCaiTkfGRS600berydBPt');

interface Property {
  id: number;
  address: string;
  announcement: string;
  pricePerNight: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities?: string[];
  images?: string[];
}

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8082/properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  /*
  const handleBookNow = async (price: number) => {
    const stripe = await stripePromise;

    try {
      const response = await fetch('http://localhost:8082/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: price }),
      });

      const { id: sessionId } = await response.json();

      const { error } = await stripe!.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error in handleBookNow:', error);
    }
  };
  */
  return (
    <div className="properties-container">
      <div className="properties-list">
        {properties.map(property => (
          <div key={property.id} className="property-card">
            {property.images && property.images.length > 0 ? (
              <img src={property.images[0]} alt="Property" className="property-image" />
            ) : (
              <div className="property-image" style={{ backgroundColor: '#eee' }}>Image non disponible</div>
            )}
            <div className="property-info">
              <h2 className="property-title">{property.address}</h2>
              <p className="property-announcement">{property.announcement}</p>
              <p className="property-price">Prix par nuit: {property.pricePerNight} €</p>
              <p className="property-type">Type: {property.type}</p>
              <p className="property-details">
                {property.bedrooms} Chambre(s), {property.bathrooms} Salle(s) de bain, {property.area} m²
              </p>
              <div className="property-amenities">
                <strong>Équipements:</strong>
                {property.amenities && property.amenities.length > 0 ? (
                  <ul>
                    {property.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Aucun équipement listé</p>
                )}
              </div>
              
              <button
                className="property-button"
              >
                Réserver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
