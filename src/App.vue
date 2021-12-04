<template>
  <!-- <transition> -->
    <router-view></router-view>
  <!-- </transition> -->
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
  height: 100%;
  background-color: #f8f8f8;
}

#app {
  height: 100%;
}

.v-enter-active {
  animation: test 1s linear;
}



@keyframes test {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
