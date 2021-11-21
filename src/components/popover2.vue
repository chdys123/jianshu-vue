<template>
  <div class="popover-con">
    <div class="popover-content1">
      <slot name="content1"> </slot>
    </div>
    <div class="popover-content2">
      <slot name="content2"> </slot>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup() {},
};
</script>
<style scoped lang="less">
@keyframes test1 {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.popover-con {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  // background-color: blue;

  &:hover > .popover-content2 {
    display: block;
    animation: test1 0.3s;
  }

  .popover-content2::before {
    content: "";
    width: 100px;
    height: 10px;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
  }
  .popover-content2 {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10px);
    // width: 100px;
    // height: 100px;
    background-color: yellow;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
}
</style>
