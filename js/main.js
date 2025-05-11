document.addEventListener('DOMContentLoaded', function () {
  const dateElement = document.getElementById('current-date');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const currentDate = new Date().toLocaleDateString('zh-CN', options);
  dateElement.textContent = currentDate;
});
