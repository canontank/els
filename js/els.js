$(document).ready(function() {
	var id = '1qyFWwTpoDyFf4grH3ipuSSk35fgxhSiPD-zq6aHih3E';
	var worksheets = [''];
	worksheets.forEach(function(worksheet) {
 		$.googleSheetToJSON(id, worksheet).done(function(rows) {
			setTitle();		
			setContents(rows);
		});
	});
});

function setTitle() {
	$("#els").append($('<tr/>')
		.append($('<th/>', {}).append($('<font/>', { text : '종목' } )))
		.append($('<th/>', {}).append($('<font/>', { text : '지수' } )))
		.append($('<th/>', {}).append($('<font/>', { text : '비율' } )))
		.append($('<th/>', {}).append($('<font/>', { text : '변동' } )))
	);
}

function setContents(rows) {
	for (var row of rows) {
		$("#els").append($('<tr/>')
			.append($('<td/>', { 'align' : 'center' }).append($('<font/>', { text : row['stock'] } )))
			.append($('<td/>', { 'align' :  'right' }).append($('<font/>', { text : row['index'] } )))
			.append($('<td/>', { 'align' :  'right', style : 'font-weight : bold' }).append($('<font/>', { text : row['rate'], color : '#003ACE' } )))
			.append($('<td/>', { 'align' :  'right' }).append($('<font/>', { text : row['crate'], color : '#F93345' } )))
		);
	}
}
