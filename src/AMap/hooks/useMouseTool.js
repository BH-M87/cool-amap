import { useEffect, useRef } from 'react';
import { useCompare } from 'cool-utils';
import drawTypeEnums from '../config/drawTypeEnums';

export default ({ mapInstance, drawType, drawOption, onDraw, onAdjust, onSelection }) => {
  const mouseTool = useRef(null);
  const result = useRef({});
  const overlayRef = useRef([]);
  const draw = (_drawType, _drawOption) => {
    if (!mapInstance || !mouseTool.current) {
      return;
    }
    if (!drawTypeEnums.includes(_drawType)) {
      console.error(
        `drawType "${_drawType}" is not allowed, should be one of ${drawTypeEnums
          .map(val => `${val}`)
          .join(', ')}`,
      );
      return;
    }
    if (_drawType === null) {
      mouseTool.current.close(true);
      result.current = {};
      if (onSelection) {
        onSelection(result.current);
      }
      return;
    }
    if (_drawType === undefined) {
      mouseTool.current.close(false);
      if (onSelection) {
        onSelection(result.current);
      }
      return;
    }
    if (!_drawType) {
      return;
    }
    // eslint-disable-next-line no-underscore-dangle
    mouseTool.current[_drawType](_drawOption);
  };
  useEffect(() => {
    if (!mapInstance || !window.AMap.MouseTool) {
      return;
    }
    mouseTool.current = new window.AMap.MouseTool(mapInstance);
    mouseTool.current.on('draw', function(e) {
      const { obj } = e;
      if (onDraw) {
        onDraw(obj, e);
      }
      const editor = new window.AMap.PolyEditor(mapInstance, obj);
      // eslint-disable-next-line no-underscore-dangle
      result.current[obj._amap_id] = { editor, path: obj.getPath(), target: obj };
      editor.on('adjust', function(event) {
        const { target } = event;
        // eslint-disable-next-line no-underscore-dangle
        result.current[target._amap_id].path = target.getPath();
        if (onAdjust) {
          // event.target 即为编辑后的多边形对象
          onAdjust(target, event);
        }
      });
      editor.open();
      overlayRef.current.push(obj);
    });
    draw(drawType, drawOption);
  }, [mapInstance, onAdjust, onDraw]);
  useCompare(drawType, drawOption, Object.keys(mapInstance || {}).length, draw);
};
