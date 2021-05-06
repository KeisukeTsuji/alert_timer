import { mount, shallowMount } from "@vue/test-utils";
import Home from "@/pages/Home.vue";
import ScheduleForm from "@/components/ScheduleForm.vue";
import ScheduleList from "@/components/ScheduleList.vue";

// alertでエラーを吐くのでnullに
window.alert = jest.fn();
window.alert = () => null;

describe("ScheduleForm.vue", () => {
  test("propsを受け取れること", () => {
    const wrapper = shallowMount(ScheduleForm, {
      props: {
        contents: "test",
        selectTime: {
          hour: "1",
          minutes: "1",
        },
        createSchedule: () => null,
      },
    });
    expect(wrapper.vm.$props.contents).toBe("test");
    expect(JSON.stringify(wrapper.vm.$props.selectTime)).toBe(
      JSON.stringify({
        hour: "1",
        minutes: "1",
      })
    );
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

describe("Home.vue", () => {
  test("登録ボタンクリック後にtableに登録内容が反映されるか", async () => {
    const wrapper = mount(Home);
    // console.log(wrapper.html());
    wrapper.vm.contents = "test";
    wrapper.vm.state.selectTime = { HH: "1", mm: "2" };
    await wrapper.find(".create-button").trigger("click");
    expect(wrapper.find(".td-1").text()).toMatch("test");
    expect(wrapper.find(".td-2").text()).toMatch("01:02");
  });
});
