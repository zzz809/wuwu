document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articleContainer = document.getElementById('article-container');
  const articleCount = document.getElementById('article-count');

  // 加载文章函数
  const loadArticles = async (category = 'all') => {
    try {
      // 使用 Fetch API 加载外部 HTML 文件
      const response = await fetch('/fengzhuang/yjs_articles.html');
      const text = await response.text();

      // 将外部 HTML 内容转化为 DOM
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text;

      // 获取所有 <li> 数据条目（简写数据）
      const dataItems = Array.from(tempDiv.querySelectorAll('#article-data li'));

      // 将 <li> 转换成 <article> 节点
      const articles = dataItems.map(item => {
        const dateParts = item.dataset.date.split('-'); // [year, month, day]
        const year = dateParts[0];
        const monthDay = `${dateParts[1]}-${dateParts[2]}`;

        const article = document.createElement('article');
        article.className = 'policy-card';
        article.dataset.category = item.dataset.category || 'all';
        article.dataset.sticky = item.dataset.sticky || 'false';
        article.setAttribute('onclick', `window.open('${item.dataset.link}', '_blank')`);

        article.innerHTML = `
          <div class="date-box">
            <div class="year">${year}</div>
            <div class="month-day">${monthDay}</div>
          </div>
          <div class="policy-content">
            <h3>${item.textContent}</h3>
          </div>
        `;
        return article;
      });

      // 过滤文章
      const filteredArticles = articles.filter(article => category === 'all' || article.dataset.category === category);

      // 按照日期从新到旧排序
      filteredArticles.sort((a, b) => {
        const dateA = new Date(`${a.querySelector('.year').textContent}-${a.querySelector('.month-day').textContent}`);
        const dateB = new Date(`${b.querySelector('.year').textContent}-${b.querySelector('.month-day').textContent}`);
        return dateB - dateA; // 从新到旧排序
      });

      // 获取置顶文章
      const stickyArticles = filteredArticles.filter(article => article.dataset.sticky === 'true');
      const nonStickyArticles = filteredArticles.filter(article => article.dataset.sticky !== 'true');

      // 合并置顶和非置顶的文章
      const sortedArticles = [...stickyArticles, ...nonStickyArticles];

      // 清空容器，重新加载文章
      articleContainer.innerHTML = '';

      // 将过滤和排序后的文章添加到容器中
      sortedArticles.forEach(article => articleContainer.appendChild(article));

      // 更新文章数量显示
      articleCount.innerHTML = `共 <span class="count-number">${sortedArticles.length}</span> 条攻略`;
    } catch (error) {
      console.error('加载文章失败:', error);
      articleCount.textContent = '加载失败，请重试';
    }
  };

  // 默认加载所有文章并高亮“全部”按钮
  loadArticles('all');
  const allBtn = document.querySelector('.filter-btn[data-category="all"]');
  if (allBtn) allBtn.classList.add('active');

  // 给每个按钮绑定点击事件
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      if (button.classList.contains('active')) return;

      // 移除其他按钮高亮
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // 高亮当前按钮
      button.classList.add('active');

      // 加载对应类别的文章
      loadArticles(category);
    });
  });
});
