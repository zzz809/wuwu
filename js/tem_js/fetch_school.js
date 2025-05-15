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
    ];
    // 填充表格数据
    const tableBody = document.querySelector("#campus-table tbody");

    campusData.forEach((data, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${data.schoolName}</td>
        <td>${data.collegeName}</td>
        <td>${data.startDate}</td>
        <td>${data.endDate}</td>
        <td><a href="${data.link}" target="_blank">查看详情</a></td>
    `;
    tableBody.appendChild(row);
    });
