export const imgPreloader = function(srcArr, processCb) {
  return new Promise((resolve, reject) => {
    if (!srcArr || !srcArr.length) {
      reject(new Error(`参数不合法: 请传入图片地址数组!`));
      return;
    }

    let loaded = 0;
    let total = srcArr.length;

    srcArr.map(function(src) {
      let img = new Image();

      img.src = src;
      if (img.complete) {
        loaded++;
        processCb && processCb(loaded, total);
        loaded === total && resolve('图片加载完成');
      } else {
        img.addEventListener('error', function onError() {
          reject(new Error(`${src} 所指向的图片不存在!`));
        });
        img.addEventListener('load', function onLoad() {
          loaded++;
          processCb && processCb(loaded, total);
          loaded === total && resolve('图片加载完成');
        });
      }
    });
  }).catch(err => {
    /* eslint no-console: off */
    console.error(`${err.message}`);
  });
};
