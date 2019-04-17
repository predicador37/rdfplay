/**
 * Contains all the vuex actions used to change the state of the application asynchronously.
 **/

/**
 * Adds a triple to the store given its subject, predicate and object.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param subject: a subject resource URI.
 * @param predicate: a predicate resource URI.
 * @param object: an object resource URI.
 */

const addTriple = (context, {subject, predicate, object}) => {
  if (subject !== null && subject !== '' && predicate != null && object != null) {
    context.commit('ADD_QUAD_FROM_IRI', {
      subject: subject, // subject must be an IRI
      predicate: predicate,
      object: object
    })
  } else {
    throw new Error('Error: Ningún elemento de la terna debe ser nulo.')
  }
}

/**
 * Removes a resource from the graph in the store.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param resource: a resource URI to remove from the graph.
 */
const removeResource = (context, resource) => {
  if (resource != null) {
    context.commit('REMOVE_RESOURCE_FROM_IRI', resource)
  } else {
    throw new Error('Error: No existe el recurso.')
  }
}

/**
 * Edits a resource URI, replacing its old value by the new one.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param oldResource: URI of the resource to be edited.
 * @param newResource: new URI of the resource.
 */
const editResource = (context, {oldResource, newResource}) => {
  if (oldResource != null && newResource != null && newResource !== '') {
    context.getters.getTriplesMatchingSubject(oldResource).forEach((triple) => {
      context.dispatch('removeTriple', {subject: triple.subject.value, predicate: triple.predicate.value, object: triple.object.value})
      context.dispatch('addTriple', {subject: newResource, predicate: triple.predicate.value, object: triple.object.value})
    })
    context.getters.getTriplesMatchingObject(oldResource).forEach((triple) => {
      context.dispatch('removeTriple', {subject: triple.subject.value, predicate: triple.predicate.value, object: triple.object.value})
      context.dispatch('addTriple', {subject: triple.subject.value, predicate: triple.predicate.value, object: newResource})
    })
  } else {
    throw new Error('Error: Los recursos no deben ser nulos.')
  }
}
/**
 * Removes a triple given its subject, predicate and object.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param subject: a subject resource URI.
 * @param predicate: a predicate resource URI.
 * @param object: an object resource URI.
 */
const removeTriple = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('REMOVE_QUAD_FROM_IRI', {
      subject: subject,
      predicate: predicate,
      object: object
    })
  } else {
    throw new Error('Error: Los elementos de la terna no deben ser nulos.')
  }
}

/**
 * Edits a literal property of a given resource by its subject, predicate and object.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param subject: a subject resource URI.
 * @param predicate: a predicate resource URI.
 * @param object:  an object resource URI.
 * @param newObject: a string with the new value for the literal.
 */
const editResourceLiteralProperty = (context, {subject, predicate, object, newObject}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('EDIT_QUAD_WITH_OBJECT_LITERAL_FROM_IRI', {
      subject: subject,
      predicate: predicate,
      object: object,
      newObject: newObject
    })
  } else {
    throw new Error('Error: Los elementos de la terna no deben ser nulos.')
  }
}
/**
 * Adds a literal property to a given reousrce by its subject, predicate and object.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param subject: a subject resource URI.
 * @param predicate: a predicate resource URI.
 * @param object:  a string with an object literal.
 */
const addResourceLiteralProperty = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI', {
      subject: subject,
      predicate: predicate,
      object: object
    })
  } else {
    throw new Error('Error: Los elementos de la terna no deben ser nulos.')
  }
}

/**
 * Imports a graph in Turtle, N3, N-Tiples or TriG format.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param content: a string the graph in Turtle, N3, N-Triples or TriG format.
 * @param store: a string with the name of the store in which the content will be loaded.
 */
const importN3 = (context, {content, store}) => {
  if (content != null) {
    context.commit('IMPORT_N3', {content, store})
  } else {
    throw new Error('Error: El contenido a importar no debe ser nulo.')
  }
}

/**
 * Adds or appends a graph in Turtle, N3, N-Tiples or TriG format to the existing graph.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param content: a string the graph in Turtle, N3, N-Triples or TriG format.
 * @param store: a string with the name of the store in which the content will be loaded.
 */
const addN3 = (context, {content, store}) => {
  if (content != null) {
    context.commit('ADD_N3', {content, store})
  } else {
    throw new Error('Error: El contenido a añadir no debe ser nulo.')
  }
}

/**
 * Deletes from the existing graph all triples existing in a graph in Turtle, N3, N-Triples or TriG format.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param content: a string the graph in Turtle, N3, N-Triples or TriG format.
 * @param store: a string with the name of the store in which the content will be loaded.
 */
const delN3 = (context, {content, store}) => {
  if (content != null) {
    context.commit('DEL_N3', {content, store})
  } else {
    throw new Error('Error: El contenido a eliminar no debe ser nulo.')
  }
}

/**
 * Sets an activity string variable with a given content in Markdown format.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param content: a string with the content of the activity to be set in Markdown format.
 */
const setActivity = (context, content) => {
  if (content != null) {
    context.commit('SET_ACTIVITY', content)
  } else {
    throw new Error('Error: El contenido de la actividad no debe ser nulo.')
  }
}

/**
 * Exports the current graph to JSON-Ld format.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 */
const exportJsonLD = (context) => {
  context.commit('EXPORT_JSON_LD')
}

/**
 * Exports the current graph to Turtle format.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 */
const exportTurtle = (context) => {
  context.commit('EXPORT_TURTLE')
}

/**
 * Sets a given vocabulary state to active or inactive.
 * @param context: a context object which exposes the same set of methods/properties on the store instance.
 * @param vocabulary: a string containing the name of the vocabulary which state will be set.
 * @param active: a boolean indicating the state of the given vocabulary.
 */
const setVocabularyState = (context, {vocabulary, active}) => {
  context.commit('SET_VOCABULARY_STATE', {vocabulary, active})
}
export default {
  addTriple,
  editResource,
  editResourceLiteralProperty,
  removeTriple,
  removeResource,
  addResourceLiteralProperty,
  importN3,
  addN3,
  delN3,
  setActivity,
  exportJsonLD,
  exportTurtle,
  setVocabularyState
}
