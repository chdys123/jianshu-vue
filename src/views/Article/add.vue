<template>
 
    <el-form :model="form" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="文章内容"> 
      <div id="editor"></div>
    </el-form-item>

    <el-form-item label="文章来源"> 
      <el-radio v-model="form.stemfrom" label="原创">原创</el-radio>
        <el-radio v-model="form.stemfrom" label="转载">转载</el-radio>
    </el-form-item>
    <el-form-item>
      <el-button type="success" round @click="submit">发布文章</el-button>
    </el-form-item>
  </el-form>


</template>
  
  
<script>
import Editor from "wangeditor"
import { ref, reactive, getCurrentInstance } from "vue";
export default {
  setup() {
    let { proxy } = getCurrentInstance();
    let form = reactive({
      title: "",
      content: "",
      stemfrom: "原创",
      // 感觉后期还是改成 作者id比较好
      authorId:""
    });
    let editor=reactive({data:{}})
    const submit=function(){
      // 获取富文本内容
      let content =editor.data.txt.html()
      let date=new Date()
      proxy.http({
        method:"post",
        path:'/article/add',
        params:{
          id:Date.now(),
          title:form.title,
          createTime:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          stemfrom:form.stemfrom,
          content:content,
          author:proxy.$store.state.user.username,
          authorId:proxy.$store.state.user._id
        }
      }).then(res=>{
        if(res.code==200){
          proxy.$message.success("文章发布成功")
        }else if(res.code==300){
          proxy.$message.error("文章发布失败")
        }else{
          proxy.$message.error("文章发布时出现异常")
        }
      }) 

    }

    return {
      form,
      editor,
      submit
    };
  },
  mounted(){
    // 创建wangeditor实例
    this.editor.data =new Editor("#editor")
    // 配置上传图片接口地址
    this.editor.data.config.uploadImgServer="http://localhost:3000/upload/editor/img"
    // 图片字段名
    this.editor.data.config.uploadFileName="editorFile"
    // 图片请求头
    this.editor.data.config.uploadImgHeaders={
      authorization:"Bearer "+localStorage.token
    }
    // 设置富文本编辑器高度
    this.editor.data.config.height=window.innerHeight-400
    // 设置提示文字
    this.editor.data.config.placeholder="编辑文章内容"
    this.editor.data.create()
  }
};
</script>
  
<style scoped lang="less">
  .test{
    background-color: pink;
  }
</style>
  
