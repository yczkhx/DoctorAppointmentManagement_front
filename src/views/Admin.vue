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
      <div style="float: right; margin-top: 27px">
        <a href="#/adminLogin" style="text-decoration: none" class="logout"
          >退出登录</a
        >
      </div>
    </el-header>
    <div style="background-color: rgba(188, 210, 244, 0.3)">
      <el-divider></el-divider>
      <div align="center">
        <el-card class="box-card" style="width: 1050px">
          <el-button
            @click="addDr()"
            size="medium"
            icon="el-icon-edit"
            style="width: 930px"
            >添加</el-button
          >
          <div align="center" style="height: 700px">
            <el-table
              :data="
                data.slice((currentPage - 1) * PageSize, currentPage * PageSize)
              "
              stripe
              style="width: 1050px; margin-top: 30px"
            >
              <el-table-column
                prop="name"
                label="姓名"
                width="150"
                v-model="data.name"
              >
              </el-table-column>
              <el-table-column
                prop="department"
                label="科室"
                width="170"
                v-model="data.department"
              >
              </el-table-column>
              <el-table-column
                prop="position"
                label="级别"
                width="270"
                v-model="data.position"
              >
              </el-table-column>
              <el-table-column
                prop="authorityTeam"
                label="权限"
                width="130"
                v-model="data.authorityTeam"
              >
                <template v-slot="scope">
                  <el-button type="text">{{
                    scope.row.authorityTeam == 0 ? "无" : "有"
                  }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="opr" label="操作" width="210">
                <template v-slot="scope">
                  <el-button
                    type="text"
                    size="middle"
                    @click="editDr(scope.row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    size="middle"
                    @click="deleteDr(scope.row.id)"
                    >删除</el-button
                  >
                  <el-button
                    type="text"
                    size="middle"
                    @click="jump(scope.row.id)"
                    >分配门诊</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div>
            <el-dialog
              title="医生信息"
              :visible.sync="modifyVisible"
              width="507px"
            >
              <el-form
                :model="form"
                style="width: 300px; margin-left: 10px"
                :rules="rules"
                ref="form"
              >
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="科室" prop="department">
                  <el-input v-model="form.department" autocomplete="off">
                  </el-input>
                </el-form-item>
                <el-form-item label="级别" prop="position">
                  <el-input v-model="form.position" autocomplete="off">
                  </el-input>
                </el-form-item>
                <el-form-item label="权限" prop="authorityTeam">
                  <el-input v-model="form.authorityTeam" autocomplete="off">
                  </el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="modifyVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
          <div>
            <el-dialog
              title="医生信息"
              :visible.sync="addVisible"
              width="507px"
            >
              <el-form
                :model="form"
                style="width: 300px; margin-left: 10px"
                :rules="rules"
                ref="form"
              >
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="科室" prop="department">
                  <el-input v-model="form.department" autocomplete="off">
                  </el-input>
                </el-form-item>
                <el-form-item label="级别" prop="position">
                  <el-input v-model="form.position" autocomplete="off">
                  </el-input>
                </el-form-item>
                <el-form-item label="权限" prop="authorityTeam">
                  <el-input v-model="form.authorityTeam" autocomplete="off">
                  </el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddForm('form')"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
          <div class="bottom" style="margin-bottom: 40px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="PageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            >
            </el-pagination>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .logout:visited {
    color: black;
  }
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      modifyVisible: false,
      addVisible: false,
      form: {
        name: "",
        department: "",
        position: "",
        authorityTeam: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        department: [
          { required: true, message: "请输入科室", trigger: "blur" },
        ],
        position: [{ required: true, message: "请输入级别", trigger: "blur" }],
        authorityTeam: [
          { required: true, message: "请输入权限", trigger: "blur" },
        ],
      },
      onModifyId: "",
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [5, 10, 15, 20],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
    };
  },

  mounted() {
    this.getInfo();
  },

  methods: {
    submitForm(formName) {
      console.log(this.form.name);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var auth;
          if (this.form.authorityTeam == "有") {
            auth = 1;
          } else {
            auth = 0;
          }
          var newName = {
            id: this.data.onModifyId,
            name: this.form.name,
          };
          var newDepartment = {
            id: this.data.onModifyId,
            department: this.form.department,
          };
          var newPosition = {
            id: this.data.onModifyId,
            position: this.form.position,
          };
          var newAuthorityteam = {
            authorityteam: auth,
            id: this.data.onModifyId,
          };
          axios
            .put(`https://www.rhysdid.site:20086/doctor/changename`, newName)
            .then(() => {
              axios
                .put(
                  `https://www.rhysdid.site:20086/doctor/changedepartment`,
                  newDepartment
                )
                .then(() => {
                  axios
                    .put(
                      `https://www.rhysdid.site:20086/doctor/changeauthorityteam`,
                      newAuthorityteam
                    )
                    .then(() => {
                      axios
                        .put(
                          `https://www.rhysdid.site:20086/doctor/changeposition`,
                          newPosition
                        )
                        .then(() => {
                          this.modifyVisible = false;
                          this.$message("成功");
                        })
                        .catch(console.log("failed"));
                    })
                    .catch(console.log("failed"));
                })
                .catch(console.log("failed"));
            })
            .catch(console.log("failed"));
        } else {
          console.log("请输入信息");
          return false;
        }
      });
    },

    submitAddForm(formName) {
      console.log(this.form.name);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var newId = parseInt(this.data[this.totalCount - 1].id) + 1;
          var auth;
          if (this.form.authorityTeam == "有") {
            auth = 1;
          } else {
            auth = 0;
          }
          var doctor = {
            authorityTeam: auth,
            department: this.form.department,
            eMail: "string",
            id: newId.toString(),
            name: this.form.name,
            password: "123456",
            position: this.form.position,
            sex: "女",
            tel: "string",
          };
          axios
            .post(`https://www.rhysdid.site:20086/doctor/add`, doctor)
            .then(() => {
              this.addVisible = false;
              this.$message("成功");
            })
            .catch(console.log("failed"));
        } else {
          console.log("请输入信息");
          return false;
        }
      });
    },

    jump(id) {
      this.$router.push({
        path: "/admin/distribute",
        query: {
          id: id,
        },
      });
    },

    editDr(id) {
      console.log(id);
      this.data.onModifyId = id;
      this.modifyVisible = true;
    },

    deleteDr(id) {
      console.log(id);
      axios
        .delete(`https://www.rhysdid.site:20086/doctor/delete?id=${id}`)
        .then(() => {
          this.$message("成功");
        })
        .catch(console.log("failed"));
    },

    addDr() {
      this.addVisible = true;
    },

    getInfo() {
      axios.get("https://www.rhysdid.site:20086/doctor/all").then((res) => {
        this.totalCount = res.data.length;
        this.data = res.data;
        // console.log(this.data[0].name);
      });
    },

    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },

    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    },
  },
};
</script>