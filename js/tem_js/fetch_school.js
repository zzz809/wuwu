const campusData = [
  {
      schoolName: "中国科学院大学",
      collegeName: "上海微系统与信息技术研究所",
      startDate: "2025年4月30日",
      endDate: "2025年6月20日",
      link: "https://sim.cas.cn/yjs/zsxx/yjs_sszs/202504/t20250430_7641257.html"
  },
  {
      schoolName: "上海科技大学",
      collegeName: "信息科学与技术学院",
      startDate: "2025年5月4日",
      endDate: "2025年6月22日",
      link: "https://sist.shanghaitech.edu.cn/2025/0504/c2863a1110662/page.htm"
  },
  {
      schoolName: "哈尔滨工业大学（深圳）",
      collegeName: "集成电路学院",
      startDate: "2025年5月12日",
      endDate: "2025年6月7日",
      link: "http://ic.hitsz.edu.cn/info/1032/2527.htm"
  },
  {
      schoolName: "哈尔滨工业大学",
      collegeName: "电子与信息工程学院",
      startDate: "2025年5月7日",
      endDate: "2025年5月31日",
      link: "https://seie.hit.edu.cn/2025/0507/c17148a369613/page.htm"
  },
  {
      schoolName: "中国科学院大学",
      collegeName: "前沿交叉科学学院",
      startDate: "2025年5月9日",
      endDate: "2025年5月30日",
      link: "https://sais.ucas.ac.cn/index.php/zh/xwgs/tgzs/1326-2025-2"
  },
  {
      schoolName: "南方科技大学",
      collegeName: "深港微电子学院",
      startDate: "2025年5月14日",
      endDate: "2025年6月15日",
      link: "https://sme.sustech.edu.cn/index/news/neiye/id/798.html"
  },
  {
      schoolName: "浙江大学",
      collegeName: "信息与电子工程学院",
      startDate: "2025年5月15日",
      endDate: "2025年6月15日",
      link: "http://www.isee.zju.edu.cn/2025/0515/c21109a3049527/page.htm"
  },
  {
      schoolName: "同济大学",
      collegeName: "信息与电子工程学院",
      startDate: "2025年5月13日",
      endDate: "2025年6月13日",
      link: "https://see.tongji.edu.cn/info/1147/13909.htm"
  },
  {
      schoolName: "中国科学院大学",
      collegeName: "光学精密机械与物理研究所",
      startDate: "2025年5月6日",
      endDate: "2025年6月30日",
      link: "https://yjs.ciomp.ac.cn/news_show.aspx?id=1911"
  },
  {
  schoolName: "浙江大学",
  collegeName: "集成电路学院",
  startDate: "2025年5月22日",
  endDate: "2025年6月15日",
  link: "https://ic.zju.edu.cn/2025/0522/c54023a3054130/page.htm"
  },
  {
  schoolName: "北京大学",
  collegeName: "信息工程学院",
  startDate: "2025年4月21日",
  endDate: "2025年6月22日",
  link: "https://www.ece.pku.edu.cn/info/1027/2923.htm"
  },
  {
  schoolName: "中国科学院大学",
  collegeName: "半导体研究所",
  startDate: "2025年5月23日",
  endDate: "2025年6月15日",
  link: "https://bdt.semi.ac.cn/yanjiusheng/contents/691/4471.html"
  },
  {
  schoolName: "西安交通大学",
  collegeName: "微电子学院",
  startDate: "2025年6月3日",
  endDate: "2025年6月12日",
  link: "https://ele.xjtu.edu.cn/info/1013/2625.htm"
  },
  {
  schoolName: "中山大学",
  collegeName: "微电子科学与技术学院",
  startDate: "2025年5月29日",
  endDate: "2025年6月15日",
  link: "https://mst.sysu.edu.cn/article/1229"
  },
  {
  schoolName: "上海交通大学",
  collegeName: "集成电路学院",
  startDate: "2025年6月6日",
  endDate: "2025年6月25日",
  link: "https://icisee.sjtu.edu.cn/notice/2552.html"
  },
  {
  schoolName: "北京大学",
  collegeName: "软件与微电子学院",
  startDate: "2025年6月6日",
  endDate: "2025年6月16日",
  link: "https://www.ss.pku.edu.cn/admission/admnotice/4680.html"
  },
  {
  schoolName: "北京大学",
  collegeName: "集成电路学院",
  startDate: "2025年6月6日",
  endDate: "2025年6月18日",
  link: "https://ic.pku.edu.cn/fwdh/tzgg/a34e058fb0bf4d708eda89326746f04a.htm"
  },
  {
  schoolName: "中国科学院大学",
  collegeName: "微电子研究所学院",
  startDate: "2025年6月9日",
  endDate: "2025年6月30日",
  link: "http://ime.cas.cn/kjrh/tzggkjrh/202405/t20240522_7168020.html"
  },
{
  schoolName: "中国科学院大学",
  collegeName: "集成电路学院",
  startDate: "2025年6月10日",
  endDate: "2025年6月30日",
  link: "https://sme.ucas.ac.cn/index.php/zh-cn/zsjy/sszs/536-2025-7"
  },
{
  schoolName: "复旦大学",
  collegeName: "未来信息创新学院（原信息科学与工程学院）",
  startDate: "2025年6月10日",
  endDate: "2025年6月25日",
  link: "https://ercalt.fudan.edu.cn/Data/View/4888"
  },

  ];
  const tableBody = document.querySelector("#campus-table tbody");

  // 当前排序状态记录
  const sortState = {
    schoolName: true,
    startDate: true,
    endDate: true
  };
  
  // 中文日期转 Date 对象
  function parseChineseDate(str) {
    return new Date(str.replace("年", "-").replace("月", "-").replace("日", ""));
  }
  
  // 渲染表格数据
  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.schoolName}</td>
        <td>${item.collegeName}</td>
        <td>${item.startDate}</td>
        <td>${item.endDate}</td>
        <td><a href="${item.link}" target="_blank">查看详情</a></td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // 排序并渲染
  function sortByField(field) {
    const asc = sortState[field];
  
    campusData.sort((a, b) => {
      let valA = a[field];
      let valB = b[field];
  
      if (field === "startDate" || field === "endDate") {
        valA = parseChineseDate(valA);
        valB = parseChineseDate(valB);
        return asc ? valA - valB : valB - valA;
      } else {
        return asc
          ? valA.localeCompare(valB, "zh-Hans")
          : valB.localeCompare(valA, "zh-Hans");
      }
    });
  
    sortState[field] = !asc;
    renderTable(campusData);
  }
  
  // 绑定表头点击事件（支持排序字段）
  document.querySelectorAll("th[data-sort]").forEach(th => {
    th.style.cursor = "pointer";
    th.addEventListener("click", () => {
      const field = th.getAttribute("data-sort");
      sortByField(field);
    });
  });
  
  // 页面加载时默认按开始时间升序
  sortByField("startDate");
  
