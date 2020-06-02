<template>
  <div class="banner">
      <mt-swipe  class='swier'>
        <mt-swipe-item v-for="(ele,index) in banners" :key="index" class="test">
          <img :src="ele.picUrl" alt="">
        </mt-swipe-item>
      </mt-swipe>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  props: {
    banners: { type: Array, default: [] }
  },
  methods: {
    initBanner() {
      new Swiper(".swiper-container", {});
    }
  },
  watch: {
    banners() {
      //banners 改变 网络请求数据ok 之后进行初始化操作
      this.$nextTick(() => {
        this.initBanner();
      });
    }
  }
  // mounted(){
  //   this.initBanner()
  // }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
@import "~swiper/css/swiper.min.css";
.banner {
  .w(375);
  .h(150);
  background: green;
  .swier {
    .w(375);
    .h(150);
    .test{
      .w(375);
    .h(150);
    img {
      width:100%;
      height: 100%;
    }
    }
  }
}
</style>