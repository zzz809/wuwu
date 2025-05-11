document.addEventListener('DOMContentLoaded', function () {
  const dateElement = document.getElementById('current-date');

  // 使用 fetch 请求获取时间
  fetch('https://worldtimeapi.org/api/timezone/Asia/Shanghai')  // 请求上海时区的时间
    .then(response => response.json())
    .then(data => {
      // 从 API 返回的数据中获取日期
      const currentDate = new Date(data.datetime);
      
      // 格式化日期
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = currentDate.toLocaleDateString('zh-CN', options);
      
      // 显示日期
      dateElement.textContent = formattedDate;
    })
    .catch(error => {
      console.error('获取时间失败:', error);
      // 你可以在这里设置一个默认日期，或者显示错误信息
      dateElement.textContent = '日期加载失败';
    });
});
