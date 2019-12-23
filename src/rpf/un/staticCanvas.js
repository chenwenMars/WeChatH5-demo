import isCrossOrigin from './isCrossOrigin';

function staticCanvas({ width, height, layers = [] } = {}) {
  return new Promise(async (resolve, reject) => {
    if (typeof width !== 'number') {
      throw new Error('width is required and should be a number');
    }
    if (typeof height !== 'number') {
      throw new Error('height is required and should be a number');
    }
    if (!Array.isArray(layers)) {
      throw new Error('layers is required and should be an array');
    }
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // 根据传过来的参数type判断要画的对象 类型
    if (layers.length > 0) {
      for (let i of layers) {
        if (i.type === 'image') {
          let newSrc = null;
          if (typeof i.src === 'function') {
            newSrc = await i.src();
          } else {
            newSrc = i.src;
          }
          let attrs = {
            src: newSrc,
            x: i.x,
            y: i.y,
            width: i.width,
            height: i.height
          };

          // 画图
          if (i.borderRadius) {
            attrs.borderRadius = i.borderRadius;
            await mask(ctx, attrs);
          } else {
            await paint(ctx, attrs);
          }
        } else if (i.type === 'text') {
          // todo 画文字
          let attrs = {
            text: i.text,
            font: i.font,
            fill: i.fill,
            stroke: i.stroke,
            strokeWidth: i.strokeWidth,
            x: i.x,
            y: i.y
          };
          await text(ctx, attrs);
        } else if (i.type === 'rect') {
          // todo 画形状
          let attrs = {
            width: i.width,
            height: i.height,
            fill: i.fill,
            stroke: i.stroke,
            x: i.x,
            y: i.y,
            opacity: i.opacity
          };
          await rect(ctx, attrs);
        } else if (i.type === 'circle') {
          //todo 画圆
          let attrs = {
            fill: i.fill,
            stroke: i.stroke,
            x: i.x,
            y: i.y,
            r: i.radius,
            opacity: i.opacity
          };
          await circle(ctx, attrs);
        }
      }
      // 返回canvas ctx
      resolve(canvas);
    } else {
      reject(Error('layer is required'));
    }
  });
}
//  画image图
function paint(ctx, attrs) {
  const dd = {
    x: 0,
    y: 0,
    width: 0,
    heighgt: 0,
    src: '',
    ...attrs
  };
  return new Promise(resolve => {
    ctx.save();
    drawImage(dd.src).then(obj => {
      resolve(obj);
    });
  }).then(obj => {
    ctx.drawImage(obj, dd.x, dd.y, dd.width, dd.height);
    ctx.restore();
  });
}
// 文字
function text(ctx, attrs) {
  const dd = {
    font: '16px Arial',
    text: '',
    fill: '#ffffff',
    x: 0,
    y: 0,
    ...attrs
  };
  return new Promise(resolve => {
    ctx.save();
    ctx.fillStyle = dd.fill;
    ctx.font = dd.font;
    ctx.fillText(dd.text, dd.x, dd.y);
    ctx.restore();
    resolve(ctx);
  });
}
// 形状
function rect(ctx, attrs) {
  const dd = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: '#ffffff',
    stroke: '#ffffff',
    strokeWidth: 0,
    opacity: 1,
    ...attrs
  };
  return new Promise(resolve => {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = dd.fill;
    // 颜色设置，必须放在绘制之前
    ctx.strokeStyle = dd.stroke;
    // 线宽设置，必须放在绘制之前
    ctx.lineWidth = dd.strokeWidth;
    ctx.globalAlpha = dd.opacity;
    ctx.strokeStyle = dd.stroke;
    // ctx.strokeWidth()
    ctx.rect(dd.x, dd.y, dd.width, dd.height);
    ctx.fill();
    ctx.stroke(); //描边(绘制)
    ctx.restore();
    resolve();
  });
}
// 圆
function circle(ctx, attrs) {
  const dd = {
    x: 0,
    y: 0,
    radius: 0,
    fill: '#ffffff',
    stroke: '#ffffff',
    strokeWidth: 0,
    opacity: 1,
    ...attrs
  };
  return new Promise(resolve => {
    ctx.save();
    ctx.beginPath(); //标志开始一个路径
    ctx.fillStyle = dd.fill;
    ctx.strokeStyle = dd.stroke;
    // 线宽设置，必须放在绘制之前
    ctx.lineWidth = dd.strokeWidth;
    ctx.globalAlpha = dd.opacity;
    ctx.strokeStyle = dd.stroke;
    ctx.arc(dd.x, dd.y, dd.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    resolve();
  });
}
// mask
function mask(ctx, attrs) {
  const dd = {
    x: 0,
    y: 0,
    width: 0,
    heighgt: 0,
    src: '',
    borderRadius: 0,
    ...attrs
  };

  return new Promise(resolve => {
    // 直径最大取高度一半
    let arcRadius = dd.borderRadius;
    if (arcRadius > dd.height) {
      arcRadius = parseInt(dd.height) / 2;
    }
    ctx.save();
    // 从左上角相切的顶边切点开始，画一直线至右上角相切的顶边切点，然后绘制一条270°顺时针至0°的短圆弧
    ctx.moveTo(dd.x + arcRadius, dd.y);
    ctx.lineTo(dd.x + dd.width - arcRadius, dd.y);
    ctx.arc(
      dd.x + dd.width - arcRadius,
      dd.y + arcRadius,
      arcRadius,
      (Math.PI / 180) * 270,
      0,
      false
    );
    ctx.lineTo(dd.x + dd.width, dd.y + dd.height - arcRadius);
    // 0°顺时针至90°的短圆弧
    ctx.arc(
      dd.x + dd.width - arcRadius,
      dd.y + dd.height - arcRadius,
      arcRadius,
      0,
      (Math.PI / 180) * 90,
      0,
      false
    );
    ctx.lineTo(dd.x + arcRadius, dd.y + dd.height);
    // 90°顺时针至180°的短圆弧
    ctx.arc(
      dd.x + arcRadius,
      dd.y + dd.height - arcRadius,
      arcRadius,
      (Math.PI / 180) * 90,
      (Math.PI / 180) * 180,
      false
    );
    ctx.lineTo(dd.x, dd.y + arcRadius);
    // 180°顺时针至270°的短圆弧
    ctx.arc(
      dd.x + arcRadius,
      dd.y + arcRadius,
      arcRadius,
      (Math.PI / 180) * 180,
      (Math.PI / 180) * 270,
      false
    );
    ctx.clip();
    ctx.beginPath();
    drawImage(dd.src).then(obj => {
      resolve(obj);
    });
  }).then(obj => {
    ctx.drawImage(obj, dd.x, dd.y, dd.width, dd.height);
    ctx.restore();
  });
}
// drawImage
function drawImage(src) {
  return new Promise((resolve, reject) => {
    let obj = new Image();
    //判断是否跨域
    if (isCrossOrigin(src)) {
      obj.crossOrigin = 'anonymous';
    }
    obj.src = src;
    obj.onload = () => {
      resolve(obj);
    };
    obj.onerror = () => {
      reject();
    };
  });
}

export default staticCanvas;
