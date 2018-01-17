<template>
  <div class="container vert-cont" id="maindiv">
    <span @click="logout">Logout</span>
    <PostForm @post-added="onPostAdded" />
    <div class="container vert-cont" v-for="(item, index) in list" :key='item._id'>
      <Post @post-deleted="onPostDeleted" :object="item" :index="index" />
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <span slot="no-more">
        There is no more posts :(
      </span>
    </infinite-loading>
  </div>
</template>
<script>
import PostForm from './PostForm'
import Post from './Post'
import InfiniteLoading from 'vue-infinite-loading';
import { getPosts } from '../util/api'
import { getUser, logout } from '../util/auth'

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    infiniteHandler($state) {
      getPosts({
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
    logout() {
      logout()
    },
    onPostAdded(value) {
      console.log(value.user)
      //this.list.push(value)
      this.list.unshift(value)
      console.log('lot', this.list)
    },
    onPostDeleted(index) {
      this.list.splice(index)
    }
  },
  components: {
    InfiniteLoading,
    PostForm,
    Post
  },
};
</script>