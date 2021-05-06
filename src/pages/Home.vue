<template>
  <div class="home-container">
    <div class="home-wrapper">
      <div class="logo-wrapper">
        <Logo />
      </div>
      <div class="desc-wrapper">
        <p class="desc-wrapper__desc">
          予定内容と開始時刻を登録することで予定の5分前にアラートでお知らせします。
        </p>
      </div>
      <Clock :date="date" :time="time" />
      <ScheduleForm
        :contents="contents"
        :selectTime="state.selectTime"
        :createSchedule="createSchedule"
        v-model:contents="contents"
        v-model:hour="state.selectTime.HH"
        v-model:minutes="state.selectTime.mm"
      />
      <ScheduleList
        :alertList="state.alertList"
        :formingTime="formingTime"
        :deleteSchedule="deleteSchedule"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { SelectTime, AlertList } from "@/types/interface";

import Logo from "@/components/Logo.vue";
import Clock from "@/components/Clock.vue";
import ScheduleForm from "@/components/ScheduleForm.vue";
import ScheduleList from "@/components/ScheduleList.vue";

export default defineComponent({
  components: {
    Logo,
    Clock,
    ScheduleForm,
    ScheduleList,
  },
  setup() {
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
        Number(state.selectTime.HH) > 24
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
      const result = window.confirm("本当に削除しますか？");
      if (result) {
        alert("削除しました。");
      } else {
        return;
      }
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
          Swal.fire(a.contents, "の5分前をお知らせします。");
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
  .desc-wrapper {
    margin-bottom: 24px;
  }
  .logo-wrapper {
    margin-bottom: 40px;
    img {
      width: 240px;
    }
  }
}
</style>
