import Vue from 'vue'
import Vuex from 'vuex'
import storeConfig from '../../../src/store/store-config'
import deepClone from 'lodash.clonedeep'
import DataFactory from 'rdf-ext'
import RdfConstructs from '../../../src/utils/RdfConstructs'
import consts from '../../../src/store/consts'
import getters from '../../../src/store/getters'

let baseUrl = consts.baseUrl
// TODO refactor all tests to n3 store (no more match)
describe('actions', () => {
  test('add triple to store', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let beforeSize = store.state.n3store.size
    // store.state.n3store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Pepito_Perez'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(baseUrl + 'Programador')))
    store.dispatch('addTriple', {subject: baseUrl + 'Pepito_Perez', predicate: RdfConstructs.rdf_type.value, object: baseUrl + 'Programador'})
    let afterSize = store.state.n3store.size
    let expected = beforeSize + 1
    let actual = afterSize
    expect(actual).toBe(expected)
  })

  test('delete triples matching subject and object', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let beforeSize = store.state.n3store.size
    store.dispatch('removeResource', baseUrl + 'Analista')
    let afterSize = store.state.n3store.size
    let expected = beforeSize - 7
    let actual = afterSize
    expect(actual).toBe(expected)
  })

  test('edit triple', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let actualOldValue = getters.getTriplesMatchingSubject(store.state)(baseUrl + 'Analista').length
    let expectedOldValue = 5
    let actualNewValue = getters.getTriplesMatchingSubject(store.state)(baseUrl + 'Analyst').length
    let expectedNewValue = 0
    expect(actualOldValue).toBe(expectedOldValue)
    expect(actualNewValue).toBe(expectedNewValue)
    store.dispatch('editResource', {oldResource: baseUrl + 'Analista', newResource: baseUrl + 'Analyst'})
    actualOldValue = getters.getTriplesMatchingSubject(store.state)(baseUrl + 'Analista').length
    expectedOldValue = 0
    actualNewValue = getters.getTriplesMatchingSubject(store.state)(baseUrl + 'Analyst').length
    expectedNewValue = 5
    expect(actualOldValue).toBe(expectedOldValue)
    expect(actualNewValue).toBe(expectedNewValue)
  })

  test('edit triples matching object', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let actualOldValue = getters.getTriplesMatchingObject(store.state)(baseUrl + 'Analista').length
    let expectedOldValue = 2
    let actualNewValue = getters.getTriplesMatchingObject(store.state)(baseUrl + 'Analyst').length
    let expectedNewValue = 0
    expect(actualOldValue).toBe(expectedOldValue)
    expect(actualNewValue).toBe(expectedNewValue)
    store.dispatch('editResource', {oldResource: baseUrl + 'Analista', newResource: baseUrl + 'Analyst'})
    actualOldValue = getters.getTriplesMatchingObject(store.state)(baseUrl + 'Analista').length
    expectedOldValue = 0
    actualNewValue = getters.getTriplesMatchingObject(store.state)(baseUrl + 'Analyst').length
    expectedNewValue = 2
    expect(actualOldValue).toBe(expectedOldValue)
    expect(actualNewValue).toBe(expectedNewValue)
  })
  test('edit class literal property', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let expectedOldComment = 'El Analista Informático desempeña un rol importante en el desarrollo de software según las metodologías tradicionales.'
    let expectedNewComment = 'prueba'

    getters.getObjectListByPredicateAndSubject(store.state)({'predicate': RdfConstructs.rdfs_comment.value, 'subject': baseUrl + 'Analista'}).then((results) => {
      let actualOldComment = results[0].id
      expect(actualOldComment).toBe(expectedOldComment)
    })
    store.dispatch('editResourceLiteralProperty', {'subject': baseUrl + 'Analista', 'predicate': RdfConstructs.rdfs_comment.value, 'object': expectedOldComment, 'newObject': 'prueba'})
    getters.getObjectListByPredicateAndSubject(store.state)({'predicate': RdfConstructs.rdfs_comment.value, 'subject': baseUrl + 'Analista'}).then((results) => {
      let actualNewComment = results[0].id
      expect(actualNewComment).toBe(expectedNewComment)
    })
  })

  test('add class literal property', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let newComment = 'El Analista Informático tiene un nuevo comentario.'
    let expectedOldComments = 1
    let expectedNewComments = 2
    getters.getObjectListByPredicateAndSubject(store.state)({'predicate': RdfConstructs.rdfs_comment.value, 'subject': baseUrl + 'Analista'}).then((results) => {
      let actualOldComments = results.length
      expect(actualOldComments).toBe(expectedOldComments)
    })
    store.dispatch('addResourceLiteralProperty', {'subject': baseUrl + 'Analista', 'predicate': RdfConstructs.rdfs_comment.value, 'object': newComment})
    getters.getObjectListByPredicateAndSubject(store.state)({'predicate': RdfConstructs.rdfs_comment.value, 'subject': baseUrl + 'Analista'}).then((results) => {
      let actualNewComments = results.length
      expect(actualNewComments).toBe(expectedNewComments)
    })
  })
  test('import N3', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let actualOldSize = store.state.n3store.size
    let expectedOldSize = 17
    let content = '@prefix wd: <http://www.wikidata.org/entity/> .\n' +
      '@prefix iaej-geo: <http://data.ia.uned.es/ej/geog/> .\n' +
      '@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n' +
      '@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n' +
      '@prefix sesame: <http://www.openrdf.org/schema/sesame#> .\n' +
      '@prefix owl: <http://www.w3.org/2002/07/owl#> .\n' +
      '@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n' +
      '@prefix fn: <http://www.w3.org/2005/xpath-functions#> .\n' +
      '@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n' +
      '@prefix dc: <http://purl.org/dc/elements/1.1/> .\n' +
      '@prefix hint: <http://www.bigdata.com/queryHints#> .\n' +
      '@prefix bd: <http://www.bigdata.com/rdf#> .\n' +
      '@prefix bds: <http://www.bigdata.com/rdf/search#> .\n' +
      '@prefix psn: <http://www.wikidata.org/prop/statement/value-normalized/> .\n' +
      '@prefix pqn: <http://www.wikidata.org/prop/qualifier/value-normalized/> .\n' +
      '@prefix prn: <http://www.wikidata.org/prop/reference/value-normalized/> .\n' +
      '@prefix mwapi: <https://www.mediawiki.org/ontology#API/> .\n' +
      '@prefix gas: <http://www.bigdata.com/rdf/gas#> .\n' +
      '@prefix wdt: <http://www.wikidata.org/prop/direct/> .\n' +
      '@prefix wdtn: <http://www.wikidata.org/prop/direct-normalized/> .\n' +
      '@prefix psv: <http://www.wikidata.org/prop/statement/value/> .\n' +
      '@prefix ps: <http://www.wikidata.org/prop/statement/> .\n' +
      '@prefix pqv: <http://www.wikidata.org/prop/qualifier/value/> .\n' +
      '@prefix pq: <http://www.wikidata.org/prop/qualifier/> .\n' +
      '@prefix prv: <http://www.wikidata.org/prop/reference/value/> .\n' +
      '@prefix pr: <http://www.wikidata.org/prop/reference/> .\n' +
      '@prefix wdno: <http://www.wikidata.org/prop/novalue/> .\n' +
      '@prefix p: <http://www.wikidata.org/prop/> .\n' +
      '@prefix wikibase: <http://wikiba.se/ontology#> .\n' +
      '@prefix wds: <http://www.wikidata.org/entity/statement/> .\n' +
      '@prefix wdv: <http://www.wikidata.org/value/> .\n' +
      '@prefix wdref: <http://www.wikidata.org/reference/> .\n' +
      '@prefix wdata: <http://www.wikidata.org/wiki/Special:EntityData/> .\n' +
      '@prefix schema: <http://schema.org/> .\n' +
      '@prefix prov: <http://www.w3.org/ns/prov#> .\n' +
      '@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n' +
      '@prefix geo: <http://www.opengis.net/ont/geosparql#> .\n' +
      '@prefix geof: <http://www.opengis.net/def/geosparql/function/> .\n' +
      '@prefix mediawiki: <https://www.mediawiki.org/ontology#> .\n' +
      '\n' +
      'wd:Q790 rdfs:label "Haití"@es ;\n' +
      '\tiaej-geo:capital wd:Q34261 .\n' +
      '\n' +
      'wd:Q34261 rdfs:label "Puerto Príncipe"@es .'
    store.dispatch('importN3', {'content': content, 'store': 'n3store'})
    let actualNewSize = store.state.n3store.size
    let expectedNewSize = 3
    expect(actualOldSize).toBe(expectedOldSize)
    expect(actualNewSize).toBe(expectedNewSize)
  })
  test('add N3', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let actualOldSize = store.state.n3store.size
    let expectedOldSize = 17
    let content = '@prefix wd: <http://www.wikidata.org/entity/> .\n' +
      '@prefix iaej-geo: <http://data.ia.uned.es/ej/geog/> .\n' +
      '@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n' +
      '@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n' +
      '@prefix sesame: <http://www.openrdf.org/schema/sesame#> .\n' +
      '@prefix owl: <http://www.w3.org/2002/07/owl#> .\n' +
      '@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n' +
      '@prefix fn: <http://www.w3.org/2005/xpath-functions#> .\n' +
      '@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n' +
      '@prefix dc: <http://purl.org/dc/elements/1.1/> .\n' +
      '@prefix hint: <http://www.bigdata.com/queryHints#> .\n' +
      '@prefix bd: <http://www.bigdata.com/rdf#> .\n' +
      '@prefix bds: <http://www.bigdata.com/rdf/search#> .\n' +
      '@prefix psn: <http://www.wikidata.org/prop/statement/value-normalized/> .\n' +
      '@prefix pqn: <http://www.wikidata.org/prop/qualifier/value-normalized/> .\n' +
      '@prefix prn: <http://www.wikidata.org/prop/reference/value-normalized/> .\n' +
      '@prefix mwapi: <https://www.mediawiki.org/ontology#API/> .\n' +
      '@prefix gas: <http://www.bigdata.com/rdf/gas#> .\n' +
      '@prefix wdt: <http://www.wikidata.org/prop/direct/> .\n' +
      '@prefix wdtn: <http://www.wikidata.org/prop/direct-normalized/> .\n' +
      '@prefix psv: <http://www.wikidata.org/prop/statement/value/> .\n' +
      '@prefix ps: <http://www.wikidata.org/prop/statement/> .\n' +
      '@prefix pqv: <http://www.wikidata.org/prop/qualifier/value/> .\n' +
      '@prefix pq: <http://www.wikidata.org/prop/qualifier/> .\n' +
      '@prefix prv: <http://www.wikidata.org/prop/reference/value/> .\n' +
      '@prefix pr: <http://www.wikidata.org/prop/reference/> .\n' +
      '@prefix wdno: <http://www.wikidata.org/prop/novalue/> .\n' +
      '@prefix p: <http://www.wikidata.org/prop/> .\n' +
      '@prefix wikibase: <http://wikiba.se/ontology#> .\n' +
      '@prefix wds: <http://www.wikidata.org/entity/statement/> .\n' +
      '@prefix wdv: <http://www.wikidata.org/value/> .\n' +
      '@prefix wdref: <http://www.wikidata.org/reference/> .\n' +
      '@prefix wdata: <http://www.wikidata.org/wiki/Special:EntityData/> .\n' +
      '@prefix schema: <http://schema.org/> .\n' +
      '@prefix prov: <http://www.w3.org/ns/prov#> .\n' +
      '@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n' +
      '@prefix geo: <http://www.opengis.net/ont/geosparql#> .\n' +
      '@prefix geof: <http://www.opengis.net/def/geosparql/function/> .\n' +
      '@prefix mediawiki: <https://www.mediawiki.org/ontology#> .\n' +
      '\n' +
      'wd:Q790 rdfs:label "Haití"@es ;\n' +
      '\tiaej-geo:capital wd:Q34261 .\n' +
      '\n' +
      'wd:Q34261 rdfs:label "Puerto Príncipe"@es .'
    store.dispatch('addN3', {'content': content, 'store': 'n3store'})
    let actualNewSize = store.state.n3store.size
    let expectedNewSize = 20
    expect(actualOldSize).toBe(expectedOldSize)
    expect(actualNewSize).toBe(expectedNewSize)
  })

  test('del N3', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let actualOldSize = store.state.n3store.size
    let expectedOldSize = 17
    let content = '@prefix wd: <http://www.wikidata.org/entity/> .\n' +
      '@prefix iaej-geo: <http://data.ia.uned.es/ej/geog/> .\n' +
      '@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n' +
      '@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n' +
      '@prefix sesame: <http://www.openrdf.org/schema/sesame#> .\n' +
      '@prefix owl: <http://www.w3.org/2002/07/owl#> .\n' +
      '@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n' +
      '@prefix fn: <http://www.w3.org/2005/xpath-functions#> .\n' +
      '@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n' +
      '@prefix dc: <http://purl.org/dc/elements/1.1/> .\n' +
      '@prefix hint: <http://www.bigdata.com/queryHints#> .\n' +
      '@prefix bd: <http://www.bigdata.com/rdf#> .\n' +
      '@prefix bds: <http://www.bigdata.com/rdf/search#> .\n' +
      '@prefix psn: <http://www.wikidata.org/prop/statement/value-normalized/> .\n' +
      '@prefix pqn: <http://www.wikidata.org/prop/qualifier/value-normalized/> .\n' +
      '@prefix prn: <http://www.wikidata.org/prop/reference/value-normalized/> .\n' +
      '@prefix mwapi: <https://www.mediawiki.org/ontology#API/> .\n' +
      '@prefix gas: <http://www.bigdata.com/rdf/gas#> .\n' +
      '@prefix wdt: <http://www.wikidata.org/prop/direct/> .\n' +
      '@prefix wdtn: <http://www.wikidata.org/prop/direct-normalized/> .\n' +
      '@prefix psv: <http://www.wikidata.org/prop/statement/value/> .\n' +
      '@prefix ps: <http://www.wikidata.org/prop/statement/> .\n' +
      '@prefix pqv: <http://www.wikidata.org/prop/qualifier/value/> .\n' +
      '@prefix pq: <http://www.wikidata.org/prop/qualifier/> .\n' +
      '@prefix prv: <http://www.wikidata.org/prop/reference/value/> .\n' +
      '@prefix pr: <http://www.wikidata.org/prop/reference/> .\n' +
      '@prefix wdno: <http://www.wikidata.org/prop/novalue/> .\n' +
      '@prefix p: <http://www.wikidata.org/prop/> .\n' +
      '@prefix wikibase: <http://wikiba.se/ontology#> .\n' +
      '@prefix wds: <http://www.wikidata.org/entity/statement/> .\n' +
      '@prefix wdv: <http://www.wikidata.org/value/> .\n' +
      '@prefix wdref: <http://www.wikidata.org/reference/> .\n' +
      '@prefix wdata: <http://www.wikidata.org/wiki/Special:EntityData/> .\n' +
      '@prefix schema: <http://schema.org/> .\n' +
      '@prefix prov: <http://www.w3.org/ns/prov#> .\n' +
      '@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n' +
      '@prefix geo: <http://www.opengis.net/ont/geosparql#> .\n' +
      '@prefix geof: <http://www.opengis.net/def/geosparql/function/> .\n' +
      '@prefix mediawiki: <https://www.mediawiki.org/ontology#> .\n' +
      '\n' +
      'wd:Q790 rdfs:label "Haití"@es ;\n' +
      '\tiaej-geo:capital wd:Q34261 .\n' +
      '\n' +
      'wd:Q34261 rdfs:label "Puerto Príncipe"@es .'
    store.dispatch('addN3', {'content': content, 'store': 'n3store'})
    let actualNewSize = store.state.n3store.size
    let expectedNewSize = 20
    expect(actualOldSize).toBe(expectedOldSize)
    expect(actualNewSize).toBe(expectedNewSize)
    store.dispatch('delN3', {'content': content, 'store': 'n3store'})
    let actualAfterDeleteSize = store.state.n3store.size
    let expectedAfterDeleteSize = 17
    expect(actualAfterDeleteSize).toBe(expectedAfterDeleteSize)
  })

  test('set Activity', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let actualOldSize = store.state.activity.length
    let expectedOldSize = 0
    let content = '# Prueba de título en Markdown'
    store.dispatch('setActivity', {'content': content})
    let actualNewSize = getters.activity(store.state).content.length
    expect(actualOldSize).toBe(expectedOldSize)
    expect(actualNewSize).toBeGreaterThan(expectedOldSize)
  })

  test('set Vocabulary State', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    let vocabulary = 'foaf'
    let actualOldState = store.state.vocabularies[vocabulary].active
    let expectedOldState = false
    store.dispatch('setVocabularyState', {'vocabulary': vocabulary, 'active': true})
    let actualNewState = store.state.vocabularies[vocabulary].active
    let expectedNewState = true
    expect(actualOldState).toBe(expectedOldState)
    expect(actualNewState).toBe(expectedNewState)
  })
})
