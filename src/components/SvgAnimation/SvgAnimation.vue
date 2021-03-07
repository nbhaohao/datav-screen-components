<template>
  <div>
    <div class="container">
      <svg width="500" height="200" viewBox="0 0 500 200">
        <!--
          matrix 取 1,3,5 和 2,4,6 组成 2 组数据
          [2, -1, 50] => 2 * _x + -1 * _y + 50 = x
          [1, 2, 0] => 1 * _x + 2 * _y + 0 = y
  
          所以下方的 rect 的四个顶点都会发生变化
          [0,0] => [50,0]
          [100,0] => [250,100]
          [100,50] => [200,200]
          [0,50] => [0,100]
        -->
        <!--      <rect-->
        <!--        x="0"-->
        <!--        y="0"-->
        <!--        width="100"-->
        <!--        height="50"-->
        <!--        fill="red"-->
        <!--        transform="matrix(2 1 -1 2 50 0)"-->
        <!--      ></rect>-->
      </svg>
    </div>
    <div class="container">
      <svg width="440" height="440" viewBox="0 0 440 440">
        <circle
          cx="220"
          cy="220"
          r="200"
          stroke-width="20"
          stroke="#d1d3d7"
          fill="transparent"
        ></circle>
        <circle
          class="circle"
          cx="220"
          cy="220"
          r="200"
          stroke-width="20"
          stroke="#00a5e0"
          fill="none"
          transform="matrix(0,-1,1,0,0,440)"
        ></circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "SvgAnimation",
  props: {
    name: String,
    prefix: {
      type: String,
      default: "icon",
    },
  },
  setup(props) {},
};
</script>

<style>
@keyframes circle {
  from {
    stroke-dasharray: 0 1257;
  }
  to {
    stroke-dasharray: 1257 0;
  }
}
</style>
<style scoped lang="scss">
.container {
  svg {
    border: 1px solid #000;
  }
  .circle {
    animation: circle 5s linear infinite;
  }
}
</style>
