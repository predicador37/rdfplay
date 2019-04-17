<template>
  <div class="pt-3 pl-2">
    <v-text-field
      v-model="url"
      label="Desde URL"
      solo append-icon="search"
      @click:append="getFromURL" hide-details single-line></v-text-field>
  </div>
</template>

<script>
  export default {
    name: 'url-loader',
    props: {
      title: {
        default: 'Importar URL',
        type: String
      }
    },
    methods: {
      getFromURL () {
        console.log('getting file from url')
        this.$http.get(this.url.trim()).then(response => {
          // get body data
          this.$emit('load', response.body)
        }, response => {
          this.$emit('load-error', response.statusText)
          // error callback
        })
      }
    },
    data () {
      return {
        url: ''
      }
    }
  }
</script>

<style scoped>
  .jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;

  }
  .btn-txt {
    padding: 20px;
  }
</style>
