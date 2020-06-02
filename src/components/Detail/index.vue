<template>
  <div class="detail">
    <!-- 头部导航 -->
    <div class="top">
      <span class="back iconfont icon-fanhui" @click="back"></span>
      <span class="name">{{name}}</span>
    </div>
    <!-- 头像 -->
    <div class="avator" :style="{'background-image':`url(${avator})`}" ref="img">
      <div class="shadow"></div>
    </div>
    <!-- 歌曲列表 -->
    <div class="songlist" ref="wrapper">
      <div class="content">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="openPlay(index)">
            <p class="h1">{{item.songname}}</p>
            <p class="p">{{item.singer[0].name}}-{{item.albumname}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BS from "better-scroll";
import { getSongByMid, getSongUrlByMid, getRankList } from "api/api.js";
import { mapMutations } from "vuex";
export default {
  props: ["num"],
  data() {
    return {
      list: [],
      name: "暂无数据",
      avator: ""
    };
  },
  methods: {
    ...mapMutations(["addSongList", "changeCurrendIndex", "changeScreen"]),
    back() {
      this.$router.go(-1);
    },
    openPlay(index) {
      // 点击歌的li 显示播放器
      this.$store.commit('addSongList',{list:this.list,type:'suggest'})
      // this.addSongList({list:this.list,type:'detail'});
      // 确定点击的是那首歌
      this.changeCurrendIndex(index);
      // 点击屏幕变大
      this.changeScreen(true);
    },
    initBs() {
      let img = this.$refs.img;
      let imgH = img.clientHeight;
      let wrapper = this.$refs.wrapper;
      this.bs = new BS(wrapper, { probeType: 3, click: true });
      this.bs.on("scroll", ({ y }) => {
        // 获取图片的元素和高度
        if (y >= 0) {
          //下拉放大
          let precent = 1 + y / imgH;
          img.style.transform = `scale(${precent})`;
          img.style.zIndex = 1;
        } else {
          //向上滚动
          // 没有到顶部 滚动层的层级高
          // 到达顶部额时候 图片的层级高
          if (Math.abs(y) > imgH - 40) {
            img.style.zIndex = 1;
            img.style.paddingTop = "0%";
            img.style.height = "40px";
          } else {
            img.style.zIndex = -1;
            img.style.paddingTop = "70%";
            img.style.height = 0;
          }
        }
      });
    },
    handleList(list, num) {
      let result = [];
      let mids = [];
      console.log(list);
      
      result = list.map((item, index) => {
        let { albummid, albumname, singer, songmid, songname } = num==1?item.musicData:item.data;
        
        let albumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
        mids.push(songmid);
        return { albummid, albumname, singer, songmid, songname, albumUrl };
      });
      return { result, mids };
    }
  },
  async created() {
    console.log("detail创建");
    console.log(this.$route);
    let num = this.$props.num;
    let { singermid } = this.$route.params;
    let { topid } = this.$route.query;
    let data = null;
    let list = null;

    if (num == 1) {
      data = await getSongByMid(singermid);
      list = data.data.list;
      this.name = data.data.singer_name
      this.avator =`https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000`
      
    } else if (num == 2) {
      data = await getRankList(topid);
      list = data.songlist;  
      this.name=this.$route.query.topTitle;
      this.avator = this.$route.query.picUrl;     
      console.log("data", data);
      console.log("list", list);
    }
    let { result, mids } = this.handleList(list,num);
    console.log("mids", mids);
      let { urls } = await getSongUrlByMid(mids);
      console.log("urls",urls);
      
      let finalData = [];
      for (let index = 0; index < result.length; index++) {
        result[index].audioUrl = urls[index];
        if (urls[index]) {
          // 将不能播放的歌曲去除
          finalData.push(result[index]);
        }
      }
      console.log(finalData);
      
      this.list = finalData;
  
    this.$nextTick(() => {
      this.initBs();
    });
  },
  beforeRouteEnter(from, to, next) {
    // 组件进入之前
    next();
  },
  // async beforeRouteUpdate(to,from,next){
  //   console.log('组件复用更新的时候执行',from,to)
  //   let {singermid} = to.params
  //   console.log(singermid)
  //   next()
  // }
  watch: {
    num: function(val) {
      console.log(val); // 接收父组件的值
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.detail {
  .w(375);
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #222;
  left: 0px;
  right: 0px;
  // 头部
  .top {
    .w(375);
    height: 40px;
    color: #fff;
    position: absolute;
    top: 0;
    z-index: 3;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .back {
      position: fixed;
      top: 10px;
      left: 10px;
      color: @yellow;
      font-size: 30px;
    }
    .name {
      display: inline-block;
      width: 300px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: @fs-l;
      margin-top: 5px;
    }
  }
  // 头像
  .avator {
    .w(375);
    padding-top: 70%;
    background-size: cover;
    position: absolute;
    top: 0px;
    z-index: -1;
    .shadow {
      position: absolute;
      top: 0;
      background: rgba(7, 17, 27, 0.3);
      width: 100%;
      height: 100%;
    }
  }
  // 歌曲列表
  .songlist {
    position: fixed;
    background: #222;
    //  overflow: hidden;
    top: 270px;
    bottom: 0px;
    left: 0;
    right: 0;
    .content {
      padding: 15px 30px;
      background: #222;
      li {
        color: #fff;
        height: 61px;
        .h1 {
          font-size: @fs-s;
          height: 20px;
        }
        .p {
          font-size: @fs-s;
          margin-top: 3px;
          height: 20px;
          color: rgba(255, 255, 255, 0.3);
          margin-top: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>