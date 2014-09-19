(function (window, document) {
    "use strict";
    var min = 10,
        max = 100,
        $inputMin = $('.pick-range-min'),
        $inputMax = $('.pick-range-max');


    var $range = $('.jq-range').noUiSlider({
        range: {
            'min': min,
            'max': max
        }
        ,start: [2, 98]
        ,step: 1
        ,connect: true
    });
    $('.jq-range').Link('lower').to($inputMin);
    $('.jq-range').Link('upper').to($inputMax, null, wNumb({
        decimals: 0,
        thousand: ',',
        prefix: '$ '
    }));

})(window, document);
