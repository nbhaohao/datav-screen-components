import Test from "./components/Test";
import Icon from "./components/Icon";
import SvgAnimation from "./components/SvgAnimation";
import DatavLoading from "./components/DatavLoading";
import DatavFlyBox from "./components/DatavFlyBox";
import Container from "./components/Container";
export default (Vue) => {
  Vue.use(Test);
  Vue.use(Icon);
  Vue.use(SvgAnimation);
  Vue.use(DatavLoading);
  Vue.use(DatavFlyBox);
  Vue.use(Container);
};
