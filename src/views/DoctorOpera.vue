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
              请选择与会成员
            </div>
          
            </div>
            <div class="text item">
              <el-transfer
                style="text-align: left; display: inline-block"
                v-model="value4"
                filterable
                :titles="['Source', 'Target']"
                :format="{
                  noChecked: '${total}',
                  hasChecked: '${checked}/${total}',
                }"
                :data="data1"
              >
                <span slot-scope="{ option }"
                  >{{ option.key }} - {{ option.label }}</span
                >

                <el-button
                  class="transfer-footer"
                  slot="right-footer"
                  size="small"
                  style="margin-left: 70px"
                  @click="handleChange()"
                  >确定</el-button
                >
              </el-transfer>
            </div>
          </el-card>
        </div>
        <el-dialog
          title="选择时间"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column property="date" label="日期" width="120">
            </el-table-column>
            <el-table-column property="time" label="时间" width="120">
            </el-table-column>
            <el-table-column property="length" label="长度"> </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
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

      start1: "12:30",
      startTime: "",
      endTime: "",
      dialogVisible: false,
      data1: [],
      value: [1],
      value4: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
      this.dialogVisible = true;
    },
    getData() {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 `,
          disabled: i % 4 === 0,
        });
      }
      this.data1 = data;
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
  background-color: rgb(243, 243, 243);
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
</style>
