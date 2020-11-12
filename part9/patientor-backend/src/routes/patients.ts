import express from 'express';
import patientsService from '../../services/patientsService';
import { ssnLessPatient } from '../../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: ssnLessPatient[] = patientsService.getNonSensitivePatients();
  return res.json(patients);
});

export default router