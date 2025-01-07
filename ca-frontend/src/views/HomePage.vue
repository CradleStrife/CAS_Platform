<template>
  <div class="home-page">
    <TopHeader 
      @show-information-center="showInformationCenter" 
      @show-home="showHome"
    />
    <div class="main-container">
      <SideMenu @select-submenu="switchComponent" />
      <!-- 动态加载右侧区域的内容 -->
      <div class="dynamic-content">
        <p>Currently displaying: {{ currentComponent }}</p> <!-- 调试 -->
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/components/layout/TopHeader.vue";
import SideMenu from "@/components/layout/SideMenu.vue";
import MainContent from "@/components/layout/MainContent.vue";
import InformationCenter from "@/views/InformationCenter.vue";
import Welcome from "@/components/layout/Welcome.vue";

// 导入 Manipulate、Database 和 Calculate 子菜单的组件
import Results from "@/views/manipulate/Results.vue";
import Mixture from "@/views/manipulate/Mixture.vue";
import XML from "@/views/manipulate/XML.vue";
import Figure from "@/views/manipulate/Figure.vue";
import Vis from "@/views/manipulate/Vis.vue";

import ViewData from "@/views/database/ViewData.vue";
import Compound from "@/views/database/Compound.vue";
import Solution from "@/views/database/Solution.vue";

import Reaction from "@/views/calculate/Reaction.vue";
import Equilib from "@/views/calculate/Equilib.vue";
import PhaseDiagram from "@/views/calculate/PhaseDiagram.vue";
import Predom from "@/views/calculate/Predom.vue";
import EpH from "@/views/calculate/EpH.vue";
import Optimize from "@/views/calculate/Optimize.vue";

export default {
  name: "HomePage",
  components: {
    TopHeader,
    SideMenu,
    MainContent,
    InformationCenter,
    Welcome, 
    Results,
    Mixture,
    XML,
    Figure,
    Vis,
    ViewData,
    Compound,
    Solution,
    Reaction,
    Equilib,
    PhaseDiagram,
    Predom,
    EpH,
    Optimize,
  },
  data() {
    return {
      currentComponent: "Welcome", // 默认显示主内容
      componentMap: {
      Results: "Results",
      Mixture: "Mixture",
      XML: "XML",
      Figure: "Figure",
      Vis: "Vis",
      "View Data": "ViewData",
      Compound: "Compound",
      Solution: "Solution",
      Reaction: "Reaction",
      Equilib: "Equilib",
      "Phase Diagram": "PhaseDiagram",
      Predom: "Predom",
      EpH: "EpH",
      Optimize: "Optimize",
      },
    };
  },
  methods: {
    showHome() {
      this.currentComponent = "Welcome"; // 切换到 Welcome 界面
    },
    showInformationCenter() {
      this.currentComponent = "InformationCenter"; // 切换到信息中心
    },
    switchComponent(subItem) {
      // 根据子菜单名称切换右侧显示的组件
      const componentMap = {
        Results: "Results",
        Mixture: "Mixture",
        XML: "XML",
        Figure: "Figure",
        Vis: "Vis",
        "View Data": "ViewData",
        Compound: "Compound",
        Solution: "Solution",
        Reaction: "Reaction",
        Equilib: "Equilib",
        "Phase Diagram": "PhaseDiagram",
        Predom: "Predom",
        EpH: "EpH",
        Optimize: "Optimize",
      };

      if (componentMap[subItem]) {
        console.log(`Switching to component: ${componentMap[subItem]}`); // 调试日志
        this.currentComponent = componentMap[subItem];
      } else {
        console.error(`No component found for submenu: ${subItem}`);
      }
    },
  },
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
}

.dynamic-content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
}
</style>
