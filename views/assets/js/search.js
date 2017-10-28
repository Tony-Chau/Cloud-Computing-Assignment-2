$('.search-panel .dropdown-menu').find('a').click(function(e) {
	e.preventDefault();
	var param = $(this).attr("href").replace("#","");
	var concept = $(this).text();
	$('.search-panel span#search_hashtag').text(concept);
	$('.input-group #search_param').val(param);

	var menu = $('#menu').val();
	if (menu == 'Graph' || menu == 'Stream'){
		$('#search').removeAttr('disabled');
	}
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
	var link = '/' + search_param;
	$('#FormSearch').attr('action', link);
	$('#submits').click();
}
