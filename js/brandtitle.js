/**
 * Created by hpp on 2017/6/25.
 */
$(function(){
    getCategory();
    function getCategory(){
        $.ajax({
            url:"http://127.0.0.1:3000/api/getbrandtitle",
            success:function(data){
                console.log(data);
                var html = template("categoryTitleTmp",data);
                $("#category").html(html);

             /*   $(".panel-group>.panel-default>.panel-heading>h4>a").click(function(){
                    var titleid= $(this).attr("data-titleid");
                    $.ajax({
                        url:"http://127.0.0.1:3000/api/getcategory",
                        data:{"titleid":titleid},
                        success:function(data){
                            console.log(data);
                            var innerHTML= template("categoryTitleTmp",data);
                            var xzq="#"+titleid+" .panel-body .row";
                            $(xzq).html(innerHTML);
                        }
                    });
                })*/
            }
        });
    }
})