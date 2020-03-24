$(document).ready(function() {
	$("#els").append($('<tr/>')
		.append($('<th/>', {}).append($('<font/>', { text : '종목' } )))
		.append($('<th/>', {}).append($('<font/>', { text : '지수' } )))
		.append($('<th/>', {}).append($('<font/>', { text : '비율' } )))
	);
	var id = '1qyFWwTpoDyFf4grH3ipuSSk35fgxhSiPD-zq6aHih3E';
	var worksheets = [''];
	worksheets.forEach(function(worksheet) {
 		$.googleSheetToJSON(id, worksheet).done(function(rows) {
			$("#els").append($('<tr/>')
				.append($('<td/>', { 'align' : 'center' }).append($('<font/>', { text : rows['stock'] } )))
				.append($('<td/>', { 'align' :  'right' }).append($('<font/>', { text : rows['index'] } )))
				.append($('<td/>', { 'align' :  'right' }).append($('<font/>', { text : rows['rate'] } )))
			);
		});
	});
});
