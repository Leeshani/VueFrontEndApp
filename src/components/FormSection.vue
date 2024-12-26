<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="form-section">
         <h3>Select Path</h3>
        <label for='fromNode'>From Node:</label>
        <select id='fromNode' :value='fromNode' @input='updateFromNode($event)' aria-label="Select From Node">
          <option disabled value=''>Select</option>
          <option v-for='node in nodes' :key='node' :value='node'>
            {{ node }}
          </option>
        </select>
        <label for='toNode'>To Node:</label>
        <select id='toNode' :value='toNode' @input='updateToNode($event)' aria-label="Select To Node">
          <option disabled value=''>Select</option>
          <option v-for='node in nodes' :key='node' :value='node'>
            {{ node }}
          </option>
        </select>
      <div class="button-container">
      <button type='button' id="clearButton" @click='clear' :disabled="!fromNode || !toNode">Clear</button>
      <button type='submit' id="calculateButton"  :disabled="!fromNode || !toNode">Calculate <i class="fas fa-calculator"></i> </button>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    fromNode: {
      type: String,
      required: true
    },
    toNode: {
      type: String,
      required: true
    },
    nodes: {
      type: Array,
      required: true
    }
  },
  emits: ['calculate', 'clear', 'update:fromNode', 'update:toNode'],
  methods: {
    handleSubmit () {
      this.$emit('calculate', {
        fromNode: this.fromNode,
        toNode: this.toNode
      })
    },
    clear () {
      this.$emit('update:fromNode', '')
      this.$emit('update:toNode', '')
      this.$emit('clear')
    },
    updateFromNode (event) {
      this.$emit('update:fromNode', event.target.value)
    },
    updateToNode (event) {
      this.$emit('update:toNode', event.target.value)
    }
  }
}
</script>

<style scoped>
.form-section,
      .result-section {
        background-color: #ffffff;
        border-radius: 10px;
        padding: 20px;
        flex: 1;
        margin: 0 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .form-section {
        flex: 0.6;
      }
      .form-section h3,
      .result-section h3 {
        margin-top: 0;
        color:blue;
      }
      .form-section select {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
      }
      .form-section button {
        width: 48%;
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
      }
      button:disabled {
        cursor: default;
        opacity: 0.6;
      }
      #clearButton {
        background-color: #ffffff;
        color: #ff7043;
        border: 2px solid #ff7043;
        margin-right: 4%;
      }
      #calculateButton {
        background-color: #ff7043;
        color: white;
      }
      .form-section .button-container {
        display: flex;
        justify-content: space-between;
      }
      button:hover {
      background-color: #ff7043d0;
      }
</style>
