import { useEffect } from 'react';

export default (mapInstance, {
 longitude, latitude, zoom, pitch, cursorType 
} = {}) => {
  useEffect(() => {
    if (!mapInstance) {
      return;
    }
    if (!longitude || !latitude) {
      return;
    }
    mapInstance.panTo([longitude, latitude]);
  }, [longitude, latitude, mapInstance]);
  useEffect(() => {
    if (!zoom) {
      return;
    }
    mapInstance.setZoom(zoom);
  }, [zoom, mapInstance]);
  useEffect(() => {
    if (!pitch) {
      return;
    }
    mapInstance.setPitch(pitch);
  }, [pitch, mapInstance]);
  useEffect(() => {
    if (!cursorType) {
      return;
    }
    mapInstance.setDefaultCursor(cursorType);
  }, [cursorType, mapInstance]);
};
