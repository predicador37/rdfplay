<template>
  <div>
    <v-card height="100%">
      <v-card-title primary-title>
        <h1 class="headline"> {{name}}
        </h1>
        <v-fab-transition>
          <v-btn
            absolute
            small
            dark
            fab
            middle
            right
            color="pink"
            aria-label="Añadir recurso"
            @click.native.stop="openAddDialog()"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card height="100%">
            <v-card-text>
              <v-text-field v-model="newResourceName" :label="name"></v-text-field>
              <small class="grey--text">Añadir {{name}}</small>
              <v-select
                :items="types"
                v-model="newResourceType"
                :value="defaultType"
                label="Tipo de recurso"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click.native="addResourceHandler(newResourceName, newResourceType.value)">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-text>
        <v-data-table
          hide-headers
          :items="filteredResources"
          rows-per-page-text="Filas por página"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <tr :key="props.item.value" class="tableRowCursor" @click=""
                @click.stop="changeCurrentResource(props.item.value)">
              <td> {{ props.item.value}}</td>
              <td class="text-xs-right">
                <v-menu bottom right>
                  <v-btn
                    slot="activator"
                    light
                    icon
                    aria-label="Menú de acciones para recurso"
                  >
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile
                      v-for="(action,j) in actions"
                      :key="j"
                      @click=""
                      @click.native.stop="executeAction(action, props.item.value)"
                    >
                      <v-list-tile-title>{{ action.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-dialog v-model="deleteDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">¿Seguro que quieres eliminar para siempre este recurso?</v-card-title>
            <v-card-text>Si lo haces, no podrás volver a recuperarlo del grafo (a no ser que lo vuelvas a añadir,
              claro).
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native.stop="deleteDialog = false">Cancelar</v-btn>
              <v-btn color="red darken-1" flat @click.stop="deleteResourceHandler(resourceToDelete)">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-text-field v-model="resourceToEdit" :label="name"></v-text-field>
              <small class="grey--text">Editar {{name}}</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click.native.stop="editResourceHandler(oldResource, resourceToEdit)">
                Guardar
              </v-btn>
            </v-card-actions>
            <v-dialog v-model="subclassDialog" max-width="500px">
              <v-card height="100%">
                <v-card-text>
                  <v-text-field v-model="newResourceName" label="subclase"></v-text-field>
                  <small class="grey--text">Añadir sub{{name.toLowerCase()}} de {{resourceToSubresource}}</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary"
                         @click.native="addSubresourceHandler(newResourceName, resourceToSubresource)">Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      baseUrl: {
        type: String,
        required: true
      },
      resources: {
        type: Array,
        required: true
      },
      types: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        text: 'prueba',
        headers: [],
        defaultType: null,
        dialog: false,
        deleteDialog: false,
        editDialog: false,
        subclassDialog: false,
        resourceToDelete: '',
        resourceToSubresource: '',
        resourceToEdit: '',
        oldResource: '',
        newResourceName: '',
        newResourceType: '',
        filteredResources: [],
        actions: [
          {title: 'Editar', method: 'openEditDialog'},
          {title: 'Eliminar ', method: 'openDeleteDialog'},
          {title: 'Añadir sub' + this.name.toLowerCase(), method: 'openAddSubresourceDialog'}
        ]
      }
    },
    methods: {
      addResourceHandler (newResourceName, newResourceType) {
        // emit event to parent with the resourceName
        this.$emit('add-resource', {newResourceName, newResourceType})
        this.newResourceName = ''
        this.dialog = false
      },
      addSubresourceHandler (resource, parentResource) {
        // emit event to parent with the resourceName
        this.$emit('add-subresource', {resource, parentResource})
        this.newResourceName = ''
        this.subclassDialog = false
      },
      deleteResourceHandler (resource) {
        this.$emit('remove-resource', resource)
        this.deleteDialog = false
      },
      editResourceHandler (oldResource, resource) {
        this.$emit('edit-resource', {oldResource, resource})
        this.editDialog = false
      },
      openAddDialog () {
        this.newResourceName = this.baseUrl
        this.dialog = !this.dialog
      },
      openDeleteDialog (resource) {
        this.resourceToDelete = resource
        this.deleteDialog = !this.deleteDialog
      },
      openEditDialog (resource) {
        this.resourceToEdit = resource
        this.oldResource = resource
        this.editDialog = !this.editDialog
      },
      openAddSubresourceDialog (resource) {
        this.resourceToSubresource = resource
        this.newResourceName = this.baseUrl
        this.subclassDialog = !this.subclassDialog
      },
      executeAction (action, itemValue) {
        this[action.method](itemValue)
      },
      changeCurrentResource (resourceName) {
        this.$emit('change-resource', resourceName)
        this.currentResourceName = resourceName
      },
      removeDuplicates (myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
        })
      }},
    name: 'ResourceList',
    created () {
      this.headers.push({'text': this.name, 'value': this.name})
      this.defaultType = this.types[0]
      this.newResourceType = this.types[0]
    },
    watch: {
      resources (n, o) {
        this.filteredResources = this.removeDuplicates(n, 'value')
      }
    }
  }
</script>

<style scoped>
.tableRowCursor{
  cursor:pointer
}

</style>
