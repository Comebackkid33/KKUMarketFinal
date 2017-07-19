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

            var totalAmount = $('#lengthFun').val() * $('#widthFun').val() * $('#heightFun').val() * 0.35 * 0.0001 * 1.3;

            if (isNaN(totalAmount)){
                $('#resFun').text('Некорректный ввод!');
            }
            else{
                $('#resFun').text(Number((totalAmount).toFixed(2)));
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
            slide('bag');
            $('#bagInputCount').val(Math.ceil(resValue/0.05));
        }
        else{
            alert("Введите параметры для расчета");
        }

    })
});

function getResId( id ){
    id = id.substr(id.length - 3);
    return $('#res'+id).attr('id');
}

$(document).ready(function () {
    $('.sendStackBtn').click(function () {

        var resId = getResId($(this).attr('id'));
        var resValue = $('#'+resId).text();
        if(!isNaN(resValue)){
            slide('stack');
            $('#stackInputCount').val(resValue/0.05);
        }
        else{
            alert("Введите параметры для расчета");
        }

    })
});