<template>
  <section class="popup-wrapper">
    <slot></slot>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.popup-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>