import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import consts from './consts'
import DataFactory from 'rdf-ext'
import RdfConstructs from '../utils/RdfConstructs'
import prefixes from '../utils/Prefixes'
import Vocabularies from '../utils/Vocabularies'
import {Store} from 'n3'

let rdf = DataFactory
let baseUrl = consts.baseUrl
/**
 * Example quads for generating the default graph.
 * @type {*[]}
 */
let quads = [ rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_Class.value)),
  rdf.quad(rdf.namedNode(baseUrl + 'Programador'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_Class.value)),
  rdf.quad(rdf.namedNode(baseUrl + 'Diseñador'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.rdfs_Class.value)),
  rdf.quad(rdf.namedNode(baseUrl + 'Miguel_Exposito'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(baseUrl + 'Analista')),
  rdf.quad(rdf.namedNode(baseUrl + 'Capturador_de_Requisitos'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_Class.value)),
  rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.owl_equivalentClass.value), rdf.namedNode(baseUrl + 'Capturador_de_Requisitos')),
  rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_label.value), rdf.literal('Analista Informático')),
  rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_label.value), rdf.literal('Rol en el proyecto')),
  rdf.quad(rdf.namedNode(baseUrl + 'Analista'), rdf.namedNode(RdfConstructs.rdfs_comment.value), rdf.literal('El Analista Informático desempeña un rol importante en el desarrollo de software según las metodologías tradicionales.')),
  rdf.quad(rdf.namedNode(baseUrl + 'Analista_Programador'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_Class.value)),
  rdf.quad(rdf.namedNode(baseUrl + 'Analista_Programador'), rdf.namedNode(RdfConstructs.rdfs_subClassOf.value), rdf.namedNode(baseUrl + 'Analista')),
  rdf.quad(rdf.namedNode(baseUrl + 'Analista_BI'), rdf.namedNode(RdfConstructs.rdfs_subClassOf.value), rdf.namedNode(baseUrl + 'Analista')),
  rdf.quad(rdf.namedNode(baseUrl + 'Edad'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_DatatypeProperty.value)),
  rdf.quad(rdf.namedNode(baseUrl + 'Proyecto'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_Class.value)),
  rdf.quad(rdf.namedNode(baseUrl + 'RDFplay'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(baseUrl + 'Proyecto')),
  rdf.quad(rdf.namedNode(baseUrl + 'Miguel_Exposito'), rdf.namedNode(baseUrl + 'Edad'), rdf.literal('37')),
  rdf.quad(rdf.namedNode(baseUrl + 'DirigidoPor'), rdf.namedNode(RdfConstructs.rdf_type.value), rdf.namedNode(RdfConstructs.owl_ObjectProperty.value)),
  rdf.quad(rdf.namedNode(baseUrl + 'RDFplay'), rdf.namedNode(baseUrl + 'DirigidoPor'), rdf.namedNode(baseUrl + 'Miguel_Exposito'))]

const state = {
  rdfConstructs: RdfConstructs, // default rdf constructs
  baseUrl: consts.baseUrl, // base URL for creating new triples
  n3store: new Store(quads), // internal N3 store populated with example triples
  activity: '', // variable to store activity texts
  prefixes: prefixes, // default prefixes to be loaded in the sparql query engine
  vocabularies: Vocabularies // default vocabularies that can be loaded remotely to the graph
}
// const debug = process.env.NODE_ENV !== 'production'
export default {
  state,
  getters,
  mutations,
  actions

}
