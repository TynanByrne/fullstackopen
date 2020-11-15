import e from 'express';
import express from 'express';
import patientsService from '../services/patientsService';
import { SsnLessPatient, Patient } from '../types';
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

router.get('/:id', (req, res) => {
  const patient: Patient | undefined = patientsService.getSinglePatient(req.params.id)
  return res.json(patient)
})

router.post('/:id/entries', (req, res) => {
  const patient: Patient | undefined = patientsService.getSinglePatient(req.params.id)
  if (patient) {
    try {
      const newEntry = req.body
      const updatedPatient = patientsService.addEntry(patient, newEntry)
      return res.json(updatedPatient)
    } catch (error) {
      res.status(400).send({ error: e.message })
    }
  } else {
    res.status(404).json({ error: 'Patient could not be found' })
  }
})

export default router