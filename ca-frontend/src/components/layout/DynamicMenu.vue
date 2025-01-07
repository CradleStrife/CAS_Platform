<template>
  <ul class="dynamic-menu">
    <li
      v-for="item in subMenuItems"
      :key="item"
      @click="$emit('select-sub-menu', item)"
      :class="{ 'sub-selected': selectedSubMenu === item }"
    >
      &#149; {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "DynamicMenu",
  props: {
    subMenuItems: {
      type: Array,
      required: true,
    },
    selectedSubMenu: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.dynamic-menu {
  margin: 0;
  padding: 0;
  color: #fff;
}

li {
  margin: 6px 0; /* 减小子菜单项的上下间距 */
  padding: 6px; /* 减小子菜单项的内边距 */
  cursor: pointer;
}

li:hover {
  color: #60c3c0;
}

li.sub-selected {
  font-weight: bold;
  color: #60c3c0; /* 子菜单选中状态颜色 */
}
</style>
