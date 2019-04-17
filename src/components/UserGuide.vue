<template>
<div id="vocabulary">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex px-3 py-3 md12 xs12>
        <v-card height="100%">
          <v-card-title primary-title>
            <h1 class="headline"> Ayuda</h1>
          </v-card-title>

          <v-card-text>
            <p>Si bien se ha tratado de que la aplicación sea autoexplicativa a través de botones y tooltips lo suficientemente descriptivos y la inclusión de componentes de uso común por parte de cualquier usuario de una aplicación web, a continuación se ofrece una pequeña ayuda más detallada.</p>
            <h2>Punto de entrada a la aplicación</h2>
            <p> La interfaz principal se divide en cinco bloques, como se puede comprobar en la imagen:</p>
            <p>
              <img height="75%" width="75%" src="/static/home.png" alt="Captura de la interfaz principal de la aplicación."/>
            </p>
            <p>
            <ol>
              <li>Muestra u oculta el menú lateral.</li>
              <li>Muestra la actividad cargada.</li>
              <li>Se ofrecen enlaces a la página principal de la UNED e información sobre la autoría de la aplicación.</li>
              <li>Atajos a las funcionalidades principales de la aplicación.</li>
              <li>Menú con todas las funcionalidades de la aplicación.</li>
            </ol>
            </p>
            <h2>Actividades</h2>
           <p>La sección de actividades permite cargar una actividad en la aplicación desde un archivo en formato Markdown (.md), pulsando en el botón de Importar Archivo.</p>
            <h2>Vocabularios</h2>
            <p>En la sección de vocabularios se pueden cargar o des-cargar determinados vocabularios estándar. Esta funcionalidad, básicamente, añade las ternas de cada vocabulario activado al grafo principal.</p>
            <h2>Importar/Exportar</h2>
            <p>Desde esta sección es posible:</p>
            <p>
            <ul>
            <li>Importar grafo: bien desde archivo pulsando en el botón correspondiente, bien desde URL introduciendo esta en el campo de texto y pinchando en el icono de forma de lupa. Se importa un grafo en la memoria sobreescribiendo el anterior (si lo hubiera).</li>
            <li>Añadir a grafo: bien desde archivo pulsando en el botón correspondiente, bien desde URL introduciendo esta en el campo de texto y pinchando en el icono de forma de lupa. Se añaden las tripletas un grafo en la memoria, manteniendo el grafo anterior (si lo hubiera).</li>
            <li>Exportar grafo: El grafo actual puede exportarse a formato JSON-Ld o Turtle.</li>
          </ul>
            </p>
            <h2>Modelado</h2>
<p>La interfaz de modelado presenta dos pestañas printipales:</p>
            <p>
              <ul>
            <li>Clases: se ofrecen funcionalidades de creación, edición y borrado de clases así como de sus anotaciones principales.</li>
            <li>Propiedades: se ofrecen funcionalidades de creación, edición y borrado de propiedades así como de sus anotaciones principales.</li>
          </ul>
            </p>
            <p>
              La funcionalidad es la misma en ambos casos, con la salvedad de que, en el caso de creación de propiedades, se pedirá al usuario introducir el tipo de propiedad que desea crear.
            </p>
            <p>La tarjeta de la izquierda presenta un listado de recursos (clases o propiedades) en uan tabla paginada. Se pueden llevar a cabo las siguientes acciones:</p>
            <p>
              <ul>
            <li>Añadir recurso: pinchando en el botón flotante de color fucsia con el símbolo del +. Aparecerá un cuadro de diálogo donde es necesario introducir manualmente el URI del recurso (y el tipo en caso de ser propiedad).</li>
            <li>Editar recurso: pinchando en el icono con los tres puntos (a modo de menú emergente), y seleccionando "Editar". Aparecerá un cuadro de diálogo donde se podrá modificar el URI del recurso.</li>
            <li>Eliminar recurso: pinchando en el icono con los tres puntos (a modo de menú emergente), y seleccionando "Eliminar". Aparecerá un cuadro de diálogo que pedirá confirmación para eliminar el recurso y todas sus ternas asociadas.</li>
            <li>Añadir subclase o subpropiedad: pinchando en el icono con los tres puntos (a modo de menú emergente), y seleccionando "Añadir subclase" o "Añadir subpropiedad", según el caso. Aparecerá un cuadro de diálogo donde se podrá introducir el URI del nuevo recurso; una vez finalizado, se habrán almacenado dos ternas: una, indicando el tipo de recurso del que se trata (clase o propiedad); y otra, indicando que el nuevo recurso es subclase o subpropiedad del recurso padre elegido sobre cuyo icono de tres puntos se pinchó. </li>
          </ul>
            </p>
            <p>
              Por último, seleccionando un recurso en la tarjeta de la izquierda es posible visualizar sus anotaciones en un listado en forma de tabla paginada en la tarjeta de la derecha. Para cada tipo de anotación se muestra un panel expandible que puede mostrarse u ocultarse pinchando en el icono con forma de flecha hacia arriba o hacia abajo. Es posible realizar las siguientes acciones para cada tipo de anotación:
            </p>
            <p>
              <ul>
            <li>Añadir anotación: pinchando en el icono "+" asociado a una anotación puede añadirse una nueva anotación de ese tipo. En el caso de etiquetas o comentarios, la anotación introducida será siempre de tipo cadena de texto, no URI.</li>
            <li>Editar anotación: pinchando en el icono de puntos verticales a modo de menú desplegable y seleccionando "Editar", es posible modificar el valor de una anotación dada. Aparecerá un cuadro de diálogo donde se podrá modificar el URI o el texto de la anotación.</li>
            <li>Eliminar anotación: pinchando en el icono de puntos verticales a modo de menú desplegable y seleccionando "Eliminar", aparecerá un cuadro de diálogo pidiendo confirmación sobre la acción.</li>
          </ul>
            </p>

            <h2>Poblamiento</h2>
            <p>La aplicación permite añadir una instancia al grafo a través de un formulario con tres campos:</p>
            <p>
              <ul>
            <li>Sujeto: a introducir manualmente desde un campo de texto.</li>
            <li>Predicado: a introducir desde un selector, que recoge las propiedades cargadas por defecto en la aplicación así como las definidas en el grafo.</li>
            <li>Objecto: a introducir desde un selector, que recoge las clases cargadas por defecto en la aplicación así como las definidas en el grafo.</li>
          </ul>
            </p>

            <h2>Consulta</h2>
            <p>La interfaz de consulta permite lanzar consultas SPARQL al grafo local o a uno remoto. Por defecto, la aplicación está configurada para consultar el grafo local; este comportamiento puede cambiarse activando el interruptor de "Usar Endpoint SPARQL remoto" e introduciendo la URL del Endpoint en el campo de texto que aparecerá para tal efecto.</p>
            <p>Las consultas pueden introducirse en el campo de texto previsto para ello o a través de archivo pinchando en el botón "Desde archivo" o URL introduciendo la misma en el campo de texto habilitado para ello y pinchando en el icono con forma de lupa.</p>
            <p>Una vez introducida la consulta deseada, es necesario pinchar en el botón "Lanzar Consulta" para que esta se ejecute sobre el grafo; los resultados aparecerán en una tabla paginada en el área derecha de la interfaz.</p>
            <h2>Ayuda</h2>
            <p>Esta ayuda.</p>
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
        description: 'RDFplay es un playground desarrollado 100% en Javascript utilizando <a href="https://vuejs.org/"> Vue.js </a>, cuyo propósito es acercar las tecnologías de la Web Semántica a cualquier persona inciándose en su aprendizaje. Su primera versión fue publicada como resultado del Trabajo Fin de Grado "Desarrollo de un playground para formación en tecnologías de la Web Semántica", dirigido por <a href="http://portal.uned.es/portal/page?_pageid=93,689948&_dad=portal&_schema=PORTAL"> José Luis Fernández Vindel </a> y Codirigido por <a href="http://www.ia.uned.es/~rmtomas/"> Rafael Martínez Tomás </a>, del <a href="http://www.ia.uned.es/"> Departamento de Inteligencia Artificial de la Universidad Nacional de Educación a Distancia </a>, y defendido por su <a href="https://es.linkedin.com/in/expositomiguel"> autor </a> en Madrid, el 2 de Octubre de 2018.'
      }
    }
  }
</script>
<style scoped>
</style>
