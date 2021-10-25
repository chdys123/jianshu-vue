<template>
    <div class="m-a-con">1234567</div>
 
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
  },
};
</script>

<style lang="less" scoped>
.m-a-con {
  
  height: 1600px;
}
</style>