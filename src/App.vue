<template>
    <router-view></router-view>
</template>

<script>
import { ref } from "vue";
export default {
  name: "app",
  mounted() {
    console.log("启动了")
    
  }
    
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    height: 100%;
  }
  #app{
    height: 100%;
  }

</style>
