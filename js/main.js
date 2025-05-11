document.addEventListener('DOMContentLoaded', function () {
  const dateElement = document.getElementById('current-date');
  
  // 获取本地时间
  const currentDate = new Date();
  
  // 格式化日期
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('zh-CN', options);
  
  // 显示日期
  dateElement.textContent = formattedDate;
});
