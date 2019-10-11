// chromeの拡張機能用APIを使用しないと取得できない
const nomalFaceImgUrl = chrome.runtime.getURL('images/grandma_icon_48.png');
const smileFaceImgUrl = chrome.runtime.getURL('images/grandma_icon_48_smile.png');
const mildCommentImgUrl = chrome.runtime.getURL('images/mild_comment.png');
const hardCommentImgUrl = chrome.runtime.getURL('images/hard_comment.png');

// APIへのリクエスト準備
let smileActionGetPayLoad = {
  method: 'get',
  query: 'smileAction',
  params: null,
};
let smileActionPostPayLoad = {
  method: 'patch',
  query: 'smileAction',
  params: true, // デフォルトはtrueであとで変える
};
let tabActionGetPayLoad = {
  method: 'get',
  query: 'tabAction',
  params: null,
};
let commentActionGetPayLoad = {
  method: 'get',
  query: 'commentAction',
  params: null,
};
let commentActionPostPayLoad = {
  method: 'patch',
  query: 'commentAction',
  params: true, // デフォルトはtrueであとで変える
};

// 禁止するサイト
const prohibitedSites = ['facebook', 'instagram'];

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
}

/**
 * おばあちゃんの画像を変化させる
 */
async function move() {
  const response = await coreAPI(smileActionGetPayLoad);
  console.log('response in move', response);

  // 笑っている時
  if (response == true) {
    document.getElementById('grandma').src = nomalFaceImgUrl; // 笑うのやめる
    smileActionPostPayLoad.params = false;
    coreAPI(smileActionPostPayLoad);
  } else {
    // 笑ってない時
    document.getElementById('grandma').src = smileFaceImgUrl; // 笑わせる
    smileActionPostPayLoad.params = true;
    coreAPI(smileActionPostPayLoad);
  }
}

/**
 * 現在のタブを取得する
 */
async function getCurrentTab() {
  const response = await coreAPI(tabActionGetPayLoad);
  console.log('response in getCulrrentTab func', response);
  return response;
}

/**
 * background.jsとの通信を行う
 * @param {Object} payLoad - リクエストするための引数
 */
function coreAPI(payLoad) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(payLoad, (response) => {
      console.log('response in Promise', response);
      resolve(response);
    });
  });
}

async function depolyComments(wx, wy) {

  // 開いているタブによってコメントをだす
  const response = await getCurrentTab();
  console.log('response in deployComments', response);

  let isProhibited = false;

  prohibitedSites.forEach((prohibitedSite) => {
    if (response.url.includes(prohibitedSite)) {
      isProhibited = true;
    };
  });

  if (isProhibited) {
    const grandmaComment = document.createElement('img');
    grandmaComment.src = mildCommentImgUrl;

    // スタイル定義
    grandmaComment.id = 'grandmaComment';
    grandmaComment.style.position = 'fixed';
    grandmaComment.style.right = wx;
    grandmaComment.style.bottom = wy;
    grandmaComment.style.width = '700px';
    grandmaComment.style.zIndex = 9999;

    // onclickした時に実行するもの
    grandmaComment.onclick = commentMove;

    // 配置する
    const objBody = document.getElementsByTagName('body').item(0);
    objBody.appendChild(grandmaComment)
  }
}

/**
 * コメントの画像を変化させる
 */
async function commentMove() {
  const response = await coreAPI(commentActionGetPayLoad);
  console.log('response in commnetMove', response);

  // hardコメントの時
  if (response == true) {
    document.getElementById('grandmaComment').src = mildCommentImgUrl; // 優しいコメントになる
    commentActionPostPayLoad.params = false;
    coreAPI(commentActionPostPayLoad);
  } else {
    // hardコメントではない時
    document.getElementById('grandmaComment').src = hardCommentImgUrl; // 激しいコメントになる
    commentActionPostPayLoad.params = true;
    coreAPI(commentActionPostPayLoad);
  }
}

deploy(0, 0);
depolyComments('160px', '160px');
