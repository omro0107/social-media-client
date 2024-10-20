describe("Social Media Client Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/index.html");
  });

  it("User can log in with valid credentials", () => {
    cy.get('[data-bs-target="#loginModal"]').first().click();
    cy.get("#loginEmail").type("valid-student@stud.noroff.no");
    cy.get("#loginPassword").type("validPassword123");
    cy.get("#loginForm").submit();
    cy.get('[data-auth="logout"]').should("be.visible");
    cy.get('[data-visible="loggedIn"]').should("be.visible");
  });

  it("User cannot login with invalid credentials", () => {
    cy.get('[data-bs-target="#loginModal"]').eq(1).click();
    cy.get("#loginEmail").type("invalid-email@example.com");
    cy.get("#loginPassword").type("invalidPassword");
    cy.get("#loginForm").submit();
    cy.get(".alert-danger").should("be.visible");
    cy.get(".alert-danger").should(
      "contain",
      "Only Noroff student or teacher emails are valid.",
    );
  });

  it("User can log out with the logout button", () => {
    // First, log in
    cy.get('[data-bs-target="#loginModal"]').last().click();
    cy.get("#loginEmail").type("valid-student@stud.noroff.no");
    cy.get("#loginPassword").type("validPassword123");
    cy.get("#loginForm").submit();

    // Then log out
    cy.get('[data-auth="logout"]').click();
    cy.get('[data-visible="loggedOut"]').should("be.visible");
  });
});
