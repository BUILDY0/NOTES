<template>
  <ul class="tree">
    <li class="tree-node" v-for="(node, index) in data" :key="node.label">
      <i
        v-if="node.children"
        class="iconfont"
        :class="{
          down: !showNode[index],
          right: showNode[index],
        }"
      ></i>
      <span @click="handleClick(index)">{{ node.label }}</span>
      <base-tree
        :data="node.children"
        v-if="showNode[index] && node.children"
      ></base-tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: "base-tree",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showNode: [],
    };
  },
  methods: {
    handleClick(index) {
      const flag = !this.showNode[index];
      this.$set(this.showNode, index, flag);
    },
  },
};
</script>

<style scoped>
@import "./assets/font.css";

li {
  list-style: none;
  cursor: pointer;
}
li span {
  vertical-align: middle;
}
</style>