<template>
  <nav>
    <ul class="main-navbar">
      <li class="nav-item">
        <router-link class="nav-button" :to="{ path: '/' }">Main Page</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-button" :to="{ path: '/' + user._id, params: { user: user } }">{{ username }}</router-link>
      </li>
      <li class="nav-item">
        <button class="nav-button" @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { getUser, logout } from '../util/auth'
export default {
  data() {
    return {
      user: getUser()
    }
  },
  computed: {
    username: function() {
      if (this.user.first_name && this.user.last_name) {
        return this.user.first_name + ' ' +  this.user.last_name
      } else {
        return this.user.email
      }
    }
  },
  methods: {
    logout() {
      logout()
    }
  }
}
</script>
<style scoped>
.main-navbar {
  display: flex;
  padding: 0;
}

.main-navbar .nav-item {
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-button {
  display: block;
  text-decoration: none;
  margin: 10px;
  color: var(--red-color);
  border-color: var(--red-color);
  border-style: solid;
  border-width: 2px;
  background-color: inherit;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
}

.nav-button:hover {
  color: var(--background-color);
  background-color: var(--red-color);
}
</style>
