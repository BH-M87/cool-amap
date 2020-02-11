import { useEffect } from 'react';

export default (mapRef, {
 longitude, latitude, zoom, pitch, cursorType 
} = {}) => {
  useEffect(() => {
    if (!longitude || !latitude) {
      return;
    }
    mapRef.current.panTo([longitude, latitude]);
  }, [longitude, latitude, mapRef]);
  useEffect(() => {
    if (!zoom) {
      return;
    }
    mapRef.current.setZoom(zoom);
  }, [zoom, mapRef]);
  useEffect(() => {
    if (!pitch) {
      return;
    }
    mapRef.current.setPitch(pitch);
  }, [pitch, mapRef]);
  useEffect(() => {
    if (!cursorType) {
      return;
    }
    mapRef.current.setDefaultCursor(cursorType);
  }, [cursorType, mapRef]);
};
