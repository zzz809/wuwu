const campusData = [
    {
        schoolName: "中国科学院大学",
        collegeName: "上海微系统与信息技术研究所",
        startDate: "2025年4月30日",
        endDate: "2025年6月20日",
        link: "https://sim.cas.cn/yjs/zsxx/yjs_sszs/202504/t20250430_7641257.html"
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
