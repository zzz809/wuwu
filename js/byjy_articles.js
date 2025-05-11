// js/load-articles.js
async function loadArticles(containerId = 'article-container', articleURL = '/fengzhuang/byjy_articles.html') {
    const container = document.getElementById(containerId);
    if (!container) return;
    try {
      const response = await fetch(articleURL);
      const html = await response.text();
      container.innerHTML = html;
      // 文章加载完成后触发排序
      if (typeof sortArticles === 'function') {
        sortArticles(container);
      }
    } catch (error) {
      console.error('加载文章失败:', error);
    }
  }
  
  