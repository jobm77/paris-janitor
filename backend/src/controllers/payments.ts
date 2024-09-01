import { Request, Response } from 'express';
import stripe from 'stripe';
import { Payment } from '../models';

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

/*const createCheckoutSession = async (req: Request, res: Response) => {
  const { amount } = req.body;

  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Property Reservation',
            },
            unit_amount: amount * 100, // Convertir le montant en cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating checkout session', error);
      res.status(500).json({ message: 'Error creating checkout session' });
    } else {
      console.error('Unknown error occurred', error);
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
*/

const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    if (typeof sig !== 'string') {
      throw new Error('Stripe signature header is not a string');
    }

    event = stripeClient.webhooks.constructEvent(req.body as string, sig, endpointSecret);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Webhook error:', error);
      return res.status(400).send(`Webhook Error: ${(error as Error).message}`);
    } else {
      console.error('Unknown error occurred', error);
      return res.status(400).send('Webhook Error: Unknown error occurred');
    }
  }

  if (event.type === 'payment_intent.succeeded' || event.type === 'payment_intent.payment_failed' || event.type === 'payment_intent.processing') {
    const paymentIntent = event.data.object as stripe.PaymentIntent;
    const status = paymentIntent.status as 'succeeded' | 'failed' | 'processing';

    try {
      await Payment.update(
        { status },
        { where: { stripe_payment_intent_id: paymentIntent.id } }
      );
      console.log(`Payment status updated to ${status}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating payment status:', error);
        return res.status(500).json({ message: 'Error updating payment status' });
      } else {
        console.error('Unknown error occurred', error);
        return res.status(500).json({ message: 'Error updating payment status' });
      }
    }
  }

  res.status(200).end();
};
    
const processPayment = async (req: Request, res: Response) => {
  const { userId, amount, paymentMethod } = req.body;
  
  if (!userId || !amount || !paymentMethod) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount * 100, // convert to cents
      currency: 'usd',
      payment_method: paymentMethod,
      confirm: true // confirm the payment immediately
    });

    const paymentRecord = await Payment.create({ 
      userId, 
      stripe_payment_intent_id: paymentIntent.id, 
      stripe_customer_id: paymentIntent.customer as string, 
      amount, 
      paymentDate: new Date(), 
      paymentMethod, 
      status: paymentIntent.status as 'pending' | 'completed' | 'failed' 
    });
    return res.status(201).json(paymentRecord);
  } catch (error) {
    console.error('Error while processing payment', error);
    return res.status(500).json({ message: 'Error while processing payment' });
  }
};


const createPayment = async (req: Request, res: Response) => {
  try {
    const { userId, stripe_payment_intent_id, stripe_customer_id, amount, paymentDate, paymentMethod, status } = req.body;
    const newPayment = await Payment.create({ userId, stripe_payment_intent_id, stripe_customer_id, amount, paymentDate, paymentMethod, status });
    return res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error in the creation of the payment', error);
    return res.status(500).json({ message: 'Error while creating payment' });
  }
}

const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll();
    return res.status(200).json(payments);
  } catch (error) {
    console.error('Error while getting all payments', error);
    return res.status(500).json({ message: 'Error while getting all payments' });
  }
}

const getPaymentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    return res.status(200).json(payment);
  } catch (error) {
    console.error('Error while getting payment by id', error);
    return res.status(500).json({ message: 'Error while getting payment by id' });
  }
}

const updatePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, stripe_payment_intent_id, stripe_customer_id, amount, paymentDate, paymentMethod, status } = req.body;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    payment.userId = userId || payment.userId;
    payment.stripe_payment_intent_id = stripe_payment_intent_id || payment.stripe_payment_intent_id;
    payment.stripe_customer_id = stripe_customer_id || payment.stripe_customer_id;
    payment.amount = amount || payment.amount;
    payment.paymentDate = paymentDate || payment.paymentDate;
    payment.paymentMethod = paymentMethod || payment.paymentMethod;
    payment.status = status || payment.status;
    await payment.save();
    return res.status(200).json(payment);
  } catch (error) {
    console.error('Error while updating payment', error);
    return res.status(500).json({ message: 'Error while updating payment' });
  }
}

const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    await payment.destroy();
    return res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error while deleting payment', error);
    return res.status(500).json({ message: 'Error while deleting payment' });
  }
};

export {
  //createCheckoutSession,
  handleWebhook,
  processPayment,
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
};