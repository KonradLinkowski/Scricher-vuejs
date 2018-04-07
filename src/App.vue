<template>
  <div id="app" class="main-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
</style>
