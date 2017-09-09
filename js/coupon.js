/**
 * Created by hpp on 2017/6/25.
 */
$(function(){
    getPic();
    function getPic(){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getcoupon",
            success:function(data){
                var html= template("picTmp",data);
                $(".coupon-list").html(html);
            }
        });
    }
})
