<template>
  <!--  -->
  <div class="con">
    <div class="reference">
      <slot name="reference"> </slot>
    </div>
    <div class="content">
      <slot name="content"> </slot>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
export default {
  setup() {
    let proxy = getCurrentInstance();
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@keyframes test1 {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.con {
  position: relative;
  .content {
    display: none;
    position: absolute;
    min-width: 100px;
    padding: 10px 0px;
    background-color: #ffffff;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  .content::before {
    z-index: 100;
    content: "";
    width: 100px;
    height: 10px;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
  }
  &:hover > .content {
    display: block;
    animation: test1 0.8s;
  }
}
</style>

