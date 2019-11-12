// chromeの拡張機能用APIを使用しないと取得できない
const imgUrl = {
  nomalFaceImgUrl: chrome.runtime.getURL('images/grandma_icon_full.png'),
  smileFaceImgUrl: chrome.runtime.getURL('images/grandma_icon_full_smile.png'),
  faceIconUrl: chrome.runtime.getURL('images/grandma_icon_48.png'),
};
