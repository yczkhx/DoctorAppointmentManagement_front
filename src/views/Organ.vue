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
            黄渡理工职业技术学校附属医院
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
          style="width: 15%; float: left;margin:30px"
          >
          <div style="float:left;margin:30px;font-size:25px">
            <h1>{{organName}}</h1>
          </div>
        </el-card>
        <div v-for="(doctor) in doctors">
          <el-card style="width:75%; margin:auto;margin-top:15px;">
            <div style="width: 20%;float:left;margin-right:10px">
              <img 
              v-bind:src="doctor.pic"
              style="width:90%">
              <div style="text-align:center">
                <p>{{doctor.name}}  {{doctor.position}}</p>
              </div>
            </div>
            <div 
            style="
              width: 70%;
              float:left;
              text-align:left;
              margin:10px;
              margin-bottom:30px;
              word-wrap: break-word;
              text-indent:30px
            ">
              {{doctor.intro}}
            </div>
            <div style="float:right;margin-top:15px">
              <el-button 
              @click="handleClick(doctor)"
              type="primary" 
              >
                预约
              </el-button>
            </div>
          </el-card>
        </div>
        <el-drawer
        title="预约医生"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
          <div>
            <h1>您选择的医生是:</h1>
            <p>{{organName}}  {{currentDoctor.position}}  {{currentDoctor.name}}</p>
          </div>
          <div style="margin-top:40px">
            <h1>请选择时间:</h1>
             <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="position:fixed; bottom:30px;right:180px">
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
import axios from 'axios';

export default {
  name: 'Organ',
  data() {
      return {
        organName:'',
        drawer: false,
        direction: 'rtl',
        doctors:[],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value:'',
        currentDoctor:[]
      };
  },
  created(){
    this.getOrgan();
    this.getDoctorInfo();
  },
  methods: {
    getOrgan(){
      this.organName=this.$route.query.name;
    },
    handleClick(doctor){
      this.drawer=true;
      console.log(doctor.id);
      this.currentDoctor.id=doctor.id;
      this.currentDoctor.name=doctor.name;
      this.currentDoctor.position=doctor.position;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
            done();
        })
        .catch(_ => {});
    },
    getDoctorInfo(){
      axios
        .get("http://localhost:8081/patient/doctor_info", {
          params: {
            dep:this.organName
          },
        })
        .then((res) => {
          console.log(res);
          for(let i=0;i<res.data.length;i++){
            this.doctors.push({
              id:res.data[i].id,
              name:res.data[i].name,
              position:res.data[i].position,
              intro:res.data[i].detail,
              pic:res.data[i].pic
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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