/**
 * おばあちゃんの画像を配置する
 * @param {integer} wx - 右からの位置
 * @param {integer} wy - 下からの位置
 * @param {string} onclick - クリックした時に実行したいファンクション名
 */
function deploy(wx, wy) {
  // 配置準備
  const grandma = document.createElement('img');
  const imgUrl = chrome.runtime.getURL('images/grandma_icon_48.png'); // chromeの拡張機能用APIを使用しないと取得できない
  console.log('imgUrl', imgUrl);
  grandma.src = imgUrl;

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
  const smileImgUrl = chrome.runtime.getURL('images/grandma_icon_48_smile.png'); // chromeの拡張機能用APIを使用しないと取得できない
  document.getElementById('grandma').src = smileImgUrl;
};

deploy(0, 0);
