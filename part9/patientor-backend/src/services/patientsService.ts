
import patients from '../data/patients';
import { Patient, SsnLessPatient, NewPatient, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid'

let storedPatients = [...patients]

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

const getSinglePatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id)
  return patient
}

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry)
  return newPatientEntry
}

const addEntry = (patient: Patient, entry: Entry): Patient | undefined => {
  const newEntry: Entry = { ...entry, id: uuidv4() }
  const savedPatient: Patient = { ...patient, entries: patient.entries.concat(newEntry) }
  storedPatients = storedPatients.map(p => 
    p.id === savedPatient.id ? savedPatient : p
  );
  return savedPatient;
}

export default {
  getNonSensitivePatients,
  getPatients,
  addPatient,
  getSinglePatient,
  addEntry
};
