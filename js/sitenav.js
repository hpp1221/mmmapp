/**
 * Created by hpp on 2017/7/1.
 */
$(function(){
    getSiteNav();
    function getSiteNav(){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getsitenav",
            success:function(data){
                console.log(data);
                var html=template("siteNavTmp",data);
                $("#siteNav").html(html);
            }
        });
    }
})