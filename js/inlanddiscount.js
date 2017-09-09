/*
 * @Author: zhengwei
 * @Date:   2016-10-24 22:14:54
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-28 21:23:36
 */

'use strict';
$(function() {
    var i = 0;
    var data1 = {};
    var resultLength = 0;
    $.ajax({
        url: "http://182.254.146.100:3000/api/getinlanddiscount",
        success: function(data) {
            data1 = data;
            var newdata = {
                "result": []
            };
            for (i = 0; i < 4; i++) {
                newdata.result.push(data.result[i])
            }
            // console.log(newdata);
            var html = template("discountProductTmp", newdata);
            $('.inland-discount-list').html(html);
            height = $('.inland-discount-list').height() - $(document.body).height();
            console.log(height);
            resultLength = data.result.length;
            $('.loading').hide();
        }
    });
    /**
     * 1. �������������ײ���ʱ�������һҳ����
     * 2. ʲôʱ���֪���������˵ײ� ��Ҫ��ȡ�������ľ���ȥ���ж�
     * 3. ��ȡ�������ľ�������ľ���  ÿ�ι�����ʱ��Ҫ��ȡ���� ��ӹ����¼�
     * 4. ��ȡ������ -  ������ҳ�ĸ߶�
     * 5. �жϵ� ��ȡ������ -  ������ҳ�ĸ߶�  == �����������ľ���  ������һҳ����
     */
    //�������������ľ���
    var scrollTop = $(window).scrollTop();
    // ������ȥ��ҳ�ĸ߶� ��Ϊ��������ĸ߶ȵĶ�̬��  ��������һҳ���ݵ�ʱ�� �ͻ���
    var height = $('.inland-discount-list').height() - $(document.body).height();
    console.log(height);
    $(window).on('scroll', function() {
        // console.log($(window).scrollTop());
        //ÿ�ι����¼���������ȡһЩ�������ľ��븳ֵ��scrollTop
        scrollTop = $(window).scrollTop();
        //�� ��ȡ�������߶� -  ������ҳ�ĸ߶�  == �����������ľ��� ���ҹ����ľ��벻����0
        console.log(scrollTop + "================" + height);
        if (scrollTop >= height && scrollTop != 0) {
            //Ϊ�˵�ajax���������Ը�height�ӵĸ����޴��ֵ ������жϲ�����
            // ��������һҳ������ɲż����ж� ����һҳ�������������ٻָ������ĸ߶�
            height = 99999;
            //���ײ���
            $('.loading').show();
            $.ajax({
                url: "http://182.254.146.100:3000/api/getinlanddiscount",
                success: function(data) {
                    var newData = {
                        "result": []
                    };
                    if (i >= resultLength) {
                        $('.loading').hide();
                        return;
                    }
                    // �ǻ�ȡ��4������ Ҳ���� 5 - 8 ������
                    for (var j = i; j < i + 4; j++) {
                        newData.result.push(data.result[j]);
                    }
                    var html = template("discountProductTmp", newData);
                    $('.inland-discount-list').append(html);
                    height = $('.inland-discount-list').height() - $(document.body).height();
                    i = j;
                    $('.loading').hide();
                }
            })
        }
    });
    var i = 0;
    var data1 = {};
    var resultLength = 0;
    $.ajax({
        url: "http://182.254.146.100:3000/api/getinlanddiscount",
        success: function(data) {
            data1 = data;
            var newdata = {
                "result": []
            };
            for (i = 0; i < 4; i++) {
                newdata.result.push(data.result[i])
            }
            // console.log(newdata);
            var html = template("discountProductTmp", newdata);
            $('.inland-discount-list').html(html);
            height = $('.inland-discount-list').height() - $(document.body).height();
            console.log(height);
            resultLength = data.result.length;
            $('.loading').hide();
        }
    })
    /**
     * 1. �������������ײ���ʱ�������һҳ����
     * 2. ʲôʱ���֪���������˵ײ� ��Ҫ��ȡ�������ľ���ȥ���ж�
     * 3. ��ȡ�������ľ�������ľ���  ÿ�ι�����ʱ��Ҫ��ȡ���� ��ӹ����¼�
     * 4. ��ȡ������ -  ������ҳ�ĸ߶�
     * 5. �жϵ� ��ȡ������ -  ������ҳ�ĸ߶�  == �����������ľ���  ������һҳ����
     */
    //�������������ľ���
    var scrollTop = $(window).scrollTop();
    // ������ȥ��ҳ�ĸ߶� ��Ϊ��������ĸ߶ȵĶ�̬��  ��������һҳ���ݵ�ʱ�� �ͻ���
    var height = $('.inland-discount-list').height() - $(document.body).height();
    console.log(height);
    $(window).on('scroll', function() {
        // console.log($(window).scrollTop());
        //ÿ�ι����¼���������ȡһЩ�������ľ��븳ֵ��scrollTop
        scrollTop = $(window).scrollTop();
        //�� ��ȡ�������߶� -  ������ҳ�ĸ߶�  == �����������ľ��� ���ҹ����ľ��벻����0
        // console.log(log);
        if (scrollTop == height && scrollTop != 0) {
            //���ײ���
            $('.loading').show();
            $.ajax({
                url: "http://182.254.146.100:3000/api/getinlanddiscount",
                success: function(data) {
                    var newData = {
                        "result": []
                    };
                    if (i >= resultLength) {
                        $('.loading').hide();
                        return;
                    }
                    // �ǻ�ȡ��4������ Ҳ���� 5 - 8 ������
                    for (var j = i; j < i + 4; j++) {
                        newData.result.push(data.result[j]);
                    }
                    var html = template("discountProductTmp", newData);
                    $('.inland-discount-list').append(html);
                    height = $('.inland-discount-list').height() - $(document.body).height();
                    i = j;
                    $('.loading').hide();
                }
            })
        }
    });
});
