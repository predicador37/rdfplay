<template>
  <div id="vocabulary">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex px-3 py-3 md12 xs12>
          <v-card height="100%">
            <v-card-title primary-title>
              <h1 class="headline"> Precargar vocabularios</h1>
            </v-card-title>
            <v-card-text>
              <p>Desde aquí puedes precargar algunos de los vocabularios más utilizados en tu grafo para poder
                utilizarlos posteriormente en tus consultas SPARQL.</p>
              <v-switch v-for="vocab in vocabularies" v-model="selectedVocabulary[vocab.name]" :key="vocab.name"
                        @change="changeVocabularyState(vocab.name)" :value="vocab.active" :label="vocab.name"
                        :false-value="{name: vocab.name, method: 'delN3', url: vocab.url, active: false}"
                        :true-value="{name: vocab.name, method: 'addN3', url: vocab.url, active: true}"></v-switch>
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
    name: 'vocabulary',
    data () {
      return {
        selectedVocabulary: {},
        snackbar: false,
        snackbarMessage: 'Vocabulario importado',
        color: 'primary',
        vocabularyList: {}
      }
    },
    computed: {...mapGetters(['vocabularies'])},
    methods: { ...mapActions(['addN3', 'delN3', 'setVocabularyState']),
      changeVocabularyState (vocab) {
        this.$http.get(this.selectedVocabulary[vocab].url).then(response => {
          // get body data
          this.setVocabularyState({'vocabulary': this.selectedVocabulary[vocab].name, 'active': this.selectedVocabulary[vocab].active})
          this[this.selectedVocabulary[vocab].method]({'content': response.body, 'store': 'n3store'})
        }, response => {
          // error callback
          console.log('ocurrio un error')
          this.snackbarMessage = 'Ocurrió un error al cargar el vocabulario. Revise la conexión a Internet.'
          this.color = 'error'
          this.snackbar = true
          this.setVocabularyState({'vocabulary': this.selectedVocabulary[vocab].name, 'active': !this.selectedVocabulary[vocab].name})
        })
      }
    },
    beforeMount () {
      this.vocabularyList = this.vocabularies
      this.selectedVocabulary = this.vocabularies
    }
  }
</script>

<style scoped>

</style>
