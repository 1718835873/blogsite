<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-10-13 18:01:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-13 20:41:12
-->
<template>
  <div>
    <div class="my-blog-list">
      <div class="alert alert-info" role="alert">我的博客</div>
      <blog-list :blogLists="blogLists"></blog-list>
      <div class="container" style="text-align: center">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li>
              <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              v-for="(item, index) in pageSize"
              :key="index"
              @click="goPage(item)"
            >
              <a href="#">{{ item }}</a>
            </li>
            <li>
              <a href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import BlogList from "@/components/blogList";
export default {
  name: "MyBlogList",

  props: {},
  data() {
    return {
      userInfo: {},
      blogLists: [],
      page: 1,
      limit: 5,
      pageSize: 1,
    };
  },
  computed: {},
  created() {},
  mounted() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo = userInfo;
    this.getBlog(this.page, this.limit);
  },

  watch: {},
  methods: {
    getBlog(page, limit) {
      var userId = this.userInfo.userId;
      $.ajax({
        url: "http://localhost:3000/getAllBlogs?userId=" + userId,
        data: {
          page: page,
          limit: limit,
        },
        method: "GET",
        success: (res) => {
          console.log(res);
          this.blogLists = res.data;
          this.page = res.page;
          this.pageSize = Math.ceil(res.totalNum / 5);
        },
        error: (err) => {
          console.log(err);
        },
      });
    },
    goPage(page){
       this.getBlog(page,this.limit)
    }
  
  },
  components: {
    BlogList,
  },
};
</script>

<style scoped>
.my-blog-list{
    margin-top: 60px;
}
</style>
