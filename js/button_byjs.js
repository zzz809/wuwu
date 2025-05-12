document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articleContainer = document.getElementById('article-container');
  const articleCount = document.getElementById('article-count');

  // 从 /fengzhuang/byjy_articles.html 加载文章
  const loadArticles = async (category = 'all') => {
    try {
      // 使用 Fetch API 加载外部 HTML 文件
      const response = await fetch('/fengzhuang/byjy_articles.html'); // 这里使用新的路径
      const text = await response.text();

      // 将外部 HTML 内容转化为 DOM
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text;

      // 获取所有的文章
      const articles = Array.from(tempDiv.querySelectorAll('.policy-card'));

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

      // 合并置顶和非置顶的文章，置顶文章排在最前面
      const sortedArticles = [...stickyArticles, ...nonStickyArticles];

      // 清空容器，重新加载文章
      articleContainer.innerHTML = '';

      // 将过滤和排序后的文章添加到容器中
      sortedArticles.forEach(article => {
        articleContainer.appendChild(article);
      });

      // 更新文章数量显示
      articleCount.textContent = `共 ${sortedArticles.length} 条攻略`;
    } catch (error) {
      console.error('加载文章失败:', error);
      articleCount.textContent = '加载失败，请重试'; // 错误时显示提示
    }
  };

  // 默认加载所有文章并高亮“全部”按钮
  loadArticles('all');
  document.querySelector('.filter-btn[data-category="all"]').classList.add('active');

  // 给每个按钮绑定点击事件
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      // 如果点击的是当前按钮，直接返回
      if (button.classList.contains('active')) return;

      // 移除其他按钮的高亮状态
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // 为当前点击的按钮添加高亮
      button.classList.add('active');

      // 加载对应类别的文章
      loadArticles(category);
    });
  });
});
