$('.search-panel .dropdown-menu').find('a').click(function(e) {
	e.preventDefault();
	var param = $(this).attr("href").replace("#","");
	var concept = $(this).text();
	$('.search-panel span#search_hashtag').text(concept);
	$('.input-group #search_param').val(param);
});

function textCheck(){
	var text = $('#search').val();
	if (text){
		$('#SearchButton').removeAttr('disabled');
	}else{
		$('#SearchButton').attr('disabled', 'disabled');
	}
}

function submiter(){
	var search_param = $('#search_param').val();
	if (search_param == 'Search Hashtag'){
		search_param = 'Search';
	}
	var link = '/' + search_param;
	$('#FormSearch').attr('action', link);
	$('#submits').click();
}