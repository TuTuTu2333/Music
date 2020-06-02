<template>
    <div class="history">
      <h1 class="title">
        <span>搜索历史</span>
        <span></span>
      </h1>
      <ul>
        <li>lalala</li>
      </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
 @import '../../style/index.less';  
 .history {
    .title {
      margin: 30px 20px 0;
      font-size: @fs-s;
      color: rgba(255, 255, 255, 0.5);
    }
    ul{
      margin: 10px 20px;
      li{
        font-size: @fs-m;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  } 
</style>