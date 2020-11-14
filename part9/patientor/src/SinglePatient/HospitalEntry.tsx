import React from 'react'
import { Card,  Icon, List } from 'semantic-ui-react'
import { HospitalEntry as Hospital } from '../types'
import Diagnoses from './Diagnoses'

const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital" color='blue' />
        </Card.Header>
        <Card.Description>
          {entry.description}
        </Card.Description>
        {entry.diagnosisCodes ? <Diagnoses diagnosesCodes={entry.diagnosisCodes} /> : null}    
      </Card.Content>
      <Card.Content extra>
        <List>
          <List.Item>
            <List.Header>Discharge date: {entry.discharge.date}</List.Header>
            {entry.discharge.criteria}
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  )
}

export default HospitalEntry