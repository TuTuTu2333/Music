<template>
  <div class="hotKey">
    <h1 class="title">热门搜索</h1>
    <ul>
      <li v-for="(item,index) in hotList" :key="index">
        <span @click="addKeys(item.k)" >{{item.k}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHotSearch } from "../../api/api"
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      hotList: []
    };
  },
  methods: {
      ...mapMutations(['changeKeys','changeShow']),
      addKeys(key){
        this.$store.commit('changeKeys',key)
        this.$store.commit('changeShow',true)
      }
  },
  mounted() {
    getHotSearch().then(res => {
      this.hotList = res.data.hotkey.slice(0,10);
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.hotKey {
  .title {
    margin: 30px 20px 0;
    font-size: @fs-s;
    color: rgba(255, 255, 255, 0.5);
  }
  ul {
    padding-right: 20px;
    height: 150px;
    li {
      float: left;
      font-size: @fs-s;
      margin-top: 15px;
      span {
        padding: 3px 10px;
        color: rgba(255, 255, 255, 0.3);
        background: #333;
        border-radius: 6px;
        margin-left: 20px;
        text-align: center;
      }
    }
  }
}
</style>