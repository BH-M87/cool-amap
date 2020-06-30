import { useRef, useEffect } from 'react';
import { useCompare } from 'cool-utils';
import PropTypes from 'prop-types';
import useMarker from './hooks/useMarker';
import usePolygons from './hooks/usePolygons';
import useMapInit from './hooks/useMapInit';
import useViewState from './hooks/useViewState';
import useMouseTool from './hooks/useMouseTool';
import drawTypeEnums from './config/drawTypeEnums';
import './AMap.css';

const mapContainer = 'map-container';
// const { 'map-container': mapContainer } = styles;

export default function AMap({
  loadOptions,
  className,
  style,
  options,
  markerConfigs,
  polygonConfigs,
  mapStatus,
  viewState,
  drawType,
  drawOption,
  onDraw,
  onAdjust,
  onSelection,
  mapEvents,
  markerEvents,
  getMapInstance,
}) {
  const mapInstance = useMapInit(loadOptions, mapContainer, viewState, mapEvents, options);
  useEffect(() => {
    if (mapInstance && getMapInstance) {
      getMapInstance(mapInstance);
    }
  }, [mapInstance, getMapInstance]);
  useCompare(mapStatus, _mapStatus => {
    mapInstance.setStatus(_mapStatus);
  });
  useViewState(mapInstance, viewState);
  useMarker(mapInstance, markerConfigs, markerEvents);
  usePolygons(mapInstance, polygonConfigs);
  useMouseTool({
    mapInstance,
    drawType,
    drawOption,
    onDraw,
    onAdjust,
    onSelection,
  });
  return <div id={mapContainer} style={style} className={className} />;
}

AMap.propTypes = {
  loadOptions: PropTypes.shape({
    key:PropTypes.string, // key for AMap JS SDK
    version: PropTypes.string, //JSAPI 版本号
    plugins: PropTypes.arrayOf(PropTypes.string), //同步加载的插件列表
  }),
  options: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  className: PropTypes.string,
  viewState: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    pitch: PropTypes.number,
    cursorType: PropTypes.oneOf(['pointer', 'default', 'move', 'crosshair']),
    viewMode: PropTypes.oneOf(['3D', '2D']),
  }),
  markerConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      icon: PropTypes.string,
      position: PropTypes.arrayOf(PropTypes.number),
      anchor: PropTypes.oneOf([
        'top-left',
        'top-center',
        'top-right',
        'middle-left',
        'center',
        'middle-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ]),
      offset: PropTypes.arrayOf(PropTypes.number),
      extData: PropTypes.any, // 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等, event.target.getExtData();
    }),
  ),
  polygonConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      strokeColor: PropTypes.string,
      strokeOpacity: PropTypes.string,
    }),
  ),
  mapStatus: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      showIndoorMap: PropTypes.bool,
      resizeEnable: PropTypes.bool,
      dragEnable: PropTypes.bool,
      keyboardEnable: PropTypes.bool,
      doubleClickZoom: PropTypes.bool,
      zoomEnable: PropTypes.bool,
      rotateEnable: PropTypes.bool,
    }),
  ]),
  drawType: PropTypes.oneOf(drawTypeEnums),
  // eslint-disable-next-line react/forbid-prop-types
  drawOption: PropTypes.object,
  onDraw: PropTypes.func,
  onAdjust: PropTypes.func,
  onSelection: PropTypes.func,
  mapEvents: PropTypes.shape({
    click: PropTypes.func,
    dblclick: PropTypes.func,
    rightclick: PropTypes.func,
    mousemove: PropTypes.func,
    mouseover: PropTypes.func,
    mouseout: PropTypes.func,
    mousedown: PropTypes.func,
    mouseup: PropTypes.func,
    dragstart: PropTypes.func,
    dragging: PropTypes.func,
    dragend: PropTypes.func,
    touchstart: PropTypes.func,
    touchmove: PropTypes.func,
    touchend: PropTypes.func,
    moving: PropTypes.func,
    moveend: PropTypes.func,
    movealong: PropTypes.func,
  }),
  markerEvents: PropTypes.shape({
    click: PropTypes.func,
    dblclick: PropTypes.func,
    rightclick: PropTypes.func,
    mousemove: PropTypes.func,
    mouseover: PropTypes.func,
    mouseout: PropTypes.func,
    mousedown: PropTypes.func,
    mouseup: PropTypes.func,
    dragstart: PropTypes.func,
    dragging: PropTypes.func,
    dragend: PropTypes.func,
    touchstart: PropTypes.func,
    touchmove: PropTypes.func,
    touchend: PropTypes.func,
    moving: PropTypes.func,
    moveend: PropTypes.func,
    movealong: PropTypes.func,
  }),
  getMapInstance: PropTypes.func,
  // rectangles: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     southWest: PropTypes.arrayOf(PropTypes.number),
  //     northEast: PropTypes.arrayOf(PropTypes.number),
  //   }),
  // ),
};

AMap.defaultProps = { loadOptions: {}, options: {}, className: '', mapEvents: {}, markerEvents: {} };
