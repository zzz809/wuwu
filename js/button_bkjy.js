document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articleContainer = document.getElementById('article-container_bkjy');
  const articleCount = document.getElementById('article-count_bkjy');

  // 从 /fengzhuang/bkjy_articles.html 加载文章
  const loadArticles = async (category = 'all') => {
    try {
      const response = await fetch('/fengzhuang/bkjy_articles.html');
      const text = await response.text();

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text;

      // 获取简洁版列表中的 <li>
      const items = Array.from(tempDiv.querySelectorAll('#article-data li'));

      // 根据 <li> 构建完整 <article>
      const articles = items.map(item => {
        const dateParts = item.dataset.date.split('-'); // yyyy-mm-dd
        const year = dateParts[0];
        const monthDay = `${dateParts[1]}-${dateParts[2]}`;
        const category = item.dataset.category || '';
        const link = item.dataset.link;
        const sticky = item.dataset.sticky === 'true';

        const article = document.createElement('article');
        article.className = 'policy-card';
        if (category) article.dataset.category = category;
        if (sticky) article.dataset.sticky = 'true';
        article.setAttribute('onclick', `window.open('${link}', '_blank')`);

        if (sticky) {
          const stickyLabel = document.createElement('div');
          stickyLabel.className = 'sticky-label';
          stickyLabel.textContent = '置顶';
          article.appendChild(stickyLabel);
        }

        const dateBox = document.createElement('div');
        dateBox.className = 'date-box';
        const yearDiv = document.createElement('div');
        yearDiv.className = 'year';
        yearDiv.textContent = year;
        const monthDayDiv = document.createElement('div');
        monthDayDiv.className = 'month-day';
        monthDayDiv.textContent = monthDay;
        dateBox.appendChild(yearDiv);
        dateBox.appendChild(monthDayDiv);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'policy-content';
        const h3 = document.createElement('h3');
        h3.textContent = item.textContent.trim();
        contentDiv.appendChild(h3);

        article.appendChild(dateBox);
        article.appendChild(contentDiv);

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

      // 置顶文章排在前面
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
  document.querySelector('.filter-btn[data-category="all"]').classList.add('active');

  // 点击筛选按钮
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
