import patients from '../data/patients';
import { Patient, ssnLessPatient } from '../types';

const getNonSensitivePatients = (): ssnLessPatient[] => {
   return patients.map(({ name, id, gender, occupation, dateOfBirth }) => ({
    name,
    id,
    gender,
    occupation,
    dateOfBirth
  }));
};

const getPatients = (): Patient[] => {
 return patients;
};

export default {
  getNonSensitivePatients,
  getPatients
};
