<template>
  <div class="my">
    <searchBox></searchBox>
    <hotKeys></hotKeys>
    <!-- <history></history> -->
    <suggest></suggest>
  </div>
</template>
<script>
import searchBox from '../Search-box'
import hotKeys from '../HotKeys'
import history from '../History'
import suggest from '../Suggest'

export default {
  components:{searchBox,hotKeys,history,suggest},
  data() {
    return {
      key:''
    };
  },
  methods: {
  },
  created() {
    
  },
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.my {
  position: fixed;
  top: 88px;
  bottom: 0px;
  .w(375);
}
</style>