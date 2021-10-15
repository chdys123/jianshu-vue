<template>
  <div>
      <img :src="imgPath" alt="" class="user-img">
    <el-upload
      action="http://localhost:3000/upload/img"
      name="myfile"
      :headers="uploaderHeader"
      :on-success="onSuccess"
      :show-file-list="false"
    >
    <el-button>上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    let uploaderHeader = reactive({
      authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoIiwiX2lkIjoiNjE2OGY5YzAyNmEwYjRkZmZhZGJiNjhkIiwiaWF0IjoxNjM0MzAwMjkzLCJleHAiOjE2MzQ5MDUwOTN9.hLttvZw5Et_XRRKlZyra495HAR9w5HntJ0zylmKoAKc",
    });
    let imgPath=ref("")

    function onSuccess(res, file, fileList){
        console.log(res)
        imgPath.value=res.data
    }

    return {
        uploaderHeader,
        onSuccess,
        imgPath
    };
  },
};
</script>


<style scoped lang="less">
    .user-img{
        width: 200px;
        
    }

</style>