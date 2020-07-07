import { useState, useEffect } from 'react';
import AMap from '../';
import { initViewState } from '../AMap/config/getViewState';

const getPath = (center = [initViewState.longitude, initViewState.latitude], totalCount = 100) =>
  Array(totalCount)
    .fill(0)
    .map((unused, index) => center.map(value => value + 4 * (Math.random() - 0.5)));

const Polygon = () => {
  return (
    <AMap
      viewState={{ viewMode: undefined }}
      polygonConfigs={[
        {
          path: getPath(),
        },
      ]}
    />
  );
};

export default Polygon;
