document.addEventListener('DOMContentLoaded', function () {
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  
  // 使用 fetch 获取实时时间并更新时间
  function updateClock() {
    fetch('https://worldtimeapi.org/api/timezone/Asia/Shanghai')  // 请求上海时区的时间
      .then(response => response.json())
      .then(data => {
        const currentDateTime = new Date(data.datetime); // 获取当前时间

        const date = currentDateTime.toISOString().split('T')[0].replace(/-/g, '/'); // 更符合中文习惯的日期格式
        const time = currentDateTime.toTimeString().substr(0, 8);  // 获取时分秒
        const weekDay = weekDays[currentDateTime.getDay()];  // 获取星期几

        // 更新页面上的实时时钟
        document.getElementById('realtime-clock').textContent = 
          `${date} ${time} ${weekDay}`;
      })
      .catch(error => {
        console.error('获取时间失败:', error);
        document.getElementById('realtime-clock').textContent = '时间加载失败';
      });
  }

  // 初始化后立即执行一次
  updateClock();
  
  // 每秒刷新
  setInterval(updateClock, 1000);
});
