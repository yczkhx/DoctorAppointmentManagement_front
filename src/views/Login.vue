<template>
  <div style="height: 706px" class="thisbody">
    <el-container>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        class="login-container"
        label-position="left"
        label-width="0px"
        v-loading="loading"
      >
        <h3 class="login_title">登录</h3>

        <div class="login_header_title">
          <span :class="{ on: loginType == 0 }" @click="loginType = 0"
            >患者</span
          >
          <span :class="{ on: loginType == 1 }" @click="loginType = 1"
            >医生</span
          >
        </div>
        <div v-if="loginType == 0">
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="loginForm.username"
              auto-complete="off"
              placeholder="身份证号"
              v-on:
              keyup.enter.native="login"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="密码"
              v-on:
              keyup.enter.native="login"
            ></el-input>
          </el-form-item>

          <el-form-item style="width: 100%">
            <el-button
              type="primary"
              style="width: 100%; background: #505458; border: none"
              v-on:click="login"
              >登录</el-button
            >
          </el-form-item>
        </div>

        <div v-if="loginType == 1">
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="loginForm.doctorName"
              auto-complete="off"
              placeholder="工号"
              v-on:
              keyup.enter.native="login"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.docPassword"
              auto-complete="off"
              placeholder="密码"
              v-on:
              keyup.enter.native="login"
            ></el-input>
          </el-form-item>

          <el-form-item style="width: 100%">
            <el-button
              type="primary"
              style="width: 100%; background: #505458; border: none"
              v-on:click="loginTel1"
              >登录</el-button
            >
          </el-form-item>
        </div>

        <el-form-item style="width: 30%; margin-left: 200px">
          <el-button
            style="
              width: 100%;
              border: none;
              background-color: rgba(255, 255, 255, 0.65);
            "
            v-on:click="goToRegister"
            >立即注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>


<script>
//import { EventBus } from "../eventbus.js";
//import api from "@/assets/config/api.js";
//import example from '@/views/Comp.vue'
import axios from "axios";
import qs from "qs";
export default {
  name: "Login",

  data() {
    return {
      loginType: 0,
      loading: true,
      //登录表单数据绑定
      loginForm: {
        username: "",
        password: "",
        doctorName: "",
        docPassword: "",
        // imgUrl: "",
      },
      show: true,
    };
  },
  //回车登录操作
  created() {
    //创建后挂载
    //console.log(this.name);
    let _this = this;
    setTimeout(() => {
      this.loading = false;
    }, 500);
    //console.log(this.num)
  },
  methods: {
    login() {
      console.log("login");

      axios
        .get("http://localhost:8081/patient/login", {
          params: {
            name: this.loginForm.username,
            passwd1: this.loginForm.password,
          },
        })
        .then((res) => {
          //console.log(res);
          if (res.data.state == "wrong_db") {
            this.$message.error("用户名不存在");
          } else if (res.data.state == "wrong_password") {
            this.$message.error("密码错误");
          } else if (res.data.state == "success") {
            window.sessionStorage.setItem("token", this.loginForm.username);

            this.$message.success("跳转至主界面");
            setTimeout(function () {}, 500);
            this.$router.push("/");
          }
          // this.$message.success("跳转至登录界面");
          // setTimeout(function () {}, 500);
          // this.$router.push("/login");

          //console.log(event1);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loginTel1() {
      console.log("login");

      axios
        .get("http://localhost:8082/doctor/login", {
          params: {
            id: this.loginForm.doctorName,
            passwd1: this.loginForm.docPassword,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.state == "idwrong") {
            this.$message.error("请输入正确的ID");
          } else if (res.data.state == "passwrong") {
            this.$message.error("密码错误");
          } else if (res.data.state == "success") {
            window.sessionStorage.setItem("token", 'aaa');
            this.$message.success("跳转至个人界面");
            setTimeout(function () {}, 500);
            //this.$router.push({path:"/about",query:{id:this.loginForm.doctorName}});
            this.$router.push({path:"/about",query:{id:this.loginForm.doctorName,authority:res.data.authority}});
            console.log(res.data.authority)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async goToRegister() {
      this.$message.success("跳转至注册界面");
      setTimeout(function () {}, 500);
      this.$router.push("/register");
    },
  },
};
</script>
<style scoped>
#poster {
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  padding: 0;
  margin: 0;
}

.thisbody {
  color: rgba(255, 255, 255, 0.65);
  background-color: rgb(253, 253, 253);
  /*background-image: url(../../assets/img/star-bg.svg),*/
  /*linear-gradient(#191c20, #24292e 15%);*/
  background-repeat: repeat-x;
  background-position: center 0, 0 0, 0 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 70px auto;
  width: 300px;
  padding: 35px 35px 15px 35px;
  background: rgba(216, 216, 216, 0.137);
  border: 1px solid #eaeaea;
}

.login_title {
  letter-spacing: 10px;
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

/* 下面是肯定要用到的样式 */
.authInput {
  width: 47%;
}

.authButton {
  margin-left: 45px;
}

.login_header_title {
  margin-bottom: 40px;
}

.login_header_title span {
  margin-right: 20px;
  cursor: pointer;
  color: black;
  font-size: 16px;
}

.on {
  color: #3f7dff;
  padding-bottom: 10px;
  border-bottom: 3px solid #3f7dff;
}
</style>
