function addHistory() {
	$.ajax({
		type: "GET",
		url : "https://script.google.com/macros/s/AKfycbxANywOqZi9FFrpzhTXypiqeYDNdB6y1bM3awvy03ncATKGOp8/exec",
		data: {
			"location": navigator.userAgent.toLowerCase()
		}
	});
}

function setHistory() {
	var key = '10J1Obzx7dyIRodtX4snd33ZxAsZiSVzBJ9jDiYSCw0c';
	var worksheet = '1';
	$.googleSheetToJSON(key, worksheet).done(function(rows) {
		setHistoryTitle();
		setHistoryContents(rows);
	});
}

function setHistoryTitle() {
	$("#history").append($('<tr/>')
		.append($('<th/>', { html : '최종 접속' }))
		.append($('<th/>', { html : '당일' }))
		.append($('<th/>', { html : '전체' }))
	);
}

function setHistoryContents(rows) {
	var timeStamp = "";
	var count = 0;
	var todayCount = 0;
	for (var row of rows) {
		if (row['location'].indexOf('linux') <= 0)
			continue;
		timeStamp = row['timestamp'];
		count++;
		if (!isToday(timeStamp))
			continue;
		todayCount++;
	}
	$("#history").append($('<tr/>')
		.append($('<td/>', { html : timeStamp }))
		.append($('<td/>', { html : todayCount }))
		.append($('<td/>', { html : count }))
	);
}

function isToday(timeStamp) {
	var date = new Date();
	var timeStampArr = timeStamp.split(" ");
	if (date.getFullYear() != timeStampArr[0].replace(".", ""))
		return false;
	if ((date.getMonth() + 1) != timeStampArr[1].replace(".", ""))
		return false;
	if (date.getDate() != timeStampArr[2].replace(".", ""))
		return false;
	return true;
}