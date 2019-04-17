<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      dark
      class="primary">
      <v-toolbar-side-icon aria-label="Menú" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip left>
      <v-btn icon
             slot="activator"
             @click.stop="dialog = !dialog"
             aria-label="Ver actividad"
      >
        <v-icon>mdi-book-open-page-variant</v-icon>
      </v-btn>
        <span>Ver actividad</span>
      </v-tooltip>
    </v-toolbar>
    <v-content>

        <router-view/>

    </v-content>

    <v-footer app dark class="primary">
      <v-layout
        justify-center
        row
        wrap
      >
      <v-spacer></v-spacer>
        <v-flex>
          <v-btn
            color="white"
            flat
            round
            to="/about"
          >
           Acerca de {{title}}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-footer>
    <v-dialog v-model="dialog" max-width="1000px">
      <v-card height="100%">
        <v-card-title primary-title>
          <div class="headline"> Contenido de la actividad</div>
        </v-card-title>
        <v-card-text>
          <markdown-viewer v-if="activity" class="pa-3" :mdText="activity"></markdown-viewer>
          <p v-else>Aún no se ha cargado ninguna actividad.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click.native="dialog=!dialog">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MarkdownViewer from '@/components/MarkdownViewer'
  export default {

    data () {
      return {
        drawer: null,
        dialog: false,
        miniVariant: false,
        clipped: false,
        items: [{
          icon: 'mdi-home',
          title: 'Inicio',
          link: '/'
        },
        {
          icon: 'mdi-book-open-page-variant',
          title: 'Actividades',
          link: '/activity'
        },
        {
          icon: 'mdi-school',
          title: 'Vocabularios',
          link: '/vocabulary'
        },
        {
          icon: 'mdi-swap-vertical',
          title: 'Importar/Exportar',
          link: '/import-export'
        },
        {
          icon: 'mdi-cube-outline',
          title: 'Modelado',
          link: '/model'
        },
        {
          icon: 'mdi-account-multiple-plus',
          title: 'Poblamiento',
          link: '/population'
        },
        {
          icon: 'mdi-database-search',
          title: 'Consulta',
          link: '/sparql'
        },
        {
          icon: 'mdi-help-circle',
          title: 'Ayuda',
          link: '/user-guide'
        }],
        title: 'RDFplay'
      }
    },
    computed: {...mapGetters(['activity'])},
    name: 'App',
    components: {
      'markdown-viewer': MarkdownViewer
    }
  }
</script>
