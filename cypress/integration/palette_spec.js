describe('Generar paleta existoso', function() {
    it('Generates a new palette', function() {
      cy.visit('https://jasilva11.github.io/taller6-page-miso4208/')
      cy.screenshot('test 1.1')
      cy.contains('Generar nueva paleta').click()
      cy.screenshot('test 1.2')
    })
})
describe('Limpiar paleta existoso', function() {
    it('Clears the palette', function() {
      cy.visit('https://jasilva11.github.io/taller6-page-miso4208/')
      cy.contains('Generar nueva paleta').click()
      cy.screenshot('test 2.1')
      cy.contains('Limpiar paleta').click()
      cy.screenshot('test 2.2')
    })
})