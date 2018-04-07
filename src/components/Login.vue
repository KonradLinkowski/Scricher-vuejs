<template>
  <div class="login">
    <h2>Log in!</h2>
    <form class="form-user" @submit.prevent="login()">
      <label for="email">Email</label>
      <input v-model="email" type="text" id="login_email"
        name="email" placeholder="user@exmaple.com" required pattern=".+@.+[.].+">

      <label for="password">Password</label>
      <input v-model="password" type="password" id="login_password" name="password" placeholder="password" required>
    
      <input type="submit" value="Log in">
    </form>
  </div>
</template>
<script>
import { login, test } from '../util/auth'
export default {
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    login() {
      login(this.email, this.password);
    }
  }
}
</script>
<style scoped>
.form-user {
  display: flex;
  flex-direction: column;
  width: 300px;
}
</style>

