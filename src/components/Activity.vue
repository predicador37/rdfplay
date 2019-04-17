<template>
  <div id="activity">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex px-3 py-3 md12 xs12>
          <v-card height="100%">
            <v-card-title primary-title>
              <h1 class="headline"> Carga de actividad</h1>
            </v-card-title>
            <v-card-text>
              <p>Si lo deseas, puedes importar una actividad desde un archivo de texto en formato Markdown.</p>
              <file-loader @load-error="handleError($event)" @load="handleLoadEvent($event)"
                           accepted="text/markdown"></file-loader>
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
      <v-layout row wrap>
        <v-flex px-3 py-3 md12 xs12>
          <v-card height="100%">
            <v-card-title primary-title>
              <h1 class="headline"> Contenido de la actividad</h1>
            </v-card-title>
            <v-card-text>
              <markdown-viewer class="pa-3" :mdText="activity"></markdown-viewer>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import FileLoader from '@/components/FileLoader'
  import MarkdownViewer from '@/components/MarkdownViewer'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'ImportExport',
    components: {
      'file-loader': FileLoader,
      'markdown-viewer': MarkdownViewer
    },
    computed: {...mapGetters(['activity'])},
    data () {
      return {
        snackbar: false,
        successMessage: 'Archivo importado con éxito',
        snackbarMessage: 'Archivo importado con éxito',
        color: 'primary'
      }
    },
    methods: {
      ...mapActions(['setActivity']),
      handleError (event) {
        this.snackbarMessage = event
        this.color = 'error'
        this.snackbar = true
      },
      handleLoadEvent (event) {
        try {
          this.setActivity(event)
          this.snackbarMessage = this.successMessage
          this.color = 'success'
          this.snackbar = true
        } catch (error) {
          this.handleError(error)
        }
      }
    }
  }
</script>

<style scoped>

</style>
