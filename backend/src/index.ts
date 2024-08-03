import express from 'express';

const app = express();

const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`Port http://localhost:${port}`);
});