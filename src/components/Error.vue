<template>
  <div class="error-box">
    <span class="error-msg">{{ error.message }}</span>
    <button class="close" @click="closeError()">X</button>
  </div>
</template>
<script>
import eventBus from "../util/eventbus"
export default {
  props: {
    error: {
      type: Object,
      default() {
        return {
          message: 'Error'
        }
      }
    },
    index: {
      type: Number
    }
  },
  methods: {
    closeError() {
      eventBus.$emit('event-closed', this.error.id)
    }
  }
}
</script>
<style scoped>
.error-box {
  width: 100%;
  height: 3rem;
  background-color: var(--red-color);
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 8px 6px -6px #000;
}

.error-msg {
  color: var(--background-color);
  text-align: center;
}

.close {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: var(--background-color);
  cursor: pointer;
}
</style>