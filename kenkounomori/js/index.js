$(function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const topBtn = $(".gototop");

  function isSmartPhone() {
    if (
      window.matchMedia &&
      window.matchMedia("(max-device-width: 767px)").matches
    ) {
      return true;
    } else {
      return false;
    }
  }

  hamburger.addEventListener("click", () => {
    toggleClasses();
  });

  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });

  function toggleClasses() {
    hamburger.classList.toggle("open");
    menu.classList.toggle("open");
  }

  $(".openbtn4").click(function () {
    $(this).toggleClass("active");
  });
  $(".homelink").click(function () {
    location.href = "https://www.kenkonomori.jp/";
  });
  $(".vinegarlink").click(function () {
    location.href = "https://www.kenkonomori.jp/view/category/vinegar";
  });
  $(".bonitolink").click(function () {
    location.href = "https://www.kenkonomori.jp/view/category/bonito";
  });
  $(".garliclink").click(function () {
    location.href = "https://www.kenkonomori.jp/view/category/garlic";
  });
  $(".blueberrylink").click(function () {
    location.href = "https://www.kenkonomori.jp/view/category/blueberry";
  });
  $(".blueberryvinegarlink").click(function () {
    location.href = "https://www.kenkonomori.jp/view/category/blueberryvinegar";
  });
  $(".rakurakulink").click(function () {
    location.href = "https://www.kenkonomori.jp/view/category/rakuraku";
  });
  $(".bubblelink").click(function () {
    if (isSmartPhone()) {
      location.href = "https://www.kenkonomori.jp/view/page/bubblesp";
    } else {
      location.href = "https://www.kenkonomori.jp/view/page/bubble";
    }
  });

  $(".category-title select").change(function () {
    let url = "";
    const category = $(this).attr("id");
    const r = $("option:selected").val();

    switch (r) {
      case "1":
        url = "recommend";
        break;
      case "2":
        url = "price";
        break;
      case "3":
        url = "price_high";
        break;
      case "4":
        url = "new";
        break;
      default:
        console.log(`Sorry, we are out of ${r}.`);
    }
    window.location.href = `https://www.kenkonomori.jp/view/category/${category}?sort=${url}`;
  });

  $(".search-keyword").on("keypress", function (e) {
    if (e.keyCode == 13) {
      var index = $(".search-keyword").index(this);
      $(".search-url")[index].click();
    }
  });

  function MakeShop_afterListCartEntry(data) {
    if (!data.result) {
      data.method.modal(data.error.message, function () {
        location.href = "/view/item/" + data.systemCode;
      });
      return false;
    }
  }
});
