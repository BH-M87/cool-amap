import AMap from '../';
import mockMarkersPosition from '../utils/mockMarkersPosition';

const AmapExample = () => {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <AMap viewState={{ viewMode: undefined }} />;
    </div>
  );
};

export default AmapExample;
