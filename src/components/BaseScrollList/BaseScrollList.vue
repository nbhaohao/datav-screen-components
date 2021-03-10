<template>
  <div class="base-scroll-list" :id="id">
    <div
      class="base-scroll-list-header"
      :style="{
        backgroundColor: actualConfig.headerBg,
        height: `${actualConfig.headerHeight}px`,
      }"
    >
      <div
        class="header-item base-scroll-list-text"
        v-for="(headerItem, i) in headerData"
        :key="headerItem + i"
        :style="{
          width: `${columnWidths[i]}px`,
          textAlign: aligns[i],
          fontSize: `${actualConfig.headerFontSize}px`,
          color: actualConfig.headerColor,
          ...headerStyle[i],
        }"
        v-html="headerItem"
      ></div>
    </div>
    <div
      class="base-scroll-list-rows"
      v-for="(rowData, rowIndex) in rowsData"
      :key="rowIndex"
      :style="{
        height: `${rowHeights[rowIndex]}px`,
        backgroundColor:
          rowIndex % 2 === 0 ? actualConfig.rowBg[1] : actualConfig.rowBg[0],
      }"
    >
      <div
        class="base-scroll-list-columns"
        v-for="(colData, colIndex) in rowData"
        v-html="colData"
        :key="colIndex"
        :style="{
          width: `${columnWidths[colIndex]}px`,
          textAlign: aligns[colIndex],
          fontSize: `${actualConfig.rowFontSize}px`,
          color: actualConfig.rowColor,
          ...rowStyle[colIndex],
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { v4 as uuidV4 } from "uuid";
import useScreen from "../../hooks/useScreen";
import assign from "lodash/assign";
import { DEFAULT_CONFIG, handleHeader, handleRowsHeight } from "./utils";

export default {
  name: "BaseScrollList",
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const id = `base-scroll-list-${uuidV4()}`;
    const { width, height } = useScreen(id);
    const actualConfig = ref({});
    const headerData = ref([]);
    const headerStyle = ref([]);
    const rowStyle = ref([]);
    const columnWidths = ref([]);
    const rowHeights = ref([]);
    const rowsData = ref([]);
    const rowNum = ref(0);
    const aligns = ref([]);
    const initList = (config) => {
      const {
        columnWidths: _columnWidths,
        headerData: _headerData,
        headerStyle: _headerStyle,
        rowsData: _rowsData,
        rowStyle: _rowStyle,
        aligns: _aligns,
      } = handleHeader({
        config,
        width,
      });
      columnWidths.value = _columnWidths;
      headerData.value = _headerData;
      headerStyle.value = _headerStyle;
      rowsData.value = _rowsData;
      rowStyle.value = _rowStyle;
      aligns.value = _aligns;
      rowNum.value =
        config.rowNum > rowsData.value.length
          ? rowsData.value.length
          : config.rowNum;
    };
    const initRowsHeight = (config) => {
      const { rowHeights: _rowHeights } = handleRowsHeight({
        config,
        height,
        rowNum: rowNum.value,
      });
      rowHeights.value = _rowHeights;
    };
    onMounted(() => {
      const _actualConfig = assign(DEFAULT_CONFIG, props.config);
      initList(_actualConfig);
      initRowsHeight(_actualConfig);
      actualConfig.value = _actualConfig;
    });
    return {
      id,
      headerData,
      headerStyle,
      columnWidths,
      rowHeights,
      rowsData,
      rowStyle,
      aligns,
      actualConfig,
    };
  },
};
</script>

<style scoped lang="scss">
.base-scroll-list {
  width: 100%;
  height: 100%;
  .base-scroll-list-text {
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  .base-scroll-list-header {
    display: flex;
    font-size: 15px;
    align-items: center;
    .header-item {
    }
  }

  .base-scroll-list-rows {
    display: flex;
    align-items: center;
    .base-scroll-list-columns {
      font-size: 28px;
    }
  }
}
</style>
