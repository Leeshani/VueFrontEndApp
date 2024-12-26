<template>
  <div class="result-section">
    <div v-if="shortestPathData">
      <h3>Result</h3>
      <div>
        <p><strong>From Node Name = </strong> {{ fromNode }}</p>
        <p><strong>To Node Name = </strong> {{ toNode }}</p>
        <p><strong>Nodes Traversed:</strong> {{ shortestPathData.nodeNames.join(' → ') }}</p>
        <p><strong>Total Distance:</strong> {{ shortestPathData.distance }}</p>
      </div>
    </div>
    <div v-else-if="errorMessage">
      <h2>Error</h2>
      <p style="color: red;">{{ errorMessage }}</p>
    </div>
    <div v-else>
      <h3>Graph</h3>
      <img class="image-container" :src="require('@/assets/dijekstra.png')" alt="Placeholder" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shortestPathData: Object,
    errorMessage: String,
    fromNode: String,
    toNode: String
  }
}
</script>
<style scoped>
      .image-container {
          max-width: 100%;
          max-height: 300px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .result-section {
        background-color: #ffffff;
        border-radius: 10px;
        padding: 20px;
        flex: 1;
        margin: 0 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .result-section h3 {
        margin-top: 0;
        color:blue;
      }
      .result-section .result-text {
        display: none;
      }
      .result-section .placeholder {
        display: block;
      }
      .error-message {
        color: red;
        font-weight: bold;
        margin-top: 10px;
      }
</style>
