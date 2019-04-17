<template>
  <div>
    <v-switch
      v-model="external"
      value="false"
      input-value="false"
      label="Usar Endpoint SPARQL remoto"
    ></v-switch>
    <v-text-field
      v-if="external"
      :disabled="!external"
      v-model="endpointURL"
      value
      label="Introduce la URL del endpoint SPARQL remoto"
    ></v-text-field>
    <div class="py-3">
      <v-textarea
        solo
        v-model="query"
        name="sparql_query"
        :auto-grow="true"
        label="Consulta SPARQL"
        value="SELECT ?s ?p ?o WHERE {?s ?p ?o .} LIMIT 100"
        hint="Consulta de ejemplo"
      ></v-textarea>
    </div>
    <v-btn
      color="primary"
      type="submit"
      variant="primary"
      :loading="loading"
      @click.native="executeSparqlQuery(query)"
    >Lanzar consulta</v-btn>
    <v-divider class="my-3"></v-divider>
    <div class="subheading my-3">Cargar consulta</div>
    <div>
      <file-loader title="Desde archivo" @load="loadSparqlQuery($event)" :extensions="['rq']"></file-loader>
    </div>
    <div>
      <url-loader
        title="Desde URL"
        @load="loadSparqlQuery($event)"
        @load-error="handleError($event)"
        @url-loaded="snackbar = true"
      ></url-loader>
    </div>
    <v-snackbar v-model="snackbar" :color="color">
      {{ snackbarMessage }}
      <v-btn dark flat @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FileLoader from '@/components/FileLoader'
import URLLoader from '@/components/URLLoader'
export default {
  name: 'SparqlQuery',
  data () {
    return {
      query: '',
      results: [],
      endpointURL: 'https://query.wikidata.org/sparql',
      external: false,
      loading: false,
      snackbar: false,
      successMessage: 'Consulta importada con éxito',
      snackbarMessage: 'Consulta importada con éxito',
      color: 'primary',
      warningMsg: '# ADVERTENCIA: la siguiente consulta de ejemplo no debería ser lanzada contra endpoints externos como Wikidata, ya que intentaría recuperar todas sus ternas (millones) y esto produciría un overflow.\n'
    }
  },
  components: {
    'file-loader': FileLoader,
    'url-loader': URLLoader
  },
  computed: { ...mapGetters(['getStoreQuads', 'prefixes']) },
  methods: {
    async executeSparqlQuery (query) {
      this.loading = true
      let results = []
      if (this.external) {
        try {
          results = await this.executeExternalSparqlQuery(query, this.endpointURL)
        } catch (error) {
          this.$emit('error', error.message)
        }
      } else {
        try {
          results = await this.executeInternalSparqlQuery(query)
        } catch (error) {
          this.$emit('error', error.message)
        }
      }
      this.$emit('emit-results', results)
      this.loading = false
    },
    executeInternalSparqlQuery (query) {
      console.log('executing new sparql query')
      const newEngine = require('@comunica/actor-init-sparql-rdfjs').newEngine
      const source = {
        match: (s, p, o, g) => {
          return require('streamify-array')(this.getStoreQuads(s, p, o, g))
        }
      }
      const myEngine = newEngine()
      let results = []
      return new Promise((resolve, reject) => {
        myEngine.query(query,
          { 'sources': [{ type: 'rdfjsSource', value: source }] })
          .then((result) => {
            result.bindingsStream.on('data', function (data) {
              // Each data object contains a mapping from variables to RDFJS terms.
              results.push(data)
            }).on('end', function () {
              resolve(results)
            }).on('error', function (error) {
              console.log(error)
              reject(error)
            })
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    executeExternalSparqlQuery (query, url) {
      const newEngine = require('@comunica/actor-init-sparql').newEngine
      const myEngine = newEngine()
      let results = []
      return new Promise((resolve, reject) => {
        myEngine.query(query, { sources: [{ type: 'sparql', value: url }] })
          .then(function (result) {
            result.bindingsStream.on('data', function (data) {
              results.push(data)
            }).on('end', function () {
              resolve(results)
            })
          })
          .catch(function (e) { reject(Error(e)) })
      })
    },
    loadSparqlQuery (content) {
      this.query = content
    },
    handleError (event) {
      this.snackbarMessage = event
      this.color = 'error'
      this.snackbar = true
    }
  },
  beforeMount () {
    this.query = this.warningMsg + this.prefixes + 'SELECT ?s ?p ?o WHERE {?s ?p ?o .} LIMIT 100'
  }
}
</script>

<style scoped>
</style>
