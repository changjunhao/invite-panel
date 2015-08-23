var vue = new Vue({
	el: "#invite-panel",
	data:{
		invited: {},
		recommended: {},
		invite: [],
		inviteLength: 0,
		tips: false,
		showNum: false,
		invitedNum: 0,
		hide: true,
	},
	filters: {
		isTips: function(value){
			var length = this.invite.length
			if(length == 0){
				return value = false
			}else if(length>0){
				return value = true
			}
		},
		showNum:function(value){
			var length = this.invite.length
			if(length < 3){
				return value = false
			}else if(length >= 3){
				return value = true
			}
		},
	},
	methods: {
		invite_on: function(index){
			if(this.recommended[index].status == 0){
				this.recommended[index].status = 1
				this.invite.push(this.recommended[index].name)
				this.invitedNum = this.invite.length
			}else{
				this.recommended[index].status = 0
				this.invite.splice(this.invite.indexOf(this.recommended[index].name),1)
				this.invitedNum = this.invite.length
			}
		},
	},
	ready: function(){
		var salf = this
		this.$http.get('invite_panel.json', function (data) {
			salf.invited = data.invited
			salf.recommended = data.recommended
			for(var i=0;i<salf.recommended.length;i++){
				salf.recommended[i].$add("status",0)
			}
			for(var i=0;i<salf.invited.length;i++){
				salf.invited[i].$add("status",1)
				salf.invite.push(salf.invited[i].name)
			}
			salf.invitedNum = salf.invite.length
		})
	}
})
