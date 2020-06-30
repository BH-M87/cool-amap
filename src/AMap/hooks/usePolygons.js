import { useRef, useEffect } from 'react';
import { isEqual } from 'lodash-es';
import { useDifferentiation } from 'cool-utils';

export default (mapInstance, polygonConfigs) => {
  const overlayRef = useRef([]);
  const { added, removed } = useDifferentiation(polygonConfigs);
  useEffect(() => {
    if (!mapInstance) {
      return;
    }
    // no change, return
    if (added.length === 0 && removed.length === 0) {
      return;
    }
    // remove first
    const remainpolygons = [];
    overlayRef.current.forEach(item => {
      const { data, instance } = item;
      if (removed.find(value => isEqual(value, data))) {
        mapInstance.remove(instance);
      } else {
        remainpolygons.push(item);
      }
    });
    overlayRef.current = remainpolygons;

    // then add
    added.forEach(polygonConfig => {
      const instance = new window.AMap.Polygon({
        strokeColor: '#EF8920',
        strokeWeight: 2,
        fillColor: '#ffffff',
        fillOpacity: 0.15,
        ...polygonConfig,
        path: polygonConfig.path,
      });
      mapInstance.add(instance);
      overlayRef.current.push({
        data: polygonConfig,
        instance,
      });
    });
  }, [added, added.length, polygonConfigs, mapInstance, removed, removed.length]);
};
