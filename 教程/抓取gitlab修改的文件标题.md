```
var importJs=document.createElement('script') 
importJs.setAttribute("type","text/javascript") 
importJs.setAttribute("src", 'https://code.jquery.com/jquery-3.1.1.min.js') 
document.getElementsByTagName("head")[0].appendChild(importJs) 
$(function () {
    var str = ""
    var au = ""
    $(".file-header-content").each(function () {
        au = $(this)
            .children()
            .children()
            .next()
            .data("title")
            // .prop("outerHTML")
        str += "- " + au + "\n"
    })
    console.log(str)
})
```