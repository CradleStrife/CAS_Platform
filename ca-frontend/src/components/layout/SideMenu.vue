<template>
  <div class="menu-container">
    <!-- 主菜单 -->
    <aside class="side-menu">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.label"
          @click="selectMenu(item)"
          :class="{ selected: selectedMenu === item.label }"
        >
          <div class="menu-item">
            <img :src="item.icon" alt="icon" class="menu-icon" />
            <span>{{ item.label }}</span>
          </div>
        </li>
      </ul>
    </aside>

    <!-- 子菜单 -->
    <aside class="sub-menu" v-if="selectedMenu">
      <ul>
        <li
          v-for="subItem in subMenus[selectedMenu]"
          :key="subItem"
          @click="selectSubMenu(subItem)"
          :class="{ selected: selectedSubMenu === subItem }"
        >
          {{ subItem }}
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import manipulateIcon from "@/assets/manipulate-icon.svg";
import databaseIcon from "@/assets/database-icon.svg";
import calculateIcon from "@/assets/calculate-icon.svg";

export default {
  name: "SideMenu",
  data() {
    return {
      selectedMenu: "Manipulate", // 默认选中的主菜单
      selectedSubMenu: null, // 当前选中的子菜单
      menuItems: [
        { label: "Manipulate", icon: manipulateIcon },
        { label: "Database", icon: databaseIcon },
        { label: "Calculate", icon: calculateIcon },
      ],
      subMenus: {
        Manipulate: ["Results", "Mixture", "XML", "Figure", "Vis"],
        Database: ["View Data", "Compound", "Solution"],
        Calculate: [
          "Reaction",
          "Equilib",
          "Phase Diagram",
          "Predom",
          "EpH",
          "Optimize",
        ],
      },
    };
  },
  methods: {
    // 切换主菜单
    selectMenu(item) {
      this.selectedMenu = item.label;
      this.selectedSubMenu = null; // 重置子菜单选中状态
    },
    // 选择子菜单并通知父组件
    selectSubMenu(subItem) {
      this.selectedSubMenu = subItem;
      //调试日志
      console.log(`SubMenu clicked: ${subItem}`); // 调试日志
      // 通过 $emit 通知父组件
      this.$emit("select-submenu", subItem);
    },
  },
};
</script>

<style scoped>
.menu-container {
  display: flex;
  flex-direction: row; /* 水平排列主菜单和子菜单 */
  height: 100%;
}

.side-menu {
  width: 180px; /* 调整主菜单宽度 */
  background-color: #45485e;
  color: #fff;
  padding: 10px;
  height: 100%;
  font-family: Arial, sans-serif;
}

.sub-menu {
  width: 160px; /* 调整子菜单宽度 */
  background-color: #6e7189; /* 子菜单背景颜色 */
  color: #fff;
  padding: 10px;
  height: 100%;
}

.menu-icon {
  width: 24px; /* 图标宽度 */
  height: 24px; /* 图标高度 */
  margin-right: 10px; /* 图标与文字的间距 */
  display: inline-block; /* 确保图标显示 */
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

li.selected {
  background-color: #60c3c0; /* 选中主菜单的背景颜色 */
}
</style>
