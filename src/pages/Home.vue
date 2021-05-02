<template>
  <div class="home-container">
    <div class="home-wrapper">
      <div class="logo-wrapper">
        <img src="../assets/logo.png" alt="logo" />
      </div>
      <div class="desc">
        <p>
          予定内容と開始時刻を登録することで、予定の5分前にアラートでお知らせします。
        </p>
      </div>
      <div class="clock">
        <p class="clock__date">{{ date }}</p>
        <p class="clock__time">{{ time }}</p>
      </div>
      <div class="schedule-contents">
        <div class="schedule-input-wrapper">
          <input placeholder="予定内容を入力" type="text" maxlength="30" />
        </div>
        <div class="time-container">
          <div class="time-container__hour-wrapper">
            <input min="0" max="23" type="number" placeholder="時" />
          </div>
          <div class="time-container__minutes-wrapper">
            <input min="0" max="59" type="number" placeholder="分" />
          </div>
        </div>
        <div>
          <button class="create-button">登録</button>
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
              <tr>
                <td class="td-1"></td>
                <td class="td-2">9:00</td>
                <td class="td-3"><button>削除</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { ref } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      timepicker: {
        HH: "20",
        mm: "00",
      },
    });
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

    setInterval(updateTime, 1000);
    updateTime();

    return {
      date,
      time,
      state,
    };
  },
});
</script>

<style scoped lang="scss">
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
    margin-bottom: 24px;
  }
  .clock {
    text-align: center;
    color: #2196f3;
    margin-bottom: 32px;
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
      border: 1px solid #cfd8dc;
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
    border: 1px solid #2196f3;
    background: #2196f3;
    color: white;
    height: 2.2em;
    width: max-content;
    padding: 0.3em 0.5em;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .schedule-list {
    height: calc(100% - 311px);
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
      border-right: 1px solid #2196f3;
    }
    table th {
      text-align: center;
      color: white;
      background-color: #2196f3;
      border-left: 1px solid #2196f3;
      border-top: 1px solid #2196f3;
      border-bottom: 1px solid #2196f3;
      padding: 8px;
    }
    table td {
      border-left: 1px solid #cfd8dc;
      border-bottom: 1px solid #cfd8dc;
      border-top: none;
      padding: 8px;
      vertical-align: inherit;
    }
    table td:last-child {
      border-right: 1px solid #cfd8dc;
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
      border: 1px solid #cfd8dc;
      padding: 0.3em 0.5em;
      height: 2.2em;
      border-right: none;
      width: 64px;
    }
    &__minutes-wrapper {
      border: 1px solid #cfd8dc;
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
