$(function(){
    var productid=getQueryString("productid");

    getProduct(productid);
    function getProduct(productid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproduct?productid="+productid,
            success:function(data){
                //console.log(data);
                var html = template("productInfoTmp",data);
                $(".product-info").html(html);
                getGreatComment(productid);
            }
        });
    }
    function getGreatComment(productid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproductcom?productid="+productid,
            success:function(data){
                //console.log(data);
                var html = template("greatComment",data);
                $(".product-com-list").html(html);
            }
        });
    }



    //��ҳ/������/����
    getCategory(productid);
    function getCategory(productid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproduct?productid="+productid,
            success:function(data){
                var char = data.result[0].productName;
                char =char.slice(0,3);
                $(".product-title  ol li:last-child").html(char);
                //var html = template('classifyTmp',data)
                //    $(".product-title").html(html);
                //

                //������ԴӴ˴��õ�����id��Ȼ��ͨ������idȥ�Ҷ�Ӧ�ķ���ֵ��Ҳ����ȥ��һ���������Եõ���������
                //��ô����һ������������ϵ���Ϳ����ڴ˺����������һ��������
                var categoryId = data.result[0].categoryId;
                getCategory1(categoryId);
            }
        });
    }
    function getCategory1(categoryId){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getcategorybyid?categoryid="+categoryId,
            success:function(data){
                var category = data.result[0].category;
                $(".product-title  ol li:nth-of-type(2) > a ").html(category);
            }
        });
    }

    //��ȡ��ַ�ϵĲ�����ֵ
        function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(decodeURI(r[2])); return null;
    }
})