// chromeの拡張機能用APIを使用しないと取得できない
const nomalFaceImgUrl = chrome.runtime.getURL('images/grandma_icon_48.png'); 
const smileFaceImgUrl = chrome.runtime.getURL('images/grandma_icon_48_smile.png');

// APIへのリクエスト準備
let smileActionGetPayLoad = {
  method: 'get',
  query: 'smileAction',
  params: null,
};
let smileActionPostPayLoad = {
  method: 'patch',
  query: 'smileAction',
  params: true,
};

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
  const response = coreAPI(smileActionGetPayLoad);
  console.log('response in move', response);

  // 笑っている時
  if (response == true) {
    document.getElementById('grandma').src = nomalFaceImgUrl; // 笑うのやめる
    smileActionPostPayLoad.params = false;
    coreAPI(smileActionPostPayLoad);
  }
  
  // 笑ってない時
  document.getElementById('grandma').src = smileFaceImgUrl; // 笑わせる
  smileActionPostPayLoad.params = true;
  coreAPI(smileActionPostPayLoad);
};

/**
 * おばあちゃんの画像を配置する
 * @param {Object} payLoad - リクエストするための引数 
 */
function coreAPI(payLoad) {
  const result = chrome.runtime.sendMessage(payLoad, function(response) {
    console.log('response in chrome.runtime.sendMessage', response);
    return response
  });

  console.log('result after chrome.runtime.sendMessage', result);

  return result;
};

deploy(0, 0);