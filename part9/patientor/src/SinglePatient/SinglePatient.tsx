import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EntryDetails from './EntryDetails'
import { Entry, Patient, Diagnosis } from '../types';
import { updatePatient, useStateValue } from "../state";
import { Icon } from "semantic-ui-react";
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const genderIconProps = {
  male: { name: "mars" as "mars", color: "blue" as "blue" },
  female: { name: "venus" as "venus", color: "pink" as "pink" },
  other: { name: "genderless" as "genderless", color: "green" as "green" },
};

const SinglePatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const patient = patients[id];

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(fetchedPatient));
      } catch (error) {
        console.error(error.response.data);
        setError(error.response.data.error);
      }
    };
    if (!patient.ssn || !patient.entries) {
      fetchPatient();
      console.log("Patient fetched");
      console.log(patient)
    }
  }, [id, dispatch, patient.ssn]);

  if (!patient || !patient.entries) {
    return (
      <div>
        Could not find patient...
      </div>
    );
  }

  console.log(patient)

  return (
    <>
      <h2>{patient.name} <Icon {...genderIconProps[patient.gender]} /></h2>
      <p>
        ssn: {patient.ssn}
      </p>
      <p>
        occupation: {patient.occupation}
      </p>
      <p>
        date of birth: {patient.dateOfBirth}
      </p>
      <EntryDetails patient={patient} />
    </>
  );
};

export default SinglePatient;