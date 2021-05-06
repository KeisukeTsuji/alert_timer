import { shallowMount } from "@vue/test-utils";
import ScheduleForm from "@/components/ScheduleForm.vue";
import ScheduleList from "@/components/ScheduleList.vue";

describe("ScheduleForm.vue", () => {
  test("propsを受け取れること", () => {
    const wrapper = shallowMount(ScheduleForm, {
      props: {
        hour: "1",
        minutes: "1",
        contents: "test",
        createSchedule: () => null,
      },
    });
    expect(wrapper.vm.$props.contents).toBe("test");
    expect(wrapper.vm.$props.hour).toBe("1");
    expect(wrapper.vm.$props.minutes).toBe("1");
    expect(wrapper.vm.$props.createSchedule).toBeTruthy();
  });
});

describe("ScheduleList.vue", () => {
  test("propsを受け取れること", () => {
    const wrapper = shallowMount(ScheduleList, {
      props: {
        alertList: [
          {
            id: "test",
            contents: "test",
            selectTime: {
              HH: "test",
              mm: "test",
            },
          },
        ],
        formingTime: () => null,
        deleteSchedule: () => null,
      },
    });
    expect(JSON.stringify(wrapper.vm.$props.alertList)).toBe(
      JSON.stringify([
        {
          id: "test",
          contents: "test",
          selectTime: {
            HH: "test",
            mm: "test",
          },
        },
      ])
    );
    expect(wrapper.vm.$props.deleteSchedule).toBeTruthy();
  });
});
