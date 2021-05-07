import { mount, shallowMount } from "@vue/test-utils";
import Home from "@/pages/Home.vue";
import ScheduleForm from "@/components/ScheduleForm.vue";
import ScheduleList from "@/components/ScheduleList.vue";

// alert, confirmのエラー対応
window.alert = jest.fn(() => true);
window.confirm = jest.fn(() => true);

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
  test("登録時に予定内容が未入力だと登録されない", async () => {
    const wrapper = mount(Home);
    wrapper.vm.contents = "";
    wrapper.vm.state.selectTime = { HH: "1", mm: "2" };
    await wrapper.find(".create-button").trigger("click");
    console.log(wrapper.html());
    expect(wrapper.find("#td_1_0").exists()).toBe(false);
    expect(wrapper.find("#td_2_0").exists()).toBe(false);
  });
  test("登録時に開始時刻(hour)が未入力だと登録されない", async () => {
    const wrapper = mount(Home);
    wrapper.vm.contents = "test1";
    wrapper.vm.state.selectTime = { HH: "", mm: "2" };
    await wrapper.find(".create-button").trigger("click");
    console.log(wrapper.html());
    expect(wrapper.find("#td_1_0").exists()).toBe(false);
    expect(wrapper.find("#td_2_0").exists()).toBe(false);
  });
  test("登録時に開始時刻(minutes)が未入力だと登録されない", async () => {
    const wrapper = mount(Home);
    wrapper.vm.contents = "test1";
    wrapper.vm.state.selectTime = { HH: "1", mm: "" };
    await wrapper.find(".create-button").trigger("click");
    console.log(wrapper.html());
    expect(wrapper.find("#td_1_0").exists()).toBe(false);
    expect(wrapper.find("#td_2_0").exists()).toBe(false);
  });
  test("登録ボタンクリック後にtableに登録内容が反映される", async () => {
    // console.log(wrapper.html());
    // 1回目の入力
    const wrapper = mount(Home);
    wrapper.vm.contents = "test1";
    wrapper.vm.state.selectTime = { HH: "1", mm: "2" };
    await wrapper.find(".create-button").trigger("click");
    expect(wrapper.find("#td_1_0").text()).toMatch("test1");
    expect(wrapper.find("#td_2_0").text()).toMatch("01:02");
  });
  test("登録ボタンクリック後にtableに登録内容が反映される(2回目)", async () => {
    const wrapper = mount(Home);
    wrapper.vm.contents = "test2";
    wrapper.vm.state.selectTime = { HH: "3", mm: "4" };
    await wrapper.find(".create-button").trigger("click");
    expect(wrapper.find("#td_1_0").text()).toMatch("test2");
    expect(wrapper.find("#td_2_0").text()).toMatch("03:04");
  });
  test("削除ボタンで該当項目(test2)を削除できるか", async () => {
    const wrapper = mount(Home);
    await wrapper.find("#delete_button_0").trigger("click");
    expect(wrapper.find("#td_1_0").text()).toMatch("test1");
    expect(wrapper.find("#td_2_0").text()).toMatch("01:02");
    expect(wrapper.find("#td_1_1").exists()).toBe(false);
    expect(wrapper.find("#td_2_1").exists()).toBe(false);
  });
});
