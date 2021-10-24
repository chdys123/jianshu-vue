<template>
  <div class="create-con">
    <div class="create-con1">
      <div id="toolbar-container"></div>
    </div>
    <div class="create-con2">
      <div class="create-con21">
        <div class="create-article-title">
          <input type="text" placeholder="请输入文章标题" />
        </div>
        <div id="text-container"></div>
        <div class="create-footer">
          <div class="create-f-label">展示封面</div>
          <div class="create-f-item">
            <el-radio v-model="coverType" label="单图"></el-radio>
            <el-radio v-model="coverType" label="三图"></el-radio>
            <el-radio v-model="coverType" label="无封面"></el-radio>
            <div class="create-upload">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/upload/img"
                :headers="uploaderHeader"
                :show-file-list="false"
                name="myfile"
                :on-success="handleAvatarSuccess1"
                :before-upload="beforeAvatarUpload"
                v-show="coverType=='单图'||coverType=='三图'"
              >
                <img v-if="article.coverImg[0]" :src="article.coverImg[0]" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/upload/img"
                :headers="uploaderHeader"
                :show-file-list="false"
                name="myfile"
                :on-success="handleAvatarSuccess2"
                :before-upload="beforeAvatarUpload"
                v-show="coverType=='三图'"
              >
                <img v-if="article.coverImg[1]" :src="article.coverImg[1]" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/upload/img"
                :headers="uploaderHeader"
                :show-file-list="false"
                name="myfile"
                :on-success="handleAvatarSuccess3"
                :before-upload="beforeAvatarUpload"
                v-show="coverType=='三图'"
              >
                <img v-if="article.coverImg[2]" :src="article.coverImg[2]" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>

            <div class="create-upload-tip" v-show="coverType!='无封面'">
                优质的封面有利于推荐，格式支持JPEG、PNG
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="create-con3">
      <div class="footer">
        <el-button type="danger">发布</el-button>
      </div>
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

    // 单选框 选择封面类型
    let coverType = ref("单图");
    // 封面图片上传请求头
    let uploaderHeader = reactive({
      authorization: "Bearer " + localStorage.getItem("token"),
    });

    // 编写的文章 包括标题 正文 封面图片
    let article=reactive({
        title:"",
        content:"",
        coverType:"",
        coverImg:[],
        author:'',
    })

    // 封面上传成功的回调
    function handleAvatarSuccess1(res, file, fileList){
        article.coverImg[0]= res.data;
    }
    function handleAvatarSuccess2(res, file, fileList){
        article.coverImg[1]= res.data;
    }
    function handleAvatarSuccess3(res, file, fileList){
        article.coverImg[2]= res.data;
    }
    // 封面上传前的回调 检测格式
    function beforeAvatarUpload(file){
        
        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png'

        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          proxy.$message.error('封面图片只能是 JPEG或者PNG 格式!')
        }

        if (!isLt2M) {
          proxy.$message.error('封面图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
    }


    return {
      form,
      editor,
      submit,
      coverType,
      uploaderHeader,
      article,
      handleAvatarSuccess1,
      handleAvatarSuccess2,
      handleAvatarSuccess3,
      beforeAvatarUpload
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
    this.editor.data.config.placeholder = "请输入正文";
    this.editor.data.create();
  },
};
</script>
  
<style scoped lang="less">
.create-con {
  position: relative;
  width: 100%;
  .create-con1 {
    position: fixed;
    width: 100%;
    top: 66px;
    display: flex;
    justify-content: center;
    z-index: 9;
    background-color: #ffffff;
    #toolbar-container {
      width: 972px;
      border-bottom: 1px solid #f8f8f8;
    }
  }

  .create-con2 {
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    // background-color: pink;
    margin-bottom: 100px;
    .create-con21 {
      width: 820px;
      box-sizing: border-box;
      padding: 20px;
      background-color: #ffffff;
      .create-article-title {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #e8e8e8;
        input {
          height: 58px;
          width: 100%;
          font-size: 24px;
          font-weight: 700;
          outline: none;
          border: 0;
        }
      }
      #text-container {
        width: 100%;
        min-height: 600px;
      }
      .create-footer ::v-deep {
        border-top: 1px solid #e8e8e8;
        padding-top: 30px;
        min-height: 50px;
        display: flex;

        .create-f-label {
          //   background-color: pink;
          width: 120px;
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          margin-right: 20px;
        }
        .create-f-item {
          flex: 1;
          // 自定义单选框样式
          .el-radio__input.is-checked + .el-radio__label {
            color: #ff5e5e !important;
          }
          .el-radio__input.is-checked .el-radio__inner {
            background: #ff5e5e !important;
            border-color: #ff5e5e !important;
          }
          .create-upload {
            display: flex;
            // background-color: pink;
            .avatar-uploader .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              width: 150px;
              height: 150px;
              overflow: hidden;
              margin-right: 10px;
              background-color: #FAFAFA;
            }
            .avatar-uploader .el-upload:hover {
              border-color: #FF5E5E;
            }
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 150px;
              height: 150px;
              line-height: 150px;
              text-align: center;
            }
            .avatar {
              width: 150px;
            //   height: 150px;
              display: block;
            }
          }
          .create-upload-tip{
              font-size: 12px;
              color:#999999;
          }
        }
      }
    }
  }

  .create-con3 {
    position: fixed;
    width: 100%;
    height: 66px;
    bottom: 0;
    z-index: 9;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    border-top: 1px solid #e8e8e8;
    .footer {
      width: 820px;
      height: 100%;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
  
