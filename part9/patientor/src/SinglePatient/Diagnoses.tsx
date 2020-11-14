import React from 'react'
import { List, ListContent, ListDescription, ListHeader, ListItem } from 'semantic-ui-react';
import { useStateValue } from '../state'

import { Diagnosis } from '../types'

interface DiagnosesDetailsProps {
  diagnosesCodes: Array<Diagnosis['code']>;
}

const Diagnoses: React.FC<DiagnosesDetailsProps> = ({ diagnosesCodes }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <List>
      <ListItem>
        <ListHeader>
          {diagnosesCodes.length > 1 ? "Diagnoses" : "Diagnosis"}
        </ListHeader>
      </ListItem>
      {diagnosesCodes.map(c => (
        <List.Item key={c}>
          <ListContent>
            <ListDescription>
              <b>{c}</b>
              {diagnoses[c] && diagnoses[c].name}
            </ListDescription>
          </ListContent>
        </List.Item>
      ))}
    </List>
  )
}

export default Diagnoses