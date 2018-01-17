<template>
  <div class="comment">
    <router-link :to="{ path: '/' + object.user._id, params: { user: object.user } }" v-if="isNameSpecified">{{ object.user.first_name }} {{ object.user.last_name }}</router-link>
    <router-link :to="{ path: '/' + object.user._id, params: { user: object.user } }" v-else>{{ object.user.email }}</router-link>
    <p>{{ object.message }}</p>
    <span>{{ getTimeAndDate }}</span>
    <p v-if="canBeRemoved" @click="removeComment()">DELETE</p>
  </div>
</template>

<script>
import { removeComment } from '../util/api'
import { getUser } from '../util/auth'
import roles from '../util/roles'
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
      return this.object.user.first_name && this.object.user.last_name;
    },
    canBeRemoved: function() {
      let user = getUser()
      console.log(user.role, roles.ADMIN, this.object.user._id, user._id)
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
        console.log(err)
      })
    },
  }
}
</script>

