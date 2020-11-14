import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { HealthCheckEntry as HealthCheck } from '../types'
import Diagnoses from './Diagnoses'

const healthCheckProps = {
  0: { color: 'teal' as 'teal' },
  1: { color: 'yellow' as 'yellow' },
  2: { color: 'orange' as 'orange' },
  3: { color: 'red' as 'red' }
}

const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name='stethoscope' color='blue' />
        </Card.Header>
        <Card.Description>
          {entry.description}
        </Card.Description>
        {entry.diagnosisCodes ? <Diagnoses diagnosesCodes={entry.diagnosisCodes} /> : null} 
        <Icon name='heart' {...healthCheckProps[entry.healthCheckRating]} />
      </Card.Content>
    </Card>
  )
}

export default HealthCheckEntry