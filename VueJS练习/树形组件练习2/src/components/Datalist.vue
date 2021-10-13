<template>
  <div class="data-list" v-if="dataList">
    <el-row v-for="(data, index) in dataList" :key="index">
      <i class="flag el-icon-caret-bottom" v-if="data.data"></i>
      <el-input v-model="data.name"></el-input>
      <el-input v-model="data.display_name"></el-input>
      <el-select v-model="data.type">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :value="item.value"
          :label="item.value"
        />
      </el-select>
      <el-button class="btn-add" @click="showTooltip($event, data)">
        <span>+</span>
        <ul class="add-model" v-show="data.showTooltip">
          <li @click="addSiblingNode(data, index)">添加兄弟节点</li>
          <li @click="addChildrenNode(data)" :class="{ disabled: !data.data }">
            添加子节点
          </li>
        </ul>
      </el-button>
      <el-button class="btn-delete" @click="deleteItem(index)">
        <i class="el-icon-delete"></i>
      </el-button>
      <data-list :dataList="data.data" class="children" />
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DataList",
  props: ["dataList"],
  data() {
    return {
      selectOptions: [
        {
          value: "event",
        },
        {
          value: "string",
        },
        {
          value: "picture",
        },
      ],
      value: {},
    };
  },
  created() {
    this.addTooltip(this.dataList);
  },
  methods: {
    addTooltip(obj) {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          this.$set(obj[key], "showTooltip", false);
          this.addTooltip(obj[key]);
        }
      }
    },
    showTooltip(e, data) {
      if (e.target.tagName === "BUTTON" || e.target.tagName === "SPAN") {
        const target = !data.showTooltip;
        this.cleanTooltip();
        data.showTooltip = target;
      }
    },
    deleteItem(index) {
      if (this.dataList.length !== 1) {
        this.dataList.splice(index, 1);
      }
    },
    addSiblingNode(data, index) {
      this.cleanTooltip();
      this.dataList.splice(index, 0, JSON.parse(JSON.stringify(data)));
    },
    addChildrenNode(data) {
      this.cleanTooltip();
      if (data.data) {
        data.data.unshift(JSON.parse(JSON.stringify(data.data[0])));
      }
    },
    cleanTooltip(obj = this.dataList) {
      for (const key in obj) {
        if (key === "showTooltip") {
          obj[key] = false;
        }
        if (typeof obj[key] === "object") {
          this.cleanTooltip(obj[key]);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.data-list {
  .flag {
    position: absolute;
    top: 0.9rem;
    display: inline-block;
  }
  .el-row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .el-input {
      width: 10%;
      &.el-input:first-of-type {
        margin-left: 2rem;
      }
    }
    .el-input,
    .el-select,
    .el-button {
      margin: 0px 5px;
    }
    .btn-add,
    .btn-delete {
      font-size: 2rem;
      padding: 0;
      width: 2.5rem;
      &.btn-delete {
        font-size: 1.5rem;
      }
      &.btn-add {
        position: relative;
        &:hover,
        &:focus {
          ul {
            color: #606266;
          }
        }
        ul {
          position: absolute;
          padding: 5px 0;
          margin: 0;
          left: 0;
          top: 120%;
          font-size: 1rem;
          z-index: 2;
          border: 1px solid #eee;
          background-color: #fff;
          color: #606266;

          > li {
            list-style: none;
            text-align: left;
            padding: 5px 10px;
            line-height: 2rem;
            &:hover {
              background: #eee;
            }
            &.disabled {
              cursor: not-allowed;
            }
          }
        }
      }
    }
    .children {
      width: 100%;
      margin: 10px 0 -10px 2rem;
    }
  }
}
</style>
