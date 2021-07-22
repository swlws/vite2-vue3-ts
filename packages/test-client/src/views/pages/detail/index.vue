<template>
  <div class="page">
    <h1>详情页面</h1>

    <section>
      <span>时间：</span>
      <span>{{ now }}</span>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { ref } from 'vue';
import { time } from 'weblibext';

export default defineComponent({
  setup() {
    let now = ref('');

    const doIt = () => {
      now.value = time.parseTime(new Date()) as string;
      requestAnimationFrame(doIt);
    };
    doIt();

    return { now };
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
