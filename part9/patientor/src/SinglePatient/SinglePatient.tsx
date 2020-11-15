import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Entry, Patient } from '../types';
import { addEntry, updatePatient, useStateValue } from "../state";
import { Button, Icon } from "semantic-ui-react";
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import EntryDetails from './EntryDetails';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { isHealthCheckEntry, isHospitalEntry, isOccupationalHealthcareEntry } from '../utils';
import AddEntryModal from '../AddEntryModal/AddEntryModal';

const genderIconProps = {
  male: { name: "mars" as "mars", color: "blue" as "blue" },
  female: { name: "venus" as "venus", color: "pink" as "pink" },
  other: { name: "genderless" as "genderless", color: "green" as "green" },
};

const SinglePatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  /* const patient = patients[id]; */

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addEntry(fetchedPatient));
      } catch (error) {
        console.error(error.response.data);
        setError(error.response.data.error);
      }
    };
    if (!patient || patient?.id !== id) {
      fetchPatient();
      console.log("Patient fetched");
      console.log(patient)
    }
  }, [id, dispatch, patient]);

  if (!patient || !patient.entries) {
    return (
      <div>
        Could not find patient...
      </div>
    );
  }

  const defineEntryType = (values: EntryFormValues) => {
    let type = null;
    if (isHealthCheckEntry(values)) {
      type = "HealthCheck"
    } else if (isOccupationalHealthcareEntry(values)) {
      type = 'OccupationalHealthcare'
    } else if (isHospitalEntry(values)) {
      type = 'Hospital'
    }

    return type
  }

  const submitEntry = async (values: EntryFormValues) => {
    let entry;
    const type = defineEntryType(values);

    if (isOccupationalHealthcareEntry(values)) {
      if (
        values.sickLeave &&
        values.sickLeave.startDate !== "" &&
        values.sickLeave.endDate !== ""
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, sickLeave: undefined };
      }
    } else if (isHospitalEntry(values)) {
      if (
        values.discharge &&
        values.discharge.date !== "" &&
        values.discharge.criteria !== ""
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, discharge: undefined };
      }
    }

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      console.log("DISPATCHED!!!!")
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
      <h3>Entries</h3>
      {patient.entries.map((e: Entry) =>
        <EntryDetails key={e.id} entry={e} />
      )}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        onClose={closeModal}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </>
  );
};

export default SinglePatient;