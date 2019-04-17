<template>
  <div id="sparql">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex px-3 py-3 md6 xs12>
          <v-card>
            <v-card-title primary-title>
              <h1 class="headline"> Consulta</h1>
            </v-card-title>
            <v-card-text>
              <sparql-query @emit-results="handleEmittedResults($event)" @error="handleError($event)"></sparql-query>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex fixed px-3 py-3 md6 xs12>
          <v-card>
            <v-card-title primary-title>
              <h1 class="headline">Resultados</h1>
            </v-card-title>
            <sparql-results v-if="renderResults" :results="queryResults"></sparql-results>
          </v-card>
          <v-dialog v-model="errorDialog" persistent max-width="500">
            <v-card>
              <v-card-title class="headline"><span class="red--text">Ha ocurrido un error</span></v-card-title>
              <v-card-text> {{ errorMessage }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat @click.native.stop="errorDialog = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import SparqlQuery from '@/components/SparqlQuery'
  import SparqlResults from '@/components/SparqlResults'
  import {mapActions} from 'vuex'
  export default {
    name: 'Sparql',
    components: {
      'sparql-query': SparqlQuery,
      'sparql-results': SparqlResults
    },
    data () {
      return {
        queryResults: [],
        renderResults: false,
        errorMessage: '',
        errorDialog: false
      }
    },
    methods: {
      ...mapActions(['importN3', 'exportJsonLD']),
      handleEmittedResults (event) {
        this.queryResults = event
        this.renderResults = true
      },
      handleError (event) {
        this.errorMessage = JSON.stringify(event)
        this.errorDialog = true
      }
    }
  }
</script>

<style scoped>

</style>
