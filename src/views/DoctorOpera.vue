<template>
  <div>
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
              style="
              float: left;
              margin-right: 20px;
              font-size: 28px;
              font-family: STCaiyun;
            "
          >
            马文博医院
          </div>
          <!--新建团队-->
          <el-button type="primary" @click="teamDialogFormVisible = true" style="margin-right: 10px;">新建团队</el-button>
          <el-dialog title="添加团队主题" :visible.sync="teamDialogFormVisible">
            <el-form :model="teamForm">
              <el-form-item label="团队主题" :label-width="formLabelWidth">
                <el-input v-model="teamForm.theme" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="teamDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addTeamTheme()">保 存</el-button>
            </div>
          </el-dialog>

<!--          &lt;!&ndash;成员管理&ndash;&gt;-->
<!--          <el-button type="primary" @click="getMemberData()">成员管理</el-button>-->

<!--          <el-dialog title="成员管理" :visible.sync="manageDialogTableVisible">-->
<!--            <el-table :data="memberManageForm">-->
<!--              <el-table-column label="#" type="index"></el-table-column>-->
<!--              <el-table-column property="id" label="成员id" width="300" v-model="memberManageForm.id"></el-table-column>-->
<!--              <el-table-column property="name" label="成员姓名" width="300" v-model="memberManageForm.name"></el-table-column>-->
<!--              <el-table-column label="操作" width="200">-->
<!--                <template v-slot="scope">-->
<!--                  <el-tooltip effect="dark" content="删除成员" placement="top" :enterable="false">-->
<!--                    <el-button-->
<!--                        type="danger"-->
<!--                        icon="el-icon-delete"-->
<!--                        @click="memberDelete(scope.row.id)"-->
<!--                    ></el-button>-->
<!--                  </el-tooltip>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--            </el-table>-->
<!--          </el-dialog>-->

          <div
              style="
              float: right;
              margin-right: 20px;
              font-size: 20px;
              font-family: FZShuTi;
            "
          >
            马文博医生，您好
          </div>
        </el-menu>
      </el-header>
      <el-main>
        <div style="margin-bottom: 50px">
          <el-page-header @back="goBack" content="会议筹办"> </el-page-header>
        </div>
        <div>

          <el-card class="box-card">
            <div slot="header" class="clearfix">

              <div style="font-size: 20px; font-family: STHupo">
                团队列表
              </div>

            </div>
            <div class="text item">
              <el-table v-model="teamSelected" :data="teamSelected" stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column property="t_id" label="团队ID" width="255" v-model="teamSelected.t_id"></el-table-column>
                <el-table-column property="theme" label="团队主题" width="255" v-model="teamSelected.theme"></el-table-column>
                <el-table-column label="操作" width="200">
                  <template v-slot="scope">
                    <el-tooltip effect="dark" content="修改团队主题" placement="top" :enterable="false">
                      <el-button
                          type="primary"
                          icon="el-icon-edit"
                          size="mini"
                          @click="changeTeamTheme(scope.row.t_id, scope.row.theme)"
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="增加成员" placement="top" :enterable="false">
                      <el-button
                          type="info"
                          icon="el-icon-circle-plus-outline"
                          size="mini"
                          @click="increaseMember(scope.row.t_id)"
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="删除团队成员" placement="top" :enterable="false">
                      <el-button
                          type="danger"
                          icon="el-icon-delete"
                          size="mini"
                          @click="deleteMember(scope.row.t_id)"
                      ></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>

              <!--修改团队主题对话框-->

              <el-dialog title="修改团队主题" :visible.sync="changeTeamThemeDialogFormVisible">
                <el-form :model="changeTeamThemeForm">
                  <el-form-item label="团队ID" :label-width="formLabelWidth">
                    <el-input v-model="changeTeamThemeForm.t_id" autocomplete="off" :placeholder="this.teamID" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="团队主题" :label-width="formLabelWidth">
                    <el-input v-model="changeTeamThemeForm.theme" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="changeTeamThemeDialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="upChangeTeamTheme()">提 交</el-button>
                </div>
              </el-dialog>

              <!--增加团队成员对话框-->

              <el-dialog title="可添加成员列表" :visible.sync="increaseMemberVisible" style="overflow: auto">
                <el-table :data="getMemberInvolved">
                  <el-table-column label="#" type="index"></el-table-column>
                  <el-table-column property="id" label="成员ID" width="233" v-model="memberManageForm.id"></el-table-column>
                  <el-table-column property="name" label="成员姓名" width="300" v-model="memberManageForm.name"></el-table-column>
                  <el-table-column label="操作" width="133">
                    <template v-slot="scope">
                      <el-tooltip effect="dark" content="添加成员" placement="top" :enterable="false">
                        <el-button
                            type="primary"
                            icon="el-icon-circle-plus-outline"
                            size="small"
                            @click="upIncreaseMember(scope.row.id)"
                        ></el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>

              <!--删除成员对话框-->
              <el-dialog title="团队成员列表" :visible.sync="deleteMemberVisible">
                <el-table :data="deleteMemberInvolved">
                  <el-table-column label="#" type="index"></el-table-column>
                  <el-table-column property="id" label="成员ID" width="233" v-model="deleteMemberInvolved.id"></el-table-column>
                  <el-table-column property="name" label="成员姓名" width="300" v-model="deleteMemberInvolved.name"></el-table-column>
                  <el-table-column label="操作" width="133">
                    <template v-slot="scope">
                      <el-tooltip effect="dark" content="删除成员" placement="top" :enterable="false">
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="small"
                            @click="memberDelete(scope.row.id)"
                        ></el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
<!--              <el-transfer-->
<!--                  style="text-align: left; display: inline-block"-->
<!--                  v-model="dataSelected"-->
<!--                  :titles="['未参与团队成员', '确认团队成员']"-->
<!--                  :props="{-->
<!--                  key: 'id',-->
<!--                  label: 'name'-->
<!--                }"-->
<!--                  :data="requestData"-->
<!--              >-->
<!--                <el-button-->
<!--                    class="transfer-footer"-->
<!--                    slot="right-footer"-->
<!--                    size="small"-->
<!--                    style="margin-left: 70px"-->
<!--                    @click="memberUpdate()"-->
<!--                >确定</el-button-->
<!--                >-->
<!--              </el-transfer>-->
              <el-dialog
                  title="选择时间"
                  :visible.sync="selectDialogVisible"
                  width="30%"
                  :before-close="handleClose"
              >
                <el-table
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    style="width: 100%"
                >
                  <el-table-column type="index" width="50"> </el-table-column>
                  <el-table-column property="date" label="日期" width="120">
                  </el-table-column>
                  <el-table-column property="time" label="时间" width="120">
                  </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
            <el-button @click="selectDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="selectDialogVisible = false"
            >确 定</el-button
            >
          </span>
              </el-dialog>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import { INITIAL_EVENTS, createEventId } from './event-utils'
import Element from "element-ui";
import axios from "axios";

export default {
  data() {
    return {
      tableData: [
        {
          date: "2020-12-12",
          time: "08:30-09:30",
          length: "1",
        },
        {
          date: "2020-12-12",
          time: "08:30-09:30",
          length: "1",
        },
        {
          date: "2020-12-12",
          time: "08:30-09:30",
          length: "1",
        },
        {
          date: "2020-12-12",
          time: "08:30-09:30",
          length: "1",
        },
      ],
      memberManageForm: [
        {
          id: '2020001',
          name: '许峰'
        },
        {
          id: '2020002',
          name: '肖刚'
        },
        {
          id: '2020003',
          name: '于会艳'
        }
      ],
      activityFormRules: {
        detail:{
          required: true, message: '请输入活动内容', trigger: 'blur'
        }
      },
      start1: "12:30",
      startTime: "",
      endTime: "",
      teamID: 1, //t_id
      teamTheme: "",
      changeMemberID: "", //要更改的成员ID
      requestData: [],
      dataSelected: [],
      formLabelWidth: '120px',
      activityDialogFormVisible: false,
      teamDialogFormVisible: false,
      selectDialogVisible: false,
      dialogVisible: false,
      manageDialogTableVisible: false,
      changeTeamThemeDialogFormVisible: false,
      increaseMemberVisible: false,
      deleteMemberVisible: false,
      activityForm: {
        id: '',
        date: '',
        time_start1: '',
        time_end1: '',
        detail: ''
      },
      teamForm: {
        theme: ''
      },
      teamSelected: [
        {
          t_id: 1,
          theme: '讨论'
      },
        {
          t_id: 2,
          theme: '吃饭'
        }
      ],
      changeTeamThemeForm: {
        t_id: this.teamID,
        theme: this.teamTheme
      },
      getMemberInvolved: [
        {
          id: '2020001',
          name: '许峰'
        },
        {
          id: '2020002',
          name: '肖刚'
        },
        {
          id: '2020003',
          name: '于会艳'
        }
      ],
      deleteMemberInvolved: [
        {
          id: '2020001',
          name: '许峰'
        },
        {
          id: '2020002',
          name: '肖刚'
        },
        {
          id: '2020003',
          name: '于会艳'
        }
      ]
    };
  },
  mounted() {
    // this.getData();
  },

  methods: {
    // memberUpdate(){
    //   axios
    //       .post("http://localhost:8082/doctor/build", {
    //         params: {
    //           t_id: this.teamID
    //         }
    //       })
    // },
    getMemberData() {
      this.manageDialogTableVisible = true
      axios
          .get("http://localhost:8082/doctor/people_in_team", {
            params: {
              t_id: this.teamID
            }
          })
          .then((res) => {
            console.log(res)
            this.memberManageForm = res.data
            console.log(this.memberManageForm)
          })
          .catch((error) => {
            console.log(error)
            return this.$message.error('获取成员列表失败')
          })
    },
    getData() {
      // const data = [];
      // for (let i = 1; i <= 15; i++) {
      //   data.push({
      //     key: i,
      //     label: `医生姓名`,
      //   });
      // }
      // this.data1 = data;
      axios
          .get("http://localhost:8082/doctor/people_notin_team", {
            params: {
              t_id: this.teamID
            },
          })
          .then((res) => {
            console.log(res)
            const requestData = []
            this.dataSelected = res.data
            this.$message.success("获取人员名单成功")
            for (let i = 0; i < res.data.length; i++) {
              this.requestData.push({
                id: res.data[i].id,
                name: res.data[i].name
              });
            }
            this.requestData = requestData
            console.log(requestData)
            return requestData;
          })
          .catch((error) => {
            console.log(error);
            // this.$message.error("获取人员名单失败")
          })
    },

    //表格操作按钮函数
    //修改团队主题✅
    changeTeamTheme(t_id, theme) {
      this.changeTeamThemeDialogFormVisible  = true
      this.teamID = t_id
      this.teamTheme = theme
      console.log(this.teamID)
      console.log(this.teamTheme)
    },
    //修改团队主题
    upChangeTeamTheme() {
      axios
      .post("http://localhost:8082/doctor/correct_team", {
        params: {
          t_id: this.teamID,
          theme: this.teamTheme
        },
      })
      .then((res) => {
        console.log(res)
        this.changeTeamThemeForm.theme = this.teamTheme
        this.changeTeamThemeForm.t_id = this.teamID
        console.log("当前团队id是" + this.changeTeamThemeForm.theme)
        console.log("当前团队主题是" + this.changeTeamThemeForm.t_id)
        this.$message.success("修改团队主题成功")
      })
      .catch((res) => {
        console.log(res)
        this.$message.error("修改团队主题失败")
      })
    },

    //接收可加入成员✅
    increaseMember(t_id) {
      this.increaseMemberVisible = true
      this.teamID = t_id
      axios
      .get("http://localhost:8082/doctor/people_notin_team", {
        params: {
          t_id: this.teamID
        }
      })
      .then((res) => {
        console.log(res)
        console.log(t_id)
        this.$message.success("获取员工列表成功")
        this.getMemberInvolved = res.data
      })
      .catch((res) => {
        console.log(res)
        this.$message.error("获取员工列表失败")
      })
    },
    //增加成员
    async upIncreaseMember(id) {
      //:data="getMemberInvolved"
      //id, name
      console.log(id)
      console.log(this.teamID)
      const confirmResult = await this.$confirm(
          "确认添加成员",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          }
      ).catch((err) => err)
      this.getMemberInvolved.id = id
      if (confirmResult !== 'confirm') {
        return this.$message.info("取消删除")
      }
      else if (confirmResult === 'confirm') {
        await axios
        .get("http://localhost:8082/doctor/build", {
          params: {
            t_id: this.teamID,
            id: this.getMemberInvolved.id
          }
        })
        .then((res) => {
          console.log("已添加")
          this.$message.success("成员已加入")
          this.increaseMember(this.teamID)
        })
        .catch((err) => {
          console.log("加入不成功")
          return this.$message.error("加入失败")
        })
      }
    },

    //接收团队成员✅
    deleteMember(t_id) {
      this.deleteMemberVisible = true
      this.teamID = t_id
      axios
      .get("http://localhost:8082/doctor/people_in_team", {
        params: {
          t_id: this.teamID
        }
      })
      .then((res) => {
        console.log(res)
        console.log(t_id)
        this.$message.success("获取团队成员列表成功")
        this.deleteMemberInvolved = res.data
      })
      .catch((res) => {
        console.log(res)
        this.$message.error("获取团队成员列表失败")
      })
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

    //新建团队✅
    addTeamTheme(){
      console.log(this.teamForm.theme)
      axios
          .get("http://localhost:8082/doctor/build_team", {
            params: {
              theme: this.teamForm.theme
            },
          })
          .then((res) => {
            console.log(res)
            this.teamID = res.data.t_id
            console.log(res.data.t_id)
            console.log(this.teamID)
            this.$message.success("提交团队主题成功")
          })
          .catch((res) => {
            console.log(res)
            this.$message.error("提交团队主题失败")
          })
      this.teamDialogFormVisible = false
    },

    //删除团队成员✅
    async memberDelete(id) {
      console.log(id)
      console.log(this.teamID)
      const confirmResult = await this.$confirm(
          '确认删除该成员',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).catch((err) => err)
      this.deleteMemberInvolved.id = id
      if (confirmResult !== 'confirm') {
        return this.$message.info("取消删除")
      }
      else if (confirmResult === 'confirm') {
        await axios
            .get("http://localhost:8082/doctor/delete_member", {
              params: {
                t_id: this.teamID,
                id: this.deleteMemberInvolved.id
              }
            })
            .then((res) => {
              console.log(res)
              console.log("已删除")
              this.$message.success("成员已移出")
              this.deleteMember(this.teamID)
            })
            .catch((err) => {
              console.log("删除不成功")
              return this.$message.error('删除失败')
            })
      }
    },

    goBack() {
      this.$router.push("/about");
    },
  },
};
</script>




<style scoped>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: rgb(255, 255, 255);
  color: #333;
  text-align: center;
  height: 800px;
}

body > .el-container {
  margin-bottom: 40px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 800px;
  margin-left: 330px;

  background-color: rgb(252, 253, 252);
}

.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
</style>