describe('Blog app', function () {
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
})
