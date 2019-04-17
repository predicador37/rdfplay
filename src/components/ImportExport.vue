<template>
  <div id="import-export">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex px-3 py-3 md6 xs12>
          <v-card height="100%">
            <v-card-title primary-title>
              <h1 class="headline"> Importar grafo</h1>
            </v-card-title>
            <v-card-text>
              <p>Si lo deseas, puedes importar un grafo desde un archivo de texto en formato N3 o Turtle.</p>
              <file-loader title="Desde archivo" accepted="text/n3,text/ttl,application/x-trig,application/n-triples"
                           :extensions="['ttl', 'nt', 'n3', 'trig', 'owl']"
                           @load="handleLoadEvent({'event': $event, 'method': 'importN3'})" :size="500000000"
                           @load-error="handleError($event)" @loading="loading=true"></file-loader>
              <div>
                <url-loader title='Desde URL' @load="handleLoadEvent({'event': $event, 'method': 'importN3'})" @load-error="handleError($event)" @url-loaded="snackbar = true"></url-loader>
              </div>
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
            <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
              <v-container fill-height>
                <v-layout row justify-center align-center>
                  <v-progress-circular indeterminate :size="70" :width="7" :color="color"></v-progress-circular>
                </v-layout>
              </v-container>
            </v-dialog>
          </v-card>
        </v-flex>
        <v-flex px-3 py-3 md6 xs12>
          <v-card height="100%">
            <v-card-title primary-title>
              <h1 class="headline"> Exportar grafo</h1>
            </v-card-title>
            <v-card-text>
              <p>Asimismo, puedes exportar tu grafo de trabajo a un archivo de texto en formato JSON-ld o Turtle.</p>
              <v-btn type="submit" variant="primary" @click="exportJsonLD">
                Exportar JSON-ld
                <v-icon dark size="18">mdi-download</v-icon>
              </v-btn>
              <v-btn type="submit" variant="primary" @click="exportTurtle">Exportar Turtle
                <v-icon dark size="18">mdi-download</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex px-3 py-3 md6 xs12>
          <v-card height="100%">
            <v-card-title primary-title>
              <h1 class="headline"> Añadir a grafo</h1>
            </v-card-title>
            <v-card-text>
              <p>También es posible importar las tripletas de un grafo externo al grafo de trabajo.</p>
              <file-loader title="Desde archivo" accepted="text/n3,text/ttl,application/x-trig,application/n-triples"
                           :extensions="['ttl', 'nt', 'n3', 'trig']"
                           @load="handleLoadEvent({'event': $event, 'method': 'addN3'})" :size="500000000"
                           @load-error="handleError($event)" @loading="loading=true"></file-loader>
              <div>
                <url-loader title="Desde URL" @load="handleLoadEvent({'event': $event, 'method': 'addN3'})" @load-error="handleError($event)" @url-loaded="snackbar = true"></url-loader>
              </div>
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
  import FileLoader from '@/components/FileLoader'
  import URLLoader from '@/components/URLLoader'
  import {mapActions} from 'vuex'

  export default {
    name: 'ImportExport',
    components: {
      'file-loader': FileLoader,
      'url-loader': URLLoader
    },
    data () {
      return {
        snackbar: false,
        successMessage: 'Archivo importado con éxito',
        snackbarMessage: 'Archivo importado con éxito',
        color: 'primary',
        loading: false
      }
    },
    methods: {
      ...mapActions(['importN3', 'addN3', 'exportJsonLD', 'exportTurtle']),
      handleError (event) {
        this.snackbarMessage = event
        this.color = 'error'
        this.loading = false
        this.snackbar = true
      },
      handleFileLoaded (event) {
        this.snackbarMessage = event
        this.color = 'success'
        this.snackbar = true
      },
      handleLoadEvent ({event, method}) {
        try {
          this[method]({'content': event, 'store': 'n3store'})
          this.snackbarMessage = this.successMessage
          this.color = 'success'
          this.loading = false
          this.snackbar = true
        } catch (error) {
          this.loading = false
          this.handleError(error.message)
        }
      }
    }
  }
</script>

<style scoped>

</style>
