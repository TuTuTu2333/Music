<template>
  <div class="suggest" v-show="show">
    <div class="scroll" ref="scroll">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="openPlay(index)">
          <div class="icon">
            <i class="iconfont icon-yinfu"></i>
          </div>
          <div class="name">
            <p>{{item.songname}}-{{item.singer[0].name}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getKeySearch, getSongUrlByMid } from "../../api/api";
import BS from "better-scroll";
import { mapMutations } from "vuex";
let getListData = async function(data) {
  let mids = [];
  let result = [];
  let finalData = [];
  result = data.map((item, index) => {
    let { albummid, albumname, singer, songmid, songname } = item;
    let albumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
    mids.push(songmid);
    return { albummid, albumname, singer, songmid, songname, albumUrl };
  });
  let { urls } = await getSongUrlByMid(mids);
  for (let index = 0; index < result.length; index++) {
    result[index].audioUrl = urls[index];
    if (urls[index]) {
      // 将不能播放的歌曲去除
      finalData.push(result[index]);
    }
  }
  return finalData;
};

export default {
  data() {
    return {
      list: [],
      show: false
    };
  },
  computed: {
    hotkey() {
      return this.$store.state.keys;
    },
    getShow() {
      return this.$store.state.show;
    }
  },
  methods: {
    ...mapMutations(["addSongList", "changeCurrendIndex", "changeScreen"]),
    openPlay(index) {
      // 点击歌的li 显示播放器
      this.$store.commit("addSongList", { list: this.list, type: "suggest" });
      // 确定点击的是那首歌
      this.changeCurrendIndex(index);
      // 点击屏幕变大
      this.changeScreen(true);
    },
    getScroll() {
      //搜索列表滚动
      new BS(this.$refs.scroll, {
        click: true
      });
    },
    objToArray(obj) {
      let arr = [];
      for (let i in obj) {
        let o = {};
        o[i] = obj[i];
        arr.push(o);
      }
      return arr
    }
  },

  mounted() {
    this.getScroll();
  },
  watch: {
    hotkey(val) {
      //监听搜索框数据变化，动态的发送网络请求
      // console.log("suggest", val);
      getKeySearch(val).then(res => {
        if (val != "") {
          console.log("触发了");
          getListData(res.data.song.list).then(res=>{
            this.list=res
            console.log(res);
          });
        } else {
          this.list = [];
        }
      });
    },
    getShow(val) {
      //监听show数据的变化 控制页面的显示
      console.log("suggest", val);
      this.show = val;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.suggest {
  .w(375);
  position: fixed;
  top: 153px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 150;
  background: @black2;
  .scroll {
    .w(375);
    height: 100%;
    overflow: hidden;
    ul {
      padding: 0 30px;
      font-size: @fs-s;
      color: rgba(255, 255, 255, 0.3);
      li {
        height: 36px;
        display: flex;
        margin-top: 10px;
        .icon {
          width: 36px;
          height: 36px;
          line-height: 36px;
        }
        .name {
          width: 85%;
          height: 36px;
          line-height: 36px;
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>