<!--有前端验证注册信息是否合理-->
<template>
  <div id="poster">
    <el-scrollbar style="height: 100%">
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        class="register-container"
        label-position="left"
        label-width="0px"
        v-loading="loading"
        size="medium"
      >
        <h3 class="login_title">注册</h3>
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            type="password"
            v-model="registerForm.confirmPassword"
            placeholder="确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="number">
          <el-input
            v-model="registerForm.number"
            placeholder="身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="telephone">
          <el-input
            v-model="registerForm.telephone"
            placeholder="手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="registerForm.radio1" label="男" border
            >男</el-radio
          >
          <el-radio v-model="registerForm.radio1" label="女" border
            >女</el-radio
          >
        </el-form-item>
        <el-form-item prop="age">
          <el-input v-model="registerForm.age" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item prop="detail">
          <el-input
            type="textarea"
            placeholder="请输入病情细节"
            v-model="registerForm.textarea"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%; background: #505458; border: none"
            v-on:click="register"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link type="primary" href="#/login" style="float: right">
            登录
          </el-link>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
//import api from "@/assets/config/api.js";
import axios from "axios";
import qs from "qs";
export default {
  name: "Upload",
  data() {
    let checkPassword = (rule, value, cb) => {
      const regPassword = /^\w{6,50}$/;
      if (regPassword.test(value)) {
        //合法密码
        return cb();
      }
      cb(new Error("密码必须在6-15个字符之间,只能由大小写字母数字下划线组成"));
    };
    let checkConfirmPassword = (rule, value, cb) => {
      const regPassword = this.registerForm.password;
      if (regPassword === value) {
        //合法密码
        return cb();
      }
      cb(new Error("前后两次输入的密码必须一致!"));
    };
    let checktelephone = (rule, value, cb) => {
      const regNumber = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
      if (regNumber.test(value)) {
        //合法手机号
        return cb();
      }
      cb(new Error("输入的手机号不合法!"));
    };
    return {
      loading: true,

      //登录表单数据绑定
      registerForm: {
        number: "",
        username: "",
        password: "",
        confirmPassword: "",
        telephone: "",
        authCode: "",
        icon: "",
        radio1: "男",
        age: "",
        textarea: "",
        // imgUrl: "https://tongji4m3.oss-cn-beijing.aliyuncs.com/OIP.jpg",
      },
      //表单的验证规则
      registerFormRules: {
        //    验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名必须在3-10个字符之间",
            trigger: "blur",
          },
        ],
        //    验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkPassword, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请再次确认密码", trigger: "blur" },
          { validator: checkConfirmPassword, trigger: "blur" },
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checktelephone, trigger: "blur" },
        ],
      },
    };
  },
  //回车注册操作
  created() {
    //创建后挂载
    let _this = this;
    setTimeout(() => {
      this.loading = false;
    }, 500);
    document.onkeydown = function (e) {
      let key = window.event.keyCode;

      if (key === 13) {
        _this.register(); //注册
      }
    };
  },
  methods: {
    register() {
      axios
        .get("http://localhost:8081/patient/register", {
          params: {
            id: this.registerForm.number,
            name: this.registerForm.username,
            pass: this.registerForm.password,
            sex: this.registerForm.radio1,
            age: this.registerForm.age,
            detail: this.registerForm.textarea,
            tel: this.registerForm.telephone,
          },
        })
        .then((res) => {
          console.log(res);
          this.$message.success("跳转至登录界面");
          setTimeout(function () {}, 500);
          this.$router.push("/login");

          //console.log(event1);
        })
        .catch(function (error) {
          console.log(error);
        });
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

body {
  color: rgba(255, 255, 255, 0.65);
  background-color: #24292e;
  /*background-image: url(../../assets/img/star-bg.svg),*/
  /*linear-gradient(#191c20, #24292e 15%);*/
  background-repeat: repeat-x;
  background-position: center 0, 0 0, 0 0;
  margin-left: 0;
  margin-top: 1;
}

.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 10px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: rgba(216, 216, 216, 0.137);
  border: 1px solid #eaeaea;
  margin-top: 20px;
}

.login_title {
  letter-spacing: 10px;
  margin: -30px auto 10px auto;
  text-align: center;
  color: #505458;
  margin-top: 15px;
  margin-bottom: 10px;
}

#img-context {
  text-align: center;
  font-size: 17px;
  color: #b0b0b0;
  margin-top: 50px;
}

.el-upload__tip {
  text-align: center;
  font-size: 8px;
  color: rgba(52, 52, 52, 0.7);
}

/* 一下是肯定要用的样式 */
.authInput {
  width: 55%;
}

.authButton {
  margin-left: 45px;
}
</style>
