/* ****************************************
  型定義
**************************************** */

type WeatherType = {
  // 予報日ごとの天気情報
  forecasts: {
    // 予報日（日付）
    date: string;
    // 予報日（今日・明日・明後日）
    dateLabel: string;
    // 天気
    telop: string;
    // 最高気温と最低気温
    temperature: {
      max: { celsius: string; fahrenheit: string };
      min: { celsius: string; fahrenheit: string };
    };
    // ６時間ごとの降水確率
    chanceOfRain: {
      T00_06: string;
      T06_12: string;
      T12_18: string;
      T18_24: string;
    };
    image: {
      title: string;
      url: string;
      width: string;
      height: string;
    };
  }[];
};

/* ****************************************
  要素一覧
**************************************** */

const form = document.getElementById("form") as HTMLFormElement;
const city = document.getElementById("city") as HTMLInputElement;
const weather = document.getElementById("weather") as HTMLDivElement;

/* ****************************************
  処理
**************************************** */

if (form) {
  form.addEventListener("submit", onSubmit);
}

/* ****************************************
  イベントの関数一覧
**************************************** */

async function onSubmit(event: SubmitEvent) {
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
    const data: WeatherType = await response.json();

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
  } catch (error) {
    console.error(error);
  }
}
