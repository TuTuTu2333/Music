<template>
  <div class="searchBox">
    <div class="search">
      <i class="searchIcon iconfont icon-tubiao1"></i>
      <input type="text" :placeholder="placeholder" v-model="key" @input="change(key),changeSuggest(key)"/>
      <i class="clear iconfont icon-shanchubeifen" @click="clear" v-show="show"></i>
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    }
  },
  data() {
    return {
      key: "",
    };
  },
  computed: {
    ...mapState(['show']),
      hotKey(){
        return this.$store.state.keys;
      }
  },
  methods: {
    ...mapMutations(['changeKeys','changeShow']),
    clear() {
      this.key = "";
      this.change(this.key)
      this.changeSuggest(this.key)
    },
    change(key){
        this.$store.commit('changeKeys',key)
    },
    changeSuggest(key){
      // console.log(this.key);
      let result=null
      if(this.key!=''){
        result=true
      }else{
        result=false
      }
      this.$store.commit('changeShow',result)
    }
  },
  watch: {
      hotKey(val,oldval){
        this.key = val;
        console.log(this.key);
      }
  },
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.searchBox {
  margin-top: 20px;
  padding: 0 20px;
  height: 40px;
  .search {
    padding: 0 6px;
    height: 40px;
    background: #333;
    border-radius: 5px;
    .searchIcon {
      display: inline-block;
      width: 27px;
      height: 25px;
      font-size: @fs-l;
      position: relative;
      top: -14px;
    }
    input {
      position: absolute;
      top: 33px;
      left: 40;
      height: 15px;
      width: 73%;
      border: none;
      background: #333;
      color: rgba(255, 255, 255, 0.5);
    }
    .clear {
      float: right;
      margin-top: 10px;
    }
  }
}
</style>