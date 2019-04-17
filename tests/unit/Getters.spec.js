import Vue from 'vue'
import Vuex from 'vuex'
import storeConfig from '../../../src/store/store-config'
import deepClone from 'lodash.clonedeep'
import DataFactory from 'rdf-ext'
import RdfConstructs from '../../../src/utils/RdfConstructs'
import consts from '../../../src/store/consts'
import getters from '../../../src/store/getters'

let rdf = DataFactory
let baseUrl = consts.baseUrl

describe('getters', () => {
  test('get properties', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    expect(getters.getDefaultResources(store.state)('property')).toHaveLength(12)
  })
  test('get subject list by predicate and object', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    expect(getters.getSubjectListByPredicateAndObject(store.state)({'predicate': RdfConstructs.rdf_type.value, 'object': RdfConstructs.owl_Class.value})).resolves.toHaveLength(5)
  })
  test('get subject list by predicate', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    expect(getters.getSubjectListByPredicate(store.state)(RdfConstructs.rdfs_label.value)).resolves.toHaveLength(2)
  })
  test('get object list by predicate and subject', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    expect(getters.getObjectListByPredicateAndSubject(store.state)({'predicate': RdfConstructs.rdfs_label.value, 'subject': baseUrl + 'Analista'})).resolves.toHaveLength(2)
  })
  test('get triples matching subject', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    expect(getters.getTriplesMatchingSubject(store.state)(baseUrl + 'Analista')).toHaveLength(5)
  })
  test('get triples matching object', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    expect(getters.getTriplesMatchingObject(store.state)(RdfConstructs.owl_Class.value)).toHaveLength(5)
  })
  test('get store quads', () => {
    Vue.use(Vuex)
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    expect(getters.getStoreQuads(store.state)()).toHaveLength(17)
  })
})
