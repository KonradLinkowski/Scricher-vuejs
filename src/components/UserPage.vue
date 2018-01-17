<template>
  <div class="container vert-cont" id="maindiv">
    <div class="card">
      <p> First name: {{ user.first_name }}</p>
      <p> Last name: {{ user.last_name }}</p>
      <p> Email: {{ user.email }} </p>
      <p color="red" @click="removeAccount">DELETE ACCOUNT</p>
    </div>
    <div class="container vert-cont" v-for="item in list" :key='item._id'>
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
import { getUsersPosts, getUserById, removeUser } from '../util/api'
import { logout, getUser } from '../util/auth'
import router from '../router'
export default {
  name: 'UserPage',
  data() {
    return {
      user: {
        first_name: 'placeholder',
        last_name: 'placeholder',
        email: 'placeholder'
      },
      list: [],
    };
  },
  computed: {
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
            /*if (this.list.length / 20 === 2) {
              $state.complete();
            }*/
          } else {
            $state.complete();
          }
      })
    },
    removeAccount() {
      removeUser(this.user._id)
      .then(data => {
        console.log(data)
        if (getUser().role != 3) {
          logout()
        } else {
          router.push('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    getUserById(this.$route.params.userid)
    .then(user => {
      this.user = user
    })
    .catch(error => {
      console.log(error) 
    })
  },
  components: {
    InfiniteLoading,
    Post
  },
};
</script>