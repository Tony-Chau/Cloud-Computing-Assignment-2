$(document).ready(function(){
	$('.search-panel .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
		var concept = $(this).text();
		$('.search-panel span#search_hashtag').text(concept);
		$('.input-group #search_param').val(param);
	});
});

function textCheck(){
	var text = $('#search').val();
	if (text){
		$('#SearchButton').removeAttr('disabled');
	}else{
		$('#SearchButton').attr('disabled');
	}
}

function submiter(){
	var link = '/Graph';
	$('#FormSearch').attr('action', link);
	$('#submits').click();
}
