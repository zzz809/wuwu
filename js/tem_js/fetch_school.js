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
    ];
    const tableBody = document.querySelector("#campus-table tbody");
    const sortStartBtn = document.getElementById("sort-start");
    const sortEndBtn = document.getElementById("sort-end");
    
    let startAsc = true;
    let endAsc = true;
    
    // 将中文日期转换为标准 Date 对象
    function parseChineseDate(str) {
      return new Date(str.replace("年", "-").replace("月", "-").replace("日", ""));
    }
    
    // 渲染表格内容
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
    
    // 排序函数封装（通用）
    function sortByDate(field, asc) {
      campusData.sort((a, b) => {
        const dateA = parseChineseDate(a[field]);
        const dateB = parseChineseDate(b[field]);
        return asc ? dateA - dateB : dateB - dateA;
      });
      renderTable(campusData);
    }
    
    // 按开始时间排序
    sortStartBtn.addEventListener("click", () => {
      sortByDate("startDate", startAsc);
      sortStartBtn.textContent = `按开始时间排序 ${startAsc ? "↓" : "↑"}`;
      startAsc = !startAsc;
    });
    
    // 按结束时间排序
    sortEndBtn.addEventListener("click", () => {
      sortByDate("endDate", endAsc);
      sortEndBtn.textContent = `按结束时间排序 ${endAsc ? "↓" : "↑"}`;
      endAsc = !endAsc;
    });

    const sortSchoolBtn = document.getElementById("sort-school");
    let schoolAsc = true; // 学校名称默认升序

    // 字符串排序函数
    function sortByString(field, asc) {
    campusData.sort((a, b) => {
        const nameA = a[field].localeCompare(b[field], "zh-Hans");
        const nameB = b[field].localeCompare(a[field], "zh-Hans");
        return asc ? nameA : nameB;
    });
    renderTable(campusData);
    }

    // 学校名称排序点击事件
    sortSchoolBtn.addEventListener("click", () => {
    sortByString("schoolName", schoolAsc);
    sortSchoolBtn.textContent = `按学校名称排序 ${schoolAsc ? "↓" : "↑"}`;
    schoolAsc = !schoolAsc;
    });


    
// 初始默认按开始时间升序排序并渲染
sortByDate("startDate", true);
startAsc = false; // 因为已是升序，下次点击要变为降序
