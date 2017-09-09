$(function(){
    var categoryId = getQueryString("categoryid");
    getCategory(categoryId);
    function getCategory(categoryId){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getcategorybyid?categoryid="+categoryId,
            success:function(data){
                $("#productList .category-title ol li:last-child").html(data.result[0].category);
            }
        });
    }

    var categoryId = getQueryString("categoryid");
    var pageid=getQueryString("pageid")||1;
    getProductList(categoryId,pageid);
    function getProductList(categoryId,paged){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproductlist",
            data:{"categoryid":categoryId,
                "pageid":pageid||1
            },
            success:function(data){
                //console.log(data);
                var page = Math.ceil(data.totalCount / data.pagesize);
                var pageLi="";
                for(var i = 0;i<page;i++){
                    //pageLi +="<li>第"+(i+1)+"/"+page+"页</li>";

                    var url = "productList.html?categoryid="+categoryId+"&pageid="+(i+1);
                    pageLi +="<li><a href="+url+"> 第"+(i+1)+"/"+(page)+"页</a></li>";

                }
                $("#dLabel").html("第"+pageid+"/"+page+"页");
                var prevpageid,nextpageid;
                if(pageid<=1){
                    prevpageid=1;
                }else{
                    prevpageid = pageid-1;
                }
                if(pageid>= page){
                    nextpageid=page;
                }else{
                    nextpageid = parseInt(pageid)+1;
                }

                var char ="第"+pageid+"/"+page+"页";


                var prevUrl ="productList.html?categoryid="+categoryId+"&pageid="+(prevpageid);
                var nextUrl ="productList.html?categoryid="+categoryId+"&pageid="+(nextpageid);
                $(".page-prev").attr("href",prevUrl);
                $(".page-next").attr("href",nextUrl);

                $("#dLabel").html(char+'<span class="caret"></span>');
                $(".dropdown-menu").html(pageLi);
                var html = template("productListTmp",data);
                $("#productList .product-list").html(html);
            }
        });

    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(decodeURI(r[2])); return null;
    }
})