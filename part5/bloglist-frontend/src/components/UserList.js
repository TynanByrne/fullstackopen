import { Link, Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const UserList = ({ users }) => {
  return (
    <>
      <TableContainer>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs created</TableCell>
              </TableRow> 
            </TableHead>
            <TableBody>
            {users.sort((a, b) => a.blogs.length > b.blogs.length).map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link component={RouterLink} to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserList