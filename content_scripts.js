// chromeの拡張機能用APIを使用しないと取得できない
const nomalFaceImgUrl = chrome.runtime.getURL('images/grandma_icon_48.png'); 
const smileFaceImgUrl = chrome.runtime.getURL('images/grandma_icon_48_smile.png');

// 変数をまとめておく
let store = {
  isSmiling: false,
}

/**
 * おばあちゃんの画像を配置する
 * @param {integer} wx - 右からの位置
 * @param {integer} wy - 下からの位置
 */
function deploy(wx, wy) {
  // 配置準備
  const grandma = document.createElement('img');
  grandma.src = nomalFaceImgUrl;

  // スタイル定義
  grandma.id = 'grandma';
  grandma.style.position = 'fixed';
  grandma.style.right = wx;
  grandma.style.bottom = wy;
  grandma.style.zIndex = 9999; // 一番上に表示するために適当な値

  // onclickした時に実行するもの
  grandma.onclick = move;

  // 配置する
  const objBody = document.getElementsByTagName('body').item(0);
  objBody.appendChild(grandma)
};

/**
 * おばあちゃんの画像を変化させる
 */
function move() {
  // 笑っている時
  if (store.isSmiling == true) {
    document.getElementById('grandma').src = nomalFaceImgUrl; // 笑うのやめる
    store.isSmiling = false;
    console.log('store.isSmiling in if context', store.isSmiling);
  } else {
    // 笑ってない時
    document.getElementById('grandma').src = smileFaceImgUrl; // 笑わせる
    store.isSmiling = true;
    console.log('store.isSmiling', store.isSmiling);
  };
};

deploy(0, 0);