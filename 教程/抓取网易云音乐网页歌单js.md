```
var importJs=document.createElement('script')  //在页面新建一个script标签
importJs.setAttribute("type","text/javascript")  //给script标签增加type属性
importJs.setAttribute("src", 'https://code.jquery.com/jquery-3.1.1.min.js') //给script标签增加src属性， url地址为cdn公共库里的
document.getElementsByTagName("head")[0].appendChild(importJs) //把importJs标签添加在页面
$(function(){
	var str=""
	var au=""
	// au = $(".txt").parent().parent().parent().parent().next().children().next().children().next().next().prop("outerHTML")
	// console.log("------"+au+"----------")
	$(".txt").each(function(){
	au = $(this).parent().parent().parent().parent().next().children().next().children().next().next().data("res-author")
	var O_url = $($(this).children()).attr("href")
	var t = ($(this).children().children()).attr("title")
	// "+au+"
	str+="["+t+" - "+au+"](https://music.163.com"+O_url+")  \n"
	})
	console.log(str)
})
	
	

```