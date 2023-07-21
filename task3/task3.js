const input = document.getElementById("input");
const button = document.getElementById("button");
const imagesDiv = document.getElementById("images");
const errorDiv = document.getElementById("error");

button.addEventListener("click", () => {
  const number = document.querySelector('input').value;
  if (number < 1 || number > 10) {
    errorDiv.textContent = "Число вне диапазона от 1 до 10";
    imagesDiv.innerHTML = "";
    return;
  }
  errorDiv.innerHTML = "";
  const url = `https://picsum.photos/v2/list?limit=${number}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    imagesDiv.innerHTML = response.map(item => `<img src="${item.download_url}">`).join("");
  });
  xhr.send();
});