$(function(){
	$.getJSON("invite_panel.json",function(data){
		var invited = data.invited
		var recommended = data.recommended
		$(".suggest-persons").html("");
		$.each(recommended,function(i,item){
			$(".suggest-persons").append(
				'<li class="person">'+
				'<div class="user">'+
				'<a href="" class="item-link">'+
				'<img class="item-avatar" src='+item.avatarUrl+' alt=""/>'+
				'</a>'+
				'<div class="content">'+
				'<button class="invite-button btn btn-blue">邀请回答</button>'+
				'<a class="name" href="#" data-slug='+item.slug+' data-id='+item.id+'>'+item.name+'</a>'+
				'<div class="bio">'+item.bio+'</div></div></div></li>'
			)
			$(".person:odd").addClass("odd")
			$(".person:even").addClass("even")
		})
		var invitedName=[]
		$.each(invited,function(i,item){
			invitedName.push(item.name)
		})
		inviteStatus(invitedName)
		changeInviteStatus(invitedName)
	})
})
function changeInviteStatus(invitedName){
	$(".invite-button").click(function(){
		if($(this).hasClass("btn-blue")){
			$(this).removeClass("btn-blue").addClass("btn-cancel")
			$(this).text("收回邀请")
			var name = $(this).next().text()
			invitedName.push(name)
		} else {
			$(this).removeClass("btn-cancel").addClass("btn-blue")
			$(this).text("邀请回答")
			var name = $(this).next().text()
			invitedName.splice($.inArray(name,invitedName),1)
		}
		inviteStatus(invitedName)
	})
}
function inviteStatus(invitedName){
	var invitedNum=invitedName.length
	switch(invitedNum)
	{
		case 0:
			$('.invite-status').html("")
			break;
		case 1:
			initStatusHtml(invitedNum,invitedName)
			break;
		case 2:
			initStatusHtml(invitedNum,invitedName)
			$('.name-link:first').after('、')
			break;
		default:
			initStatusHtml(invitedNum,invitedName)
			$('.name-link:first').after('、')
			$('.invite-status').append(
				'等 '+invitedNum+' 人'
			)
	}
}
function initStatusHtml(invitedNum,invitedName){
	$('.invite-status').html("")
	$('.invite-status').text('您已邀请 ')
	$('.invite-status').append(
		'<span class="invited-list"></span>'
	)
	$.each(invitedName,function(i,item){
		if(i<invitedNum-2){
			return true
		}
		$('.invited-list').append(
			'<a href="#" class="name-link">'+item+'</a>'
		)
	})
}