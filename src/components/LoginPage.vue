<template>
  <article class="container vert-cont">
    <h1>Welcome on Scricher</h1>
    <router-link to="/">Click me</router-link>
    <div class="container">
      <div class="container col8">
        <!--img src="https://vectr.com/konowy/i3Q2IXrnWA.png?width=1280&height=1280&select=i3Q2IXrnWApage0"-->
      </div>
      <div class="container vert-cont col4 no-shrink">
        <Login />
        <Register />
      </div>
    </div>
  </article>
</template>

<script>
import Login from './Login.vue';
import Register from './Register.vue'

export default {
    name: 'MainPage',
    data() {
        return {

        }
    },
    components: {
        Login,
        Register
    }
}
</script>