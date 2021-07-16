<template>
  <div class="page-frame">
    <header>
      <router-link :to="{ path: '/' }">Home</router-link>
    </header>

    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
console.log(import.meta);
export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss" scoped>
.page-frame {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f6f7;

  > header {
    padding: 0px 10px;
    height: 60px;
    box-shadow: 0px 0px 10px 0px #ccc;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fff;

    display: flex;
    align-items: center;

    a {
      color: $md-light-green-a700;
    }
  }

  > section {
    overflow: auto;
    flex: 1;
  }
}
</style>
