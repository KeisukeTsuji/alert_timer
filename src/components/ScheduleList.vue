<template>
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
          <tr v-for="(alertInfo, i) in alertList" :key="alertInfo.id">
            <td class="td-1" :id="`td_1_${i}`">{{ alertInfo.contents }}</td>
            <td class="td-2" :id="`td_2_${i}`">
              {{ formingTime(alertInfo.selectTime.HH) }}:{{
                formingTime(alertInfo.selectTime.mm)
              }}
            </td>
            <td class="td-3">
              <button
                :id="`delete_button_${i}`"
                @click="deleteSchedule(alertInfo.id)"
              >
                削除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AlertList } from "@/types/interface";

export default defineComponent({
  props: {
    alertList: {
      type: Array as PropType<AlertList[]>,
      required: true,
    },
    formingTime: {
      type: Function,
      required: true,
    },
    deleteSchedule: {
      type: Function,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
$main-color: #2196f3;
$border-color: #cfd8dc;

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
</style>
