<template>
  <div>hello
    <div>
      <el-button>12345</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "app",
  setup() {
    let test1 = ref(true);
    return {
      test1,
    };
  },
  mounted() {
    console.log("启动了");
    this.http({
      method: "get",
      path: "http://localhost:3000/users/find",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
