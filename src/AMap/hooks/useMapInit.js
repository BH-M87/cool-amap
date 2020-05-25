import { useEffect } from 'react';
import getViewState from '../config/getViewState';
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

export default (mapRef, mapContainer, viewState, mapEvents, options = {}) => {
  useEffect(() => {
    if (mapRef.current) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    mapRef.current = new window.AMap.Map(mapContainer, {
      ...DEFAULT_MAP_STATUS,
      expandZoomRange: true,
      ...getViewState(viewState),
      ...options,
    });
    addEvents(mapRef.current, mapEvents);
  }, [mapContainer, mapEvents, mapRef, viewState]);
};
