<template>
  <div class="card">
    <h2>What's up?</h2>
    <input id="message_input" type="text" v-model="message" class="big-font" placeholder="What's up?"/>
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
      this.$emit("post-added", this.message)
      this.message = null
    }
  },
  /*
  mounted: function() {
    console.log(message_input)
    message_input.onkeypress = function(e){
      if(e.keyCode==13)
      submit_button.click();
    };
  }
  */
}
</script>

