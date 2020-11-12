import { NewPatient, Gender } from './types'

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender)
  }
  return newPatient;
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name)
  }
  return name;
}

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn)
  }
  return ssn;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth ' + dateOfBirth)
  }
  return dateOfBirth;
}

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation)
  }
  return occupation;
}

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender ' + gender);
  }
  return gender;
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
}

export default toNewPatient