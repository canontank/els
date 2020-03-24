$(document).ready(function() {
	$("#els").append($('<tr/>')
		.append($('<th/>', {}).append($('<font/>', { text : '종목' } )))
		.append($('<th/>', {}).append($('<font/>', { text : '지수' } )))
		.append($('<th/>', {}).append($('<font/>', { text : '비율' } )))
	);
	worksheets.forEach(function(worksheet) {
 		$.googleSheetToJSON('1qyFWwTpoDyFf4grH3ipuSSk35fgxhSiPD-zq6aHih3E', [''])
			.done(function(rows) {
				console.log(rows);
				$("#els").append($('<tr/>')
					.append($('<td/>', { 'align' : 'center' }).append($('<font/>', { text : rows.get("stock") } )))
					.append($('<td/>', { 'align' : ' right' }).append($('<font/>', { text : rows.get("index") } )))
					.append($('<td/>', { 'align' :  'right' }).append($('<font/>', { text : rows.get("rate") } )))
				);
			}
		);
	});
});
