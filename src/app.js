// constants は ./src/constants.js
// coreAPI() は ./src/coreAPI.js
// imgUrl は ./src/imgUrl.js
// payLoads は ./src/payLoads.js
// store は ./src/store.js

/**
 * おばあちゃんの画像を配置する
 * @param {object} element - createElementで作成たHTMLelement
 */
function deploy(element) {
  // 配置する
  const objBody = document.getElementsByTagName('body').item(0);
  objBody.appendChild(element)
}

/**
 * おばあちゃんの画像を変化させる
 */
async function smile() {
  const response = await coreAPI(payLoads.smileActionGetPayLoad);

  // 笑っている時
  if (response == true) {
    document.getElementById('grandma').src = imgUrl.nomalFaceImgUrl; // 笑うのやめる
    payLoads.smileActionPostPayLoad.params = false;
    coreAPI(payLoads.smileActionPostPayLoad);
  } else {
    // 笑ってない時
    document.getElementById('grandma').src = imgUrl.smileFaceImgUrl; // 笑わせる
    payLoads.smileActionPostPayLoad.params = true;
    coreAPI(payLoads.smileActionPostPayLoad);
  }
}

/**
 * マウスダウンした時のアクション
 * @param {object} e - eventバンドラ
 */
async function mdown(e) {

  console.log('e in the mdown!!!!!!!!', e);
  console.log('e.target.id', e.target.id);

  if (e.target.id == 'grandma') {
    await smile();
  }

  // クラス名に.dragを追加
  this.classList.add("drag");

  // pageX,Y(クリックのX,Y座標)からoffsetLeft,Topを引くことでクリックした点の座標が要素の左上から見てどの位置にあるのか算出する
  store.x = e.pageX - this.offsetLeft;
  store.y = e.pageY - this.offsetTop;

  // ムーブイベントにコールバック
  document.body.addEventListener("mousemove", mmove, false);
}

/**
 * マウスを動かした時のアクション
 * @param {object} e - eventバンドラ
 */
function mmove(e) {
  // ドラッグしている要素を取得
  let drag = document.getElementsByClassName("drag")[0];

  // マウスが動いた場所に要素を動かす
  drag.style.left = e.pageX - store.x + "px";
  drag.style.top = e.pageY - store.y + "px";

  // マウスボタンが話された時、またはカーソルが外れた時発火
  drag.addEventListener("mouseup", mup, false);
  // document.body.addEventListener("mouseleave", mup, false);
}

/**
 * マウスを動かした時のアクション
 * @param {object} e - eventバンドラ
 */
function mup(e) {
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
  return response;
}

async function deployComments(element) {
  // 開いているタブによってコメントをだす
  const response = await getCurrentTab();

  let isProhibited = false;

  constants.PROHIBITED_SITES.forEach((prohibitedSite) => {
    if (response.url.includes(prohibitedSite)) {
      isProhibited = true;
    };
  });

  if (isProhibited) {
    const pTag = document.createElement('p');
    const commentContent = document.createTextNode(`${response.title}!? なんだそれ 仕事とかーんけーあんのかー?${constants.PROHIBITED_SITES}は見んだねーよぉー`);
    
    pTag.appendChild(commentContent);
    element.appendChild(pTag);

    // 配置する
    const objBody = document.getElementsByTagName('body').item(0);
    objBody.appendChild(element)
  }
}