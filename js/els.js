var key = '1qyFWwTpoDyFf4grH3ipuSSk35fgxhSiPD-zq6aHih3E';
var notiArr = new Array(
	new Array( "2020-04-14", "85%" ),
	new Array( "2020-10-14", "75%" ),
	new Array( "2021-04-14", "85%" ),
	new Array( "2021-10-14", "85%" ),
	new Array( "2022-04-14", "80%" ),
	new Array( "2022-10-14", "65%" )
);

$(document).ready(function() {
	var worksheets = [''];
	worksheets.forEach(function(worksheet) {
		$.googleSheetToJSON(key, worksheet).done(function(rows) {
			setElsTitle();
			setElsContents(rows);
			setNotiTitle();
			setNotiContents();
		});
	});
});

function setElsTitle() {
	$("#els").append($('<tr/>')
		.append($('<th/>', { html : '종목' }))
		.append($('<th/>', { html : '지수' }))
		.append($('<th/>', { html : '변동' }))
		.append($('<th/>', { html : '비율' }))
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
		.append($('<th/>', { html : '날짜' }))
		.append($('<th/>', { html : '배리어' }))
	);
}

function setNotiContents() {
	for (var i = 0; i < notiArr.length; i++) {
		var noti = notiArr[i];
		$("#noti").append($('<tr/>')
			.append($('<td/>', { html : (i + 1) + "차 평가" }))
			.append($('<td/>', { html : noti[0] }))
			.append($('<td/>', { html : noti[1] }))
		);
	}
}