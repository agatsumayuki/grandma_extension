/** 
 *  imgUrl は ./src/imgUrl.js
 *  deploy(), mdown(), deployComments() は ./src/app.js
*/

// 入れる箱の準備
const grandmaDiv = document.createElement('div');
grandmaDiv.id = 'grandmaDiv';
grandmaDiv.style.position = 'fixed';
grandmaDiv.style.right = '0px';
grandmaDiv.style.bottom = '0px';

// grandmaの準備
const grandma = document.createElement('img');
grandma.src = imgUrl.nomalFaceImgUrl;
grandma.id = 'grandma';
grandma.style.position = 'absolute';
grandma.style.top = '0px';
grandmaDiv.addEventListener("mousedown", mdown, false); // mousedownした時に実行するもの

// 神ホクロの準備(ちょうどホクロの位置に来るように調整)
const godMole = document.createElement('div');
godMole.id = 'godMole';
godMole.style.position = 'absolute';
godMole.style.top = '24px';
godMole.style.left = '74px';

grandmaDiv.appendChild(godMole);
grandmaDiv.appendChild(grandma);

deploy(grandmaDiv);

// コメントの準備
const grandmaComment = document.createElement('div');
grandmaComment.id = 'grandmaComment';
grandmaComment.style.position = 'fixed';
grandmaComment.style.right = '200px';
grandmaComment.style.bottom = '10px';
grandmaComment.addEventListener("mousedown", mdown, false); // mousedownした時に実行するもの

deployComments(grandmaComment);