<template>
  <div class="clock">
    <p class="clock__date">{{ date }}</p>
    <p class="clock__time">{{ time }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
$main-color: #2196f3;
$border-color: #cfd8dc;

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
</style>
