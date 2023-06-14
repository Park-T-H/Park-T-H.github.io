document.addEventListener("DOMContentLoaded", function () {
    var weightData = [];
  
    var dates = [];
    var weights = [];
  
    var ctx = document.getElementById("weightChart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "체중",
            data: weights,
            backgroundColor: "rgba(0, 123, 255, 0.5)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "체중 (kg)",
            },
          },
          x: {
            title: {
              display: true,
              text: "날짜",
            },
          },
        },
      },
    });
  
    // 데이터 로드
    function loadWeightData() {
      var storedData = localStorage.getItem("weightData");
      if (storedData) {
        weightData = JSON.parse(storedData);
        updateChart();
      }
    }
  
    // 데이터 저장
    function saveWeightData() {
      localStorage.setItem("weightData", JSON.stringify(weightData));
    }
  
    // 그래프 업데이트
    function updateChart() {
      dates = weightData.map(function (data) {
        return data.date;
      });
      weights = weightData.map(function (data) {
        return data.weight;
      });
  
      chart.data.labels = dates;
      chart.data.datasets[0].data = weights;
      chart.update();
    }
  
    // 데이터 추가 버튼 이벤트 핸들러
    var addDataButton = document.getElementById("addDataButton");
    addDataButton.addEventListener("click", function () {
      var dateInput = document.getElementById("dateInput");
      var weightInput = document.getElementById("weightInput");
  
      var date = dateInput.value;
      var weight = parseFloat(weightInput.value);
  
      // 입력한 날짜가 이미 배열에 존재하는지 확인
      var index = dates.indexOf(date);
      if (index === -1) {
        // 날짜가 중복되지 않을 때만 데이터 추가
        weightData.push({ date: date, weight: weight });
  
        // 그래프 업데이트
        updateChart();
  
        // 데이터 저장
        saveWeightData();
      } else {
        alert("이미 해당 날짜의 데이터가 입력되었습니다.");
      }
  
      // 입력 칸 비우기
      dateInput.value = "";
      weightInput.value = "";
    });
  
    // 데이터 삭제 버튼 이벤트 핸들러
    var removeDataButton = document.getElementById("removeDataButton");
    removeDataButton.addEventListener("click", function () {
      var dateInput = document.getElementById("dateInput");
      var date = dateInput.value;
  
      var index = dates.indexOf(date);
      if (index !== -1) {
        // 해당 날짜의 데이터를 삭제
        weightData.splice(index, 1);
  
        // 그래프 업데이트
        updateChart();
  
        // 데이터 저장
        saveWeightData();
      } else {
        alert("해당 날짜의 데이터를 찾을 수 없습니다.");
      }
  
      // 입력 칸 비우기
      dateInput.value = "";
      weightInput.value = "";
    });
  
    // 전체 삭제 버튼 이벤트 핸들러
    var deleteAllDataButton = document.getElementById("deleteAllDataButton");
    deleteAllDataButton.addEventListener("click", function () {
      weightData = []; // 데이터 배열 초기화
  
      // 그래프 업데이트
      updateChart();
  
      // 데이터 저장
      saveWeightData();
    });
  
    // 페이지 로드 시 데이터 로드
    loadWeightData();
  });
  
  // 창 안넘어가게
  function showGraph() {
    var chartContainer = document.getElementById("chartContainer");
    chartContainer.style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
  }
  