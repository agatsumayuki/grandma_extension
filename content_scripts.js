// imgUrl は ./src/imgUrl.js
// deploy(), mdown(), deployComments() は ./src/app.js

// 配置準備
const grandma = document.createElement('img');

// スタイル定義など
grandma.src = imgUrl.nomalFaceImgUrl;
grandma.id = 'grandma';
grandma.style.position = 'fixed';
grandma.style.cursor = 'pointer';
grandma.style.right = 0;
grandma.style.bottom = '-560px';
grandma.style.width = '250px';
grandma.style.zIndex = 9999; // 一番上に表示するために適当な値
grandma.addEventListener("mousedown", mdown, false); // mousedownした時に実行するもの

deploy(grandma);

// 配置準備
const grandmaComment = document.createElement('div');

// スタイル定義など
grandmaComment.id = 'grandmaComment';
grandmaComment.style.position = 'fixed';
grandmaComment.style.right = '200px';
grandmaComment.style.bottom = '10px';
grandmaComment.addEventListener("mousedown", mdown, false); // mousedownした時に実行するもの

deployComments(grandmaComment);