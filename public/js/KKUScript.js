/**
 * Created by Igor on 19.07.2017.
 */
// slide to section
$(document).ready(function () {
    $(".navBtn").click(function() {
        var id = $(this).attr('id');
        id = id.slice(0,-3);
        slide(id);
    });
});

function slide(id){
    $('html,body').animate({
            scrollTop: $("#"+id).offset().top},
        'slow');
}

//расчет фундамента
$(document).ready(function () {
    $('input[name=dem]').change(function () {

        if ($("#lengthFun").val() != 0 && $("#widthFun").val() != 0 && $("#heightFun").val() != 0) {

            var totalAmount = $('#lengthFun').val() * $('#widthFun').val() * $('#heightFun').val() * 0.3  * 1.3;
            totalAmount = totalAmount + 0.15*totalAmount;

            if (isNaN(totalAmount)){
                $('#resFun').css('color', 'red');
                $('#fractionFun').hide();
                $('#resFun').text('Некорректный ввод!');
            }
            else{
                $('#resFun').css('color', 'black');
                $('#resFun').text(Number((totalAmount).toFixed(2)));
                $('#resFunBag').css('color', 'black');
                $('#resFunBag').text(Math.ceil(totalAmount/0.05) + " мешков");

                $('#fractionFun').show();
            }

        }
    });
});

//обработка кликов кнопок в задачах
$(document).ready(function () {
    $('.sendBagBtn').click(function () {

        var resId = getResId($(this).attr('id'));
        var resValue = $('#'+resId).text();
        if(!isNaN(resValue)){
            $("#bagModal").modal();


            $('#bagInputCount').val(Math.ceil(resValue/0.05));

            if(resId === "resFun"){
                setSelect("bagInputFraction","5(3) - 20 мм М400")
                var data = {
                    Fraction: $('#bagInputFraction option:selected').val(),
                    Count: $('#bagInputCount').val()
                };
                sendBagPost(data);
            }
            if(resId === "resPar"){
                setSelect("bagInputFraction","20 - 40 мм М400")
                var data = {
                    Fraction: $('#bagInputFraction option:selected').val(),
                    Count: $('#bagInputCount').val()
                };
                sendBagPost(data);
            }

        }
        else{
            alert("Введите параметры для расчета");
        }

    })
});

function setSelect(id,fraction){
    $("#"+id).val(fraction);
}


function getResId( id ){
    id = id.substr(id.length - 3);
    return $('#res'+id).attr('id');
}
//для заказа кучи
$(document).ready(function () {
    $('.sendStackBtn').click(function () {

        var resId = getResId($(this).attr('id'));
        var resValue = $('#'+resId).text();
        if(!isNaN(resValue)){
            $("#stackModal").modal();
            $('#stackInputCount').val(resValue);

            if(resId === "resFun"){
                setSelect("stackInputFraction","5(3) - 20 мм М400")
                var data = {
                    Fraction: $('#stackInputFraction option:selected').val(),
                    City:  $('#stackInputAddress option:selected').val(),
                    Count: $('#stackInputCount').val()
                };
                sendStackPost(data);
            }
            if(resId === "resPar"){
                setSelect("stackInputFraction","20 - 40 мм М400")
                var data = {
                    Fraction: $('#stackInputFraction option:selected').val(),
                    City:  $('#stackInputAddress option:selected').val(),
                    Count: $('#stackInputCount').val()
                };
                sendStackPost(data);
            }
        }
        else{
            alert("Введите параметры для расчета");
        }

    })
});

//расчет парковочного места
$(document).ready(function () {
    $('input[name=dem]').change(function () {

        if ($("#lengthPar").val() != 0 && $("#widthPar").val() != 0 && $("#heightPar").val() != 0) {

            var totalAmount = $('#lengthPar').val() * $('#widthPar').val() * $('#heightPar').val() * 1.3;
            totalAmount = totalAmount + 0.15 * totalAmount;

            if (isNaN(totalAmount)){
                $('#resPar').css('color', 'red');
                $('#resPar').text('Некорректный ввод!');
            }
            else{
                $('#resPar').css('color', 'black');
                $('#resPar').text(Number((totalAmount).toFixed(2)));
                $('#resParBag').css('color', 'black');
                $('#resParBag').text(Math.ceil(totalAmount/0.05) + " мешков");
            }

        }
    });
});

//расчет дороги
$(document).ready(function () {
    $('input[name=dem]').change(function () {

        if ($("#lengthRod").val() != 0 && $("#widthRod").val() != 0 && $("#heightRod").val() != 0) {

            var totalAmount = $('#lengthRod').val() * $('#widthRod').val() * $('#heightRod').val() * 1.3;
            totalAmount = totalAmount + 0.15 * totalAmount;

            if (isNaN(totalAmount)){
                $('#resRod').css('color', 'red');
                $('#resRod').text('Некорректный ввод!');
            }
            else{
                $('#resRod').css('color', 'black');
                $('#resRod').text(Number((totalAmount).toFixed(2)));
                $('#resRodBag').css('color', 'black');
                $('#resRodBag').text(Math.ceil(totalAmount/0.05) + " мешков");

            }

        }
    });
});
// получени цены заказа мешков

$(document).ready(function () {
    $('[name=bagPrice]').change(function() {

        var data = {
            Fraction: $('#bagInputFraction option:selected').val(),
            Count: $('#bagInputCount').val()
        };
        sendBagPost(data);
    });

});

function sendBagPost(data){

    $.ajax({
        url: "/bag_price",
        type: "POST",
        data:  JSON.stringify(data) ,
        contentType: "application/json",
        cache: false,
        success: function(data) {

            $('#resBag').text(data+" руб.")

        },

        error: function() {
            alert('заполните остальные поля!');
        }
    });
}

function sendSupPost(data){

    $.ajax({
        url: "/send_report",
        type: "POST",
        data:  JSON.stringify(data) ,
        contentType: "application/json",
        cache: false,
        success: function(data) {

            alert('Ваще обращение зарегестрированно!')

        },

        error: function() {
            alert('заполните остальные поля!');
        }
    });
}


//изменение навала
$(document).ready(function () {
    $('[name=stackPrice]').change(function() {

        var data = {
            Fraction: $('#stackInputFraction option:selected').val(),
            City:  $('#stackInputAddress option:selected').val(),
            Count: $('#stackInputCount').val()
        };
        sendStackPost(data);
    });

});

function sendStackPost(data){

    $.ajax({
        url: "/stack_price",
        type: "POST",
        data:  JSON.stringify(data) ,
        contentType: "application/json",
        cache: false,
        success: function(data) {

            $('#resStack').text(data+" руб.")

        },

        error: function() {
            alert('заполните остальные поля!');
        }
    });
}
