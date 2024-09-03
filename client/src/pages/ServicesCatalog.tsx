import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ServicesCatalog.css';

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  isBooked: boolean;
}

const ServicesCatalog: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //if (bookingId) {
      fetch(`http://localhost:8082/services`)
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
    //}
  //}, [bookingId]);
  }, []);


  const handleBooking = async (serviceId: number) => {
    const serviceToBook = services.find(service => service.id === serviceId);

    if (serviceToBook?.isBooked) {
      alert('Service déjà réservé');
      return;
    }
    
    try {
      //const response = await fetch(`http://localhost:8082/bookings/${bookingId}/services`, {
      const response = await fetch(`http://localhost:8082/services`, {
        //method: 'POST',
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceId, bookingId }),
      });

      if (response.ok) {
        alert('Service réservé !');  
        setServices(services.map(service => 
          service.id === serviceId ? { ...service, isBooked: true } : service
        ));
      } else {
        setError('Erreur lors de la réservation du service');
      }
    } catch(err) {
      console.error('Error reserving service:', err);
      setError('Erreur lors de la réservation du service');
    }
  }

  return (
    <div className="services-catalog">
      <h2>Services disponibles</h2>
      <ul className="services-list">
        {services.map(service => (
          <li key={service.id} className='service-item'>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Catégorie: {service.category}</p>
            <p>Prix: {service.price}€ </p>
            <button className="booking-button" onClick={() => handleBooking(service.id)} disabled={service.isBooked}>{service.isBooked ? 'Déjà réservé' : 'Réserver'}</button>
          </li>            
        ))}

      </ul>
    </div>
  )
}

export default ServicesCatalog;