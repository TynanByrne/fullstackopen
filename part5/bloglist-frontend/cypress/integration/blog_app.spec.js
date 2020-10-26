describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Super Superuser',
      username: 'root',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Super Superuser logged in')
      cy.contains('Logged in as root')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('tree')
      cy.get('#password').type('notpassword')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password').should('have.css', 'background-color', 'rgb(255, 0, 0)')
    })
  })
  describe.only('When logged in', function () {
    beforeEach(function () {
      const user = {
        username: 'root', password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/login', user).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      })
      cy.visit('http://localhost:3000')
    })
    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('New blog')
      cy.get('#author').type('Author')
      cy.get('#url').type('www.url.com')
      cy.get('#submit').click()
      cy.contains('New blog Author')
    })
    it('A blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('New blog')
      cy.get('#author').type('Author')
      cy.get('#url').type('www.url.com')
      cy.get('#submit').click()
      cy.contains('New blog Author')
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('Liked!').should('have.css', 'background-color', 'rgb(0, 128, 0)')
    })
    it('The user that created the blog can delete it', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('New blog')
      cy.get('#author').type('Author')
      cy.get('#url').type('www.url.com')
      cy.get('#submit').click()
      cy.contains('New blog Author')
      cy.get('#view').click()
      cy.get('#delete').click()
      cy.contains('Blog successfully deleted')
    })
    it('The blogs are ordered according to likes with the blog with the most likes being first', function () {
      cy.addBlog({
        title: "1", author: "Author1", url: "www.order.com", likes: 1
      })
      cy.addBlog({
        title: "2", author: "Author2", url: "www.order.com", likes: 595959
      })
      cy.addBlog({
        title: "3", author: "Author3", url: "www.order.com", likes: 49
      })
      cy.addBlog({
        title: "4", author: "Author4", url: "www.order.com"
      })
      cy.visit('http://localhost:3000')
      cy.contains('view').click()
      cy.contains('view').click()
      cy.contains('view').click()
      cy.contains('view').click()
      cy.get('.blogDetailed').then(blogs => {
        console.log(blogs)
        let previous = Number.MAX_SAFE_INTEGER
        for (let i = 0; i < blogs.length; i++) {
          cy.wrap(blogs[i])
            .find("#likes")
            .then((x) => {
              const likes = parseInt(x[0].innerText)
              console.log(x[0].innerText)
              cy.log(likes)
              expect(previous).to.be.greaterThan(likes)
              previous = likes
            });
        }
      })
    })
  })
})