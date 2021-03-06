import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_SINGLE_PATIENT";
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY'
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'UPDATE_SINGLE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload
          }
        }
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      }
    case 'ADD_ENTRY':
      return {
        ...state,
        patient: action.payload,
      }
    default:
      return state;
  }
};

export const updatePatient = (data: Patient): Action => {
  return { type: 'UPDATE_SINGLE_PATIENT', payload: data };
};

export const setAllPatients = (data: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: data };
};

export const addPatient = (data: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: data };
};

export const setDiagnosisList = (data: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSIS_LIST', payload: data };
};

export const addEntry = (data: Patient): Action => {
  return { type: "ADD_ENTRY", payload: data };
};