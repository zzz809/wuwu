// 使用 fetch 加载导航栏 HTML
fetch('/fengzhuang/nav_content.html')
.then(response => response.text())
.then(data => {
  // 将导航栏插入到指定的容器中
  document.getElementById('navbar-container').innerHTML = data;
  
  // 更新日期
  const dateElement = document.getElementById('current-date');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const currentDate = new Date().toLocaleDateString('zh-CN', options);
  dateElement.textContent = currentDate;
})
.catch(error => {
  console.error('加载导航栏失败:', error);
});