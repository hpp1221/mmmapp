/**
 * Created by hpp on 2017/6/22.
 */
$(function(){
    var productId = getQueryString("productid");
    //console.log(productId);
    getMoneyProduct(productId);
    function getMoneyProduct(productId){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getdiscountproduct",
            data:{"productid":productId},
            success:function(data){
                console.log(data);
                var html =template("moneyProductTmp",data);
                $("#moneyProduct .moneyProduct-list").html(html);
            }
        });
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(decodeURI(r[2])); return null;
    }
})