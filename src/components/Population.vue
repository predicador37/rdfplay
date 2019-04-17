<template>
  <div id="population">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex px-3 py-3 md6 xs12>
          <v-card height="100%">
            <v-card-title primary-title>
              <h1 class="headline">Poblamiento</h1>
            </v-card-title>
            <v-card-text>
              <p>Desde aquí podrás añadir ternas arbitrarias a tu grafo. Puedes introducir cualquier URI en los
                distintos elementos del formulario, si bien se presentarán algunas sugerencias preparadas para crear
                instancias de clases ya existentes.</p>
              <v-text-field
                label="Introduce un recurso como sujeto"
                v-model="subject"
              ></v-text-field>
              <v-combobox
                v-model="predicate"
                :items="predicates"
                item-text="text"
                item-value="value"
                label="Selecciona un recurso como predicado"
                :search-input.sync="predicateSearchInput"
              >
                <template slot="selection" slot-scope="data">
                  {{ stripPrefix(data.item) }}
                </template>
                <template slot="item" slot-scope="data">
                  {{ stripPrefix(data.item) }}
                </template>

              </v-combobox>

              <v-combobox
                v-model="object"
                :items="objects"
                item-text="value"
                item-value="value"
                label="Selecciona un recurso como objeto"
                :search-input.sync="objectSearchInput"
              >
                <template slot="selection" slot-scope="data">
                  {{ stripPrefix(data.item) }}
                </template>
                <template slot="item" slot-scope="data">
                  {{ stripPrefix(data.item) }}
                </template>
              </v-combobox>
              <v-btn type="submit" variant="primary" @click="addTripleToGraph()">Añadir instancia</v-btn>
            </v-card-text>
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
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'population',
    data () {
      return {
        snackbar: false,
        snackbarMessage: 'Terna añadida con éxito',
        color: 'primary',
        subjects: [],
        predicates: [],
        objects: [],
        subject: null,
        predicate: null,
        object: null,
        subjectSearchInput: null,
        predicateSearchInput: null,
        objectSearchInput: null
      }
    },
    computed: {...mapGetters(['rdfConstructs', 'baseUrl', 'getDefaultResources', 'getSubjectListByPredicateAndObject', 'getObjectListByPredicateAndSubject'])},
    methods: { ...mapActions(['addTriple']),
      async getSubjects ({predicate, object}) {
        let resources = await this.getSubjectListByPredicateAndObject({predicate, object})
        let subjects = []
        resources.forEach((resource) => {
          subjects.push(resource.value)
        })
        return subjects
      },
      async getObjects ({predicate, subject}) {
        let resources = await this.getObjectListByPredicateAndSubject({predicate, subject})
        return resources
      },
      addTripleToGraph () {
        try {
          this.addTriple({
            'subject': this.subject,
            'predicate': this.predicateSearchInput !== null ? this.predicateSearchInput : this.predicate,
            'object': this.objectSearchInput !== null ? this.objectSearchInput : this.object
          })
          this.handleSuccess('La terna ha sido añadida con éxito')
        } catch (error) {
          this.handleError(error.message)
        } finally {
          this.subject = null
          this.predicate = null
          this.object = null
          this.predicateSearchInput = null
          this.objectSearchInput = null
        }
      },
      handleError (event) {
        this.snackbarMessage = event
        this.color = 'error'
        this.snackbar = true
      },
      handleSuccess (event) {
        this.snackbarMessage = event
        this.color = 'success'
        this.snackbar = true
      },
      stripPrefix (uri) {
        if (typeof uri === 'object') {
          return uri.value.substring(uri.value.lastIndexOf('/') + 1, uri.value.length)
        } else {
          return uri.substring(uri.lastIndexOf('/') + 1, uri.length)
        }
      }
    },
    beforeMount () {
      this.subject = this.baseUrl
      this.getSubjects({'predicate': null, 'object': null}).then((results) => {
        this.subjects = results
      })
      this.getObjects({'predicate': null, 'subject': null}).then((results) => {
        this.subjects.push(...results)
      })
      this.objects = this.getDefaultResources('class')
      this.getSubjects({'predicate': this.rdfConstructs.rdf_type.value, 'object': this.rdfConstructs.owl_Class.value}).then((results) => {
        this.objects.push(...results)
      })
      this.getSubjects({'predicate': this.rdfConstructs.rdf_type.value, 'object': this.rdfConstructs.rdfs_Class.value}).then((results) => {
        this.objects.push(...results)
      })
      this.getSubjects({'predicate': this.rdfConstructs.rdfs_subClassOf.value, 'object': null}).then((results) => {
        this.objects.push(...results)
      })
      this.predicates = this.getDefaultResources('property')
      this.getSubjects({'predicate': this.rdfConstructs.rdf_type.value, 'object': this.rdfConstructs.owl_DatatypeProperty.value}).then((results) => {
        this.predicates.push(...results)
      })
      this.getSubjects({'predicate': this.rdfConstructs.rdf_type.value, 'object': this.rdfConstructs.owl_ObjectProperty.value}).then((results) => {
        this.predicates.push(...results)
      })
    }
  }
</script>

<style scoped>

</style>
