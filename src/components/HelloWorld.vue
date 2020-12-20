<template>
  <div class="hello">
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
            <h1>XX医院</h1>
            <p>吧啦吧啦吧啦吧啦简介</p>
          </div>
          <!-- <el-button 
          type="primary"
          style="margin-top:50px;margin-right:50px;float:right;"
          >
            预约
          </el-button> -->
        </el-card>
        <!-- <div style="margin:auto; margin-top: 15px; width:80%">
          <el-input placeholder="输入科室或医生姓名进行查找" >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div> -->
        <el-card style="margin:auto; margin-top: 15px; width:80%">
          <el-collapse accordion>
            <el-collapse-item title="预约规则">
              <div>{{rules}}</div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
        <el-card style="margin:auto; margin-top: 15px; width:80%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="挂号科室" name="first">
              <div style="margin-left:60px;margin-right:60px">
                <p v-for="(organ) in organs">
                  <router-link :to="{name:'organ',params:{id:organ.id}}"
                  style="margin-left:60px;margin-right:60px;float:left;width:20%">
                    {{organ.name}}
                  </router-link>
                </p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="全部科室" name="second">
              <div style="margin-left:60px;margin-right:60px">
                <p 
                v-for="(organ) in organs"
                style="margin-left:60px;margin-right:60px;float:left;width:20%">
                  {{organ.name}}
                </p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      activeName: 'first',
      rules:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。',
      organs:[
        {
          id:1,
          name:'外科',
        },
        {
          id:2,
          name:'内科',
        },
        {
          id:3,
          name:'产科',
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
