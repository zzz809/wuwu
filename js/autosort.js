// js/sort-articles.js
function sortArticles(container) {
    const articles = Array.from(container.getElementsByClassName('policy-card'));
    const firstRects = new Map();
  
    articles.forEach(article => {
      firstRects.set(article, article.getBoundingClientRect());
    });
  
    articles.sort((a, b) => {
      const getDate = (el) => {
        const year = el.querySelector('.year').textContent.trim();
        const md = el.querySelector('.month-day').textContent.trim();
        return new Date(`${year}-${md}`);
      };
      return getDate(b) - getDate(a);
    });
  
    articles.forEach(article => container.appendChild(article));
  
    articles.forEach(article => {
      const lastRect = article.getBoundingClientRect();
      const firstRect = firstRects.get(article);
      const dx = firstRect.left - lastRect.left;
      const dy = firstRect.top - lastRect.top;
  
      article.style.transform = `translate(${dx}px, ${dy}px)`;
      article.getBoundingClientRect(); // 强制回流
      article.style.transition = 'transform 0.5s ease';
      article.style.transform = 'translate(0, 0)';
    });
  }
  