export const initViewState = {
  longitude: 106.478932,
  latitude: 29.515169,
  zoom: 18,
  minZoom: 17,
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
  };
};
