describe("User Authentication", function () {
  describe("Navigation App Bar", () => {
    it("should allow an admin role sign in and out", function () {
      const email = Cypress.env("adminEmail")

      const password = Cypress.env("adminPassword")

      cy.visit("/").get("#navSignInButton").click().get("input[name=email]").type(email).get("input[name=password]").type(`${password}{enter}`)

      // cy.url().should("include", "/profile")
      cy.location("pathname").should("eq", "/profile")
      cy.contains("Profile Page")

      cy.get("#navSignOutButton").click()

      cy.location("pathname").should("eq", "/")
      cy.contains("Home Page")
    })

    it("should allow a user role sign in and out", function () {
      const email = Cypress.env("userEmail")

      const password = Cypress.env("userPassword")

      cy.visit("/").get("#navSignInButton").click().get("input[name=email]").type(email).get("input[name=password]").type(`${password}{enter}`)

      cy.location("pathname").should("eq", "/profile")
      cy.contains("Profile Page")

      cy.get("#navSignOutButton").click()

      cy.location("pathname").should("eq", "/")
      cy.contains("Home Page")
    })
  })

  describe("Navigation Swipable Drawer", () => {
    it("should allow an admin role sign in and out", function () {
      const email = Cypress.env("adminEmail")

      const password = Cypress.env("adminPassword")

      cy.visit("/")
        .get("#appBarMenuIcon")
        .click()
        .get("#leftDrawerSignIn")
        .click()
        .get("input[name=email]")
        .type(email)
        .get("input[name=password]")
        .type(`${password}{enter}`)

      // cy.url().should("include", "/profile")
      cy.location("pathname").should("eq", "/profile")
      cy.contains("Profile Page")

      cy.get("#navSignOutButton").click()

      cy.location("pathname").should("eq", "/")
      cy.contains("Home Page")
    })
  })
})
