<template>
  <div>
    加载页面
    <div v-if="card_type.x !== 0">11</div>
  </div>
</template>

<script>
import { store, mutations } from '../assets/js/store';

export default {
  name: 'Loading',
  data() {
    return {};
  },
  computed: {
    card_type() {
      return store.card_type;
    }
  },
  mounted() {
    console.log(store.card_type);
    setTimeout(() => {
      mutations.LotteryDowm();
    }, 2000);
  }
};
</script>

<style scoped></style>
