$(document).ready(function(){
    $("#twitter").click(function(){
        $.ajax({
            type:"GET",
            url:"/auth/login",
            success: function(){
                
            },
            error: function(){
                
            }
        });
    });
})