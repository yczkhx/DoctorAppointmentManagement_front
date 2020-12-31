<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal">
          <div
            class="el-icon-office-building"
            style="
              float: left;
              margin-right: 20px;
              font-size: 35px;
              margin-top: 12px;
            "
          ></div>
          <div
            style="float: left; margin-right: 20px; font-size: 28px"
            @click="backtohome"
          >
            黄渡理工职业技术学校附属医院
          </div>
          
          <el-link
            type="primary"
            href="#/login"
            style="float: right; margin-right: 50px; font-size: 16px"
          >
            登录
          </el-link>
          <el-link
            type="primary"
            href="#/register"
            style="float: right; margin-right: 50px; font-size: 16px"
          >
            注册
          </el-link>
        </el-menu>
      </el-header>
      <el-main>
        <el-card
          :body-style="{ padding: '0px' }"
          style="width: 80%; margin: auto"
        >
          <img
            src="../../public/test.jpg"
            style="width: 25%; float: left; margin: 30px"
          />
          <div style="float: left; width: 65%; text-align: left">
            <h1>黄渡理工职业技术学校附属医院</h1>
            <div style="text-indent: 30px">
              <p>
                上海市黄渡理工职业技术学校附属医院位于上海市嘉定区曹安公路4800号，占地62亩，
                建筑面积近10万平方米，是一所集医疗、教学、科研、预防为一体的三级甲等综合性医院，是上海市医保定点单位,
                是国家临床药物试验机构、卫生部专科医师培训基地、上海市住院医师规范化培养和全科医师培养临床基地。
              </p>
              <p>
                医院床位1100张，配备3.0T
                MRI、320排CT、带PET功能的单光子双探头可变角ECT、DSA，、直线加速器，
                模拟定位机，辅助治疗计划系统、切割机、模室、进口的基因扩增仪、
                各类进口全自动生化、免疫、血液、尿液、血凝、细菌培养以及药敏鉴定等大型分析仪等实验设备。
              </p>
            </div>
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
        <el-card style="margin: auto; margin-top: 15px; width: 80%">
          <el-collapse accordion>
            <el-collapse-item title="预约规则">
              <div
                style="margin-left: 60px; margin-right: 60px; text-align: left"
              >
                <div style="margin-top: 10px">{{ rule1 }}</div>
                <div style="margin-top: 10px">{{ rule2 }}</div>
                <div style="margin-top: 10px">{{ rule3 }}</div>
                <div style="margin-top: 10px">{{ rule4 }}</div>
                <div style="margin-top: 10px">{{ rule5 }}</div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
        <el-card style="margin: auto; margin-top: 15px; width: 80%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="挂号科室" name="first">
              <div style="margin-left: 60px; margin-right: 60px">
                <p v-for="organ in organs">
                  <router-link
                    :to="{ name: 'organ', query: { name: organ.name } }"
                    style="
                      margin-left: 60px;
                      margin-right: 60px;
                      float: left;
                      width: 20%;
                      text-decoration: none;
                    "
                  >
                    <p>{{ organ.name }}</p>
                  </router-link>
                </p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="全部科室" name="second">
              <div style="margin-left: 60px; margin-right: 60px">
                <p
                  v-for="organ in organs"
                  style="
                    margin-left: 60px;
                    margin-right: 60px;
                    float: left;
                    width: 20%;
                  "
                >
                  {{ organ.name }}
                </p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <p style="margin-top: 30px">
          Copyright &copy; 黄渡理工职业技术学校附属医院
        </p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      activeName: "first",
      rule1:
        "1.所有科室均提前7天放号，每日7：00更新号源。我院官方微信公众号已开通“关注号源放号通知”，当余号为0时，可进入医生详情页订阅有号通知，系统会在号源开放时向您发送通知。请提前预约挂号，合理安排出行时间。",
      rule2:
        "2.预约挂号采取实名制，一位患者每日最多只能预约三个科室的医生，一个科室仅能预约一名医生。",
      rule3:
        "3.提交预约申请后，本平台会向您发送预约成功或失败的信息，如果没有收到上述信息，建议您拨打023-68370568进行核实。",
      rule4:
        "4.预约成功后，请您带齐所需资料，按照预约时间提前30分钟到达医院签到或取号。迟到30分钟以内，系统自动排至队列最后一位；若迟到30分钟以上，本次预约作废。",
      rule5:
        "5.预约成功后，若医生因故不能按时接诊，由其他医生替诊的，系统会自动推送停换诊消息，若您同意换诊，请点击换号并付费，则保留原预约就诊序号，原挂号费自动返回您账户；若您不愿意接受换诊医生的诊疗，请点击退号。若无换诊医生，则需退号后另行预约，不便之处敬请谅解。",
      organs: [
        {
          id: 1,
          name: "普通外科",
        },
        {
          id: 2,
          name: "神经内科",
        },
        {
          id: 3,
          name: "心血管内科",
        },
        {
          id: 4,
          name: "肾脏内科",
        },
        {
          id: 3,
          name: "消化内科",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    backtohome() {
      this.$message.success("跳转至主界面");
      setTimeout(function () {}, 500);
      this.$router.push("/");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu {
  height: 50px;
  line-height: 50px;
}
.el-main {
  width: 100%;
  margin: 0 auto;
  background-color: RGB(248, 248, 248);
}
</style>
