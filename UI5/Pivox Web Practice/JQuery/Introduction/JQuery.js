$(function(){
    $("p").on({
        mouseenter:function(){
            $(this).css("font-weight","bold")
        },
        mouseleave:function(){
            $(this).css("color","grey")
        }
      
    })
})