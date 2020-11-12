import express from 'express';
import patientsService from '../services/patientsService';
import { SsnLessPatient } from '../types';
import toNewPatient from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: SsnLessPatient[] = patientsService.getNonSensitivePatients();
  return res.json(patients);
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientsService.addPatient(newPatient);
  res.json(addedPatient)
})

export default router