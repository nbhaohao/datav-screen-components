<template>
  <svg>
    <use :href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String,
  },
  setup(props) {
    const iconName = `#${props.name}`;
    return {
      iconName,
    };
  },
};
</script>

<style scoped></style>
