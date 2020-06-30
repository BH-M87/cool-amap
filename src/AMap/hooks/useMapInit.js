import { useEffect, useState } from 'react';
import getViewState from '../config/getViewState';
import AMapLoader from '@amap/amap-jsapi-loader';
import addEvents from '../utils/addEvents';

const DEFAULT_MAP_STATUS = {
  resizeEnable: true,
  showIndoorMap: false,
  dragEnable: true,
  keyboardEnable: true,
  doubleClickZoom: true,
  zoomEnable: true,
  rotateEnable: true,
};

export default (mapContainer, viewState, mapEvents, options = {}) => {
  const [mapInstance, setMapInstance] = useState(null);
  useEffect(() => {
    AMapLoader.load({
      key: 'Your amap key', //首次调用load必须填写key
      version: '1.4.15', //JSAPI 版本号
      plugins: ['AMap.MouseTool', 'AMap.PolyEditor'], //同步加载的插件列表
    })
      .then(AMap => {
        window.AMap = AMap;
        const map = new AMap.Map(mapContainer, {
          ...DEFAULT_MAP_STATUS,
          expandZoomRange: true,
          ...getViewState(viewState),
          ...options,
        });
        addEvents(map, mapEvents);
        setMapInstance(map);
      })
      .catch(e => {
        console.error(e); //加载错误提示
      });
  }, []);
  return mapInstance;
};
