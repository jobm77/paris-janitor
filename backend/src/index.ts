import express from 'express';
import { usersRouter, bookingsRouter, propertiesRouter, documentsRouter, feedbacksRouter, paymentsRouter, servicesRouter } from './routers';
const cors = require('cors');

const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8082;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
}));

app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);
app.use('/properties', propertiesRouter);
app.use('/documents', documentsRouter);
app.use('/feedbacks', feedbacksRouter);
app.use('/payments', paymentsRouter);
app.use('/services', servicesRouter);

app.listen(port, () => {
  console.log(`Port http://localhost:${port}`);
});