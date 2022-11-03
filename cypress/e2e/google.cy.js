describe('Busqueda Google', () => {

  it('Validar el ingreso a la plataforma “https://www.google.com”', () => {
      //Visitamos la página 
      cy.visit('https://www.google.com')
      //Imprimimos en consola el ingreso correcto a la pagina
      console.log('Permite ingresar a la pagina')
  })

  it('Validar qué el sistema presente una barra de búsqueda', () => {
      //validamos qué la barra de busqueda sea visible
      cy.get('.gLFyf').should("be.visible")
      console.log('Se visualiza la barra de busqueda')
  })

  it('Validar qué el sistema permita ingresar datos en la barra de búsqueda', () => {
    //Ingresamos el texto a consultar
    cy.get('input[name="q"]').type('Facebook{enter}')
    //Visualizamos el primer resultado
    cy.get('#search a')
    .invoke('attr', 'href')
    //Imprimimos en consola el resultado
    .then((href) => console.log(href))
  })  

  it('Validar qué se visualice la cantidad de resultados obtenidos', () => {
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

  it('Validar qué se presente el tiempo qué tardo en realizar la búsqueda de resultados', () => {
      //Tomamos el valor de resultados y tiempo traido por la pagina 
      cy.get('#result-stats')
      .children('nobr')
      //solo tomamos el tiempo de busqueda
      .invoke('text')
      //Imprimimos en consola el tiempo de busqueda
      .then((text) => console.log('Tiempo de la busqueda ' + text))
  })

  it('Validar mensaje de error cuando no existen resultados', () => {
    //Visitamos nuevamente la pagina
    cy.visit('https://www.google.com')
    //Ingresamos un texto qué no arroje resultados
    cy.get('input[name="q"]').type('adsadefefefx226522{enter}')
    //Verificamos qué no tenga resultados
    cy.get('#result-stats').contains("Cerca de 0 resultados");
    console.log('no se obtienen resultados de busqueda')

  })
})
