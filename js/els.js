$(document).ready(function() {
	var key = '1NTJNOJi-3tvdxEhz0bE3Dsvba4A91aMWNvOD0YvVEw8';
	var worksheets = ['', '2'];
	$.googleSheetToJSON(key, worksheets[0]).done(function(rows) {
		setElsTitle();
		setElsContents(rows);
	});
	$.googleSheetToJSON(key, worksheets[1]).done(function(rows) {
		setNotiTitle();
		setNotiContents(rows);
	});
	addHistory();
});

function setElsTitle() {
	$("#els").append($('<tr/>')
		.append($('<th/>', { html : '종목' }))
		.append($('<th/>', { html : '지수' }))
		.append($('<th/>', { html : '비율' }))
		.append($('<th/>', { html : '변동' }))
	);
}

function setElsContents(rows) {
	for (var row of rows) {
		$("#els").append($('<tr/>')
			.append($('<td/>', { html : row['stock'], class : 'stock' }))
			.append($('<td/>', { html : row['index'], class : 'index' }))
			.append($('<td/>', { html : row['rate'], class : getAddClass('rate', row['index'], row['yindex']) }))
			.append($('<td/>', { html : getCRate(row['index'], row['yindex'], row['crate']), class : getAddClass('crate', row['index'], row['yindex']) }))
		);
	}
}

function getAddClass(oClass, index, yindex) {
	if (index > yindex) {
		oClass += ' red';
	} else if (index < yindex) {
		oClass += ' blue';
	}
	return oClass;
}

function getCRate(index, yindex, crate) {
	if (index > yindex) {
		return '▲' + crate;
	} else if (index < yindex) {
		crate = crate.replace('-', '');
		return '▼' + crate;
	} else {
		return crate;
	}
}

function setNotiTitle() {
	$("#noti").append($('<tr/>')
		.append($('<th/>', { html : '구분' }))
		.append($('<th/>', { html : '평가일' }))
		.append($('<th/>', { html : '배리어' }))
		.append($('<th/>', { html : '상환' }))
	);
}

function setNotiContents(rows) {
	for (var row of rows) {
		var repay = row['repay'] == '#N/A' ? '' : row['repay'];
		$("#noti").append($('<tr/>')
			.append($('<td/>', { html : row['gbn'] }))
			.append($('<td/>', { html : row['date'] }))
			.append($('<td/>', { html : row['barrier'] }))
			.append($('<td/>', { html : repay, class : getRepayClass(repay) }))
		);
	}
}

function getRepayClass(repay) {
	if (repay == "성공")
		return 'repay red';
	return 'repay';
}

function addHistory() {
	$.ajax({
		url : "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf0BzwAkF1BcB0r63ZqRZLZiF5Q377eCsr2CDlNmUzbD0kKhw/formResponse",
		data : {
			'entry.1937100680' : navigator.userAgent.toLowerCase()
		}
	});
}
