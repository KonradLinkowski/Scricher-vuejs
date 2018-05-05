<template>
  <section class="post-form">
    <h2 class="header">Create post</h2>
    <textarea class="message-input" @keydown.ctrl.enter="post()" type="text" v-model="message" placeholder="What's up?"/>
    <button class="submit-button" @click="post()">Create</button>
  </section>
</template>
<script>
import { sendPost } from '../util/api'
import eventBus from '../util/eventbus'
export default {
  data() {
    return {
      message: null
    }
  },
  methods: {
    post() {
      sendPost(this.message)
      .then(data => {
        this.$emit("post-added", data)
        this.message = null
      })
      .catch(err => {
        console.error(err)
        eventBus.$emit('error-thrown', err)
      })
    }
  },
}
</script>
<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
}

.header {
  color: var(--orange-color)
}

.message-input {
  font-size: 1.1rem;
  color: var(--blue-color);
  resize: none;
  height: 7rem;
  background: var(--background-color);
  border-color: var(--green-color);
  padding: 10px;
}
.message-input::placeholder {
  color: var(--green-color)
}

.submit-button {
  align-self: flex-end;
  flex: 0;
  color: var(--red-color);
  border-color: var(--red-color);
  border-style: solid;
  border-width: 2px;
  background-color: inherit;
  padding: 10px;
  cursor: pointer;
}

.submit-button:hover {
  color: var(--background-color);
  background-color: var(--red-color);
}
</style>

