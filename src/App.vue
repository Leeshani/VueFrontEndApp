<template>
  <div id=app>

    <div class="container">
      <div class="header">
        <h1>Dijkstra's Algorithm Calculator</h1>
        <p>Discovering Optimal Routes Through Nodes Using Dijkstra's Method</p>
      </div>
      <div class="content">
        <FormSection
          v-model:fromNode=fromNode
          v-model:toNode=toNode
          :nodes=nodes
          @calculate=getShortestPath
          @clear=clearSelection
        />
        <ResultSection
          :shortestPathData="shortestPathData"
          :errorMessage="errorMessage"
          :fromNode="fromNode"
          :toNode="toNode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import FormSection from './components/FormSection.vue'
import ResultSection from './components/ResultSection.vue'

export default {
  components: {
    FormSection,
    ResultSection
  },
  setup () {
    const fromNode = ref('')
    const toNode = ref('')
    const nodes = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'])
    const shortestPathData = ref(null)
    const errorMessage = ref('')

    const getShortestPath = async ({ fromNode, toNode }) => {
      // Reset any previous results or errors
      shortestPathData.value = null
      errorMessage.value = ''

      try {
        const fromNodeValue = fromNode
        const toNodeValue = toNode

        if (!fromNode || !toNode) {
          console.error('Attempted to calculate shortest path without selecting nodes.')
          errorMessage.value = 'Both From and To nodes must be selected.'
          return
        }
        const url = new URL('https://localhost:7014/api/ShortestPath/shortestpath')
        url.searchParams.append('fromNode', fromNodeValue)
        url.searchParams.append('toNode', toNodeValue)

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          shortestPathData.value = null
          errorMessage.value = 'Failed to calculate shortest path.'
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        shortestPathData.value = data
      } catch (error) {
        shortestPathData.value = null
        errorMessage.value = 'Something went wrong. Please try again.'
      }
    }

    const clearSelection = () => {
      fromNode.value = ''
      toNode.value = ''
      shortestPathData.value = null
      errorMessage.value = ''
    }

    return {
      fromNode,
      toNode,
      nodes,
      shortestPathData,
      errorMessage,
      getShortestPath,
      clearSelection
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  margin: 2rem;
}
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .container {
        background-color: #ffffff;
        width: 80%;
        max-width: 900px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #0052cc;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .header p {
        margin: 5px 0 0;
        font-size: 14px;
      }
      .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px;
        background-color: #e1ebf9;
      }
</style>
