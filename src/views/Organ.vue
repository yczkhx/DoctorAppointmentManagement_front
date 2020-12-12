<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
        >
          <div
            class="el-icon-office-building"
            style="float: left;
              margin-right: 20px;
              font-size: 35px;
              margin-top: 12px;
            "
          ></div>
          <div style="float: left;margin-right: 20px;font-size: 28px; ">
            马文博医院
          </div>
          <el-link 
          type="primary"
          href="#/about"
          style="float: right;margin-right: 50px;font-size: 16px;"
          >
            我是医生
          </el-link>
          <div
          style="float: right;margin-right: 50px;font-size: 16px;"
          >
            登录注册
          </div>
        </el-menu>
      </el-header>
      <el-main>
        <el-card 
        :body-style="{ padding: '0px' }" 
        style="width:80%; margin:auto"
        >
          <img 
          src="../../public/test.jpg" 
          style="width: 30%; float: left;"
          >
          <div style="float:left;">
            <h1>XX科</h1>
            <p>吧啦吧啦吧啦吧啦简介</p>
          </div>
        </el-card>
        <el-card style="width:70%; margin:auto;margin-top:15px">
            <div style="height:120px">
                <img 
                src="../../public/test.jpg" 
                style="height: 70%; float: left; margin:15px"
                >
                <p style="float: left; margin:15px">XXX 主任医师</p>
                <p style="float: left; margin:15px">空闲时间</p>
                <el-button @click="drawer = true" type="primary" style="margin-left: 16px;float: right;">
                    预约
                </el-button>
            </div>
            <el-divider></el-divider>
            <p>
                简介
            </p>
        </el-card>
        <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <span>我来啦!</span>
        </el-drawer>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Element from 'element-ui'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
    data() {
        return {
            drawer: false,
            direction: 'rtl',
        };
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        }
    }
}

</script>

<style scoped>
  .el-menu{
    height: 50px;
    line-height: 50px;
  }
  .el-main{
    width: 100%;
    margin: 0 auto;
    background-color: #E9EEF3;
  }
  
</style>