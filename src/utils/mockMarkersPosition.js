import alarm from '../assets/alarm.png';
import arrive from '../assets/arrive.png';
import order from '../assets/order.png';
import { initViewState } from "../AMap/config/getViewState";

function getIcon() {
  const randomNum = 3 * Math.random();
  if (randomNum > 2) {
    return alarm;
  }
  if (randomNum > 1) {
    return arrive;
  }
  return order;
}

export default (center=[initViewState.longitude, initViewState.latitude], totalCount = 100) =>
  Array(totalCount)
    .fill(0)
    .map((unused, index) => ({
      position: center.map(value => value + 4 * (Math.random() - 0.5)),
      icon: getIcon(),
    }));
