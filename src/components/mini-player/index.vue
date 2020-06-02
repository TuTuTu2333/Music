<template>
    <div class="mini-player" v-show="fullScreen">
        迷你播放器
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['fullScreen']),
    },
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
   .mini-player{
       .w(375);
       height: 60px;
       position: fixed;
       bottom: 0;
       left: 0;
       right: 0;
       z-index: 150;
       background: @black2;
   } 
</style>