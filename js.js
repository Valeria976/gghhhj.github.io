
$(document).ready(function () {
  const words = [
    { word: "always", translation: "завжди" },
    { word: "never", translation: "ніколи" },
    { word: "sometimes", translation: "іноді" },
    { word: "often", translation: "часто" },
    { word: "rarely", translation: "рідко" },
    { word: "soon", translation: "скоро" },
    { word: "late", translation: "пізно" },
    { word: "early", translation: "рано" },
    { word: "yesterday", translation: "вчора" },
    { word: "tomorrow", translation: "завтра" }
  ];

  let currentIndex = 0;
  let correct = 0;
  let incorrect = 0;

  // Рандомізація слів
  const Words = words.sort(() => 0.5 - Math.random());

  // Оновлення UI
  function updateUI() {
    $("#word").text(Words[currentIndex].word);
    $("#progress").text(`${currentIndex + 1}/${words.length}`);
    $("#correct").text(`Вірно: ${correct}`);
    $("#incorrect").text(`Невірно: ${incorrect}`);
    $("#translation").val("");
  }

  // Перевірка перекладу
  function checkTranslation() {
    const userTranslation = $("#translation").val().trim().toLowerCase();
    const correctTranslation = Words[currentIndex].translation.toLowerCase();
    if (userTranslation === correctTranslation) {
      correct++;
    } else {
      incorrect++;
    }
  }

  // Наступне слово
  $("#next").click(function () {
    checkTranslation();
    currentIndex++;
    if (currentIndex < words.length) {
      updateUI();
    } else {
      showModal();
    }
  });

  // Показати модальне вікно
  function showModal() {
    const percentage = Math.round((correct / words.length) * 100);
    let level = "";
    if (percentage >= 80) level = "Відмінно";
    else if (percentage >= 50) level = "Добре";
    else level = "Потрібно більше практики";

    $("#result").text(`Ваш рівень знань: ${level} (${percentage}%)`);
    $("#modal").fadeIn();
  }

  // Перезапустити гру
  $("#restart").click(function () {
    currentIndex = 0;
    correct = 0;
    incorrect = 0;
    Words.sort(() => 0.5 - Math.random());
    updateUI();
    $("#modal").fadeOut();
  });

  // Ініціалізація
  updateUI();
});
