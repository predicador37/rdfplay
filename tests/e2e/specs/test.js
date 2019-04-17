// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'home sanity test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#home-editor')
      .assert.containsText('h1', 'Editor de ontologías de la UNED')
      .assert.elementCount('a', 9)
      .end()
  },
  'activity sanity test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/activity')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#activity')
      .assert.containsText('p', 'Si lo deseas, puedes importar una actividad desde un archivo de texto en formato Markdown.')
      .assert.elementCount('input', 1)
      .end()
  },
  'vocabulary sanity test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/vocabulary')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#vocabulary')
      .assert.containsText('.headline', 'Precargar vocabularios')
      .assert.elementCount('input', 6)
      .end()
  },
  'import export sanity test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/import-export')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#import-export')
      .assert.containsText('.headline', 'Importar grafo')
      .assert.elementCount('button', 3)
      .end()
  },
  'model sanity test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/model')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#model')
      .assert.containsText('.v-tabs__item--active', 'CLASES')
      .assert.elementCount('a', 28)
      .end()
  },
  'population sanity test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/population')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#population')
      .assert.containsText('.headline', 'Poblamiento')
      .assert.elementCount('input', 3)
      .end()
  },
  'sparql sanity test': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/sparql')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#sparql')
      .assert.containsText('label', 'Usar Endpoint SPARQL remoto')
      .assert.elementCount('textarea', 1)
      .end()
  }
}
