function setRepay() {
	var key = '1NTJNOJi-3tvdxEhz0bE3Dsvba4A91aMWNvOD0YvVEw8';
	var worksheet = '2';
	$.googleSheetToJSON(key, worksheet).done(function(rows) {
		setRepayTitle();
		setRepayContents(rows);
	});
}

function setRepayTitle() {
	$("#repay").append($('<tr/>')
		.append($('<th/>', { html : '구분' }))
		.append($('<th/>', { html : '평가일' }))
		.append($('<th/>', { html : '배리어' }))
		.append($('<th/>', { html : '상환' }))
	);
}

function setRepayContents(rows) {
	for (var i = 0; i < rows.length; i++) {
		if (i == 0)
			continue;
		var row = rows[i];
		var repay = row['repay'] == '#N/A' ? '' : row['repay'];
		$("#repay").append($('<tr/>')
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
	return '';
}
