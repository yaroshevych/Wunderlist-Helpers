// Wunder Print.
// Used in bookmarklet to print all tasks on single page.
// Oleg Yaroshevych, 2011.

var divId = 0;

var onLoaded = function(data)
{
	var id='list-data-' + ++divId;

	$('body').append('<div id="' + id + '" style="margin:10px"></div>');
	$('#' + id).append(JSON.parse(data).data);

	$('#' + id + ' h1').css('font-size', '1.2em');

	$('.timestamp').each(function(){
		var ticks = $(this).attr('rel');
		$(this).append('[' + (new Date(Date(ticks))).toDateString() + ']');
	});

	$('.timestamp').each(function(){
		$(this).removeClass('timestamp');
		$(this).attr('style', 'padding-left: 30px;color: gray;');
	});

	$('#listfunctions').remove();
	$('.add').remove();
	$('#donelist_1').remove();
	$('#older_tasks_head').remove();
	$('#older_tasks').remove();
	$('#hide_older_tasks').remove();
	$('.checkboxcon').remove();
	$('.icon').remove();
	$('.datepicker').remove();
	$('#donelist_list_today').remove();
	$('h3').remove();
	//$('showdate').remove();
	$('.more').css('padding', '5px');
	$('li').removeAttr('id');
	$('ul').removeAttr('id');
	$('*').removeAttr('class');
	$('*').removeAttr('rel');
};

var onError = function(data)
{
};

var lists = $('#lists a[class~=list]');

$('style').remove();
$('link[type="text/css"]').remove();
$('body').empty();

$('body').attr('style', 'font-family: Georgia,serif;line-height: 1;font-size: 1.1em;');
$('body').append('<div style="margin:10px"><a href="javascript:window.print()">Print this page</a></div>');

var listAddr = document.location.protocol === 'https:' ? 'https://www.wunderlist.com/ajax/lists/id/' : 'http://www.wunderlist.com/ajax/lists/id/';

for (var i = 0; i < lists.length; ++i)
{
	var id = lists[i].id;
	id = id.substr("list".length);

	console.log(id);

	$.ajax({
		url: listAddr + id,
		success: onLoaded,
		error: onError
	});
}

