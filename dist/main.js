"use strict";
/* ****************************************
  型定義
**************************************** */
/* ****************************************
  要素一覧
**************************************** */
const form = document.getElementById("form");
const city = document.getElementById("city");
const weather = document.getElementById("weather");
/* ****************************************
  処理
**************************************** */
if (form) {
    form.addEventListener("submit", onSubmit);
}
/* ****************************************
  イベントの関数一覧
**************************************** */
async function onSubmit(event) {
    // イベントをキャンセルする
    event.preventDefault();
    // 地域コードを取得する
    const cityCode = city.value;
    // 天気情報を取得するURLを作成する
    const URL = `https://weather.tsukumijima.net/api/forecast?city=${cityCode}`;
    try {
        // 天気情報を取得する
        const response = await fetch(URL);
        // JSONデータをJavaScriptのオブジェクトに変換する
        const data = await response.json();
        // 天気情報を表示するHTMLを作成する
        const weatherHTML = data.forecasts
            .map((forecast) => {
            const max = forecast.temperature.max.celsius ?? "-";
            const min = forecast.temperature.min.celsius ?? "-";
            return `
    <div>
      <h2>${forecast.dateLabel} (${forecast.date})</h2>
      <p>天気: ${forecast.telop}</p>
      <img src="${forecast.image.url}" alt="${forecast.image.title}" width="${forecast.image.width}" height="${forecast.image.height}">
    </div>
  `;
        })
            .join("");
        // 天気情報を表示する
        weather.innerHTML = weatherHTML;
    }
    catch (error) {
        console.error(error);
    }
}
