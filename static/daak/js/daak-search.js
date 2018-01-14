$.fn.removeLabelHighlight = function () {
    $(this).html($(this).text());
}

$.fn.containerIcon = function () {
    return $(this).parents('.daak-container-icon:first');
}

$('[daak-type="container-search"]').keyup(function () {
    var container = $.byId($(this).daak('container'));
    var self = $(this);
    // if (event.which == 27){//ESC
    //     $(this).val('');
    //     $.verticalMenu.defualt();
    //
    //     return false;
    // }

    container.find('.daak-container-icon').hide();

    container.find('label').each(function () {
        $(this).removeLabelHighlight();

        var inputValue = self.val();
        var text = $(this).text();
        var textIndexOf = text.indexOf(inputValue.trim());
        if (textIndexOf != -1) {
            var parent = $(this).containerIcon();

            $(this).html(text.replace(inputValue, '<span class="daak-highlight">' + inputValue + '</span>'));

            parent.show();
        }
    })
})