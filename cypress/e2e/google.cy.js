describe('Busqueda Google', () => {

  it('buscar pagina de `Facebook` en google', () => {
      //Visitamos la página 
      cy.visit('https://www.google.com')
      //Ingresamos el texto a consultar
      cy.get('input[name="q"]').type('Facebook{enter}')
      //Visualizamos el primer resultado
      cy.get('#search a')
      .invoke('attr', 'href')
      //Imprimimos en consola el resultado
      .then((href) => console.log(href))
  })

  it('Resultados Obtenidos', () => {
      //Tomamos el valor de resultados y tiempo traido por la pagina 
      cy.get('#result-stats')
      .invoke('clone')
      .then(($el) => {
      //Como viene con el tiempo, lo removemos
      $el.find('nobr').remove()
      //Imprimimos en consola solo la cantidad de resultados
      console.log($el.text().trim())
    })
  })

  it('tiempo de la busqueda', () => {
      //Tomamos el valor de resultados y tiempo traido por la pagina 
      cy.get('#result-stats')
      .children('nobr')
      //solo tomamos el tiempo de busqueda
      .invoke('text')
      //Imprimimos en consola el tiempo de busqueda
      .then((text) => console.log('Tiempo de la busqueda ' + text))
  })

  it('Buscar pagina sin resultados `adsadefefefx226522`', () => {
    //Visitamos nuevamente la pagina
    cy.visit('https://www.google.com')
    //Ingresamos un texto qué no arroje resultados
    cy.get('input[name="q"]').type('adsadefefefx226522{enter}')
    //Verificamos qué no tenga resultados
    cy.get('#result-stats').contains("Cerca de 0 resultados");

  })
})
