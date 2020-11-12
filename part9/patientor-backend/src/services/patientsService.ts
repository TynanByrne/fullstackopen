import patients from '../data/patients';
import { Patient, SsnLessPatient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid'

const getNonSensitivePatients = (): SsnLessPatient[] => {
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

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getNonSensitivePatients,
  getPatients,
  addPatient
};
