import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import RegisterSuccess from '../views/auth/RegisterSuccess.vue'; 
import HomePage from "@/views/HomePage.vue";
import InformationCenter from "@/views/InformationCenter.vue";

// Calculate 子菜单路由
import Reaction from "@/views/calculate/Reaction.vue";
import Equilib from "@/views/calculate/Equilib.vue";
import PhaseDiagram from "@/views/calculate/PhaseDiagram.vue";
import Predom from "@/views/calculate/Predom.vue";
import EpH from "@/views/calculate/EpH.vue";
import Optimize from "@/views/calculate/Optimize.vue";

// Database 子菜单路由
import ViewData from "@/views/database/ViewData.vue";
import Compound from "@/views/database/Compound.vue";
import Solution from "@/views/database/Solution.vue";

// Manipulate 子菜单路由
import Results from "@/views/manipulate/Results.vue";
import Mixture from "@/views/manipulate/Mixture.vue";
import XML from "@/views/manipulate/XML.vue";
import Figure from "@/views/manipulate/Figure.vue";
import Vis from "@/views/manipulate/Vis.vue";

import ForgotPassword from '@/views/auth/ForgotPassword.vue';

// 定义路由
const routes = [
  {
  path: '/',
  redirect: '/login', // 重定向到 /login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/register/success',
    name: 'RegisterSuccess',
    component: RegisterSuccess,
    meta: { requiresRegister: true } // 动态验证：访问成功页需要完成注册
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: "/information-center",
    name: "InformationCenter",
    component: InformationCenter,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  //新添加的子菜单路由
    // Manipulate 子菜单
    { path: "/manipulate/results", component: Results },
    { path: "/manipulate/mixture", component: Mixture },
    { path: "/manipulate/xml", component: XML },
    { path: "/manipulate/figure", component: Figure },
    { path: "/manipulate/vis", component: Vis },
    // Database 子菜单
    { path: "/database/view-data", component: ViewData },
    { path: "/database/compound", component: Compound },
    { path: "/database/solution", component: Solution },
    // Calculate 子菜单
    { path: "/calculate/reaction", component: Reaction },
    { path: "/calculate/equilib", component: Equilib },
    { path: "/calculate/phase-diagram", component: PhaseDiagram },
    { path: "/calculate/predom", component: Predom },
    { path: "/calculate/eph", component: EpH },
    { path: "/calculate/optimize", component: Optimize },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})


// 全局导航守卫
router.beforeEach((to, from, next) => {
  console.log('Global navigation guard:', {
    to: to.path,
    from: from.path,
    meta: to.meta,
    registered: sessionStorage.getItem('registered')
  });
  
  // 如果目标路由需要注册验证
  if (to.meta.requiresRegister && !sessionStorage.getItem('registered')) {
    console.log('Blocking navigation - no registration status')
    // 未完成注册时，重定向到注册页面
    next('/register')
  } else {
    console.log('Allowing navigation')
    // 允许访问目标页面
    next()
  }
})

export default router
