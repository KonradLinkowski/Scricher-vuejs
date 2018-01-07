<template>
  <div class="container vert-cont" id="maindiv">
    <PostForm @post-added="onPostAdded" />
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
import PostForm from './PostForm'
import Post from './Post'
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';
import { getPosts } from '../util/api'
import { getUser } from '../util/auth'

const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

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
            if (this.list.length / 20 === 2) {
              $state.complete();
            }
          } else {
            $state.complete();
          }
      })
    },
    onPostAdded(value) {
      console.log(value)
      this.list.unshift({
        message: value,
        user: getUser()
      })
    }
  },
  components: {
    InfiniteLoading,
    PostForm,
    Post
  },
};
</script>