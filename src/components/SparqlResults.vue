<template>
  <v-data-table
    :headers="headers"
    :items="values"
    rows-per-page-text="Filas por página"
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td v-for="(item, key, index) in props.item"> {{ item }}</td>
    </template>
  </v-data-table>
</template>

<script>
    export default {
      name: 'SparqlResults',
      props: {
        results: {
          type: Array,
          required: true
        }
      },
      data () {
        return {
          resultList: [],
          headers: [],
          values: []
        }
      },
      created () {
        this.resultList = this.results  // Copy prop to local variable
      },
      watch: {
        results: function (newVal, oldVal) { // watch it
          this.resultList = newVal
          this.getHeaders()
        }
      },
      methods: {
        getHeaders () {
          let headers = []
          let rows = []
          if (typeof this.resultList !== 'undefined' && this.resultList.length > 0) {
            this.resultList[0].forEach((value, key) => headers.push({'text': key, 'value': key}))
            for (let item of this.resultList) {
              let values = []
              let result = {}
              for (let [key, value] of Object.entries(item.toObject())) {
                values.push(value ? Object.values(value)[0] : 'undefined')
                result[key] = value ? Object.values(value)[0] : 'undefined'
              }
              rows.push(result)
            }
            this.headers = headers
            this.values = rows
          }
        }
      },
      beforeMount () {
        this.getHeaders()
      }
    }
</script>

<style scoped>

</style>
