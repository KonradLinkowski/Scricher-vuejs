<template>
  <div class="card">
    <h2>What's up?</h2>
    <input type="text" v-model="message" class="big-font"/>
    <button @click="post()">Create</button>
  </div>
</template>
<script>
import { sendPost } from '../util/api'

export default {
  data() {
    return {
      message: null
    }
  },
  methods: {
    post() {
      sendPost(this.message)
    }
  }
}
</script>

