import React from 'react'
import { Card,  Icon, List } from 'semantic-ui-react'
import { OccupationalHealthCareEntry as OccHealth } from '../types'
import Diagnoses from './Diagnoses'

const OccHealthEntry: React.FC<{ entry: OccHealth }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="user md" color='blue' /> {entry.employerName}
        </Card.Header>
        <Card.Description>
          {entry.description}
        </Card.Description>
        {entry.diagnosisCodes ? <Diagnoses diagnosesCodes={entry.diagnosisCodes} /> : null} 
      </Card.Content>
      <Card.Content extra>
        <List>
          <List.Item>
            <List.Header>Sick leave:</List.Header>
            {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  )
}

export default OccHealthEntry