document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articleContainer = document.getElementById('article-container');
  const articleCount = document.getElementById('article-count');

  const loadArticles = async (category = 'all') => {
    try {
      const response = await fetch('/fengzhuang/byjy_articles.html');
      const text = await response.text();

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text;

      // 获取 <li> 数据条目（简写版）
      const dataItems = Array.from(tempDiv.querySelectorAll('#article-data li'));

      // 将 <li> 转换成完整 <article>
      const articles = dataItems.map(item => {
        const [year, month, day] = item.dataset.date.split('-');
        const article = document.createElement('article');
        article.className = 'policy-card';
        article.dataset.category = item.dataset.category || 'all';
        article.dataset.sticky = item.dataset.sticky || 'false';
        article.setAttribute('onclick', `window.open('${item.dataset.link}', '_blank')`);

        article.innerHTML = `
          <div class="date-box">
            <div class="year">${year}</div>
            <div class="month-day">${month}-${day}</div>
          </div>
          <div class="policy-content">
            <h3>${item.textContent}</h3>
          </div>
        `;
        return article;
      });

      // 过滤文章
      const filteredArticles = articles.filter(article => category === 'all' || article.dataset.category === category);

      // 按日期从新到旧排序
      filteredArticles.sort((a, b) => {
        const dateA = new Date(`${a.querySelector('.year').textContent}-${a.querySelector('.month-day').textContent}`);
        const dateB = new Date(`${b.querySelector('.year').textContent}-${b.querySelector('.month-day').textContent}`);
        return dateB - dateA;
      });

      // 分置顶和非置顶
      const stickyArticles = filteredArticles.filter(article => article.dataset.sticky === 'true');
      const nonStickyArticles = filteredArticles.filter(article => article.dataset.sticky !== 'true');

      const sortedArticles = [...stickyArticles, ...nonStickyArticles];

      articleContainer.innerHTML = '';
      sortedArticles.forEach(article => articleContainer.appendChild(article));

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

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      if (button.classList.contains('active')) return;

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      loadArticles(category);
    });
  });
});
