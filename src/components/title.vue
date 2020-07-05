<template>
<div class="titles">
  <div>
    <div>
      <a class="logo">
        <img src="../assets/logo1.png"/>
      </a>
    </div>
  </div>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#fff" background-color="#545c64" @select="handleSelect">
    <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
    <el-submenu index="1">
          <template slot="title">即时比分</template>
          <el-menu-item index="1-2" @click="Goto('/basketball')">篮球比分</el-menu-item>
          <el-menu-item index="1-1"  @click="Goto('/')">足球比分</el-menu-item>

        </el-submenu>
    <el-submenu index="2">
      <template slot="title">赛程</template>
      <el-menu-item index="2-1" @click="Goto('/basketballagenda')">篮球赛程</el-menu-item>
      <el-menu-item index="2-2" @click="Goto('/football/schedule')">足球赛程</el-menu-item>
<!--      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu> -->
    </el-submenu>
    <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
  </el-menu>
</div>
</template>
<script>
/* eslint-disable */
  export default {
    name:'titles',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      Goto(value){
        this.$router.push(value)
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
.logo{
  display: flex;
  margin: 1%;
  margin-left: 10%;
}
  .titles{
    position: relative;
    z-index: 20;
    top: 0;
  }
.el-menu{
  width: 80%;
  margin: 0 auto !important;
}
</style>
