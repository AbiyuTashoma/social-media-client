import { login } from "../../../src/js/api/auth/login";

beforeEach(() => {
  cy.visit("../../../index.html");
});

describe("logsin and logout functionality", () => {
  it("logs in and logs out clients", () => {
    const userItem = "Student";
    const emailItem = "profile_name2@stud.noroff.no";
    const passwordItem = "theusualcode";

    cy.get('#registerForm [data-bs-target="#loginModal"]').click();
    cy.get("#loginModal input[type=email]").type(`${emailItem}`);
    cy.get("#loginModal input[type=password]").type(`${passwordItem}`);
    cy.get("#loginForm .btn").contains("Login").click();

    cy.get(".profile-name").should("have.text", `${userItem}`);
    cy.get(".profile-email").should("have.text", `${emailItem}`);

    cy.get(`.text-end .btn`).contains("Logout").click();

    cy.get('#registerForm [data-bs-target="#loginModal"]').contains("Login");
    cy.contains(`${userItem}`).should("not.exist");
    cy.contains(`${emailItem}`).should("not.exist");
  });
});
