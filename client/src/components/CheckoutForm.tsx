import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  property: {
    id: number;
    address: string;
    pricePerNight: number;
  };
  date: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ property, date }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error(error);
        alert('Erreur lors du paiement');
      } else {
        console.log('Paiement réussi', paymentMethod);
        alert('Paiement réussi !');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Paiement pour {property.address}</h4>
      <p>Prix par nuit : {property.pricePerNight}€</p>
      <p>Date sélectionnée : {new Date(date).toLocaleDateString('fr-FR')}</p>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Payer
      </button>
    </form>
  );
};

export default CheckoutForm;
