import { useRef, useEffect, isValidElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { isEqual } from 'lodash-es';
import { useDifferentiation } from 'cool-utils';
import addEvents from '../utils/addEvents';

export default (mapRef, markerConfigs, markerEvents = {}) => {
  const markersRef = useRef([]);
  const { added, removed } = useDifferentiation(markerConfigs);
  useEffect(() => {
    // no change, return
    if (added.length === 0 && removed.length === 0) {
      return;
    }
    // remove first
    const remainmarkers = [];
    markersRef.current.forEach(item => {
      const { data, instance } = item;
      if (removed.find(value => isEqual(value, data))) {
        mapRef.current.remove(instance);
      } else {
        remainmarkers.push(item);
      }
    });
    markersRef.current = remainmarkers;

    // then add
    added.forEach(markerConfig => {
      const instance = new window.AMap.Marker({
        anchor: 'bottom-left',
        ...markerConfig,
        content: isValidElement(markerConfig.content)
          ? renderToStaticMarkup(markerConfig.content)
          : markerConfig.content,
        ...(Array.isArray(markerConfig.offset)
          ? { offset: new window.AMap.Pixel(...markerConfig.offset) }
          : {}),
      });
      mapRef.current.add(instance);
      markersRef.current.push({
        data: markerConfig,
        instance,
      });
      addEvents(instance, markerEvents);
    });
  }, [added, added.length, markerConfigs, mapRef, removed, removed.length, markerEvents]);
};
