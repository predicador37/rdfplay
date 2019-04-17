export default {
  rdf_type: {
    text: 'rdf:type',
    value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    desc: 'Tipo',
    desc_plural: 'Tipos',
    type: 'property',
    datatype: 'uri'
  },
  rdfs_Class: {
    text: 'rdf:Class',
    value: 'http://www.w3.org/2000/01/rdf-schema#Class',
    desc: 'Clase',
    desc_plural: 'Clases',
    type: 'class',
    datatype: 'uri'
  },
  rdfs_subClassOf: {
    text:
      'rdfs:subClassOf',
    value:
      'http://www.w3.org/2000/01/rdf-schema#subClassOf',
    desc: 'Subclase de',
    desc_plural: 'Subclase de',
    type: 'property',
    datatype: 'uri'
  },
  rdfs_subPropertyOf: {
    text: 'rdfs:subPropertyOf',
    value:
      'http://www.w3.org/2000/01/rdf-schema#subPropertyOf',
    desc: 'Subpropiedad de',
    desc_plural: 'Subpropiedad de',
    type: 'property',
    datatype: 'uri'
  },
  rdfs_domain: {
    text: 'rdfs:domain',
    value: 'http://www.w3.org/2000/01/rdf-schema#domain',
    desc: 'Dominio',
    desc_plural: 'Dominios',
    type: 'property',
    datatype: 'uri'
  },
  rdfs_range: {
    text: 'rdfs:range',
    value: 'http://www.w3.org/2000/01/rdf-schema#range',
    desc: 'Rango',
    desc_plural: 'Rangos',
    type: 'property',
    datatype: 'uri'
  },
  owl_Thing: {
    text: 'owl:Thing',
    value: 'http://www.w3.org/2002/07/owl#Thing',
    desc: 'Cosa',
    desc_plural: 'Cosas',
    type: 'class',
    datatype: 'uri'
  },
  owl_Class: {
    text: 'owl:Class',
    value: 'http://www.w3.org/2002/07/owl#Class',
    desc: 'Clase',
    desc_plural: 'Clases',
    type: 'class'
  },
  owl_DatatypeProperty: {
    text: 'owl:DatatypeProperty',
    value: 'http://www.w3.org/2002/07/owl#DatatypeProperty',
    desc: 'Propiedad tipo de datos',
    desc_plural: 'Propiedades tipo de datos',
    type: 'class',
    datatype: 'uri'
  },
  owl_ObjectProperty: {
    text: 'owl:ObjectProperty',
    value: 'http://www.w3.org/2002/07/owl#ObjectProperty',
    desc: 'Propiedad objeto',
    desc_plural: 'Propiedades objeto',
    type: 'class',
    datatype: 'uri'
  },
  rdf_XMLLiteral: {
    text: 'rdf:XMLLiteral',
    value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral',
    desc: 'Literal XML',
    desc_plural: 'Literales XML',
    type: 'class',
    datatype: 'literal'
  },
  owl_equivalentClass: {
    text: 'owl:equivalentClass',
    value: 'http://www.w3.org/2002/07/owl#equivalentClass',
    desc: 'Equivalente a',
    desc_plural: 'Equivalente a',
    type: 'property',
    datatype: 'uri'
  },
  owl_equivalentProperty: {
    text: 'owl:equivalentProperty',
    value: 'http://www.w3.org/2002/07/owl#equivalentProperty',
    desc: 'Equivalente a',
    desc_plural: 'Equivalente a',
    type: 'property',
    datatype: 'uri'
  },
  owl_disjointWith: {
    text: 'owl:disjointWith',
    value: 'http://www.w3.org/2002/07/owl#disjointWith',
    desc: 'Disjunta con',
    desc_plural: 'Disjunta con',
    type: 'property',
    datatype: 'uri'
  },
  owl_propertyDisjointWith: {
    text: 'owl:propertyDisjointWith',
    value: 'http://www.w3.org/2002/07/owl#propertyDisjointWith',
    desc: 'Disjunta con',
    desc_plural: 'Disjunta con',
    type: 'property',
    datatype: 'uri'
  },
  rdfs_label: {
    text: 'rdfs:label',
    value: 'http://www.w3.org/2000/01/rdf-schema#label',
    desc: 'Etiqueta',
    desc_plural: 'Etiquetas',
    type: 'property',
    datatype: 'literal'
  },
  rdfs_comment: {
    text: 'rdfs:comment',
    value: 'http://www.w3.org/2000/01/rdf-schema#comment',
    desc: 'Comentario',
    desc_plural: 'Comentarios',
    type: 'property',
    datatype: 'literal'
  },
  rdfs_seeAlso: {
    text: 'rdfs:seeAlso',
    value: 'http://www.w3.org/2000/01/rdf-schema#seeAlso',
    desc: 'Ver también',
    desc_plural: 'Ver también',
    type: 'property',
    datatype: 'literal'
  }

}
