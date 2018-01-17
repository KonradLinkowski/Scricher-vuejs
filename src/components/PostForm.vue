<template>
  <div class="card">
    <h2>What's up?</h2>
    <textarea id="message_input" type="text" v-model="message" class="big-font wide" placeholder="What's up?"/>
    <button id="submit_button" @click="post()">Create</button>
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
      .then(data => {
        this.$emit("post-added", data)
        this.message = null
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
}
</script>

