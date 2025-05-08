// 动态引入页脚
  fetch('/fengzhuang/footer.html')  // 根据页面位置修改相对路径
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });