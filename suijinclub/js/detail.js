$(function () {
    var $goodsImg = $("#goods-img"),
        $favoriteBtn = $("#goods-cart-favorite"),
        cartBtnTop = $("#goods-cart-btn").offset().top,
        windowWidth = $(window).width(),
        windowBreakPoint = 1000;

    /*
    $(window).on("load", function () {
        setGoodsImg();
        $("#transfer-url").delay(1000).queue(function(){
            const tmpUrl = $("#transfer-url").html();
            if (tmpUrl != "") {
                location.href = $("#transfer-url").html();
            }
        });
    });
    */

    function setGoodsImg() {
        if ($goodsImg.find("li").length > 1) {
            $("#goods-thumbnail li").each(function (index, element) {
                $(element).find("a").attr("data-slide-index", index-1);
            });
            var goodsSlider = $goodsImg.bxSlider({
                pagerCustom: "#goods-thumbnail",
                onSliderLoad: function (currentIndex) {
                    $("#goods-img-count-current").text(currentIndex + 1);
                },
                onSlideBefore: function ($slideElement, oldIndex, newIndex) {
                    $("#goods-img-count-current").text(newIndex + 1);
                },
            });
            $("#goods-img-count-total").text(goodsSlider.getSlideCount());
        }
    }

    $("#goods-quantity-up").on("click", function () {
        changeQuantity(
            $("#goods-quantity-input"),
            "up",
            $("#goods-quantity-down")
        );
    });

    $("#goods-quantity-down").on("click", function () {
        changeQuantity(
            $("#goods-quantity-input"),
            "down",
            $("#goods-quantity-down")
        );
    });

    function changeQuantity($target, mode, $btn) {
        var oldQuantity = parseInt($target.val(), 10),
            newQuantity = 0;

        switch (mode) {
            case "up":
                newQuantity = oldQuantity + 1;
                break;
            case "down":
                newQuantity = oldQuantity - 1;
                break;
        }

        if (windowBreakPoint > windowWidth) {
            if (newQuantity <= 1) {
                $btn.hide();
            } else {
                $btn.show();
            }
        }

        if (newQuantity >= 1) {
            $target.val(newQuantity);
        }
    }

    $favoriteBtn.find("a").on("click", function () {
        $favoriteBtn.addClass("add-favorite");
    });

    $(window).bind("scroll", function () {
        if (windowWidth >= windowBreakPoint) {
            if ($(window).scrollTop() > cartBtnTop) {
                $("#goods-cart-btn-fix").fadeIn();
            } else {
                $("#goods-cart-btn-fix").fadeOut();
            }
        }
    });

    $("img.option-image").on("click", function () {
        showOptionImage($(this).attr("data-option-image"));
    });
});

function MakeShop_afterItemOptionChange(data) {
    if (data.isSoldout) {
        $(".instock").removeClass("on").addClass("off");
        $(".outstock").removeClass("off").addClass("on");
    } else {
        $(".instock").removeClass("off").addClass("on");
        $(".outstock").removeClass("on").addClass("off");
    }

    showOptionImage(data.imageL);
}
function MakeShop_afterCartEntry(data) {
    if (data.result) {
        $(".icon-cart-num").text(data.totalQuantity);
        $(".cart-badge").css("display", "block");
        $(".cart-badge").html(data.totalQuantity);
        $(".cart-object").attr("data", $(".cart-object").attr("data"));
        var cartinClassName = window.matchMedia("(max-width: 768px)").matches
            ? ".cartin-msg-sp"
            : ".cartin-msg-pc";
        $(cartinClassName).addClass("show").fadeIn(600).fadeOut(4000);
    } else {
        data.method.modal(data.error.message);
    }
    return false;
}

function showOptionImage(url) {
    if (url == "") {
        return;
    }

    $('ul.goods-thumbnail img[src="' + url + '"]').trigger("click");
}

