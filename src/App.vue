<template>
  <div id="app" class="main-app">
    <div class="error-list">
      <Error v-for="err in errors" :key="err.id" :error="err" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Error from './components/Error.vue'
import eventBus from './util/eventbus'
export default {
  name: 'app',
  data() {
    return {
      errors: [],
      currentId: 0
    }
  },
  mounted() {
    eventBus.$on('error-thrown', error => {
      error.id = ++this.currentId
      this.errors.push(error)
    })
    eventBus.$on('event-closed', id => {
      this.errors = this.errors.filter(err => {
        return err.id != id
      })
    })
  },
  components: {
    Error
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Lato:400i');

* {
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

:root {
  --background-color: #282828;
  --yellow-color: #F4CDA5;
  --blue-color: #3C989E;
  --orange-color: #F57A82;
  --green-color: #5DB5A4;
  --red-color: #ED5276;
}

body {
  margin: 0;
  background: var(--background-color);
  color: var(--blue-color);
}

.main-app {
  margin: 10px;
}

.error-list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
