<template>
  <div class="create-con">
    <div class="create-con1">
      <div id="toolbar-container"></div>
    </div>
    <div class="create-con2">
      <div id="text-container"></div>
    </div>
  </div>
</template>
  
  
<script>
import Editor from "wangeditor";
import { ref, reactive, getCurrentInstance } from "vue";
export default {
  setup() {
    let { proxy } = getCurrentInstance();
    let form = reactive({
      title: "",
      content: "",
      stemfrom: "原创",
      // 感觉后期还是改成 作者id比较好
      authorId: "",
    });
    let editor = reactive({ data: {} });
    const submit = function () {
      // 获取富文本内容
      let content = editor.data.txt.html();
      let date = new Date();
      proxy
        .http({
          method: "post",
          path: "/article/add",
          params: {
            id: Date.now(),
            title: form.title,
            createTime: `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            stemfrom: form.stemfrom,
            content: content,
            author: proxy.$store.state.user.username,
            authorId: proxy.$store.state.user._id,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            proxy.$message.success("文章发布成功");
          } else if (res.code == 300) {
            proxy.$message.error("文章发布失败");
          } else {
            proxy.$message.error("文章发布时出现异常");
          }
        });
    };

    return {
      form,
      editor,
      submit,
    };
  },
  mounted() {
    // 创建wangeditor实例
    this.editor.data = new Editor("#toolbar-container", "#text-container");
    // 配置上传图片接口地址
    this.editor.data.config.uploadImgServer =
      "http://localhost:3000/upload/editor/img";
    // 图片字段名
    this.editor.data.config.uploadFileName = "editorFile";
    // 图片请求头
    this.editor.data.config.uploadImgHeaders = {
      authorization: "Bearer " + localStorage.token,
    };
    // 设置富文本编辑器高度
    // this.editor.data.config.height = window.innerHeight - 400;
    this.editor.data.config.zIndex = 1;
    // 设置提示文字
    this.editor.data.config.placeholder = "编辑文章内容";
    this.editor.data.create();
  },
};
</script>
  
<style scoped lang="less">
.create-con {
position: relative;
  width: 100%;
//   height: calc(100vh - 66px);
//   overflow: hidden;
//   background-color: pink;

  .create-con1 {
    position: fixed;
    width: 100%;
    top: 66px;
    display: flex;
    justify-content: center;
    z-index: 9;
    #toolbar-container {
      width: 85%;
      border-bottom: 1px solid #f8f8f8;
    }
  }

  .create-con2 {
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    #text-container {
      width: 60%;
      height: 800px;
    }
  }
}
</style>
  
