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
        <div class="demo-app">
          <el-card class="box-card">
            <div class="demo-app-sidebar">
              <div style="margin-bottom: 50px">
          <el-page-header @back="goBack" content="门诊时间管理"> </el-page-header>
        </div>
              <div class="demo-app-sidebar-section">
                <h2>Set Timetable</h2>
                <ul>
                  <li>Here are the events you need to select</li>
                  <li>Click it to set</li>
                  <li>The follows are memebers</li>
                </ul>
              </div>
              <div class="demo-app-sidebar-section" style="margin-top: 80px">
                <h2>Choose your doctor</h2>
                <el-select
                  v-model="value"
                  placeholder="请选择"
                  style="margin-top: 80px"
                  clearable
                  :change="changePage()"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-card>
          <div class="demo-app-main">
            <FullCalendar
              class="demo-app-calendar"
              ref="ca"
              :options="calendarOptions"
            >
              <template v-slot:eventContent="arg">
                <b>{{ arg.timeText }}</b>
                <i>{{ arg.event.title }}</i>
              </template>
            </FullCalendar>
          </div>
        </div>
        <el-dialog title="提示" :visible.sync="visible" width="25%">
          <span>请选取要设置的时间段</span>
          <div style="margin-top:30px">
            <el-radio v-model="radio1" label="1" border>上午</el-radio>
            <el-radio v-model="radio1" label="2" border>下午</el-radio>
          </div>
          <span slot="footer" class="dialog-footer">
            
            <el-button type="primary" @click="settheTime()">确 定</el-button>
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
import allLocales from "@fullcalendar/core/locales-all";
import listPlugin from "@fullcalendar/list";
//import { INITIAL_EVENTS, createEventId } from './event-utils'
import Element from "element-ui";
import axios from "axios";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

//console.log(todayStr + "T12:00:00")

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  inject: ["reload"],
  data: function () {
    return {
      calendarOptions: {
        plugins: [
          timeGridPlugin,
          interactionPlugin,
          // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "",
        },
        locale: "zh",
        initialView: "timeGridWeek",
        slotMinTime: "07:00:00",
        slotMaxTime: "19:00:00",
        //initialEvents: this.forINITIAL_EVENTS(), // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        //selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        height: "650px",
        //weekends: true,
        //navLinks: true,
        //navLinkDayClick: "timeGridDay",
        //nowIndicator: true,
        // businessHours: [
        //   // specify an array instead
        //   {
        //     daysOfWeek: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday
        //     startTime: "08:00", // 8am
        //     endTime: "17:00", // 6pm
        //   },
        //   {
        //     daysOfWeek: [0, 6], // Thursday, Friday
        //     startTime: "09:00", // 10am
        //     endTime: "16:00", // 4pm
        //   },
        // ],
        weekends: true,
        firstDay: 6,
        //snapDuration: "00:10",
        //select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        dateClick: this.handleDateClick,
        //eventsSet: this.handleEvents,
        //eventChange: this.handleEventChange,
        //eventDataTransform: this.tranform,
        events: this.forINITIAL_EVENTS(),
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      options: this.allmembers(),
      value: "",
      radio1: "1",
      visible: false,
      currentEvents: [],
      nowClickInfo: [],
      newEventSelectInfo: [],
      newCalendar: true,
      nowCalendar: "",
    };
  },
  mounted() {
    //this.initialallView();
    //this.forINITIAL_EVENTS();
  },
  methods: {
    forINITIAL_EVENTS() {
      var Events = [];
      axios
        .get("http://localhost:8081/doctor/get_time", {})
        .then((res) => {
          console.log(res);
          for (var i in res.data) {
            var thiscolor = "#409EFF";
            if (res.data[i].counting == 1) {
              thiscolor = "#ff9569";
            }
            if (res.data[i].counting > 1) {
              thiscolor = "#F56C6C";
            }
            if (res.data[i].item_id == 1) {
              Events.push({
                id: i,
                title: "门诊",
                start: res.data[i].date + "T08:00:00",
                end: res.data[i].date + "T11:30:00",
                color: thiscolor,
              });
            } else if (res.data[i].item_id == 2) {
              Events.push({
                id: i,
                title: "门诊",
                start: res.data[i].date + "T14:00:00",
                end: res.data[i].date + "T17:30:00",
                color: thiscolor,
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      //console.log(Events)

      return Events;
    },

    changePage() {
      //console.log(this.value);
      //写切换
      if(this.value==""){
        this.calendarOptions.events=this.forINITIAL_EVENTS();
      }

      if (this.value != "") {
        axios
          .get("http://localhost:8081/patient/get_doctor_time", {
            params: {
              doctor_id: this.value,
            },
          })
          .then((res) => {
            console.log(res);
            this.calendarOptions.events = [];
            for (var i in res.data.time_uses)
              if (res.data.time_uses[i].item == 1) {
                this.calendarOptions.events.push({
                  id: i,
                  title: "门诊",
                  start: res.data.time_uses[i].date + "T08:00:00",
                  end: res.data.time_uses[i].date + "T11:30:00",
                  color: "#ff9569",
                });
              } else if (res.data.time_uses[i].item == 2) {
                this.calendarOptions.events.push({
                  id: i,
                  title: "门诊",
                  start: res.data.time_uses[i].date + "T14:00:00",
                  end: res.data.time_uses[i].date + "T17:30:00",
                  color: "#ff9569",
                });
              }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    handleDateClick(dateClickInfo) {
      console.log(dateClickInfo);
      this.visible = true;
      this.nowClickInfo = dateClickInfo;
      this.nowCalendar = dateClickInfo.view.calendar;
      if (this.value == "") {
        this.$message.error("请选择你要添加的人员");
        this.visible = false;
        return;
      }
    },

    // handleEventClick(clickInfo) {
    //   //console.log(this.$refs.ca.getApi())
    //   //this.$refs.ca.FullCalendar( 'refetchEvents')
    //   //$('#ca').fullCalendar('refetchEvents');
    //   //this.reload();

    //   console.log(clickInfo);
    //   this.visible = true;
    //   this.nowClickInfo = clickInfo.event;
    //   this.nowCalendar = clickInfo.view.calendar;
    // },
    settheTime() {
      var num = "";
      if (this.radio1=='1') {
        num = 1;
        this.calendarOptions.events.push({
        id: this.nowClickInfo.dateStr,
        title: "已分配",
        start: this.nowClickInfo.dateStr.slice(0, 10) + "T08:00:00",
        end: this.nowClickInfo.dateStr.slice(0, 10) + "T11:30:00",
        color: "#ff9569",
      });
      } else if (this.radio1=='2') {
        num = 2;
        this.calendarOptions.events.push({
        id: this.nowClickInfo.dateStr,
        title: "已分配",
        start: this.nowClickInfo.dateStr.slice(0, 10) + "T14:00:00",
        end: this.nowClickInfo.dateStr.slice(0, 10) + "T17:30:00",
        color: "#ff9569",
      });
      }
      axios
        .get("http://localhost:8082/doctor/arr", {
          params: {
            doctor_id: this.value,
            number: num,
            date1: this.nowClickInfo.dateStr.slice(0, 10),
          },
        })
        .then((res) => {
          //console.log(res);
          this.changePage();
        })
        .catch(function (error) {
          console.log(error);
        });
        
      this.visible = false;
    },

    allmembers() {
      var Members = [];
      axios
        .get("http://localhost:8082/doctor/get_member", {
          params: {
            doctor_id: "2020001",
          },
        })
        .then((res) => {
          //console.log(res);
          for (var i in res.data) {
            Members.push({
              value: res.data[i].id,
              label: res.data[i].name,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      return Members;
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
  background-color: rgb(248, 248, 248);
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;

  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.box-card {
  background: #eaf9ff;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
