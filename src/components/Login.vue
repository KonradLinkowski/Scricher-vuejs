<template>
  <div class="login">
    <h2>Log in!</h2>
    <form class="form-user" @submit.prevent="login()">
      <label class="label" for="login_email">Email</label>
      <input class="input" v-model="email" type="text" id="login_email"
        name="email" placeholder="user@exmaple.com" required pattern=".+@.+[.].+">

      <label class="label" for="login_password">Password</label>
      <input class="input" v-model="password" type="password" id="login_password" name="password" placeholder="password" required>
    
      <input class="submit-btn" type="submit" value="Log in">
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

.label {
  color: var(--red-color);
}

.input {
  padding: 10px;
  margin: 5px 0;
  color: var(--yellow-color);
  height: 2.3rem;
  background-color: var(--background-color);
  border: 1px solid var(--green-color);
}

.input::placeholder {
  color: var(--green-color);
}

.submit-btn {
  color: var(--yellow-color);
  background: var(--background-color);
  border: 1px solid var(--yellow-color);
  padding: 5px;
}

.submit-btn:hover {
  color: var(--background-color);
  background: var(--yellow-color);
  cursor: pointer;
}
</style>

