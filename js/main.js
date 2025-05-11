// 获取当前日期并格式化为 "YYYY年MM月DD日"
function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份从0开始，所以需要加1
  const day = date.getDate();
  
  return `${year}年${month}月${day}日`;
}

// 将日期插入到页面中
document.querySelector('.current-date').textContent = formatDate();
