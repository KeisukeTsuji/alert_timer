<template>
  <div class="home">
    <div class="clock">
      <p class="clock__date">{{ date }}</p>
      <p class="clock__time">{{ time }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  setup() {
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
    };
  },
});
</script>

<style scoped lang="scss">
.home {
  padding: 40px;
  .clock {
    text-align: center;
    color: #2196f3;
    &__time {
      letter-spacing: 0.05em;
      font-size: 80px;
      padding: 6px 0;
    }
    &__date {
      letter-spacing: 0.1em;
      font-size: 24px;
    }
  }
}
</style>
