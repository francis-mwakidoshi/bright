var loader=$("#loader").html()
	 //validate email function
function validateEmail($email) 
{
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test( $email );
}
	//check if has number function
function has_number(Mystring)
{
	 return /\d/.test(Mystring);
}
function check_special_chars(myString) 
{
	var regex=  /[^\w\s]/gi;
	return regex.test(myString);
}

//cookies
function setCookie(cname,cvalue,exdays)
 {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname)
 {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function  get_visitor(page,ScrH,ScrW,Device){
	 //public ip
				var public_ip ="";
				var country="";
				var Visit_key_id=getCookie("Visit_key_id");
				
				$.getJSON("http://freegeoip.net/json/", function(data){
						 country = data.country_name;
						 public_ip = data.ip;
						//$("#public_ip").text(ip);
						//$("#country").text(country);
					 var ua = navigator.userAgent;
					 var device_type="";
						var checker = {
						  iphone: ua.match(/(iPhone|iPod|iPad)/),
						  blackberry: ua.match(/BlackBerry/),
						  android: ua.match(/Android/)
						 
						};
						if (checker.android){
							device_type="android mobile";
						}
						else if (checker.iphone){
							device_type="iphone mobile";
						}
						else if (checker.iphad){
							device_type="iphone mobile";
						}
						else if (checker.blackberry){
							device_type="blackberry";
						}else{
							device_type="Other Devices";
						}
						
						//addVisitor to be here
						$.post("addVisitor.php",{
							device_type:'',
							page:page,
							ScrW:ScrW,
							ScrH:ScrH,
							Device:Device,
							public_ip:public_ip,
							country:country,
							Visit_key_id:Visit_key_id
						},function(data){
							setCookie('Visit_key_id',data,30)
							setCookie('country','Kenya',30);
							$("#carry_country").val(country)
						});
						
				})
				
}

function trace_traffic(page)
{
	var ScrW=$(window).width();
	var ScrH=$(window).height();

		 if  (ScrW>400 && ScrW<800) {
		     get_visitor(page,ScrH,ScrW,'Tablet') ; 
		 }
		 else if  (ScrW>800){ 
		     $("#site_content").css({"height":+ScrH-116 +"px","overflow":"auto"});
		     get_visitor(page,ScrW,ScrH,'PC') ; 
		 }
		 else if  (ScrW<400) {
		     get_visitor(page,ScrH,ScrW,'Mobile') ; 
		 }
		else {
			get_visitor(page,ScrH,ScrW,'UnKnown Device');
			} 
}
function disable_keys()
{
	document.onkeydown = function (e) 
	{
	var key = e.charCode || e.keyCode;
	if(event.keyCode == 123) 
	{
	return false;
	}
	if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0))
	{
	return false;
	}
	if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0))
	{
	return false;
	}
	if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))
	{
	return false;
	}
	if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0))
	{
	return false;
	}
	if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0))
	{
	return false;
	}
	else{
	//do nothing
	//return false;
	}	     
}
$(document).bind("contextmenu",function(e) {
e.preventDefault();
});
}
  
 
function auto_login(){
	   var email=getCookie("email");
	   var pass=getCookie("password");
		if(email.length==0 || pass.length==0){
			
		}else{
		  $("#logInEmail").val(email);
		  $("#LogInPassword").val(pass);
		   setTimeout(function(){ $("#login_btn").click() },1000);	
		}
}

$(document).ready(function(){
    var page=$( "body" ).attr("page_name")
	 trace_traffic(page);
	 auto_login();
	 //disable_keys();
});



(function(a){a.fn.smartWizard=function(d){var c=a.extend({},a.fn.smartWizard.defaults,d);var b=arguments;return this.each(function(){var o=a(this);var n=c.selected;var x=a("ul > li > a[href^='#step-']",o);var t=0;var m,k,w,i,j,r,q;w=a(".actionBar",o);if(w.length==0){w=a("<div></div>").addClass("actionBar")}k=a(".msgBox",o);if(k.length==0){k=a('<div class="msgBox"><div class="content"></div><a href="#" class="close">X</a></div>');w.append(k)}a(".close",k).click(function(){k.fadeOut("normal");return false});if(!d||d==="init"||typeof d==="object"){v()}else{if(d==="showMessage"){var s=Array.prototype.slice.call(b,1);l(s[0]);return true}else{if(d==="setError"){var s=Array.prototype.slice.call(b,1);e(s[0].stepnum,s[0].iserror);return true}else{a.error("Method "+d+" does not exist")}}}function v(){var A=o.children("div");o.children("ul").addClass("anchor");A.addClass("content");m=a("<div>Loading</div>").addClass("loader");w=a("<div></div>").addClass("actionBar");i=a("<div></div>").addClass("stepContainer");j=a("<a>"+c.labelNext+"</a>").attr("href","#").addClass("buttonNext");r=a("<a>"+c.labelPrevious+"</a>").attr("href","#").addClass("buttonPrevious");q=a("<a>"+c.labelFinish+"</a>").attr("href","#").addClass("buttonFinish");if(c.errorSteps&&c.errorSteps.length>0){a.each(c.errorSteps,function(B,C){e(C,true)})}i.append(A);w.append(m);o.append(i);o.append(w);if(c.includeFinishButton){w.append(q)}w.append(j).append(r);t=i.width();a(j).click(function(){if(a(this).hasClass("buttonDisabled")){return false}g();return false});a(r).click(function(){if(a(this).hasClass("buttonDisabled")){return false}h();return false});a(q).click(function(){if(!a(this).hasClass("buttonDisabled")){if(a.isFunction(c.onFinish)){if(!c.onFinish.call(this,a(x))){return false}}else{var B=o.parents("form");if(B&&B.length){B.submit()}}}return false});a(x).bind("click",function(D){if(x.index(this)==n){return false}var C=x.index(this);var B=x.eq(C).attr("isDone")-0;if(B==1){f(C)}return false});if(c.keyNavigation){a(document).keyup(function(B){if(B.which==39){g()}else{if(B.which==37){h()}}})}u();f(n)}function u(){if(!c.enableAllSteps){a(x,o).removeClass("selected").removeClass("done").addClass("disabled");a(x,o).attr("isDone",0)}else{a(x,o).removeClass("selected").removeClass("disabled").addClass("done");a(x,o).attr("isDone",1)}a(x,o).each(function(A){a(a(this).attr("href"),o).hide();a(this).attr("rel",A+1)})}function f(B){var C=x.eq(B);var D=c.contentURL;var A=C.data("hasContent");stepNum=B+1;if(D&&D.length>0){if(c.contentCache&&A){y(B)}else{$ajaxsatatus=a.ajax({url:D,type:"POST",data:({step_number:stepNum}),dataType:"text",beforeSend:function(){m.show()},error:function(){m.hide()},success:function(E){m.hide();if(E&&E.length>0){C.data("hasContent",true);a(a(C,o).attr("href"),o).html(E);y(B)}if(c.onAjaxLoadComplete!=undefined){c.onAjaxLoadComplete()}}})}}else{y(B)}}function y(C){var D=x.eq(C);var B=x.eq(n);if(C!=n){if(a.isFunction(c.onLeaveStep)){if(!c.onLeaveStep.call(this,a(B))){return false}}}if(c.updateHeight){i.height(a(a(D,o).attr("href"),o).outerHeight())}if(c.transitionEffect=="slide"){a(a(B,o).attr("href"),o).slideUp("fast",function(F){a(a(D,o).attr("href"),o).slideDown("fast");n=C;z(B,D)})}else{if(c.transitionEffect=="fade"){a(a(B,o).attr("href"),o).fadeOut("fast",function(F){a(a(D,o).attr("href"),o).fadeIn("fast");n=C;z(B,D)})}else{if(c.transitionEffect=="slideleft"){var A=0;var E=0;if(C>n){nextElmLeft1=t+10;nextElmLeft2=0;E=0-a(a(B,o).attr("href"),o).outerWidth()}else{nextElmLeft1=0-a(a(D,o).attr("href"),o).outerWidth()+20;nextElmLeft2=0;E=10+a(a(B,o).attr("href"),o).outerWidth()}if(C==n){nextElmLeft1=a(a(D,o).attr("href"),o).outerWidth()+20;nextElmLeft2=0;E=0-a(a(B,o).attr("href"),o).outerWidth()}else{a(a(B,o).attr("href"),o).animate({left:E},"fast",function(F){a(a(B,o).attr("href"),o).hide()})}a(a(D,o).attr("href"),o).css("left",nextElmLeft1);a(a(D,o).attr("href"),o).show();a(a(D,o).attr("href"),o).animate({left:nextElmLeft2},"fast",function(F){n=C;z(B,D)})}else{a(a(B,o).attr("href"),o).hide();a(a(D,o).attr("href"),o).show();n=C;z(B,D)}}}return true}function z(A,B){a(A,o).removeClass("selected");a(A,o).addClass("done");a(B,o).removeClass("disabled");a(B,o).removeClass("done");a(B,o).addClass("selected");a(B,o).attr("isDone",1);p();if(a.isFunction(c.onShowStep)){if(!c.onShowStep.call(this,a(B))){return false}}}function g(){var A=n+1;if(x.length<=A){if(!c.cycleSteps){return false}A=0}f(A)}function h(){var A=n-1;if(0>A){if(!c.cycleSteps){return false}A=x.length-1}f(A)}function p(){if(!c.cycleSteps){if(0>=n){a(r).addClass("buttonDisabled")}else{a(r).removeClass("buttonDisabled")}if((x.length-1)<=n){a(j).addClass("buttonDisabled")}else{a(j).removeClass("buttonDisabled")}}if(!x.hasClass("disabled")||c.enableFinishButton){a(q).removeClass("buttonDisabled")}else{a(q).addClass("buttonDisabled")}}function l(A){a(".content",k).html(A);k.show()}function e(A,B){if(B){a(x.eq(A-1),o).addClass("error")}else{a(x.eq(A-1),o).removeClass("error")}}})};a.fn.smartWizard.defaults={selected:0,keyNavigation:true,enableAllSteps:false,updateHeight:true,transitionEffect:"fade",contentURL:null,contentCache:true,cycleSteps:false,includeFinishButton:true,enableFinishButton:false,errorSteps:[],labelNext:"Next",labelPrevious:"Previous",labelFinish:"Finish",onLeaveStep:null,onShowStep:null,onFinish:null}})(jQuery);