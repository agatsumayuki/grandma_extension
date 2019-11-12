/** 
 *  constants は ./src/constants.js 
 *  coreAPI() は ./src/coreAPI.js
 *  imgUrl は ./src/imgUrl.js
 *  payLoads は ./src/payLoads.js
 *  store は ./src/store.js
*/

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
 * imgタグを全ておばあちゃんの顔に変えてしまう(本当はここをスクリーンショットにしたかった。ランダムでDOMを作り替えたり、他に何かしたり、してもいいかもしれない。もっと高尚でちゃんと役に立つもの作ろうかなぁ。ばぁちゃん拡張機能を入れるとサイトが「オーガニックになる」ってどうだろう。)
 */
function makeEverythingOrganic() {
  const as = document.getElementsByTagName('a')
  Array.prototype.forEach.call(as, (a) => {
    a.textContent = 'いがっぺよ';
  });  
  const imgs = document.getElementsByTagName('img')
  Array.prototype.forEach.call(imgs, (img) => {
    if (img.id !== 'grandma') {
      img.src = imgUrl.faceIconUrl;
      img.srcset = imgUrl.faceIconUrl;
    }
  });
  const ps = document.getElementsByTagName('p')
  Array.prototype.forEach.call(ps, (p) => {
    p.textContent = 'ばぁ〜ちゃん作ったんだからぜーんぶ。体に良いんだよ';
  });
  const hs = document.getElementsByTagName('h')
  Array.prototype.forEach.call(hs, (h) => {
    h.textContent = 'ばぁ〜ちゃん作';
  });  
  const h1s = document.getElementsByTagName('h1')
  Array.prototype.forEach.call(h1s, (h1) => {
    h1.textContent = 'ばぁ〜ちゃん作だよ';
  });  
  const spans = document.getElementsByTagName('span')
  Array.prototype.forEach.call(spans, (span) => {
    span.textContent = '農薬は使ってねぇんだよ';
  });  
}

/**
 * マウスダウンした時のアクション
 * @param {object} e - eventバンドラ
 */
async function mdown(e) {
  // grandmaだった場合、微笑みを。ホクロだった場合、makeEverythingOrganicを。
  if (e.target.id == 'grandma') {
    document.getElementById('grandma').style.cursor = 'grabbing'; // 掴んでるアクションにする
    await smile();
  } else if (e.target.id == 'godMole') {
    makeEverythingOrganic();
    return;
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
 * マウスを離した時のアクション
 * @param {object} e - eventバンドラ
 */
function mup(e) {
  // ドラッグしている要素を取得
  let drag = document.getElementsByClassName("drag")[0];

  // ムーブバンドラの消去
  document.body.removeEventListener("mousemove", mmove, false);
  drag.removeEventListener("mouseup", mup, false);

  // grandmaだった場合は一度付与したstyleのgrabbingを消す
  drag.childNodes.forEach((childNode) => {
    if (childNode.id === 'grandma') {
      childNode.style.cursor = 'grab';
    }
  });

  // クラス名.dragを消す
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