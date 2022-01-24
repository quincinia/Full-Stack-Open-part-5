describe('Blog app', function () {
    // Exercise 5.17
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'quincinia',
            name: 'jacob gayban',
            password: 'secret'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('log in to application')
    })

    // Exercise 5.18
    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('[name="Username"]').type('quincinia')
            cy.get('[name="Password"]').type('secret')
            cy.get('button').click()

            cy.contains('blogs')
        })

        it('fails with wrong credentials', function () {
            cy.get('[name="Username"]').type('quincinia')
            cy.get('[name="Password"]').type('wrong')
            cy.get('button').click()

            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    // Exercise 5.19
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'quincinia', password: 'secret' })
        })

        it.only('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('[name="Title"]').type('Test blog')
            cy.get('[name="Author"]').type('jacob gayban')
            cy.get('[name="Url"]').type('http://localhost/bloglist')
            cy.get('button[type="submit"]').click()

            // Confirm the success message
            cy.get('.success').should('contain', 'a new blog Test blog by jacob gayban added')

            // Confirm the blog appears in the list
            cy.contains('Test blog jacob gayban')
        })
    })
})