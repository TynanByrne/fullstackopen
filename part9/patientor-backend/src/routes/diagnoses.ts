import express from 'express';
import diagnosesService from '../../services/diagnosesService'
import { Diagnose } from '../../types';

const router = express.Router();

router.get('/', async (_req, res) => {
  const diagnoses: Diagnose[] = diagnosesService.getEntries()
  res.json(diagnoses)
})

export default router