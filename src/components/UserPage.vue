<template>
  <div class="wrapper" id="maindiv">
    <Navbar />
    <div class="user-info">
      <p> First name: <strong>{{ user.first_name }}</strong></p>
      <p> Last name: <strong>{{ user.last_name }}</strong></p>
      <p> Email: <strong>{{ user.email }}</strong></p>
      <button class="delete-btn" v-if="canBeDeleted" @click="removeAccount">DELETE ACCOUNT</button>
    </div>
    <div class="" v-for="item in list" :key='item._id'>
      <Post :object="item" />
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <span slot="no-more">
        There is no more posts :(
      </span>
    </infinite-loading>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import Post from './Post'
import Navbar from './Navbar'
import { getUsersPosts, getUserById, removeUser } from '../util/api'
import { logout, getUser } from '../util/auth'
import router from '../router'
import roles from '../util/roles'
export default {
  name: 'UserPage',
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: ''
      },
      list: [],
    };
  },
  computed: {
    canBeDeleted: function() {
      let user = getUser()
      return user.role == roles.ADMIN || user._id == this.$route.params.userid
    }
  },
  watch: {
    '$route.params.userid': function () {
      getUserById(this.$route.params.userid)
      .then(user => {
        this.user = user
      })
      .catch(error => {
        console.error(error);window.alert(error.data); 
      })
    }
  },
  methods: {
    infiniteHandler($state) {
      getUsersPosts(this.$route.params.userid, {
        limit: 10,
        newest: this.list.length ? this.list[this.list.length - 1].date : undefined
      })
      .then(data => {
          if (data.length) {
            this.list = this.list.concat(data)
            $state.loaded();
          } else {
            $state.complete();
          }
      })
    },
    removeAccount() {
      removeUser(this.user._id)
      .then(data => {
        switch(getUser().role) {
          case roles.ADMIN:
          router.push('/')
          break
          default:
          logout()
          break
        }
      })
      .catch(err => {
        console.error(err);window.alert(err.data);
      })
    }
  },
  mounted() {
    getUserById(this.$route.params.userid)
    .then(user => {
      this.user = user
    })
    .catch(error => {
      console.error(error);window.alert(error.data); 
    })
  },
  components: {
    InfiniteLoading,
    Post,
    Navbar
  },
};
</script>
<style scoped>
.delete-btn {
  color: var(--red-color);
  background: inherit;
  border-color: var(--red-color);
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
}
</style>
