<template>
  <!-- 评论框组件 -->
  <div class="comment-haslogon">
    <!-- 可编辑的div -->
    <div
      class="comment-input"
      contenteditable="true"
      placeholder="说点什么吧..."
      v-text="value"
      @input="f1($event)"
    ></div>
    <!-- 评论按钮 -->
    <div class="btn-con">
      <button class="comment-btn" @click="f2()">评论</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRef } from "vue";
export default {
  props: {
    value: {},
  },
  setup(props, ctx) {
    let timer = null;
    const f1 = (e) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        ctx.emit("change", e.target.innerText);
      }, 500);
    };
    const f2 = () => {
      console.log("点击了");
      ctx.emit("add", {});
    };
    return {
      f1,
      f2,
    };
  },
};
</script>

<style lang="less" scoped>
.comment-haslogon {
  // width: 628px;
  width: 100%;
  background-color: #f8f8f8;
  min-height: 100px;
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  .comment-input {
    min-height: 38px;
    // width: 596px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    color: #222222;
    line-height: 24px;
    transition: all 0.2s;
    &[contenteditable]:empty:before {
      content: attr(placeholder);
      color: #999999;
    }
    &[contenteditable]:focus {
      content: none;
      min-height: 68px;
    }
    &:not([contenteditable]:empty) {
      min-height: 68px;
    }
  }
  .btn-con {
    // width: 596px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .comment-btn {
      padding: 6px 18px;
      font-size: 14px;
      color: #ffffff;
      border: none;
      outline: none;
      background-color: #505050;
      border-radius: 5px;
      &:hover {
        background-color: #707070;
      }
    }
  }
}
</style>