import diagnoses from '../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const addEntry = (): null => {
  return null;
};

export default {
  getDiagnoses,
  addEntry
};