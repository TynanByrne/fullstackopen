import diagnoses from '../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const addEntry = (): null => {
  return null;
};

export default {
  getDiagnoses,
  addEntry
};