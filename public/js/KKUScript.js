/**
 * Created by Igor on 19.07.2017.
 */
// slide to section
$(document).ready(function () {
    $(".navBtn").click(function() {
        var id = $(this).attr('id');
        id = id.slice(0,-3);
        $('html,body').animate({
                scrollTop: $("#"+id).offset().top},
            'slow');
    });
})

//расчет фундамента
$(document).ready(function () {
    $('input[name=dem]').change(function () {

        if ($("#lengthFun").val() != 0 && $("#widthFun").val() != 0 && $("#heightFun").val() != 0) {

            var totalAmount = $('#lengthFun').val() * $('#widthFun').val() * $('#heightFun').val() * 0.35 * 0.0001 * 1.3;

            if (isNaN(totalAmount)){
                $('#resFun').text('Некорректный ввод!');
            }
            else{
                $('#resFun').text(Number((totalAmount).toFixed(2)) + ' т');
            }

        }
    });
})