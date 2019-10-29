// chromeの拡張機能用APIを使用しないと取得できない
const nomalFaceImgUrl = chrome.runtime.getURL('images/grandma_icon_full.png');
const smileFaceImgUrl = chrome.runtime.getURL('images/grandma_icon_full_smile.png');
const mildCommentImgUrl = chrome.runtime.getURL('images/mild_comment.png');
const hardCommentImgUrl = chrome.runtime.getURL('images/hard_comment.png');

// payLoads from ./src/payLoads.js
console.log('payLoads', payLoads);

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
  grandma.style.cursor = 'pointer';
  grandma.style.right = wx;
  grandma.style.bottom = wy;
  grandma.style.width = '250px';
  grandma.style.zIndex = 9999; // 一番上に表示するために適当な値

  // onclickした時に実行するもの
  // grandma.onclick = smile;

  // mousedownした時に実行するもの
  grandma.addEventListener("mousedown", mdown, false);

  // 配置する
  const objBody = document.getElementsByTagName('body').item(0);
  objBody.appendChild(grandma)
}

/**
 * おばあちゃんの画像を変化させる
 */
async function smile() {
  const response = await coreAPI(payLoads.smileActionGetPayLoad);

  // 笑っている時
  if (response == true) {
    document.getElementById('grandma').src = nomalFaceImgUrl; // 笑うのやめる
    payLoads.smileActionPostPayLoad.params = false;
    coreAPI(payLoads.smileActionPostPayLoad);
  } else {
    // 笑ってない時
    document.getElementById('grandma').src = smileFaceImgUrl; // 笑わせる
    payLoads.smileActionPostPayLoad.params = true;
    coreAPI(payLoads.smileActionPostPayLoad);
  }
}

// ドラッグで動かす時用に設定
let x = '';
let y = '';

// マウスが押された時のメソッド
async function mdown(e) {

  await smile();

  console.log('mousedownされたよイベント詳細→', e);

  // クラス名に.dragを追加
  this.classList.add("drag");

  // pageX,Y(クリックのX,Y座標)からoffsetLeft,Topを引くことでクリックした点の座標が要素から見てどの位置にあるのか算出する
  x = e.pageX - this.offsetLeft;
  y = e.pageY - this.offsetTop;

  // ムーブイベントにコールバック
  document.body.addEventListener("mousemove", mmove, false);
}

// マウスカーソルが動いた時のメソッド
function mmove(e) {
  console.log('mousemoveされたよイベント詳細→', e);

  // ドラッグしている要素を取得
  let drag = document.getElementsByClassName("drag")[0];

  // マウスが動いた場所に要素を動かす
  drag.style.left = event.pageX - x + "px";
  drag.style.top = event.pageY - y + "px";

  // マウスボタンが話された時、またはカーソルが外れた時発火
  drag.addEventListener("mouseup", mup, false);
  // document.body.addEventListener("mouseleave", mup, false);
}

// マウスボタンが上がったら発火
function mup(e) {
  console.log('mouseupされたよイベント詳細→', e);

  // ドラッグしている要素を取得
  let drag = document.getElementsByClassName("drag")[0];

  // ムーブバンドラの消去
  document.body.removeEventListener("mousemove", mmove, false);
  drag.removeEventListener("mouseup", mup, false);

  // クラス名.dragも消す
  drag.classList.remove("drag");
}

/**
 * 現在のタブを取得する
 */
async function getCurrentTab() {
  const response = await coreAPI(payLoads.tabActionGetPayLoad);
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

  let isProhibited = false;

  prohibitedSites.forEach((prohibitedSite) => {
    if (response.url.includes(prohibitedSite)) {
      isProhibited = true;
    };
  });

  console.log('response', response);
  console.log('isProhibited', isProhibited);

  if (isProhibited) {
    const grandmaComment = document.createElement('div');
    const pTag = document.createElement('p');
    const commentContent = document.createTextNode(`${response.title}!? なんだそれ 仕事とかーんけーあんのかー?${prohibitedSites}は見んだねーよぉー`);
    
    pTag.appendChild(commentContent);
    grandmaComment.appendChild(pTag);

    // スタイル定義
    grandmaComment.id = 'grandmaComment';
    grandmaComment.style.position = 'fixed';
    grandmaComment.style.right = wx;
    grandmaComment.style.bottom = wy;

    // 配置する
    const objBody = document.getElementsByTagName('body').item(0);
    objBody.appendChild(grandmaComment)
  }
}

deploy(0, '-560px');
depolyComments('200px', '10px');
