import { Table, TableBody, TableContainer, TableRow, TableCell } from '@material-ui/core'
import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, compare, handleDelete, handleUpdate, user }) => {

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {blogs.sort(compare).map(blog =>
            <TableRow key={blog.id}>
              <TableCell>
                <Blog key={blog.id} blog={blog} user={user} handleDelete={handleDelete}
                  handleUpdate={handleUpdate} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>

    </TableContainer>
  )
}

export default BlogList