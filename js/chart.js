var div = [ "#kospi200", "#sp500", "#eurostoxx50" ];
var color = [ "red", "blue", "green" ];
var backgroundColor = [ "#ff7b5a", "#7296c1", "#6eaa5e" ];
var labels = [ [], [], [] ];
var dataList = [ [], [], [] ];

function setChart() {
	var key = '1NTJNOJi-3tvdxEhz0bE3Dsvba4A91aMWNvOD0YvVEw8';
	var worksheet = '3';
	$.googleSheetToJSON(key, worksheet).done(function(rows) {
		setLabelsAndDataList(rows);
		setChartTitle();
		setChartContents();
	});
}

function setLabelsAndDataList(rows) {
	for (var row of rows) {
		if (row['date'] != null) {
			labels[0].push(getDateLabel(row['date']));
			dataList[0].push(row['percent'].replace("%", ""));
		}
		if (row['date_'] != null && row['date_'][0] != null) {
			labels[1].push(getDateLabel(row['date_'][0]));
			dataList[1].push(row['percent_'][0].replace("%", ""));
		}
		if (row['date_'] != null && row['date_'][1] != null) {
			labels[2].push(getDateLabel(row['date_'][1]));
			dataList[2].push(row['percent_'][1].replace("%", ""));
		}
	}
}

function getDateLabel(date) {
	return date.split(" ")[0].substring(2, 5) + date.split(" ")[1] + date.split(" ")[2];
}

function setChartTitle() {
	$("#kTable").append($("<tr/>", {}).append($("<th/>", { html : "KOSPI 200"})));
	$("#sTable").append($("<tr/>", {}).append($("<th/>", { html : "S&P 500"})));
	$("#eTable").append($("<tr/>", {}).append($("<th/>", { html : "EuroStoxx 50"})));
}

function setChartContents() {
	for (var i = 0; i < div.length; i++) {
		new Chart($(div[i]), {
			type : 'line', 
			data : {
				labels : labels[i],
				datasets : [{
					data : dataList[i],
					borderColor : color[i],
					backgroundColor : backgroundColor[i],
					borderWidth : 2,
					pointStyle : 'dash',
					pointBorderWidth : 0.01
				}]
			},
			options: {
				legend: {
					display: false
				}
			}
		});
	}
}