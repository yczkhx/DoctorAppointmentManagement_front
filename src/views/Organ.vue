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
            <div style="float:right;margin-top:15px;margin-bottom:20px">
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
            <h1>请选择预约时间:</h1>
            <div style="margin-top:30px">
              <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }">
              </el-cascader>
            </div>
          </div>
          <div style="position:fixed; bottom:30px;right:180px">
            <el-button 
            type="primary"
            @click="order()">
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
        options: [],
        value:'',
        currentDoctor:[],
      };
  },
  created(){
    this.getOrgan();
    this.getDoctorInfo();
  },
  methods: {
    //由主界面拿到顶部的科室名称
    getOrgan(){
      this.organName=this.$route.query.name;
    },
    //获取要预约的医生信息
    handleClick(doctor){
      this.drawer=true;
      this.currentDoctor.id=doctor.id;
      this.currentDoctor.name=doctor.name;
      this.currentDoctor.position=doctor.position;
      this.options=[];
      this.value=''
      axios
        .get("http://localhost:8081/patient/get_doctor_time",{
          params:{
            doctor_id:doctor.id
          }
        })
        .then((res) => {
          for(let i = 0; i<res.data.time_uses.length; i++){
            let tmp = res.data.time_uses[i].date;
            let tmpTime = res.data.time_uses[i].item;
            for(let j = 0; j<this.options.length; j++){
              if(this.options[j].label == tmp){
                if((this.options[j].children.length == 1 && this.options[j].children[0].value != tmpTime)||this.options[j].children.length == 0){
                  if(tmpTime == 1){
                    this.options[j].children.push({
                      value:tmpTime,
                      label:'上午'
                    })
                  }else{
                    this.options[j].children.push({
                      value:tmpTime,
                      label:'下午'
                    })
                  }
                }
              }
            }
            let newDay =true;
            for(let j = 0; j<this.options.length; j++){
              if(tmp == this.options[j].label){
                newDay = false;
              }
            }
            if(newDay){
              if(tmpTime == 1){
                this.options.push({
                  value:tmp,
                  label:tmp,
                  children:[{
                    value:tmpTime,
                    label:'上午'
                  }]
                })
              }else{
                this.options.push({
                  value:tmp,
                  label:tmp,
                  children:[{
                    value:tmpTime,
                    label:'下午'
                  }]
                })
              }
            }
          }
          // console.log(this.options)
        })
        .catch(function (error){
          console.log(error);
        })
    },
    //关闭预约drawer
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
            done();
        })
        .catch(_ => {});
    },
    //创建页面时调用的，获取整个科室的医生信息
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
    },
    //drawer中预约按钮的回调函数
    order(){
      if(this.value.length==2){
         axios
          .get("http://localhost:8081/patient/getready",{
            params:{
              doctor_id:this.currentDoctor.id,
              d:this.value[0],
              number:this.value[1]
            }
          })
          .then((res) => {
            if(res.data.state == 'success'){
              this.$message({
                showClose: true,
                message: '恭喜您，预约成功！',
                type: 'success'
              });
              this.drawer=false;
            }else{
              this.$message({
                showClose: true,
                message: '啊哦，预约失败了。',
                type: 'warning'
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          })
        
      }else{
        this.$message({
          showClose: true,
          message: '请选择预约时间和日期。',
          type: 'warning'
        });
      }
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