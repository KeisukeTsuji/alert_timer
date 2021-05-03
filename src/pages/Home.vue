<template>
  <div class="home-container">
    <div class="home-wrapper">
      <div class="logo-wrapper">
        <img src="../assets/logo.png" alt="logo" />
      </div>
      <div class="desc">
        <p>
          予定内容と開始時刻を登録することで予定の5分前にアラートでお知らせします。
        </p>
      </div>
      <div class="clock">
        <p class="clock__date">{{ date }}</p>
        <p class="clock__time">{{ time }}</p>
      </div>
      <div class="schedule-contents">
        <div class="schedule-input-wrapper">
          <input
            v-model="contents"
            placeholder="予定内容を入力"
            type="text"
            maxlength="30"
          />
        </div>
        <div class="time-container">
          <div class="time-container__hour-wrapper">
            <input
              v-model="state.selectTime.HH"
              min="0"
              max="23"
              type="number"
              placeholder="時"
            />
          </div>
          <div class="time-container__minutes-wrapper">
            <input
              v-model="state.selectTime.mm"
              min="0"
              max="59"
              type="number"
              placeholder="分"
            />
          </div>
        </div>
        <div>
          <button class="create-button" @click="createSchedule">登録</button>
        </div>
      </div>
      <div class="schedule-list">
        <div class="table-wrapper">
          <table border="5" bordercolor="red">
            <thead>
              <tr>
                <th class="th-1" width="60%" colspan="1">予定内容</th>
                <th class="th-2" width="25%" colspan="1">開始時刻</th>
                <th width="15%" colspan="1"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(alertInfo, i) in state.alertList"
                :key="`alertInfo${i}`"
              >
                <td class="td-1">{{ alertInfo.contents }}</td>
                <td class="td-2">
                  {{ formingTime(alertInfo.selectTime.HH) }}:{{
                    formingTime(alertInfo.selectTime.mm)
                  }}
                </td>
                <td class="td-3">
                  <button @click="deleteSchedule(alertInfo.id)">削除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  setup() {
    interface SelectTime {
      HH: null | string;
      mm: null | string;
    }
    interface AlertList {
      id: string;
      contents: string;
      selectTime: SelectTime;
    }

    const state = reactive({
      selectTime: {
        HH: null,
        mm: null,
      } as SelectTime,
      alertList: [] as AlertList[],
    });
    const contents = ref("");
    const date = ref("");
    const time = ref("");
    const week = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"];

    const zeroPadding = (num: number, digit: number) => {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    };

    const updateTime = () => {
      const cd = new Date();
      time.value =
        zeroPadding(cd.getHours(), 2) +
        ":" +
        zeroPadding(cd.getMinutes(), 2) +
        ":" +
        zeroPadding(cd.getSeconds(), 2);
      date.value =
        zeroPadding(cd.getFullYear(), 4) +
        "/" +
        zeroPadding(cd.getMonth() + 1, 2) +
        "/" +
        zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    };

    const getItems = (itemName: string) => {
      const getItems = localStorage.getItem(itemName);
      if (getItems) {
        return JSON.parse(getItems);
      } else {
        return [];
      }
    };

    const setItem = (key: string, item: string) => {
      localStorage.setItem(key, item);
    };

    const alertMessage = (message: string) => {
      alert(message);
    };

    const resetInputContents = () => {
      state.selectTime = {
        HH: null,
        mm: null,
      };
      contents.value = "";
    };

    const isCreateScheduleValidation = () => {
      if (!contents.value) {
        return true;
      } else if (
        Number(state.selectTime.HH) < 0 ||
        Number(state.selectTime.HH) > 12
      ) {
        return true;
      } else if (
        Number(state.selectTime.mm) < 0 ||
        Number(state.selectTime.mm) > 59
      ) {
        return true;
      }
      return false;
    };

    const createSchedule = () => {
      if (isCreateScheduleValidation()) {
        alert(
          "未入力箇所または無効な入力がございます。入力内容をご確認ください。"
        );
        return;
      }
      const itemName = "alertList";
      const createdlist = getItems(itemName);
      const alertItem = {
        id: uuidv4(),
        contents: contents.value,
        selectTime: state.selectTime,
      };
      createdlist.unshift(alertItem);
      setItem(itemName, JSON.stringify(createdlist));
      state.alertList = createdlist;
      alertMessage("登録しました");
      resetInputContents();
    };

    const getSchedule = () => {
      const itemName = "alertList";
      const createdlist = getItems(itemName);
      state.alertList = createdlist;
    };

    const deleteSchedule = (id: string) => {
      const alertList = state.alertList.filter((a) => a.id !== id);
      state.alertList = alertList;
      const itemName = "alertList";
      setItem(itemName, JSON.stringify(alertList));
    };

    const formingTime = (time: string | null) => {
      if (time !== null) {
        if (time.length === 1) {
          return `0${time}`;
        }
      }
      return time;
    };

    const removeInitialZero = (time: string) => {
      if (time.length === 2 && time[0] === "0") {
        return time[1];
      }
      return time;
    };

    const createDate = (hour: number, minutes: number, seconds: number) => {
      const date = new Date();
      date.setHours(hour);
      date.setMinutes(minutes);
      date.setSeconds(seconds);
      return date;
    };

    watch(time, () => {
      const timeArr = time.value.split(":");
      for (const a of state.alertList) {
        const hour = Number(removeInitialZero(timeArr[0]));
        const minutes = Number(removeInitialZero(timeArr[1]));
        const seconds = Number(removeInitialZero(timeArr[2]));
        const now = createDate(hour, minutes, seconds);
        const settingHour = Number(a.selectTime.HH);
        const settingMinutes = Number(a.selectTime.mm);
        const settingDate = createDate(settingHour, settingMinutes, 0);
        const before5Min = settingDate.getTime() - 300000;
        const before5MinDate = new Date(before5Min);
        if (
          now.getHours() === before5MinDate.getHours() &&
          now.getMinutes() === before5MinDate.getMinutes() &&
          now.getSeconds() === 0
        ) {
          alert(`${a.contents}の5分前をお知らせします。`);
        }
      }
    });

    setInterval(updateTime, 1000);
    updateTime();
    getSchedule();

    return {
      contents,
      date,
      time,
      state,
      createSchedule,
      deleteSchedule,
      formingTime,
    };
  },
});
</script>

<style scoped lang="scss">
$main-color: #2196f3;
$border-color: #cfd8dc;

.home-container {
  .home-wrapper {
    width: 720px;
    height: 100vh;
    margin: auto;
    padding: 40px;
    background-color: #ffffff;
  }
  background: #bbdefb;
  .desc {
    margin-bottom: 24px;
  }
  .logo-wrapper {
    margin-bottom: 40px;
    img {
      width: 240px;
    }
  }
  .clock {
    text-align: center;
    color: $main-color;
    margin-bottom: 24px;
    &__time {
      letter-spacing: 0.05em;
      font-size: 64px;
    }
    &__date {
      letter-spacing: 0.1em;
      font-size: 24px;
    }
  }
  .schedule-input-wrapper {
    width: 100%;
    input {
      border: 1px solid $border-color;
      padding: 0.3em 0.5em;
      height: 2.2em;
      border-right: none;
      width: 100%;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
  .schedule-contents {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 24px;
  }
  .create-button {
    border: 1px solid $main-color;
    background: $main-color;
    color: white;
    height: 2.2em;
    width: max-content;
    padding: 0.3em 0.5em;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .schedule-list {
    height: calc(100% - 292px);
    overflow: auto;
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }
    table th:first-child {
      border-radius: 5px 0 0 0;
    }
    table th:last-child {
      border-radius: 0 5px 0 0;
      border-right: 1px solid $main-color;
    }
    table th {
      text-align: center;
      color: white;
      background-color: $main-color;
      border-left: 1px solid $main-color;
      border-top: 1px solid $main-color;
      border-bottom: 1px solid $main-color;
      padding: 8px;
    }
    table td {
      border-left: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
      border-top: none;
      padding: 8px;
      vertical-align: inherit;
    }
    table td:last-child {
      border-right: 1px solid $border-color;
    }
    table tr:last-child td:first-child {
      border-radius: 0 0 0 5px;
    }
    table tr:last-child td:last-child {
      border-radius: 0 0 5px 0;
    }
    table thead th {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .td-1 {
      width: 60%;
      white-space: pre-wrap;
    }
    .td-2 {
      width: 25%;
      white-space: pre-wrap;
    }
    .td-3 {
      width: 15%;
      white-space: pre-wrap;
      text-align: center;
      button {
        padding: 0.3em 0.5em;
        border-radius: 5px;
        background-color: #e53935;
        color: white;
      }
    }
  }
  .time-container {
    display: flex;
    &__hour-wrapper {
      border: 1px solid $border-color;
      padding: 0.3em 0.5em;
      height: 2.2em;
      border-right: none;
      width: 64px;
    }
    &__minutes-wrapper {
      border: 1px solid $border-color;
      padding: 0.3em 0.5em;
      height: 2.2em;
      border-right: none;
      width: 64px;
    }
    input {
      width: 100%;
    }
  }
}
</style>
