describe("Login", () => {


    it("Valid Login", () => {

        const userCredentials = {
            "username": Cypress.env("username"),
            "password": Cypress.env("password")
        }

        // cy.request('POST', 'https://qa.dbs.rosia.one/api/v1/auth/login', userCredentials )

        cy.request({
            method: 'POST',
            url: Cypress.config().baseUrl + '/api/v1/auth/login',
            body: {
                "username": Cypress.env("username"),
                "password": Cypress.env("password")
            }
        })
            .then((res) => {
                //verifying if user is logged in
                expect(res.status).to.eq(200)
                cy.log(JSON.stringify(res))
                const token = res.body.data.access_token
                cy.log(token)

                cy.wrap(token).as('token')


            })


        cy.get('@token').then(token => {
            cy.request({
                method: 'POST',
                url: Cypress.config().baseUrl + '/api/v1/branch/list',
                headers: {
                    Authorization: 'Bearer' + ' ' + token
                }
            })
        }).then(res => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))

        })


        cy.get('@token').then(token => {
            cy.request({
                method: 'POST',
                url: Cypress.config().baseUrl + '/api/v1/branch/user-associate-list',
                headers: {
                    Authorization: 'Bearer' + ' ' + token
                }
            })
        }).then(res => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))

        })

        cy.get('@token').then(token => {
            cy.request({
                method: 'GET',
                url: Cypress.config().baseUrl + '/api/v1/company/find',
                headers: {
                    Authorization: 'Bearer' + ' ' + token
                }
            })
        }).then(res => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))

        })


        cy.get('@token').then(token => {
            cy.request({
                method: 'POST',
                url: Cypress.config().baseUrl + '/api/v1/business-unit/list',
                headers: {
                    Authorization: 'Bearer' + ' ' + token
                }
            })
        }).then(res => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))

        })


        cy.get('@token').then(token => {
            cy.request({
                method: 'POST',
                url: Cypress.config().baseUrl + '/api/v1/setting/list',
                headers: {
                    Authorization: 'Bearer' + ' ' + token
                }
            })
        }).then(res => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))

        })

        cy.get('@token').then(token => {
            cy.request({
                method: 'POST',
                url: Cypress.config().baseUrl + '/api/v1/transaction-type/list',
                headers: {
                    Authorization: 'Bearer' + ' ' + token
                }
            })
        }).then(res => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))

        })


        cy.get('@token').then(token => {
            cy.request({
                method: 'GET',
                url: Cypress.config().baseUrl + '/api/v1/fiscal-years/start-dates',
                headers: {
                    Authorization: 'Bearer' + ' ' + token
                }
            })
        }).then(res => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))

        })


        cy.get('@token').then(token => {
            cy.request({
                method: 'POST',
                url: Cypress.config().baseUrl + '/api/v1/transaction-type/list',
                headers: {
                    Authorization: 'Bearer' + ' ' + token
                }
            })
        }).then(res => {
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))

        })




    })
})