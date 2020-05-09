import { omit } from 'lodash-es';

export const initViewState = {
  longitude: 119.69,
  latitude: 29.99,
  zoom: 8,
  minZoom: 6,
  maxZoom: 20,
  pitch: 50,
};

// Adapt to Amap
export default (_viewState = {}) => {
  const viewState = {
    ...initViewState,
    ..._viewState,
  };
  return {
    viewMode: '3D',
    center: [viewState.longitude, viewState.latitude],
    zoom: viewState.zoom,
    zooms: [viewState.minZoom, viewState.maxZoom],
    pitch: viewState.pitch,
    ...omit(_viewState, ['longitude', 'latitude', 'zoom', 'minZoom', 'maxZoom', 'pitch']),
  };
};
