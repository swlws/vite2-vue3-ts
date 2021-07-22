<template>
  <div class="page-frame">
    <header>
      <router-link :to="{ path: '/' }">
        <div class="icon-wrap">
          <i class="icon el-icon-s-home"></i>
        </div>
      </router-link>
      <router-link :to="{ path: '/welcome' }">Welcome</router-link>
    </header>

    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({});
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

    .icon-wrap {
      border: 1px solid $md-light-green-a700;
      border-radius: 50%;
      box-shadow: 0px 2px 10px 0px $md-light-green-a700;
      padding: 5px;
      .icon {
        font-size: 1.5em;
      }
    }

    a {
      color: $md-light-green-a700;
      margin: 0px 10px;
    }
  }

  > section {
    overflow: auto;
    flex: 1;
  }
}
</style>
