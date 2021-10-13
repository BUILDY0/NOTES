<template>
  <div id="app">
    <data-list :dataList="data" />
  </div>
</template>

<script>
import dataList from "./components/Datalist.vue";

export default {
  name: "App",
  data() {
    return {
      data: [
        {
          name: "前五供应商",
          display_name: "标注多事件时显示的标题",
          type: "event",
          data: [
            {
              name: "供应商名称",
              type: "string",
              display_name: "供应商名称",
            },
            {
              name: "供应商电话",
              type: "string",
              display_name: "供应商电话",
            },
            {
              name: "供货商logo",
              type: "string",
              display_name: "供货商logo",
            },
            {
              name: "地址",
              display_name: "地址",
              type: "event",
              data: [
                {
                  name: "门牌号",
                  display_name: "门牌号",
                  type: "string",
                },
                {
                  name: "街道号",
                  display_name: "街道号",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "证券简称",
          display_name: "证券简称",
          type: "string",
        },
        {
          name: "证券代码",
          display_name: "证券代码",
          type: "picture",
        },
      ],
    };
  },
  components: {
    dataList,
  },
};
</script>

<style lang="scss">
</style>
