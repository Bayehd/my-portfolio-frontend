describe("Signup", () => {
  it("tests Signup", () => {
    cy.viewport(900, 856);
    cy.visit("http://localhost:5173/signup");
    cy.get("#firstname").click();
    cy.get("#firstname").type("T");
    cy.get("#firstname").type("Tom");
    cy.get("#lastname").click();
    cy.get("#lastname").type("D");
    cy.get("#lastname").type("Doe");
    cy.get("#email").click();
    cy.get("#email").type("1234@");
    cy.get("#email").type("1234@gmail.com");
    cy.get("#password").click();
    cy.get("#password").type("password12345");
    cy.get("main button").click();
  });
});
//# recorderSourceMap=BCBDBEBFBGAGBHBIBJAJBKBLBMAMBNBOBPB
