/**
 * Contains all the vuex mutations used to change the state of the application.
 **/

import DataFactory from 'rdf-ext'
import {Parser, Store, Writer} from 'n3'
import Serializer from 'rdf-serializer-jsonld-ext'

let N3Parser = Parser
let N3Writer = Writer
let rdf = DataFactory
let JsonLdSerializer = Serializer

const ADD_QUAD_FROM_IRI = (state, {subject, predicate, object}) => {
  state.n3store.addQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object)))
}

/**
 * Removes a quad given its subject, predicate and object.
 * @param state: object with the internal store state.
 * @param subject: a subject resource URI.
 * @param predicate: a predicate resource URI.
 * @param object: an object resource URI.
 */
const REMOVE_QUAD_FROM_IRI = (state, {subject, predicate, object}) => {
  state.n3store.removeQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.literal(object)))
  state.n3store.removeQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object)))
}

/**
 * Edits a quad literal object given its subject, predicate and object and the new literal value for the object.
 * @param state: object with the internal store state.
 * @param subject: a subject resource URI.
 * @param predicate: a predicate resource URI.
 * @param object: a string with a literal object.
 * @param newObject: a string with the new literal for the object.
 */
const EDIT_QUAD_WITH_OBJECT_LITERAL_FROM_IRI = (state, {subject, predicate, object, newObject}) => {
  state.n3store.removeQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.literal(object)))
  state.n3store.removeQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object)))
  state.n3store.addQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.literal(newObject)))
}

/**
 * Removes all triples in the graph related to a given resource URI.
 * @param state: object with the internal store state.
 * @param resource: an URI of the resource to be removed.
 */
const REMOVE_RESOURCE_FROM_IRI = (state, resource) => {
  let results = state.n3store.getQuads(rdf.namedNode(resource), null, null, null)
  for (var quad of results) {
    state.n3store.removeQuad(quad)
  }
  results = state.n3store.getQuads(null, rdf.namedNode(resource), null, null)
  for (quad of results) {
    state.n3store.removeQuad(quad)
  }
  results = state.n3store.getQuads(null, null, rdf.namedNode(resource), null)
  for (quad of results) {
    state.n3store.removeQuad(quad)
  }
}

/**
 * Adds a quad literal object given its subject, predicate and object.
 * @param state: object with the internal store state.
 * @param subject: a subject resource URI.
 * @param predicate: a predicate resource URI.
 * @param object: a string with a literal object.
 */
const ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI = (state, {subject, predicate, object}) => {
  state.n3store.addQuad(rdf.quad(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.literal(object)))
}

/**
 * Imports a graph in Turtle, N3, N-Tiples or TriG format.
 * @param state: object with the internal store state.
 * @param content: a string the graph in Turtle, N3, N-Triples or TriG format.
 */
const IMPORT_N3 = (state, {content, store}) => {
  const turtleParser = new N3Parser()
  let quads = turtleParser.parse(content)
  state[store] = new Store(quads)
}

/**
 * Adds or appends a graph in Turtle, N3, N-Tiples or TriG format to the existing graph.
 * @param state: object with the internal store state.
 * @param content: a string the graph in Turtle, N3, N-Triples or TriG format.
 * @param store: a string with the name of the store in which the content will be loaded.
 */
const ADD_N3 = (state, {content, store}) => {
  const turtleParser = new N3Parser()
  let quads = turtleParser.parse(content)
  state[store].addQuads(quads)
}

/**
 * Deletes from the existing graph all triples existing in a graph in Turtle, N3, N-Triples or TriG format.
 * @param state: object with the internal store state.
 * @param content: a string the graph in Turtle, N3, N-Triples or TriG format.
 * @param store: a string with the name of the store in which the content will be loaded.
 */
const DEL_N3 = (state, {content, store}) => {
  const turtleParser = new N3Parser()
  let quads = turtleParser.parse(content)
  state[store].removeQuads(quads)
}

/**
 * Sets an activity string variable with a given content in Markdown format.
 * @param state: object with the internal store state.
 * @param content: a string with the content of the activity to be set in Markdown format.
 */
const SET_ACTIVITY = (state, content) => {
  state.activity = content
}

/**
 * Exports the current graph to JSON-Ld format.
 * @param state: object with the internal store state.
 */
const EXPORT_JSON_LD = (state) => {
  // create a prefix map and fill it
  const prefixMap = rdf.prefixMap({
    ex: rdf.namedNode('http://www.uned.es#example')
  })
  let quadStream = require('streamify-array')(state.n3store.getQuads())
  // create a JSON-LD serializer instance which returns strings and compacts the JSON-LD
  const serializer = new JsonLdSerializer({outputFormat: 'string', compact: true})
  // forward the quads to the serializer
  const jsonStream = serializer.import(quadStream)
  prefixMap.export(quadStream)
  let result
  jsonStream.on('data', (data) => {
    result = data
  })

  return rdf.waitFor(jsonStream).then(() => {
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(result)
    let downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'dataset.json')
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  })
}

/**
 * Exports the current graph to Turtle format.
 * @param state: object with the internal store state.
 */
const EXPORT_TURTLE = (state) => {
  // create a prefix map and fill it
  const prefix = { prefixes: { ex: 'http://www.uned.es/example#' } }
  const writer = N3Writer(prefix)
  state.n3store.getQuads().forEach((quad) => {
    writer.addQuad(quad)
  })
  writer.end((error, result) => {
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(result)
    let downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'dataset.ttl')
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
    if (error) {
      console.log(error.stack)
      throw error
    }
  })
}

/**
 * Sets a given vocabulary state to active or inactive.
 *  @param state: object with the internal store state.
 * @param vocabulary: a string containing the name of the vocabulary which state will be set.
 * @param active: a boolean indicating the state of the given vocabulary.
 */
const SET_VOCABULARY_STATE = (state, {vocabulary, active}) => {
  state.vocabularies[vocabulary].active = active
}

export default {
  ADD_QUAD_FROM_IRI,
  REMOVE_QUAD_FROM_IRI,
  REMOVE_RESOURCE_FROM_IRI,
  ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI,
  EDIT_QUAD_WITH_OBJECT_LITERAL_FROM_IRI,
  IMPORT_N3,
  ADD_N3,
  DEL_N3,
  SET_ACTIVITY,
  EXPORT_JSON_LD,
  EXPORT_TURTLE,
  SET_VOCABULARY_STATE
}
