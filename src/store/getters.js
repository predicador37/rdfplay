/**
 * Contains all the vuex getters used to retrieve the state of the application.
 **/

import DataFactory from 'rdf-ext'

let rdf = DataFactory

const n3store = state => state.n3store

const engine = state => state.engine

const rdfConstructs = state => state.rdfConstructs

const prefixes = state => state.prefixes

const vocabularies = state => state.vocabularies

const baseUrl = state => state.baseUrl

const activity = state => state.activity

/**
 * Retrieves a subject list for a given object and predicate asynchronously.
 * @param state: object with the internal store state.
 * @param predicate: a predicate resource URI.
 * @param object: an object resource URI.
 * @returns {function({predicate?: *, object?: *}): Promise<any>}
 */
const getSubjectListByPredicateAndObject = (state) => ({predicate, object}) => {
  return new Promise((resolve, reject) => {
    let subjects = state.n3store.getSubjects(predicate, object, null)
    resolve(subjects)
  })
}

/**
 * Retrieves a subject list for a given predicate asynchronously.
 * @param state: object with the internal store state.
 * @param predicate: a predicate resource URI.
 * @returns {function(*=): Promise<any>}
 */
const getSubjectListByPredicate = (state) => (predicate) => {
  return new Promise((resolve, reject) => {
    let subjects = state.n3store.getSubjects(predicate, null, null)
    resolve(subjects)
  })
}

/**
 * Retrieves an object list for a given predicate and subject asynchronously.
 * @param state: object with the internal store state.
 * @param predicate: a predicate resource URI.
 * @param subject: a subject resource URI.
 * @returns {function({predicate?: *, subject?: *}): Promise<any>}
 */
const getObjectListByPredicateAndSubject = (state) => ({predicate, subject}) => {
  return new Promise((resolve, reject) => {
    let objects = state.n3store.getObjects(subject, predicate, null)
    resolve(objects)
  })
}

/**
 * Retrieves a list of triples matching a given subject.
 * @param state: object with the internal store state.
 * @param subject: a subject resource URI.
 * @returns {function(*=): (*|Array)}
 */
const getTriplesMatchingSubject = (state) => (subject) => {
  return state.n3store.getQuads(rdf.namedNode(subject), null, null, null)
}

/**
 * Retrieves a list of triples matching a given subject, predicate and object.
 * @param state: object with the internal store state.
 * @param subject: a subject resource URI.
 * @param predicate: a predicate resource URI.
 * @param object: an object resource URI.
 * @returns {function(*=): (*|Array)}
 */
const getTriplesMatchingSubjectAndPredicateAndObject = (state) => ({subject, predicate, object}) => {
  return state.n3store.getQuads(rdf.namedNode(subject), rdf.namedNode(predicate), rdf.namedNode(object), null)
}

/**
 * Retrieves a list of triples matching a given object.
 * @param state: object with the internal store state.
 * @param object: an object resource URI.
 * @returns {function(*=): (*|Array)}
 */
const getTriplesMatchingObject = (state) => (object) => {
  return state.n3store.getQuads(null, null, rdf.namedNode(object), null)
}

/**
 * Retrieves a list of triples matching a given subject and object.
 * @param state: object with the internal store state.
 * @param object: an object resource URI.
 * @param subject: a subject resource URI.
 * @returns {function(*=): (*|Array)}
 */
const getTriplesMatchingSubjectAndObject = (state) => ({subject, object}) => {
  return state.n3store.getQuads(rdf.namedNode(subject), null, rdf.namedNode(object), null)
}

/**
 * Retrieves all quads from the internal store.
 * @param state: object with the internal store state.
 * @param s: a subject resource URI.
 * @param p: a predicate resource URI.
 * @param o: an object resource URI.
 * @param g: a graph.
 * @returns {function(*=, *=, *=, *=): (*|Array)}
 */
const getStoreQuads = (state) => (s, p, o, g) => {
  return state.n3store.getQuads(s, p, o, g)
}

/**
 * Retrieves all default resources loaded in rdfConstructs given a type (property or class).
 * @param state
 * @param resourceType: the type ot the desired resources.
 * @returns {function(*): Array}
 */
const getDefaultResources = (state) => (resourceType) => {
  let results = []
  Object.keys(state.rdfConstructs).forEach((key) => {
    if (state.rdfConstructs[key].type === resourceType) {
      results.push(state.rdfConstructs[key].value)
    }
  })
  return results
}

export default {
  n3store,
  engine,
  rdfConstructs,
  prefixes,
  vocabularies,
  baseUrl,
  activity,
  getSubjectListByPredicateAndObject,
  getSubjectListByPredicate,
  getObjectListByPredicateAndSubject,
  getTriplesMatchingSubjectAndObject,
  getTriplesMatchingSubjectAndPredicateAndObject,
  getTriplesMatchingSubject,
  getTriplesMatchingObject,
  getStoreQuads,
  getDefaultResources
}
