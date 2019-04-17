<template>
  <div>
    <v-card height="100%">
      <v-card-title primary-title>
        <div class="headline"> Descripción de {{name.toLowerCase()}} {{resource.split('#')[1]}}
        </div>
      </v-card-title>
      <v-card-text>
        <v-expansion-panel
          expand
        >
          <v-expansion-panel-content
            v-for="(item,index) in editableClassData"
            :key="index"
          >
            <div  slot="header">
              <v-tooltip top>
                <v-btn class="text-md-right" aria-label="Añadir propiedad" slot="activator" icon ripple @click.native.stop="addPropertyHandler(item)">
                  <v-icon color="primary lighten-1">add</v-icon>
                </v-btn>
                <span>Añadir</span>
              </v-tooltip>
              {{rdfConstructs[item].desc_plural}}
            </div>
            <v-data-table
              hide-headers
              :items="relatedClasses[item]"
              rows-per-page-text="Filas por página"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <tr :key="props.item.value" class="tableRowCursor" @click="">
                  <td> {{ props.item.value}}</td>
                  <td class="text-xs-right">
                    <v-menu bottom right>
                      <v-btn
                        slot="activator"
                        light
                        icon
                        aria-label="Menú de acciones para propiedad"
                      >
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile
                          v-for="(action,j) in actions"
                          :key="j"
                          @click=""
                          @click.native.stop="executeAction(action, item, props.item.value)"
                        >
                          <v-list-tile-title>{{ action.title }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </template>
            </v-data-table>

          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-text-field v-model="currentLiteral" :label="dialogText"></v-text-field>
              <small class="grey--text">Añadir {{ dialogText }} para la clase.</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click.native.stop="addClassPropertyHandler">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="deleteDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">¿Seguro que quieres eliminar para siempre este recurso?
            </v-card-title>
            <v-card-text>Si lo haces, no podrás volver a recuperarlo del grafo (a no ser que lo vuelvas a
              añadir, claro).
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native.stop="deleteDialog = false">Cancelar</v-btn>
              <v-btn color="red darken-1" flat
                     @click.stop="deleteResourceHandler(currentItem, resourceToDelete)">Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-text-field v-model="currentLiteral" :label="dialogText"></v-text-field>
              <small class="grey--text">Editar {{ dialogText }} para la clase.</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click.native.stop="editClassLiteralPropertyHandler">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
  </div>

</template>

<script>
  export default {
    name: 'ResourceDetail',
    props: {
      name: {
        type: String,
        required: true
      },
      baseUrl: {
        type: String,
        required: true
      },
      resource: {
        type: String,
        required: true
      },
      editableClassData: {
        type: Array,
        required: true
      },
      rdfConstructs: {
        type: Object,
        required: true
      },
      relatedClasses: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        currentProperty: null,
        currentPropertyType: null,
        currentLiteral: null,
        dialog: false,
        dialogText: '',
        deleteDialog: false,
        editDialog: false,
        resourceToDelete: '',
        resourceToEdit: '',
        currentItem: '',
        actions: [
          {title: 'Editar', method: 'openEditDialog'},
          {title: 'Eliminar ', method: 'openDeleteDialog'}
        ]
      }
    },
    methods: {
      addPropertyHandler (property) {
        this.currentProperty = property
        this.currentPropertyType = this.rdfConstructs[property].datatype
        if (this.currentPropertyType === 'uri') {
          this.currentLiteral = this.baseUrl
        } else {
          this.currentLiteral = ''
        }
        this.dialogText = this.rdfConstructs[property].desc
        this.dialog = !this.dialog
      },
      addClassPropertyHandler () {
        this.$emit('add-class-property', {'resource': this.resource, 'propertyName': this.currentProperty, 'literal': this.currentLiteral, 'datatype': this.currentPropertyType})
        this.dialog = false
        this.currentLiteral = null
      },
      openDeleteDialog (item, resource) {
        this.resourceToDelete = resource
        this.currentItem = this.rdfConstructs[item].value
        this.deleteDialog = !this.deleteDialog
      },
      openEditDialog (item, resource) {
        this.resourceToEdit = resource // object
        this.currentItem = item // predicate
        this.dialogText = this.rdfConstructs[item].desc
        this.currentLiteral = resource
        this.editDialog = !this.editDialog
      },
      executeAction (action, item, resource) {
        this[action.method](item, resource)
      },
      deleteResourceHandler (predicate, object) {
        this.$emit('remove-resource', {'subject': this.resource, 'predicate': predicate, 'object': object})
        this.deleteDialog = false
      },
      editClassLiteralPropertyHandler () {
        this.$emit('edit-literal-property', {'subject': this.resource, 'predicate': this.currentItem, 'object': this.resourceToEdit, 'newObject': this.currentLiteral})
        this.editDialog = false
        this.currentLiteral = null
        this.resourceToEdit = ''
      }
    }
  }
</script>

<style scoped>

</style>
