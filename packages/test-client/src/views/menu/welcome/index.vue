<template>
  <div class="page">
    <h1>Welcome Page</h1>
    <section>
      <router-link :to="{ path: '/detail' }">打开子页面</router-link>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { getAppInfo } from '../../@api/app';

export default defineComponent({
  setup() {
    getAppInfo();
  },
});
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  text-align: center;

  margin: 10%;

  > h1 {
    font-size: 2em;
    margin: 40px;
  }
  > section {
    color: $md-grey-600;
  }
}
</style>
