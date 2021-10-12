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

</style>
