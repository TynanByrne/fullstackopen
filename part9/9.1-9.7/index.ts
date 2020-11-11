import express from 'express';
import { bmiCalculator } from './bmiCalculator';
const app = express();

app.use(express.json())


app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  let { height, mass } = req.query

  if (!height || !mass) {
    return res.status(400).json({ error: 'Parameters are missing.'})
  }

  if (isNaN(Number(height)) || isNaN(Number(mass))) {
    return res.status(400).json({ error: 'Bad user request.' })
  }

  const bmi = bmiCalculator(Number(height), Number(mass));

  return res.json({ height, mass, bmi })
})

const PORT = 3005

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})