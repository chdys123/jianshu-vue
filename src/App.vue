<template>
  <router-view></router-view>
</template>

<script>
import { ref } from "vue";
export default {
  name: "app",
  mounted() {
    console.log("启动了");
  },
};
</script >

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  scroll-behavior: smooth;
}
html,
body {
  height: 100%;
  background-color: #f8f8f8;
}
#app {
  height: 100%;
}
</style>
