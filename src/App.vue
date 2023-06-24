<script setup lang="ts">
import kwadit from './kwadit/kwadit.vue'
</script>

<template>
  <div class="navbar">
    <h1>Kwadit</h1>
  </div>
  <div class="kwaditContainer">
    <kwadit class="kwadit" />
  </div>
</template>

<style lang="scss">
.kwadit {
  width: 800px;
}
.navbar {
  width: 100%;
  height: 50px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #3ecdae;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  h1 {
    color: white;
  }
}
.kwaditContainer {
  display: flex;
  justify-content: center;
}
</style>
