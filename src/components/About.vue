<template>
<div id="vocabulary">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex px-3 py-3 md12 xs12>
        <v-card height="100%">
          <v-card-title primary-title>
            <h1 class="headline"> Acerca de RDFplay</h1>
          </v-card-title>

          <v-card-text>
            <p><span v-html="description"></span></p>
            <v-card v-for="(item, index) in info" :key="index">
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{item.title}}</h3>
                  <div>{{item.subtitle}}.</div>
                </div>
              </v-card-title>
            </v-card>
           <!-- <v-list three-line>
              <template v-for="(item, index) in info">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                >
                  {{ item.header }}
                </v-subheader>

                <v-divider
                  v-else-if="item.divider"
                  :inset="item.inset"
                  :key="index"
                ></v-divider>

                <v-list-tile
                  v-else
                  :key="item.title"
                  @click=""
                >
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>-->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
  export default {
    name: 'about',
    data () {
      return {
        info: [
          {'title': 'Versión',
            'subtitle': '1.0.0'},
          {'title': 'Autor',
            'subtitle': 'Miguel Expósito Martín'},
          {'title': 'Changelog',
            'subtitle': 'v1.0.0: primera publicación con funcionalidad básica de modelado, poblamiento y consulta RDF, así como carga de actividades, vocabularios e importación/exportación de grafos.'
          }
        ],
        description: 'RDFplay es un playground desarrollado 100% en Javascript utilizando <a href="https://vuejs.org/"> Vue.js </a>, cuyo propósito es acercar las tecnologías de la Web Semántica a cualquier persona inciándose en su aprendizaje. Su primera versión fue publicada como resultado del Trabajo Fin de Grado "Desarrollo de un playground para formación en tecnologías de la Web Semántica", dirigido por <a href="http://portal.uned.es/portal/page?_pageid=93,689948&_dad=portal&_schema=PORTAL"> José Luis Fernández Vindel </a> y codirigido por <a href="http://www.ia.uned.es/~rmtomas/"> Rafael Martínez Tomás </a>, del <a href="http://www.ia.uned.es/"> Departamento de Inteligencia Artificial de la Universidad Nacional de Educación a Distancia </a>, y defendido por su <a href="https://es.linkedin.com/in/expositomiguel"> autor </a> en Madrid, el 2 de Octubre de 2018.'
      }
    }
  }
</script>
<style scoped>
</style>
