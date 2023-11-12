/// <reference types="Cypress" />

import { login } from "../../src/js/api/auth/login";

beforeEach(() => {
  cy.visit("../../index.html");
});

describe("user cannot login with invalid credentials", () => {
  const invalidEmail = "profile@stud.no";
  const invalidPassword = "psword";
  const validEmail = "profile_name2@stud.noroff.no";
  const validPassword = "theusualcode";

  it("denies clients with invalid login credential", () => {
    cy.get('#registerForm [data-bs-target="#loginModal"]').click();

    cy.get("#loginModal input[type=email]").type(`${invalidEmail}`);
    cy.get("#loginModal input[type=password]").type(`${invalidPassword}`);
    cy.get("#loginForm .btn").contains("Login").click();
    cy.contains(`${invalidEmail}`).should("not.exist");

    cy.get("#loginModal input[type=email]").clear();
    cy.get("#loginModal input[type=email]").type(`${validEmail}`);

    cy.get("#loginModal input[type=password]").clear();
    cy.get("#loginModal input[type=password]").type(`${validPassword}`);
    cy.get("#loginForm .btn").contains("Login").click();

    cy.get(".profile-name").should("exist");
    cy.get(".profile-email").should("have.text", `${validEmail}`);

    cy.get(`.text-end .btn`).contains("Logout").click();
  });
});
