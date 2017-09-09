/**
 * Created by hpp on 2017/6/25.
 */
$(function(){
    var couponid=getQueryString("couponid");
    getcouponproduct();
    function getcouponproduct(){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getcouponproduct",
            //json:"jsonp",
            data:{"couponid":couponid},
            success:function(data){
                //console.log(data);
                var html = template("couponproductTmp",data);
                $("#ctl00_ContentBody_quanlist").html(html);
            }
        });
    }

    getcouponproduct1();
    function getcouponproduct1(){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getcouponproduct",
            data:{"couponid":couponid},
            success:function(data){
                console.log(data);
                var html = template("slidePicTemp",data);
                $(".carousel-inner").html(html);
                $("#ctl00_ContentBody_quanlist ul li a").on("click",function(){
                    var current =$(this).attr("data-productId");
                    //console.log(current);
                    $(".carousel-inner > .item").removeClass("active");
                    $(".carousel-inner > div[value="+current+"]").addClass("active");
                })
            }
        });
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(decodeURI(r[2])); return null;
    }
})
