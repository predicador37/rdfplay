<template>
  <div id="home-editor">
    <v-container fill-height fluid>
      <v-layout align-center>
        <v-flex>
          <v-jumbotron height="100%" color="grey lighten-2">
            <v-container fill-height fluid>
              <v-layout align-center>
                <v-flex>
                  <h1 class="display-3">{{welcome_message}}</h1>
                  <span class="subheading">{{welcome_description}}</span>
                  <v-divider class="my-3"></v-divider>
                  <div class="title mb-3"> ¡Elige con qué quieres trabajar!</div>
                  <v-btn large color="primary" class="mx-3" to="/activity">Actividad</v-btn>
                  <v-btn large color="primary" class="mx-3" to="/model">Modelar</v-btn>
                  <v-btn large color="primary" class="mx-3" to="/population">Poblar</v-btn>
                  <v-btn large color="primary" class="mx-3" to="/import-export">Importar</v-btn>
                  <v-btn large color="primary" class="mx-3" to="/sparql">Consultar</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        welcome_message: 'Playground para la Web Semántica',
        welcome_description: 'Con este playground podrás modelar tu dominio de conocimiento, dotarlo de contenido semántico y lanzar consultas sobre él.'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
