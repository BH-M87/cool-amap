import AMap from '../';

const AmapExample = () => {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <AMap
        viewState={{ viewMode: undefined }}
        drawType="polygon"
        drawOption={{
          fillColor: '#00b0ff',
          strokeColor: '#80d8ff',
          //同Polygon的Option设置
        }}
        onDraw={(target, event) => {
          console.log(target, event, target.getPath(), target.getArea());
        }}
        onAdjust={(target, event) => {
          console.log(target, event, target.getPath(), target.getArea());
        }}
      />
    </div>
  );
};

export default AmapExample;
