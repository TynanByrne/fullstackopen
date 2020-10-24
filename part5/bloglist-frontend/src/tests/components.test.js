import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from '../components/Blog'

const blog = {
  title: 'title',
  author: 'author',
  url: 'url',
  likes: 0,
  user: {
    username: "tunaalien",
    name: "Tynan Byrne",
    id: "5f90047131f024013b2a4abd"
  }
}
const user = {
  username: "tunaalien",
  name: "Tynan Byrne",
  id: "5f90047131f024013b2a4abd"
}

test('renders title and author by default but not likes or url', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )
  const div = component.container.querySelector('.blogCollapsed')
  expect(div).toHaveTextContent(
    'title'
  )
  expect(div).toBeDefined()
})

test('renders the url and likes when the view button is clicked', () => {

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogDetailed')
  expect(div).toBeDefined()
})

test('when the like button is clicked twice, the event handler is called twice', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} handleLike={mockHandler} />
  )
  const details = component.getByText('view')
  fireEvent.click(details)

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})