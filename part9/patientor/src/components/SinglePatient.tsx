import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Patient } from '../types'
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";
import axios from 'axios'
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

  let patient = patients[id]

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "UPDATE_SINGLE_PATIENT", payload: fetchedPatient})
      } catch (error) {
        console.error(error.response.data)
        setError(error.response.data.error)
      }
    }
    if (!patient.ssn) {
      fetchPatient();
      console.log("Patient fetched");
    }
  }, [id, dispatch])
  

  console.log("We are here")

  if (!patient) {
    return (
      <div>
        Could not find patient...
      </div>
    )
  }

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
    </>
  )
}

export default SinglePatient