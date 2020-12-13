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
            马文博医生，您好
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
                  <li>Click an event to delete it</li>
                </ul>
              </div>
              <div class="demo-app-sidebar-section">
                <h2>Unfinished Events ({{ currentEvents.length }})</h2>
                <ul>
                  <li v-for="event in currentEvents" :key="event.id">
                    <b>{{ event.startStr }}</b>
                    <i>{{ event.title }}</i>
                  </li>
                </ul>
              </div>
            </div>

            <div style="position: fixed; bottom: 0">
              <el-button type="primary" @click="gotoOpera()"
                >创建合作项目</el-button
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
        <el-dialog title="详细信息" :visible.sync="dialogVisible" width="30%">
          <el-input
            type="textarea"
            :rows="7"
            placeholder="事件详细信息"
            v-model="eventText"
          >
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="info" @click="changeEvent()">修 改</el-button>
            <el-button type="success" @click="changeEvent()">已完成</el-button>
            <el-button type="warning" @click="changeEvent()">未完成</el-button>
            <el-button
              type="danger"
              @click="deletethisevent()"
              @keyup.enter="deletethisevent()"
              style="margin-right: 37px"
              >删 除</el-button
            >
          </span>
        </el-dialog>

        <el-dialog title="新建日程" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="日程名称">
              <el-input v-model="eventName"></el-input>
            </el-form-item>
            <el-form-item label="详细信息">
              <el-input
                type="textarea"
                :rows="7"
                placeholder="事件详细信息"
                v-model="eventText2"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="setcalendar()">确 定</el-button>
          </div>
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

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      eventText: "ssss",
      eventText2: "无",
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
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventChange: this.handleEventChange,
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
      nowCalendar:'',
    };
  },

  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      this.newEventSelectInfo = selectInfo;
      this.newCalendar = selectInfo.view.calendar;
      this.dialogFormVisible = true;

      // let title = prompt("Please enter a new title for your event");
      // let calendarApi = selectInfo.view.calendar;
      // let abc = title;
      // //console.log(calendarApi);

      this.newCalendar.unselect(); // clear date selection

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
      //event.setExtendedProp(text,'');
      let event1 = this.newCalendar.addEvent({
        id: createEventId(),
        title: this.eventName,
        start: this.newEventSelectInfo.startStr,
        end: this.newEventSelectInfo.endStr,
        allDay: this.newEventSelectInfo.allDay,
        extendedProps: {
          text: this.eventText2,
        },
      });
      //console.log(event1)

      //console.log(event1.extendedProps.text)

      this.eventName = "";
      this.eventText2 = "无";
      this.dialogFormVisible = false;
    },

    handleEventClick(clickInfo) {
      //console.log(clickInfo.event);
      this.nowclickinfo = clickInfo;
      console.log(this.nowclickinfo);
      this.eventText = this.nowclickinfo.event.extendedProps.text;

      this.nowCalendar=clickInfo.view.calendar;
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

    deletethisevent() {
      this.nowclickinfo.event.remove();
      this.dialogVisible = false;
    },

    changeEvent() {
      // console.log("修改");
      // console.log(this.nowclickinfo.event);
      // console.log(this.nowCalendar.getEventById(this.nowclickinfo.event.id))
      this.nowCalendar.getEventById(this.nowclickinfo.event.id).setExtendedProp('text', this.eventText )
      
      this.dialogVisible = false;
    },

    gotoOpera() {
      this.$router.push("/opera");
    },

    handleEvents(events) {
      //事件设置成功时的函数
      this.currentEvents = events;
      //console.log(this.currentEvents);
    },

    handleEventChange(clickInfo) {
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
