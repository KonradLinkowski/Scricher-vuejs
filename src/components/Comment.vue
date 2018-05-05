<template>
  <div class="comment">
    <p class="message">
      <span class="username">
        <router-link :to="{ path: '/' + object.user._id, params: { user: object.user } }" v-if="isNameSpecified">{{ object.user.first_name }} {{ object.user.last_name }}</router-link>
        <router-link :to="{ path: '/' + object.user._id, params: { user: object.user } }" v-else>{{ object.user.email }}</router-link>
      </span>
      {{ object.message }}
    </p>
    <span class="date">{{ getTimeAndDate }}</span>
    <button class="delete-btn" v-if="canBeRemoved" @click="removeComment()">DELETE</button>
  </div>
</template>

<script>
import { removeComment } from '../util/api'
import { getUser } from '../util/auth'
import roles from '../util/roles'
import eventBus from '../util/eventbus'
export default {
  props: [
    'object',
    'index'
  ],
  computed: {
    getTimeAndDate: function() {
      return new Date(this.object.date).toLocaleDateString() + ' ' + new Date(this.object.date).toLocaleTimeString()
    },
    isNameSpecified: function() {
      return this.object.user.first_name && this.object.user.last_name
    },
    canBeRemoved: function() {
      let user = getUser()
      return user.role == roles.ADMIN || this.object.user._id == user._id
    }
  },
  methods: {
    removeComment() {
      removeComment(this.object._id)
      .then(result => {
        this.$emit("comment-deleted", this.index)
      })
      .catch(err => {
        console.error(err)
        eventBus.$emit('error-thrown', err)
      })
    },
  }
}
</script>
<style scoped>
.comment .username * {
  color: var(--orange-color);
  text-decoration: none;
}
.date {
  color: var(--green-color);
  font-size: 0.9rem;
}
.delete-btn {
  color: var(--red-color);
  background: inherit;
  border-color: var(--red-color);
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
}
.delete-btn:hover {
  color: var(--background-color);
  background-color: var(--red-color); 
}
</style>