<template>
  <div class="rank">
    <div class="wrapper" ref="wrapper">
      <ul>
        <li v-for="(item,index) in topList" :key="index" @click.stop='goRankDetail(item.id,item.picUrl,item.topTitle)'>
          <div class="left">
            <img v-lazy="item.picUrl" alt />
          </div>
          <div class="right">
            <span
              v-for="(ele,i) in item.songList"
              :key="i"
            >{{i+1}}&nbsp;{{ele.songname}}-{{ele.songname}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!--嵌套路由 -->
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <router-view :num='num'></router-view>
      </transition>
  </div>
</template>
<script>
import { getTopRank } from "../../api/api";
import BS from "better-scroll";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      num:2,
      topList: []
    };
  },
  methods: {
    goRankDetail(topid,picUrl,topTitle){
      console.log(topid)
      this.$router.push({path:'/rank/rankDetail',query:{topid,picUrl,topTitle}})
    },
    initBs() {
      let wrapper = this.$refs.wrapper;
      // 开启下拉刷新
      this.bs = new BS(wrapper, {
        click: true, 
        pullDownRefresh: {
          threshold: 50,
          stop: 20
        },
        pullUpLoad: {
          threshold: 50
        }
      });
      // 监听下拉刷新
      this.bs.on("pullingDown", () => {
        // 上次下拉刷新已经结束 可以开始下一次
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        getTopRank().then(res => {
          Indicator.close();
          this.topList = res.data.topList;
          console.log(res);
          
          this.bs.finishPullDown();
        });
      });
      // 监听上拉加载
      this.bs.on("pullingUp", () => {
        // 上一次上拉加载已经结束可以开启下一次
        this.bs.finishPullUp();
      });
    }
  },
  mounted() {
    getTopRank().then(res => {
      this.topList = res.data.topList;
    });
    this.initBs();
  },
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.wrapper {
  position: fixed;
  top: 108px;
  bottom: 0;
  left: 0;
  right: 0;
  background: @black2;
  overflow: hidden;
  li {
    // width: 100%;
    height: 100px;
    margin: 20px 20px 0;
    background: #333;
    display: flex;
    .left {
      img {
        width: 100px;
        height: 100px;
      }
    }
    .right {
      height: 100px;
      color: rgba(255, 255, 255, 0.3);
      font-size: @fs-xs;
      padding: 5px 20px;
      span {
        display: inline-block;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 7px;
      }
    }
  }
}
</style>