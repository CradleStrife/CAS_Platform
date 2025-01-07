<template>
  <header class="top-header">
    <div class="logo">Home Page</div>
    <div class="actions">
      <!-- Home 按钮 -->
      <button class="icon" title="Home" @click="goHome">
        <IconHome />
      </button>

      <!-- Information Center 按钮 -->
      <button class="icon" title="Information Center" @click="goToInformationCenter">
        <IconInformation />
      </button>

      <!-- Logout 按钮 -->
      <button class="icon" title="Logout" @click="logout">
        <IconPower />
      </button>
    </div>
  </header>
</template>

<script>
import IconHome from "@/components/icons/IconHome.vue";
import IconInformation from "@/components/icons/IconInformation.vue";
import IconPower from "@/components/icons/IconPower.vue";

export default {
  name: "TopHeader",
  components: {
    IconHome,
    IconInformation,
    IconPower,
  },
  methods: {
    goHome() {
      this.$emit("show-home"); // 修改为与 HomePage.vue 的事件名称一致
    },
    goToInformationCenter() {
      this.$emit("show-information-center"); // 触发事件切换到信息中心
    },
    logout() {
      alert("You have been logged out.");
      this.$router.push("/login"); // 模拟注销功能
    },
  },
};
</script>

<style scoped>
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #60c3c0;
  padding: 10px 20px;
  color: #fff;
}

.logo {
  font-size: 18px;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 10px;
}

.icon {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
}
</style>
