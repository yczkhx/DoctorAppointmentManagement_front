<template>
  <div>
    <el-header>
      <div
        class="el-icon-office-building"
        style="
          float: left;
          margin-right: 20px;
          font-size: 35px;
          margin-top: 20px;
        "
      ></div>
      <div
        style="
          float: left;
          margin-right: 20px;
          margin-top: 20px;
          font-size: 28px;
        "
      >
        黄渡理工职业技术学校附属医院
      </div>
    </el-header>
    <el-divider></el-divider>
    <el-container
      style="
        height: 100vh;
        margin-top: -30px;
        background-color: rgba(188, 210, 244, 0.3);
      "
    >
      <el-aside width="450px" style="height: 600px">
        <div align="center" style="margin-top: 100px">
          <img :src="pic" style="width: 150px; height: 200px" />
          <p style="font-weight: bold">{{ name }}</p>
        </div>
        <div style="margin-top: 50px">
          <el-date-picker
            v-model="value"
            align="right"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div style="margin-top: 30px">
          <el-select v-model="value1" placeholder="选择时间段">
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 45px; width: 335px" align="right">
          <el-button size="medium" @click="jump()">取消</el-button>
          <el-button type="primary" size="medium" @click="addAss()" plain
            >添加</el-button
          >
        </div>
      </el-aside>
      <div style="width: 1013px">
        <el-main style="width: 1013px">
          <div>
            <el-calendar v-model="value2" style="margin-top: 0px">
              <template slot="dateCell" slot-scope="{ date, data }">
                <p :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split("-").slice(1).join("-") }}
                  {{ show(data.day) }}
                </p>
              </template>
            </el-calendar>
          </div>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      department: "",
      pic: "",
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() < Date.now();
        // },
      },
      options: [
        {
          key: 1,
          value: "上午",
        },
        {
          key: 2,
          value: "下午",
        },
      ],
      value: "",
      value1: "",
      value2: new Date(),
      arranged: [],
      length: 0,
    };
  },

  mounted() {
    // console.log(this.$route.query.id);
    this.getInfo();
    this.getArr();
  },

  methods: {
    jump() {
      this.$router.push({
        path: "/admin",
      });
    },

    show(date) {
      for (var i = 0; i < this.length; i++) {
        if (date == this.arranged[i].date) {
          return "✔️";
        }
      }
      return "";
    },

    addAss() {
      console.log(this.value1);
      var num = 0;
      if (this.value1 == "上午") {
        num = 1;
      } else {
        num = 2;
      }
      axios
        .post(
          `https://www.rhysdid.site:8082/doctor/arr?date1=${this.value}&doctor_id=${this.$route.query.id}&number=${num}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.state == "wrong_id") {
            this.$message("您没有权限分配门诊或该时间已有安排");
          } else {
            console.log("成功");
            this.$message("成功");
          }
        })
        .catch(() => {
          this.$message("您没有权限分配门诊或该时间已有安排");
        });
    },

    getArr() {
      axios
        .get(`https://www.rhysdid.site:8082/doctor/getarr`, {
          params: {
            id: this.$route.query.id,
          },
        })
        .then((res) => {
          this.length = res.data.length;
          this.arranged = res.data;
          console.log(res);
        });
    },

    getInfo() {
      axios
        .get("https://www.rhysdid.site:20086/doctor/query", {
          params: {
            id: this.$route.query.id,
          },
        })
        .then((res) => {
          this.name = res.data[0].name;
          this.department = res.data[0].department;
          var dep = this.department;
          axios
            .post(
              `https://www.rhysdid.site:8082/doctor/doctorinfo?dep=${this.department}`
            )
            .then((res) => {
              this.pic = res.data[0].pic;
              console.log(this.pic);
            });
        });
    },
  },
};
</script>
