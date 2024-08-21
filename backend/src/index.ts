import express from 'express';
import { usersRouter, bookingsRouter, propertiesRouter, documentsRouter, feedbacksRouter, paymentsRouter } from './routers';


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8082;

app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);
app.use('/properties', propertiesRouter);
app.use('/documents', documentsRouter);
app.use('/feedbacks', feedbacksRouter);
app.use('/payments', paymentsRouter);

app.listen(port, () => {
  console.log(`Port http://localhost:${port}`);
});