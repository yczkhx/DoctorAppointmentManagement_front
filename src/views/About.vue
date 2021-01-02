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
            @click="backtohome"
          >
            黄渡理工职业技术学校附属医院
          </div>
          <!-- <el-menu-item index="./about" style="float: left;margin: auto;"
            ><div
              class="el-icon-s-home"
              style="
                float: left;
                margin-right: 8px;
                font-size: 25px;
                margin-top: 15px;
              "
            ></div>
            首页</el-menu-item
          > -->
          <div
            style="
              float: right;
              margin-right: 20px;
              font-size: 20px;
              font-family: FZShuTi;
            "
          >
            {{ myID }}，您好
          </div>
        </el-menu>
      </el-header>
      <el-main>
        <div class="demo-app">
          <el-card class="box-card">
            <div class="demo-app-sidebar">
              <div class="demo-app-sidebar-section">
                <h2>Unfinished</h2>
                <ul>
                  <li>Here are the events you need to finish</li>
                  <li>Drag, drop, and resize events</li>
                  <li>Sort by change time</li>
                </ul>
              </div>
              <div class="demo-app-sidebar-section">
                <h2>Unfinished Events ({{ currentEvents.length }})</h2>
                <ul>
                  <li v-for="event in currentEvents" :key="event.id">
                    <b>{{ event.startStr }}</b>
                    <i>{{ event.title }}</i>
                    <!-- <s v-if="delete">{{ event.title }}</s> -->
                  </li>
                </ul>
              </div>
            </div>

            <div style="position: fixed; bottom: 0">
              <el-button
                type="primary"
                @click="gotoOpera()"
                style="width: 120px"
                v-if="authority"
                >管理合作项目</el-button
              >
              <el-button
                type="primary"
                @click="gotoAdmin()"
                style="width: 120px"
                v-if="authority"
                >管理门诊时间</el-button
              >
            </div>
          </el-card>
          <div class="demo-app-main">
            <FullCalendar class="demo-app-calendar" :options="calendarOptions">
              <template v-slot:eventContent="arg">
                <b>{{ arg.timeText }}</b>
                <i>{{ arg.event.title }}</i>
              </template>
            </FullCalendar>
          </div>
        </div>
        <el-dialog title="修改名称" :visible.sync="dialogVisible" width="30%">
          <el-input
            type="text"
            placeholder="修改事件"
            v-model="eventText"
            maxlength="45"
            show-word-limit
            :disabled="unChangeTitle"
          >
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="info"
              @click="changetheEventTitle()"
              style="margin-right: 10px"
              >修 改</el-button
            >
            <el-button
              type="success"
              @click="changetheEventStatetoFinished()"
              style="margin-right: 10px"
              :disabled="finished"
              >已完成</el-button
            >
            <el-button
              type="warning"
              @click="changetheEventStatetoUnfinished()"
              style="margin-right: 10px"
              :disabled="unfinished"
              >未完成</el-button
            >
            <el-button
              type="danger"
              @click="deletethisevent()"
              @keyup.enter="deletethisevent()"
              style="margin-right: 20px"
              >删 除</el-button
            >
          </span>
        </el-dialog>

        <el-dialog
          title="新建日程"
          :visible.sync="dialogFormVisible"
          width="30%"
        >
          <el-form>
            <el-form-item label="日程名称">
              <el-input
                v-model="eventName"
                maxlength="45"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="setcalendar()">确 定</el-button>
          </div>
        </el-dialog>

        <el-drawer
          title="修改团队事件"
          :visible.sync="drawer"
          :direction="direction"
        >
          <span>我来啦!</span>
        </el-drawer>
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
//import { EventBus } from "../eventbus.js";
//import Login from "@/views/Login.vue";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

//console.log(todayStr + "T12:00:00")
export function createEventId() {
  return String(eventGuid++);
}
var EVENTS = [
  {
    id: "0",
    title: "1",
    start: todayStr,
  },
];
export default {
  name: "About",
  components: {
    FullCalendar,

    // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      //医生的id和权限
      myID: "",
      authority: false,

      finished: false,
      unfinished: false,
      unChangeTitle: false,
      eventText: "",
      eventName: "",
      nowclickinfo: [],
      dialogVisible: false,
      dialogFormVisible: false,
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
          listPlugin,
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        locale: "zh",
        initialView: "dayGridMonth",
        //initialEvents: this.forINITIAL_EVENTS(), // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        navLinks: true,
        navLinkDayClick: "timeGridDay",
        nowIndicator: true,
        businessHours: [
          // specify an array instead
          {
            daysOfWeek: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday
            startTime: "08:00", // 8am
            endTime: "17:00", // 6pm
          },
          {
            daysOfWeek: [0, 6], // Thursday, Friday
            startTime: "09:00", // 10am
            endTime: "16:00", // 4pm
          },
        ],
        snapDuration: "00:10",
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        //eventsSet: this.handleEvents,
        eventChange: this.handleEventChange,
        eventDataTransform: this.tranform,
        events: this.forINITIAL_EVENTS(),
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      newEventSelectInfo: [],
      newtitle: "未命名",
      newCalendar: "",
      nowCalendar: "",
      neweventifday: "",
      neweventdate: "",
      neweventstart: "",
      neweventend: "",
      drawer: false,
      direction: "btt",
    };
  },
  created() {
    this.getID();
    window.sessionStorage.setItem("token", 'aaa');
    //this.forINITIAL_EVENTS();
  },
  mounted() {},

  methods: {
    forINITIAL_EVENTS() {
      //console.log("aaaaaaaaaaaaaaaaa");
      //console.log(this.thatid);
      console.log(this.myID);
      var INITIAL_EVENTS = [];
      axios
        .get("http://localhost:8082/doctor/as", {
          params: {
            id: this.myID,
          },
        })
        .then((res) => {
          console.log(res);
          for (var i in res.data.activities) {
            var color = "#409EFF";
            var edit =true;

            if (res.data.activities[i].type == 1) {
              color = "#F56C6C";
              edit=false;
            }
            if (res.data.activities[i].state == 1) {
              color = "#67C23A";
            }
            if (
              res.data.activities[i].time_start == null &&
              res.data.activities[i].time_end == null
            ) {
              INITIAL_EVENTS.push({
                id: res.data.activities[i].activity_id,
                title: res.data.activities[i].detail,
                start: res.data.activities[i].date,
                color: color,
                editable:edit,
                extendedProps: {
                  state: res.data.activities[i].state,
                  type: res.data.activities[i].type,
                },
              });
              continue;
            }
            if (color === "#409EFF") {
              this.currentEvents.push({
                id: res.data.activities[i].activity_id,
                title: res.data.activities[i].detail,
                startStr:
                  res.data.activities[i].date +
                  "|" +
                  res.data.activities[i].time_start,
                endStr:
                  res.data.activities[i].date +
                  "|" +
                  res.data.activities[i].time_end,
                color: color,
                editable:edit,
                extendedProps: {
                  state: res.data.activities[i].state,
                  type: res.data.activities[i].type,
                },
              });
            }

            //console.log(res.data.activities[i].date+'T'+res.data.activities[i].time_start);
            INITIAL_EVENTS.push({
              id: res.data.activities[i].activity_id,
              title: res.data.activities[i].detail,
              start:
                res.data.activities[i].date +
                "T" +
                res.data.activities[i].time_start,
              end:
                res.data.activities[i].date +
                "T" +
                res.data.activities[i].time_end,
              color: color,
              editable:edit,
              extendedProps: {
                state: res.data.activities[i].state,
                type: res.data.activities[i].type,
              },
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(INITIAL_EVENTS);

      return INITIAL_EVENTS;
    },

    getID(){
      this.myID=this.$route.query.id;
      this.authority=this.$route.query.authority;
      //这里拿到了医生的id和权限
      // console.log(this.myID)
      // var INITIAL_EVENTS = [];
      // axios
      //   .get("http://localhost:8082/doctor/as", {
      //     params: {
      //       id: this.myID,
      //     },
      //   })
      //   .then((res) => {
      //     //console.log(res.data.activities);
      //     for (var i in res.data.activities) {
      //       var color = "#409EFF";

      //       if (res.data.activities[i].type == 1) {
      //         color = "#F56C6C";
      //       }
      //       if (res.data.activities[i].state == 1) {
      //         color = "#67C23A";
      //       }
      //       if (
      //         res.data.activities[i].time_start == null &&
      //         res.data.activities[i].time_end == null
      //       ) {
      //         INITIAL_EVENTS.push({
      //           id: res.data.activities[i].activity_id,
      //           title: res.data.activities[i].detail,
      //           start: res.data.activities[i].date,
      //           color: color,
      //           extendedProps: {
      //             state: res.data.activities[i].state,
      //             type: res.data.activities[i].type,
      //           },
      //         });
      //         continue;
      //       }
      //       if (color === "#409EFF") {
      //         this.currentEvents.push({
      //           id: res.data.activities[i].activity_id,
      //           title: res.data.activities[i].detail,
      //           startStr:
      //             res.data.activities[i].date +
      //             "|" +
      //             res.data.activities[i].time_start,
      //           endStr:
      //             res.data.activities[i].date +
      //             "|" +
      //             res.data.activities[i].time_end,
      //           color: color,
      //           extendedProps: {
      //             state: res.data.activities[i].state,
      //             type: res.data.activities[i].type,
      //           },
      //         });
      //       }

      //       //console.log(res.data.activities[i].date+'T'+res.data.activities[i].time_start);
      //       INITIAL_EVENTS.push({
      //         id: res.data.activities[i].activity_id,
      //         title: res.data.activities[i].detail,
      //         start:
      //           res.data.activities[i].date +
      //           "T" +
      //           res.data.activities[i].time_start,
      //         end:
      //           res.data.activities[i].date +
      //           "T" +
      //           res.data.activities[i].time_end,
      //         color: color,
      //         extendedProps: {
      //           state: res.data.activities[i].state,
      //           type: res.data.activities[i].type,
      //         },
      //       });
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      // console.log(INITIAL_EVENTS);
      // this.calendarOptions.events=INITIAL_EVENTS;
    },

    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      this.newEventSelectInfo = selectInfo;
      this.newCalendar = selectInfo.view.calendar;
      //console.log(this.newCalendar);
      //console.log(selectInfo.startStr.slice(11,19))
      this.neweventifday = selectInfo.allDay;

      this.neweventdate = selectInfo.startStr.slice(0, 10);
      if (selectInfo.allDay == false) {
        this.neweventstart = selectInfo.startStr.slice(11, 19);
        this.neweventend = selectInfo.endStr.slice(11, 19);
      } else {
        this.neweventstart = null;
        this.neweventend = null;
      }
      //console.log(this.neweventstart)
      //console.log(this.neweventend)

      //console.log(this.neweventend)
      this.dialogFormVisible = true;

      // let title = prompt("Please enter a new title for your event");
      // let calendarApi = selectInfo.view.calendar;
      // let abc = title;
      // //console.log(calendarApi);

      this.newCalendar.unselect(); // clear date selection
      //console.log(this.newCalendar);
      //console.log(selectInfo)
      // if (title) {
      //   calendarApi.addEvent({
      //     id: createEventId(),
      //     title,
      //     start: selectInfo.startStr,
      //     end: selectInfo.endStr,
      //     allDay: selectInfo.allDay,
      //     abc: selectInfo.allDay,
      //   });
      // }
    },

    setcalendar() {
      //新建个人事件

      const thistitle = this.eventName;
      axios
        .get("http://localhost:8082/doctor/new", {
          params: {
            date1: this.neweventdate,
            time_start1: this.neweventstart,
            time_end1: this.neweventend,
            detail: this.eventName,
            type: "0",
          },
        })
        .then((res) => {
          //console.log(thistitle);
          console.log(res);
          let event1 = this.newCalendar.addEvent({
            id: res.data.activityid,
            title: thistitle,
            start: this.newEventSelectInfo.startStr,
            end: this.newEventSelectInfo.endStr,
            allDay: this.newEventSelectInfo.allDay,
            color: "#409EFF",
            extendedProps: {
              state: 0,
              type: "0",
            },
          });
          this.currentEvents.push({
            id: res.data.activity_id,
            title: thistitle,
            startStr:
              this.newEventSelectInfo.startStr.slice(0, 10) +
              "|" +
              this.newEventSelectInfo.startStr.slice(11, 19),
            endStr:
              this.newEventSelectInfo.endStr.slice(0, 10) +
              "|" +
              this.newEventSelectInfo.endStr.slice(11, 19),
            color: "#409EFF",
            extendedProps: {
              state: 0,
              type: "0",
            },
          });
          //console.log(event1);
        })
        .catch(function (error) {
          console.log(error);
        });
      //event.setExtendedProp(text,'');

      //console.log(event1);

      //console.log(event1.extendedProps.text)

      this.eventName = "";
      this.dialogFormVisible = false;
    },

    handleEventClick(clickInfo) {
      //事件的点击事件,clickInfo是获取到的事件
      console.log(clickInfo.event);
      this.nowclickinfo = clickInfo;
      //console.log(this.nowclickinfo);
      this.eventText = this.nowclickinfo.event.title;

      this.nowCalendar = clickInfo.view.calendar;
      if (this.nowclickinfo.event.extendedProps.type == "1") {
        //console.log("aaaa");
        //this.unfinished = true;
        //this.finished = true;
        //this.unChangeTitle = true;
        this.$router.push("/opera");
      }
      //console.log(this.nowclickinfo.event.extendedProps.text);
      //console.log(this.eventText);
      this.dialogVisible = true;

      // if (
      //   confirm(
      //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
      //   )
      // ) {
      //   clickInfo.event.remove();
      // }
    },

    updateUnfinished(
      thisId,
      newTitle,
      newStartStr,
      newEndStr //更新未完成列表
    ) {
      for (var i in this.currentEvents) {
        if (this.currentEvents[i].id == thisId) {
          this.currentEvents[i].title = newTitle;
          this.currentEvents[i].startStr =
            newStartStr.slice(0, 10) + "|" + newStartStr.slice(11, 19);
          this.currentEvents[i].endStr =
            newEndStr.slice(0, 10) + "|" + newEndStr.slice(11, 19);
          break;
        }
      }
    },

    deletethisevent() {
      //删除事件
      this.nowclickinfo.event.remove();
      axios
        .get("http://localhost:8082/doctor/delete", {
          params: {
            id: this.myID,
            activity_id: this.nowclickinfo.event.id,
          },
        })
        .then((res) => {
          //console.log(thistitle);
          console.log(res);

          //console.log(event1);
        })
        .catch(function (error) {
          console.log(error);
        });

      this.dialogVisible = false;
    },

    changetheEventTitle() {
      //事件详细信息改变
      // console.log("修改");
      //console.log(this.nowclickinfo.event);
      // console.log(this.nowCalendar.getEventById(this.nowclickinfo.event.id))

      this.nowCalendar
        .getEventById(this.nowclickinfo.event.id)
        .setProp("title", this.eventText); //修改标题

      axios
        .get("http://localhost:8082/doctor/correct", {
          params: {
            activity_id: this.nowclickinfo.event.id,
            date1: this.nowclickinfo.event.startStr.slice(0, 10),
            time_start1: this.nowclickinfo.event.startStr.slice(11, 19),
            time_end1: this.nowclickinfo.event.endStr.slice(11, 19),
            detail: this.eventText,
            type: this.nowclickinfo.event.extendedProps.type,
            sta: this.nowclickinfo.event.extendedProps.state,
          },
        })
        .then((res) => {
          //console.log(thistitle);
          console.log(res);

          //console.log(event1);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.updateUnfinished(
        this.nowclickinfo.event.id,
        this.eventText,
        this.nowclickinfo.event.startStr,
        this.nowclickinfo.event.endStr
      );

      this.dialogVisible = false;
    },

    changetheEventStatetoFinished() {
      //事件状态改变为已完成
      this.nowCalendar
        .getEventById(this.nowclickinfo.event.id)
        .setProp("backgroundColor", "#67C23A");
      this.nowCalendar
        .getEventById(this.nowclickinfo.event.id)
        .setProp("borderColor", "#67C23A");
      this.nowCalendar
        .getEventById(this.nowclickinfo.event.id)
        .setExtendedProp("state", 1);

      axios
        .get("http://localhost:8082/doctor/correct", {
          params: {
            activity_id: this.nowclickinfo.event.id,
            date1: this.nowclickinfo.event.startStr.slice(0, 10),
            time_start1: this.nowclickinfo.event.startStr.slice(11, 19),
            time_end1: this.nowclickinfo.event.endStr.slice(11, 19),
            detail: this.nowclickinfo.event.title,
            type: this.nowclickinfo.event.extendedProps.type,
            sta: 1,
          },
        })
        .then((res) => {
          //console.log(thistitle);
          console.log(res);

          //console.log(event1);
        })
        .catch(function (error) {
          console.log(error);
        });

      for (var i in this.currentEvents) {
        if (this.currentEvents[i].id == this.nowclickinfo.event.id) {
          this.currentEvents.splice(i, 1);
        }
      }
      //this.finished=true;
      //this.unfinished=false;

      this.dialogVisible = false;
    },

    changetheEventStatetoUnfinished() {
      //事件状态改变为未完成
      this.nowCalendar
        .getEventById(this.nowclickinfo.event.id)
        .setProp("backgroundColor", "#409EFF");
      this.nowCalendar
        .getEventById(this.nowclickinfo.event.id)
        .setProp("borderColor", "#409EFF");
      this.nowCalendar
        .getEventById(this.nowclickinfo.event.id)
        .setExtendedProp("type", "changed");
      this.nowCalendar
        .getEventById(this.nowclickinfo.event.id)
        .setExtendedProp("state", 0);

      axios
        .get("http://localhost:8082/doctor/correct", {
          params: {
            activity_id: this.nowclickinfo.event.id,
            date1: this.nowclickinfo.event.startStr.slice(0, 10),
            time_start1: this.nowclickinfo.event.startStr.slice(11, 19),
            time_end1: this.nowclickinfo.event.endStr.slice(11, 19),
            detail: this.nowclickinfo.event.title,
            type: "changed",
            sta: 0,
          },
        })
        .then((res) => {
          //console.log(thistitle);
          console.log(res);

          //console.log(event1);
        })
        .catch(function (error) {
          console.log(error);
        });
      var test = 0;
      for (var i in this.currentEvents) {
        if (this.currentEvents[i].id == this.nowclickinfo.event.id) {
          test = 1;
        }
      }
      if (test == 0) {
        this.currentEvents.push({
          id: this.nowclickinfo.event.id,
          title: this.nowclickinfo.event.title,
          startStr:
            this.nowclickinfo.event.startStr.slice(0, 10) +
            "|" +
            this.nowclickinfo.event.startStr.slice(11, 19),
          endStr:
            this.nowclickinfo.event.endStr.slice(0, 10) +
            "|" +
            this.nowclickinfo.event.endStr.slice(11, 19),
          color: "#67C23A",
          extendedProps: {
            state: 0,
            type: "changed",
          },
        });
      }

      //this.finished=false;
      //this.unfinished=true;
      this.dialogVisible = false;
    },

    gotoOpera() {
      this.$router.push("/opera");
    },
    gotoAdmin() {
      this.$router.push("/admin");
    },
    backtohome() {
      this.$message.success("跳转至主界面");
      setTimeout(function () {}, 500);
      this.$router.push("/");
    },

    // handleEvents(events) {
    //   //事件设置成功时的函数
    //   //console.log(events[events.length - 1]);

    //   for (var i in events) {
    //     if (events[i].extendedProps.state==0) {
    //       this.currentEvents.push({
    //         id: events[i].id,
    //         title: events[i].title,
    //         startStr:
    //           events[i].startStr,
    //         endStr:
    //           events[i].endStr,

    //       });
    //     }
    //   }

    //   //console.log(this.currentEvents);
    // },

    handleEventChange(clickInfo) {
      if (
        clickInfo.event.startStr == clickInfo.oldEvent.startStr &&
        clickInfo.event.endStr == clickInfo.oldEvent.endStr
      ) {
        return;
      }

      axios
        .get("http://localhost:8082/doctor/correct", {
          params: {
            activity_id: clickInfo.event.id,
            date1: clickInfo.event.startStr.slice(0, 10),
            time_start1: clickInfo.event.startStr.slice(11, 19),
            time_end1: clickInfo.event.endStr.slice(11, 19),
            detail: clickInfo.event.title,
            type: clickInfo.event.extendedProps.type,
            sta: clickInfo.event.extendedProps.state,
          },
        })
        .then((res) => {
          //console.log(thistitle);
          console.log(res);
          //console.log(event1);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.updateUnfinished(
        clickInfo.event.id,
        clickInfo.event.title,
        clickInfo.event.startStr,
        clickInfo.event.endStr
      );

      console.log(clickInfo);
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
  line-height: 1.5;
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
