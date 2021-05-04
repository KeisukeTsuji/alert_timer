<template>
  <div class="schedule-from">
    <div class="schedule-input-wrapper">
      <input
        :value="contents"
        @input="$emit('update:contents', $event.target.value)"
        placeholder="予定内容を入力"
        type="text"
        maxlength="30"
      />
    </div>
    <div class="time-container">
      <div class="time-container__hour-wrapper">
        <input
          :value="hour"
          @input="$emit('update:hour', $event.target.value)"
          min="0"
          max="23"
          type="number"
          placeholder="時"
        />
      </div>
      <div class="time-container__minutes-wrapper">
        <input
          :value="minutes"
          @input="$emit('update:minutes', $event.target.value)"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    contents: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    minutes: {
      type: String,
      required: true,
    },
    createSchedule: {
      type: Function,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
$main-color: #2196f3;
$border-color: #cfd8dc;

.schedule-from {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;
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
}
</style>
