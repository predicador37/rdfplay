<template>
  <vue-markdown pa-3 :source="mdText"></vue-markdown>
</template>

<script>
   import VueMarkdown from 'vue-markdown'
   export default {
     name: 'markdown-viewer',
     components: {
       'vue-markdown': VueMarkdown
     },
     props: {
       mdText: {
         default: '# Sin contenido',
         type: String
       }
     }
   }
</script>

<style scoped>

</style>
