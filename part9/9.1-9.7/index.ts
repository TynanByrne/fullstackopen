import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator'
const app = express();

app.use(express.json());


app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, mass } = req.query;

  if (!height || !mass) {
    return res.status(400).json({ error: 'Parameters are missing.'});
  }

  if (isNaN(Number(height)) || isNaN(Number(mass))) {
    return res.status(400).json({ error: 'Bad user request.' });
  }

  const bmi = bmiCalculator(Number(height), Number(mass));

  return res.json({ height, mass, bmi });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, targetHours } = req.body
  if (!daily_exercises || !targetHours) {
    return res.json({ error: 'Parameters missing.' });
  }
  const checker = (x: any) : boolean => isNaN(Number(x))
  if (isNaN(targetHours) || daily_exercises.some(checker) || !Array.isArray(daily_exercises)) {
    return res.json({ error: 'Malformatted parameters.'})
  }

  const response = exerciseCalculator(Number(targetHours), daily_exercises.map((x: number) => Number(x)));

  return res.json(response);
})

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});