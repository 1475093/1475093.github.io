// 'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// npm i Tone;
// import * as Tone from 'tone';

wa.playSilent(); //Chromeデバッグ用の無音再生

// Tone.Synth()の使用準備
const synth = new Tone.Synth().toDestination();

// test
// synth.triggerAttckRelease("C4", "4n")

let state = true;  // 入力監視初期化

// ボタンを押したときに継続発音するようにする
// 「マウス」か「キーボード」を押した時のイベント処理
window.addEventListener('keydown', playSound);
window.addEventListener('mousedown', playSound);

// 「マウス」か「キーボード」を離した時のイベント処理
window.addEventListener('keyup', offSound);
window.addEventListener('mouseup', offSound);


function playSound(e) {
    if (!state) return;  // falseなら処理を実行しない

    wa.playSilent(); //Chromeデバッグ用の無音再生

    let key = e.keyCode || e.target.dataset.key;
    div = document.querySelector('div [data-key="' + key + '"]');
    if (div) {
        div.classList.toggle("clickedkey")
        // div要素のテキスト(音名)を代入する
        synth.triggerAttackRelease(div.textContent, '16n');
        // 状態をfalseにして、連続的な発音を防止する
        state = false;
    }
}

function offSound(e) {
    let key = e.keyCode || e.target.dataset.key;
    div = document.querySelector('div [data-key="' + key + '"]');
    if (div) {
        div.classList.toggle("clickedkey")
    }
    state = true;  // 再度、発音できるようにtrueへ戻す
}


//楽譜を食わせてボタンを押すと演奏する機能を実装

// メロディの音符を配列で保持
wa.playSilent(); //Chromeデバッグ用の無音再生
let melodyList = [
    'C4', 'D4', 'E4', 'F4',
    'G4', ['A4', 'B4'], 'C5'
];
let synth2 = new Tone.Synth().toDestination();



// メロディをシーケンス制御する
let melody = new Tone.Sequence(setPlay, melodyList).start();

melody.loop = 1;  // ループを1回に設定
Tone.Transport.bpm.value = 90;  // BPMを90に設定
Tone.Transport.start('1m');  // 1小節分の時間をおいてから発音

function setPlay(time, note) {
    // 8分音符でメロディを発音
    //   wa.playSilent(); //Chromeデバッグ用の無音再生
    synth.triggerAttackRelease(note, '8n', time);
}
