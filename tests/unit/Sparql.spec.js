import Vue from 'vue'
import Vuex from 'vuex'
import storeConfig from '../../../src/store/store-config'
import deepClone from 'lodash.clonedeep'
import RdfConstructs from '../../../src/utils/RdfConstructs'

const newEngine = require('@comunica/actor-init-sparql-rdfjs').newEngine
const N3Store = require('n3').Store
const DataFactory = require('n3').DataFactory
const baseUrl = 'http://uned.es/example#'
let rdf = DataFactory
describe('sparql', () => {
  test('get triples from store', async () => {
// This can be any RDFJS source
// In this example, we wrap an N3Store
    const store = new N3Store()
    store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_Class.value)))
    store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Programador'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_Class.value)))
    store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Miguel_Exposito'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(baseUrl + 'Analista')))
    store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Capturador_de_Requisitos'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_Class.value)))
    store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.owl_equivalentClass.value), rdf.namedNode(baseUrl + 'Capturador_de_Requisitos')))
    store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_label.value), rdf.literal('Analista Informático')))
    store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_label.value), rdf.literal('Rol en el proyecto')))
    store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_comment.value), rdf.literal('El Analista Informático desempeña un rol importante en el desarrollo de software según las metodologías tradicionales.')))
    store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Analista_Programador'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_Class.value)))
    store.addQuad(rdf.quad(rdf.namedNode(baseUrl + 'Analista_Programador'), rdf.namedNode(RdfConstructs.rdfs_subClassOf.value), rdf.namedNode(baseUrl + 'Analista')))
    // Vue.use(Vuex)
    // const clonedStoreConfig = deepClone(storeConfig)
    // const store = new Vuex.Store(clonedStoreConfig)
    const source = {
      match: function (s, p, o, g) {
        return require('streamify-array')(store.getQuads(s, p, o, g))
      }
    }

// Create our engine, and query it.
// If you intend to query multiple times, be sure to cache your engine for optimal performance.
    const myEngine = newEngine()
    let results = []
    const p = new Promise((resolve, reject) => {
      myEngine.query('SELECT * WHERE {?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>  <http://www.w3.org/2002/07/owl#Class> .} LIMIT 100',
        {'sources': [{type: 'rdfjsSource', value: source}]})
        .then(function (result) {
          result.bindingsStream.on('data', function (data) {
            // Each data object contains a mapping from variables to RDFJS terms.
            results.push(data)
          }).on('end', () => {

            results.forEach((item) => {
              console.log(item.get('?s').value)
              // console.log(item.get('?p').value)
              // console.log(item.get('?o').value)
            })
            resolve(results)
          })
        })
    })
    return expect(p).resolves.toBeTruthy()
  })
})
