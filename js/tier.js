function calculate() {
  var num1 = parseInt(document.getElementById('num1').value);
  var num2 = parseInt(document.getElementById('num2').value);
  var num3 = parseInt(document.getElementById('num3').value);

  var result = num1 + num2 + num3;
  document.getElementById('result').innerHTML = '3대: ' + result;

  var imageContainer = document.getElementById('image-container');
  var image = document.getElementById('image');

  if (result > 500) {
    image.src = 'image/underarmour.png';
  } else if (result > 400) {
    image.src = 'image/diamond.png';
  } else if (result > 300) {
    image.src = 'image/platinum.png';
  } else if (result > 200) {
    image.src = 'image/gold.png';
  } else if (result > 100) {
    image.src = 'image/silver.png';
  } else {
    image.src = 'image/bronze.png';
  }

  // 입력창 숨기기
  var inputContainer = document.getElementById('input-container');
  inputContainer.style.display = 'none';

  // 이미지 표시
  imageContainer.style.display = 'block';
}
