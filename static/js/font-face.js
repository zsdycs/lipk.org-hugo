const getBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(blob);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
};

const ajaxFont = (args) => {
  const { url } = args;
  return new Promise((resolve) => {
    const xhrSemiBold = new XMLHttpRequest();
    xhrSemiBold.open('GET', url, true);
    xhrSemiBold.responseType = 'blob';
    xhrSemiBold.send();
    xhrSemiBold.onload = (event) => {
      resolve(event.currentTarget.response);
    };
  });
};

ajaxFont({ url: './fontSource/SourceHanSerifCN-Light.ttf' }).then(
  (response) => {
    getBase64(response).then((base64) => {
      const lightFont = new FontFace('source-han-serif-sc', `url(${base64})`, {
        ['font-display']: 'swap',
        weight: '100',
      });
      lightFont.load().then(() => {
        document.fonts.add(lightFont);
      });
    });
  },
);

ajaxFont({ url: './fontSource/SourceHanSerifCN-SemiBold.ttf' }).then(
  (response) => {
    getBase64(response).then((base64) => {
      const semiBoldFont = new FontFace(
        'source-han-serif-sc',
        `url(${base64})`,
        {
          ['font-display']: 'swap',
          weight: 'normal',
        },
      );
      semiBoldFont.load().then(() => {
        document.fonts.add(semiBoldFont);
      });
    });
  },
);
