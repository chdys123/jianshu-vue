<template>
  <div>
    <el-table :data="articles.data" style="width: 100%">
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column
        label="发布时间"
        prop="createTime"
        width="200"
      ></el-table-column>
      <el-table-column label="文章来源" prop="stemfrom"></el-table-column>
      <el-table-column label="阅读量" prop="read"></el-table-column>
      <el-table-column label="点赞数" prop="star"></el-table-column>
      <el-table-column label="评论数" prop="comment"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="data">
          <el-button type="primary" size="mini" @click="update(data.row)"
            >编辑</el-button
          >
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除这篇文章吗?"
            @confirm="del(data.row)"
          >
            <template #reference>
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页按钮 -->
    <el-pagination
      @size-change="getData"
      @current-change="getData"
      v-model:current-page="page"
      :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 200, 300, 400]"
      v-model:page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    >
    </el-pagination>
  </div>
</template>
  
  
<script>
import { ref, reactive, getCurrentInstance } from "vue";
export default {
  setup() {
    let { proxy } = getCurrentInstance();
    let articles = reactive({
      data: [],
    });
    let page = ref(1);
    let pageSize = ref(6);
    let count = ref(0);
    const update = function (row) {
      proxy.$router.push({
        path:"article/update",
        query:{
          id:row.id
        }
      })
    };
    const del = function (row) {
      proxy
        .http({
          method: "post",
          path: "/article/del",
          params: {
            id: row.id,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            proxy.$message.success("文章删除成功");
            getData();
          } else if (res.code == 300) {
            proxy.$message.error("文章删除失败");
          } else {
            proxy.$message.error("文章删除出现异常");
          }
        });
    };
    const getData = function () {
      proxy
        .http({
          method: "get",
          path: "/article/findAll",
          params: {
            page: page.value,
            pageSize: pageSize.value,
            authorId: JSON.parse(localStorage.user)._id,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            count.value = res.count;
            articles.data = res.res;
          } else {
            console.log("获取文章信息失败");
          }
        });
    };
    return {
      articles,
      page,
      pageSize,
      count,
      update,
      del,
      getData,
    };
  },
  mounted() {
    // 获取文章列表
    this.getData();
  },
};
</script>
  
  <style scoped>
</style>
  