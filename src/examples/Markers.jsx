import { useState, useEffect } from 'react';
import AMap from '../';
import mockMarkersPosition from '../utils/mockMarkersPosition';

const Markers = () => {
  const [markerConfigs, setMarkerConfigs] = useState(mockMarkersPosition());
  useEffect(() => {
    function updateMarkerConfigs() {
      setMarkerConfigs(mockMarkersPosition());
      setTimeout(updateMarkerConfigs, 1000);
    }
    setTimeout(updateMarkerConfigs, 1000);
  }, []);
  return <AMap viewState={{ viewMode: undefined }} markerConfigs={markerConfigs} />;
};

export default Markers;
