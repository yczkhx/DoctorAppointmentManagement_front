<template>
  <div class="organ">
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
            XX医院
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
            <h1>{{organName}}</h1>
            <p>吧啦吧啦吧啦吧啦简介</p>
          </div>
        </el-card>
        <div v-for="(doctor) in doctors">
          <el-card style="width:70%; margin:auto;margin-top:15px">
            <div style="height:120px">
                <img 
                src="../../public/test.jpg" 
                style="height: 70%; float: left; margin:15px"
                >
                <div style="float: left; margin:15px">
                  <p>{{doctor.name}}</p>
                  <p>{{doctor.tittle}}</p>
                </div>
                <p style="float: left; margin:15px">空闲时间</p>
                <el-button 
                @click="handleClick(doctor)"
                type="primary" 
                style="margin-left: 16px;float: right;">
                    预约
                </el-button>
            </div>
            <el-divider></el-divider>
            <p>
              {{doctor.intro}}
            </p>
          </el-card>
        </div>
        
        <el-drawer
        title="预约医生"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
          <div>
            {{organName}}
            {{currentDoctor.tittle}}
            {{currentDoctor.name}}
            选择时间
          </div>
          <div>
            <el-button type="primary">
              预约
            </el-button>
          </div>
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
  name: 'Organ',
  data() {
      return {
        organName:'XX科',
        drawer: false,
        direction: 'rtl',
        doctors:[
          {
            id:1,
            name:'名字',
            tittle:'主任医师',
            intro:'简介'
          },
          {
            id:2,
            name:'名字2',
            tittle:'主任医师2',
            intro:'简介2'
          },
        ],
        currentDoctor:[]
      };
  },
  methods: {
    handleClick(doctor){
      this.drawer=true;
      console.log(doctor.id);
      this.currentDoctor.id=doctor.id;
      this.currentDoctor.name=doctor.name;
      this.currentDoctor.tittle=doctor.tittle;
    },
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