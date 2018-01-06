<template>
  <article class="container vert-cont">
    <h1>Welcome on Scricher</h1>
    <div class="container">
      <div class="container col8">
        <!--img src="https://vectr.com/konowy/i3Q2IXrnWA.png?width=1280&height=1280&select=i3Q2IXrnWApage0"-->
      </div>
      <div class="container vert-cont col4">
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
<style>
* {
  color: rgb(176, 176, 177);
}
body {
  background-color:#282828
}
article {
  text-align: center;
}
svg {
  min-width: 0;
}
.col8 {
  flex: 8;
}
.col4 {
  flex: 4;
}
.col6 {
  flex: 6;
}
.vert-cont {
  flex-direction: column;
}
.container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
}
.half {
  width: 50%;
  height: 50%;
}
.card {
  border-radius: 5px;
  background-color: rgb(51, 51, 51);
  padding: 20px;
  margin: 20px;
}
.form-user {
  width: 100%;
  height: 100%;
}

.form-user input, select {
  background-color:#070016;
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    color: rgb(206, 116, 58);
}

.form-user input[type=submit] {
    width: 100%;
    background-color: rgb(58, 58, 65);
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.form-user input[type=submit]:hover {
    background-color: rgb(63, 63, 70);
}
</style>
