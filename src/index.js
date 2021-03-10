import Icon from "./components/Icon";
import SvgAnimation from "./components/SvgAnimation";
import DatavLoading from "./components/DatavLoading";
import DatavFlyBox from "./components/DatavFlyBox";
import Container from "./components/Container";
import CountTo from "./components/CountTo";
import BaseScrollList from "./components/BaseScrollList";
export default (Vue) => {
  Vue.use(CountTo);
  Vue.use(Icon);
  Vue.use(SvgAnimation);
  Vue.use(DatavLoading);
  Vue.use(DatavFlyBox);
  Vue.use(Container);
  Vue.use(BaseScrollList);
};
