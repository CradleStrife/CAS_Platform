<template>
  <div class="information-center">
    <h1>Information Center</h1>
    <ul>
      <li>1. Introduction</li>
      <li>2. Applications</li>
      <li>3. F&Q</li>
    </ul>
    <button @click="$emit('go-back')" class="back-btn">Back</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "InformationCenter",
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.push("/home"); // 返回首页
    };

    return {
      goBack,
    };
  },
};
</script>

<style scoped>
.information-center {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #60c3c0;
  font-size: 24px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  color: #333;
  font-size: 18px;
}

.back-btn {
  margin-top: 20px;
  background-color: #60c3c0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
