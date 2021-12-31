<template>
  <div class="create-con">
    <div class="create-con1">
      <div id="toolbar-container"></div>
    </div>
    <div class="create-con2">
      <div class="create-con21">
        <div class="create-article-title">


          <div
            contenteditable="true"
            class="textarea"
            placeholder="请输入文章标题(5~30个字)"
            v-text="article.title"
            @input="input($event)"
          ></div>
          <span
            class="create-t-t"
            :class="article.title.length > 30 ? 'over30' : ''"
            >{{ article.title.length }}/30</span
          >
        </div>
        <div id="text-container"></div>
        <div class="create-footer-con">
          <div class="create-footer">
            <div class="create-f-label">展示封面</div>
            <div class="create-f-item">
              <el-radio v-model="article.coverType" label="单图"></el-radio>
              <el-radio v-model="article.coverType" label="四图"></el-radio>
              <el-radio v-model="article.coverType" label="无封面"></el-radio>
              <div class="create-upload">
                <el-upload
                  class="avatar-uploader"
                  :action="src"
                  :headers="uploaderHeader"
                  :show-file-list="false"
                  name="myfile"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload"
                  v-show="
                    article.coverType == '单图' || article.coverType == '四图'
                  "
                >
                  <img
                    v-if="article.coverImg[0]"
                    :src="article.coverImg[0]"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <el-upload
                  class="avatar-uploader"
                  :action="src"
                  :headers="uploaderHeader"
                  :show-file-list="false"
                  name="myfile"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                  v-show="article.coverType == '四图'"
                >
                  <img
                    v-if="article.coverImg[1]"
                    :src="article.coverImg[1]"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <el-upload
                  class="avatar-uploader"
                  :action="src"
                  :headers="uploaderHeader"
                  :show-file-list="false"
                  name="myfile"
                  :on-success="handleAvatarSuccess3"
                  :before-upload="beforeAvatarUpload"
                  v-show="article.coverType == '四图'"
                >
                  <img
                    v-if="article.coverImg[2]"
                    :src="article.coverImg[2]"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                  class="avatar-uploader"
                  :action="src"
                  :headers="uploaderHeader"
                  :show-file-list="false"
                  name="myfile"
                  :on-success="handleAvatarSuccess4"
                  :before-upload="beforeAvatarUpload"
                  v-show="article.coverType == '四图'"
                >
                  <img
                    v-if="article.coverImg[3]"
                    :src="article.coverImg[3]"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>

              <div
                class="create-upload-tip"
                v-show="article.coverType != '无封面'"
              >
                优质的封面有利于推荐，格式支持JPEG、PNG
              </div>
            </div>
          </div>
          <div class="create-footer">
            <div class="create-f-label">文章分类</div>
            <div class="create-f-item">
              <el-radio v-model="article.class" label="0">技术博客</el-radio>
              <el-radio v-model="article.class" label="1">科技</el-radio>
              <el-radio v-model="article.class" label="2">娱乐</el-radio>
              <el-radio v-model="article.class" label="3">体育</el-radio>
              <el-radio v-model="article.class" label="4">游戏</el-radio>
              <el-radio v-model="article.class" label="5">历史</el-radio>
              <el-radio v-model="article.class" label="6">美食</el-radio>
              <el-radio v-model="article.class" label="7">社会</el-radio>
             
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="create-con3">
      <div class="footer">
        <div class="footer-cg-con">
          <i class="el-icon-circle-check"></i>
          <span>{{ cgTips }}</span>
        </div>
        <el-button type="danger" @click="submit">发布</el-button>
      </div>
    </div>
  </div>
</template>
  
  
<script>
import Editor from "wangeditor";
import { ref, reactive, getCurrentInstance, watchEffect, watch } from "vue";
import { useStore } from "vuex";
import hljs from 'highlight.js'
export default {
  setup() {
    let { proxy } = getCurrentInstance();
    const store = useStore();
    // 富文本对象
    let editor = reactive({ data: {} });
    // 编写的文章 包括标题 正文 封面图片
    let article = reactive({
      id: "",
      title: "",
      createTime: "",
      content: "",
      coverType: "单图",
      coverImg: ["", "", "", ""],
      author: store.state.user.username,
      authorId: store.state.user._id,
      class:"0"
    });

 
    // 发布文章
    const submit = async () => {
      // 先判断标题和正文 和封面是否正确填写
      if (article.title.length < 5 || article.title.length > 30) {
        proxy.$message.error("请正确填写文章标题");
        return;
      }
      if (article.content.trim().length == 0) {
        proxy.$message.error("正文不能为空");
        return;
      }
      if (article.coverType == "单图") {
        if (article.coverImg[0] == "") {
          proxy.$message.error("请上传文章封面图片");
          return;
        }
      } else if (article.coverType == "四图") {
        try {
          article.coverImg.forEach((item) => {
            if (item == "") {
              proxy.$message.error("请正确上传封面图片张数");
              throw new Error("break");
            }
          });
        } catch (err) {
          return;
        }
      }

      let date = new Date();
      // 判断是修改还是发布
      let path = "";
      if (articleId.value == "") {
        path = "/article/add";
      } else {
        path = "article/update";
      }
      proxy
        .http({
          method: "post",
          path: path,
          params: {
            id: articleId.value,
            title: article.title,
            createTime: Date.now(),
            content: article.content,
            author: proxy.$store.state.user.username,
            authorId: proxy.$store.state.user._id,
            coverType: article.coverType,
            coverImg: article.coverImg,
            // statu: "审核中",
            statu: "已发布",
            class:article.class
          },
        })
        .then((res) => {
          if (res.code == 200) {
            proxy.$message.success("提交成功");
            // 提交成功之后需要删除草稿
            if (articleId.value == "") {
              proxy
                .http({
                  method: "post",
                  path: "/draft/del",
                  params: { _id: draftId.value },
                })
                .then((res) => {
                  if (res.code == 200) {
                    // 然后跳转到文章管理页面
                    proxy.$router.push("/user/menu/manger/article");
                  }
                });
            } else {
              proxy.$router.push("/user/menu/manger/article");
            }
          } else if (res.code == 300) {
            proxy.$message.error("提交失败");
          } else {
            proxy.$message.error("文章提交时出现异常");
          }
        });
    };

    // 单选框 选择封面类型
    // 封面图片上传请求头
    let uploaderHeader = reactive({
      authorization: "Bearer " + localStorage.getItem("token"),
    });

    // 封面上传成功的回调
    function handleAvatarSuccess1(res, file, fileList) {
      article.coverImg[0] = res.data;
    }
    function handleAvatarSuccess2(res, file, fileList) {
      article.coverImg[1] = res.data;
    }
    function handleAvatarSuccess3(res, file, fileList) {
      article.coverImg[2] = res.data;
    }
    function handleAvatarSuccess4(res, file, fileList) {
      article.coverImg[3] = res.data;
    }
    // 封面上传前的回调 检测格式
    function beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        proxy.$message.error("封面图片只能是 JPEG或者PNG 格式!");
      }
      if (!isLt2M) {
        proxy.$message.error("封面图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }

    // div输入的时候
    function input(e) {
      article.title = e.target.innerText;
    }

    // 监听文章改变用来保存草稿
    let timer = null;
    watch(article, (newData, oldData) => {
      if (articleId.value == "") {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          // 执行保存草稿的操作
          cgTips.value = "草稿保存中...";
          if (draftId.value == "") {
            proxy
              .http({
                method: "post",
                path: "/draft/add",
                params: {
                  title: article.title,
                  createTime: Date.now(),
                  content: article.content,
                  author: JSON.parse(localStorage.user).username,
                  authorId: JSON.parse(localStorage.user)._id,
                  coverType: article.coverType,
                  coverImg: article.coverImg,
                },
              })
              .then((res) => {
                if (res.code == 200) {
                  cgTips.value = "草稿已保存";
                  draftId.value = res.res._id;
                } else if (res.code == 300) {
                  cgTips.value = "草稿保存失败";
                } else {
                  cgTips.value = "草稿保存出现异常";
                }
              });
          } else {
            proxy
              .http({
                method: "post",
                path: "/draft/update",
                params: {
                  _id: draftId.value,
                  data: {
                    title: article.title,
                    createTime: Date.now(),
                    content: article.content,
                    author: JSON.parse(localStorage.user).username,
                    authorId: JSON.parse(localStorage.user)._id,
                    coverType: article.coverType,
                    coverImg: article.coverImg,
                  },
                },
              })
              .then((res) => {
                if (res.code == 200) {
                  cgTips.value = "草稿已保存";
                } else if (res.code == 300) {
                  cgTips.value = "草稿保存失败";
                } else {
                  cgTips.value = "草稿修改出现异常";
                }
              });
          }
        }, 1000);
      }
    });

    // 下方保存草稿提示语
    let cgTips = ref("草稿将自动保存");

    // 草稿的_id
    let draftId = ref("");

    // 文章的Id
    let articleId = ref("");

    let src=ref(proxy.address+'upload/img')
    

    return {
      editor,
      submit,
      uploaderHeader,
      article,
      handleAvatarSuccess1,
      handleAvatarSuccess2,
      handleAvatarSuccess3,
      handleAvatarSuccess4,
      beforeAvatarUpload,
      input,
      cgTips,
      draftId,
      articleId,
      src
     

    };
  },

  mounted() {
    // 获取草稿或者文章的函数
    const getData = async () => {
      // 获取草稿id
      let dId = this.$route.query.draftId;
      // 获取已经发布文章id
      let aId = this.$route.query.articleId;
      let res = null;
      if (dId) {
        this.draftId = dId;
        res = await this.http({
          method: "get",
          path: "/draft/findOne",
          params: {
            id: dId,
          },
        });
      }
      if (aId) {
        this.articleId = aId;
        res = await this.http({
          method: "get",
          path: "article/findOne",
          params: {
            id: aId,
          },
        });
      }

      if (aId || dId) {
        this.article.title = res.data.title
        this.article.content = res.data.content;
        this.article.coverType = res.data.coverType;
        this.article.coverImg = res.data.coverImg;
        this.article.class=res.data.class
      }

      // 创建wangeditor实例
      this.editor.data = new Editor("#toolbar-container", "#text-container");
      // 配置上传图片接口地址
      this.editor.data.config.uploadImgServer =this.address+'upload/editor/img'
      // 图片字段名
      this.editor.data.config.uploadFileName = "editorFile";
      // 图片请求头
      this.editor.data.config.uploadImgHeaders = {
        authorization: "Bearer " + localStorage.token,
      };

      // // 内容改变
      this.editor.data.config.onchange = (newHtml) => {
        this.article.content = newHtml;
      };
      this.editor.data.config.onchangeTimeout = 500;
      this.editor.data.config.showMenuTooltips = true;
      this.editor.data.config.menuTooltipPosition = "down";

      // 设置富文本的显示层级
      this.editor.data.config.zIndex = 1;
      // 设置提示文字
      this.editor.data.config.placeholder = "请输入正文";
      this.editor.data.highlight = hljs
      this.editor.data.create();
      this.editor.data.txt.html(this.article.content);
    };
    getData();
  },
};
</script>
  
<style scoped lang="less">
.create-con ::v-deep{
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
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        .textarea {
          min-height: 40px;
          // background-color: yellow;
          width: calc(100% - 40px);
          font-size: 24px;
          line-height: 40px;
          font-weight: 700;
          outline: none;
          border: 0;
          resize: none;
          &[contenteditable]:empty:before {
            content: attr(placeholder);
            color: #999999;
          }
          &[contenteditable]:focus {
            content: none;
          }
        }

        .create-t-t {
          // background-color: pink;
          font-size: 12px;
          width: 40px;
          line-height: 40px;
          color: #999999;
        }
        .over30 {
          color: red;
        }
      }
      #text-container {
        width: 100%;
        // width: 820px;
        min-height: 600px;
        pre code{
          background-color: #282C34;
          white-space: pre-wrap;
          word-break:break-all; 
        }
        pre{
          background-color: #282C34;

        }
      }
      .create-footer-con{
        border-top: 1px solid #e8e8e8;

        .create-footer  {
        padding-top: 30px;
        min-height: 50px;
        display: flex;

        .create-f-label {
          // background-color: pink;
          width: 110px;
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          margin-right: 20px;
        }
        .create-f-item {
          // background-color: yellow;
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
              background-color: #fafafa;
            }
            .avatar-uploader .el-upload:hover {
              border-color: #ff5e5e;
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
              display: block;
            }
          }
          .create-upload-tip {
            font-size: 12px;
            color: #999999;
          }
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
      justify-content: space-between;
      .footer-cg-con {
        cursor: default;
        font-size: 12px;
        color: #666666;
      }
    }
  }
}
</style>
  
