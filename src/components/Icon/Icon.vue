<template>
  <svg class="icon">
    <use :href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String,
    prefix: {
      type: String,
      default: "icon",
    },
  },
  setup(props) {
    const iconName = `#${props.prefix}${props.name}`;
    return {
      iconName,
    };
  },
};
</script>

<style scoped lang="scss">
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
