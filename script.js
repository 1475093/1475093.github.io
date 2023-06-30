// 'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//Chromeデバッグ用
wa.playSilent();
let context = new AudioContext();

// 音源の使用準備
const synth = new Tone.Synth().toDestination();

// test play
// synth.triggerAttckRelease("C4", "4n")




////////////////// ピアノアプリ ///////////////////////////
// 発音許可初期化
let state = true;

// ボタンを押したときに継続発音するようにする
window.addEventListener('keydown', playSound);
window.addEventListener('mousedown', playSound);

window.addEventListener('keyup', offSound);
window.addEventListener('mouseup', offSound);


function playSound(e) {
    if (!state) return;  // 発音許可確認
    wa.playSilent(); //Chromeデバッグ用の無音再生

    let key = e.keyCode || e.target.dataset.key;
    div = document.querySelector('div [data-key="' + key + '"]');
    if (div) {

        // 鍵盤の黄色表示
        div.classList.toggle("clickedkey")

        // div要素の音名を代入する
        synth.triggerAttackRelease(div.textContent, '16n');

        // 状態をfalseにして、連続的な発音を防止する
        state = false;
    }
}

function offSound(e) {
    // 黄色表示を解除
    let key = e.keyCode || e.target.dataset.key;
    div = document.querySelector('div [data-key="' + key + '"]');
    if (div) {
        div.classList.toggle("clickedkey")
    }

    state = true;  // 再度、発音許可
}



