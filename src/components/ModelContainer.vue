<template>
  <div id="model">
    <v-tabs icons-and-text>
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab href="#tab-1">
        Clases
        <v-icon>mdi-file-tree</v-icon>
      </v-tab>
      <v-tab href="#tab-2">
        Propiedades
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-tab>
      <v-tabs-items :touchless="true">
      <v-tab-item key="1" id="tab-1">
        <v-container fluid>
          <v-layout row wrap>
            <v-flex pr-3 py-3 md6 xs12>
              <resource-list name="Clase" :baseUrl="baseUrl" :types="[rdfConstructs.owl_Class]" :resources="classes"
                             @add-resource="handleAddResource($event)" @add-subresource="handleAddSubresource($event)"
                             @change-resource="handleChangeResource($event)"
                             @remove-resource="handleRemoveResource($event)"
                             @edit-resource="handleEditResource($event)"></resource-list>
            </v-flex>
            <v-flex fixed py-3 md6 xs12>
              <resource-detail name="Clase"  :baseUrl="baseUrl" v-if="renderDetail" :resource="currentResource"
                               :editable-class-data="editableClassData" :rdfConstructs="rdfConstructs"
                               :relatedClasses="relatedClasses" @add-class-property="handleAddClassProperty($event)"
                               @remove-resource="handleRemoveTriple($event)"
                               @edit-literal-property="handleEditLiteralProperty($event)"></resource-detail>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>
      <v-tab-item key="2" id="tab-2">
        <v-container fluid>
          <v-layout row wrap>
            <v-flex pr-3 py-3 md6 xs12>
              <resource-list name="Propiedad" :baseUrl="baseUrl"
                             :types="[rdfConstructs.owl_DatatypeProperty, rdfConstructs.owl_ObjectProperty]"
                             :resources="properties" @add-resource="handleAddResource($event)"
                             @add-subresource="handleAddSubresource($event)"
                             @change-resource="handleChangeResource($event)"
                             @remove-resource="handleRemoveResource($event)"
                             @edit-resource="handleEditResource($event)"></resource-list>
            </v-flex>
            <v-flex fixed py-3 md6 xs12>
              <resource-detail name="Propiedad"  :baseUrl="baseUrl" v-if="renderDetail" :resource="currentResource"
                               :editable-class-data="editablePropertyData" :rdfConstructs="rdfConstructs"
                               :relatedClasses="relatedPropertyClasses"
                               @add-class-property="handleAddClassProperty($event)"
                               @remove-resource="handleRemoveTriple($event)"
                               @edit-literal-property="handleEditLiteralProperty($event)"></resource-detail>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>
      </v-tabs-items>
    </v-tabs>
    <v-snackbar
      v-model="snackbar"
      :color="color"
    >
      {{ snackbarMessage }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import ResourceList from '@/components/ResourceList'
  import ResourceDetail from '@/components/ResourceDetail'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    components: {
      'resource-list': ResourceList,
      'resource-detail': ResourceDetail
    },
    name: 'ModelContainer',
    data () {
      return {
        classes: [],
        properties: [],
        subclasses: [],
        relatedClasses: {},
        relatedPropertyClasses: {},
        editableClassData: ['rdfs_subClassOf', 'owl_equivalentClass', 'owl_disjointWith', 'rdfs_domain', 'rdfs_range', 'rdfs_label', 'rdfs_comment', 'rdfs_seeAlso'],
        editablePropertyData: ['rdfs_subPropertyOf', 'owl_equivalentProperty', 'owl_propertyDisjointWith', 'rdfs_label', 'rdfs_comment', 'rdfs_seeAlso'],
        renderDetail: false,
        currentResource: '',
        snackbar: false,
        successMessage: 'Grafo modificado con éxito',
        snackbarMessage: 'Grafo modificado con éxito',
        color: 'primary',
        items: {
          name: 'Thing',
          children: [
            {
              name: 'Organization'
            },
            {
              name: 'Address',
              children: [{
                name: 'Thoroughfare type'
              },
                {name: 'Thoroughfare number'}]
            }
          ]
        }
      }
    },
    computed: {...mapGetters(['rdfConstructs', 'baseUrl', 'getSubjectListByPredicateAndObject', 'getSubjectListByPredicate', 'getObjectListByPredicateAndSubject', 'getTriplesMatchingSubjectAndObject', 'getTriplesMatchingSubjectAndPredicateAndObject'])},
    methods: {
      ...mapActions(['addTriple', 'addResourceLiteralProperty', 'editResourceLiteralProperty', 'removeResource', 'removeTriple', 'editResource']),
      async getResources ({predicate, object}) {
        let resources = await this.getSubjectListByPredicateAndObject({predicate, object})
        return resources
      },
      async getRelatedClasses (relatedClass) {
        let classes = await this.getObjectListByPredicateAndSubject({
          predicate: this.rdfConstructs[relatedClass].value,
          subject: this.currentResource
        })
        this.$set(this.relatedClasses, relatedClass, classes)
      },
      async getRelatedPropertyClasses (relatedClass) {
        let classes = await this.getObjectListByPredicateAndSubject({
          predicate: this.rdfConstructs[relatedClass].value,
          subject: this.currentResource
        })
        this.$set(this.relatedPropertyClasses, relatedClass, classes)
      },
      handleAddResource (event) {
        try {
          this.addTriple({
            'subject': event.newResourceName,
            'predicate': this.rdfConstructs.rdf_type.value,
            'object': event.newResourceType
          })
          this.snackbarMessage = this.successMessage
          this.color = 'success'
          this.snackbar = true
        } catch (error) {
          this.handleError(error.message)
        }
        this.refreshResources()
      },
      handleAddProperty (subject, object, property) {
        try {
          this.addTriple({'subject': subject, 'predicate': property, 'object': object})
          this.snackbarMessage = this.successMessage
          this.color = 'success'
          this.snackbar = true
        } catch (error) {
          this.handleError(error.message)
        }
        this.refreshResources()
      },
      handleAddSubresource ({'resource': subject, 'parentResource': object}) {
        try {
          let resourceType = null
          let parentType = this.getObjectListByPredicateAndSubject({
            'predicate': this.rdfConstructs.rdf_type.value,
            'subject': object
          })
          if (parentType._v === undefined || parentType._v.length === 0) {
            let subclass = this.getTriplesMatchingSubjectAndPredicateAndObject(subject, this.rdfConstructs.rdfs_subClassOf.value, object)
            if (subclass != null) {
              resourceType = this.rdfConstructs.rdfs_Class
            }
          } else {
            resourceType = parentType._v[0]
          }
          this.handleAddResource({'newResourceName': subject, 'newResourceType': resourceType.value})
          if (resourceType === this.rdfConstructs.owl_Class || resourceType === this.rdfConstructs.rdfs_Class) {
            this.handleAddProperty(subject, object, this.rdfConstructs.rdfs_subClassOf.value)
          } else {
            this.handleAddProperty(subject, object, this.rdfConstructs.rdfs_subPropertyOf.value)
          }
          this.snackbarMessage = this.successMessage
          this.color = 'success'
          this.snackbar = true
        } catch (error) {
          this.handleError(error.message)
        }
        this.refreshResources()
      },
      handleAddClassProperty (triple) {
        try {
          if (triple.datatype === 'literal') {
            this.addResourceLiteralProperty({
              subject: triple.resource,
              predicate: this.rdfConstructs[triple.propertyName].value,
              object: triple.literal
            })
          } else if (triple.datatype === 'uri') {
            this.addTriple({
              'subject': triple.resource,
              'predicate': this.rdfConstructs[triple.propertyName].value,
              'object': triple.literal
            })
          }
          this.snackbarMessage = this.successMessage
          this.color = 'success'
          this.snackbar = true
        } catch (error) {
          this.handleError(error.message)
        }
        for (const item of this.editableClassData) {
          this.getRelatedClasses(item)
        }
        for (const item of this.editablePropertyData) {
          this.getRelatedPropertyClasses(item)
        }
      },
      handleChangeResource (resource) {
        this.renderDetail = true
        this.currentResource = resource
        for (const item of this.editableClassData) {
          this.getRelatedClasses(item)
        }
        for (const item of this.editablePropertyData) {
          this.getRelatedPropertyClasses(item)
        }
      },
      handleRemoveTriple ({subject, predicate, object}) {
        try {
          this.removeTriple({subject, predicate, object})
          this.snackbarMessage = this.successMessage
          this.color = 'success'
          this.snackbar = true
        } catch (error) {
          this.handleError(error.message)
        }
        this.refreshResources()
        this.handleChangeResource(this.currentResource)
      },
      handleRemoveResource (resource) {
        try {
          this.removeResource(resource)
          this.snackbarMessage = this.successMessage
          this.color = 'success'
          this.snackbar = true
        } catch (error) {
          this.handleError(error.message)
        }
        this.refreshResources()
        this.handleChangeResource(this.currentResourceName)
        this.renderDetail = false
      },
      handleEditResource ({oldResource, resource}) {
        try {
          this.editResource({'oldResource': oldResource, 'newResource': resource})
          this.snackbarMessage = this.successMessage
          this.color = 'success'
          this.snackbar = true
        } catch (error) {
          this.handleError(error.message)
        }
        this.refreshResources()
        this.handleChangeResource(resource)
      },
      handleEditLiteralProperty ({subject, predicate, object, newObject}) {
        try {
          this.editResourceLiteralProperty({
            'subject': subject,
            'predicate': this.rdfConstructs[predicate].value,
            'object': object,
            'newObject': newObject
          })
          this.snackbarMessage = this.successMessage
          this.color = 'success'
          this.snackbar = true
        } catch (error) {
          this.handleError(error.message)
        }
        for (const item of this.editableClassData) {
          this.getRelatedClasses(item)
        }
        for (const item of this.editablePropertyData) {
          this.getRelatedPropertyClasses(item)
        }
      },
      handleError (event) {
        this.snackbarMessage = event
        this.color = 'error'
        this.snackbar = true
      },
      refreshResources () {
        this.getResources({
          'predicate': this.rdfConstructs.rdf_type.value,
          'object': this.rdfConstructs.owl_Class.value
        }).then((results) => {
          this.classes = results
        })
        this.getResources({
          'predicate': this.rdfConstructs.rdf_type.value,
          'object': this.rdfConstructs.rdfs_Class.value
        }).then((results) => {
          this.classes.push(...results)
        })
        this.getResources({
          'predicate': this.rdfConstructs.rdfs_subClassOf.value,
          'object': null
        }).then((results) => {
          this.classes.push(...results)
        })
        this.getResources({
          'predicate': this.rdfConstructs.rdf_type.value,
          'object': this.rdfConstructs.owl_ObjectProperty.value
        }).then((results) => {
          this.properties = results
        })
        this.getResources({
          'predicate': this.rdfConstructs.rdf_type.value,
          'object': this.rdfConstructs.owl_DatatypeProperty.value
        }).then((results) => {
          this.properties.push(...results)
        })
        this.getResources({
          'predicate': this.rdfConstructs.rdf_type.value,
          'object': this.rdfConstructs.rdfs_subPropertyOf.value
        }).then((results) => {
          this.properties.push(...results)
        })
      }
    },
    beforeMount () {
      this.refreshResources()
    }
  }
</script>

<style scoped>

</style>
