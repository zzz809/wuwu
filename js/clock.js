document.addEventListener('DOMContentLoaded', function () {
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  
  // 更新本地时间并更新时间
  function updateClock() {
    const currentDateTime = new Date();  // 获取当前本地时间

    const date = currentDateTime.toISOString().split('T')[0].replace(/-/g, '/'); // 更符合中文习惯的日期格式
    const time = currentDateTime.toTimeString().substr(0, 8);  // 获取时分秒
    const weekDay = weekDays[currentDateTime.getDay()];  // 获取星期几

    // 更新页面上的实时时钟
    document.getElementById('realtime-clock').textContent = 
      `${date} ${time} ${weekDay}`;
  }

  // 初始化后立即执行一次
  updateClock();
  
  // 每秒刷新
  setInterval(updateClock, 1000);
});
