//------------------------------------------------
//ドロワーメニュー
//jQueryを用いた記述
// jQuery("#js-drawer-icon").on("click", function (e) {
//   //eはイベントのこと onclickイベント
//   e.preventDefault(); //ブラウザ標準の機能を無効化
//   jQuery("#js-drawer-icon").toggleClass("is-checked"); //is-checkedクラスを付けはずしする
//   jQuery("#js-drawer-content").toggleClass("is-checked"); //is-checkedクラスを付けはずしする
// });

//jQueryを用いない記述
const drawerIcon = document.querySelector("#js-drawer-icon");
const drawerContent = document.querySelector("#js-drawer-content");
const body = document.body;

if (drawerIcon) {
  drawerIcon.addEventListener("click", function (e) {
    e.preventDefault();
    drawerIcon.classList.toggle("is-checked");
    drawerContent.classList.toggle("is-checked");
    body.toggle("is-checked");
  });
}
//-------------------------------------------

//--------------------------------
//Q&Aのアコーディオン
//idは同じ値を複数持たせることができないためクラス名で取得する。
jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();

  //.parentはthisの親要素のこと
  //thisの親要素が"is-open"というクラスを持っていたら
  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");

    //.nextはthis(js-accordion)の兄弟要素"qa-box__body"が取得される。
    //"qa-box__body"が上にスライドして消える。
    jQuery(this).next().slideUp();
  } else {
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown();
  }
});

//*注釈 slideToggle()を用いると、開いているときは閉じて閉じている時は開くといったことが可能。
//-------------------------------

//-------------------------------
//Swiperの表示
const swiper = new Swiper("#js-gallery-swiper", {
  spaceBetween: 82,
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: "#js-gallery-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: "#js-gallery-next",
    prevEl: "#js-gallery-prev",
  },
});
//-------------------------------

//------------------------------
//モーダルの操作

//モーダルを開くjQuery
// jQuery(".js-modal-open").on("click", function (e) {
//   e.preventDefault();

//   //show()    :モーダルの後ろの要素を選択できる
//   //showModal :モーダルの後ろの要素を選択できない
//   jQuery("#js-about-modal")[0].showModal();
// });

//モーダルを閉じるjQuery
// jQuery(".js-modal-close").on("click", function (e) {
//   e.preventDefault();

//   jQuery("#js-about-modal")[0].close();
// });

//モーダルを開くjs
const modalOpenItems = document.querySelectorAll(".js-modal-open");
const modalCloseItems = document.querySelectorAll(".js-modal-close");
const aboutModal = document.querySelector("#js-about-modal");

modalOpenItems.forEach(function (modalOpenItem) {
  modalOpenItem.addEventListener("click", function (e) {
    e.preventDefault();

    if (aboutModal) {
      aboutModal.showModal();
    }
  });
});

//モーダルを閉じるjs
modalCloseItems.forEach(function (modalCloseItem) {
  modalCloseItem.addEventListener("click", function (e) {
    e.preventDefault();

    if (aboutModal) {
      aboutModal.close();
    }
  });
});
//------------------------------

//------------------------------
// jsによるスムーススクロール

//スマホ版のドロワーメニュー内の要素をクリックした際にドロワーが閉じる処理。
//id="js-drawer-content"の中のa[href^="#"]の要素をクリックしたときのみ発火
jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  drawerIcon.classList.remove("is-checked");
  drawerContent.classList.remove("is-checked");
});

//a[]  : aタグの中の属性
//href^: hrefの中身の一番初めの文字
//="#" : #と等しい時
//a[href^="#"]: aタグの中のhref属性の中身が#で始まる要素を
//クリックしたときにイベントが走るという記述
jQuery('a[href^="#"]').on("click", function (e) {
  const speed = 300;

  //attrメソッド: 属性を取得する
  const id = jQuery(this).attr("href");

  //idが#のみの場合は"html"を対象に,それ以外の場合は定数idを対象にする。
  const target = jQuery("#" == id ? "html" : id);

  //offset()は要素の位置を取得するメソッド
  //位置はtop(Y座標)とleft(X座標)で取得される。
  //topプロパティを指定することで定数positionには要素のY座標が代入される。
  const position = jQuery(target).offset().top;

  jQuery("html,body").animate(
    {
      scrollTop: position,
    },
    speed, //単位はミリ秒なので1000ミリ秒は1秒 1秒かけて移動する
    "swing" //swing(ゆっくり早くゆっくり) or linear(一定)
  );
});
//------------------------------

//------------------------------
//topに戻るボタンの表示制御

//jQueryの場合
// jQuery(window).on("scroll",function() {

//   //scrollTop(): 現在のスクロール位置を取得
//   //スクロール位置が100pxより大きかったらclass:is-showを追加
//   //そうでなかったら取り除く
//   if (100 < jQuery(window).scrollTop()){
//     jQuery("#js-pagetop").addClass("is-show");
//   }else{
//     jQuery("#js-pagetop").removeClass("is-show");
//   }
// });

//jsの場合
const pageTop = document.querySelector("#js-pagetop");

window.addEventListener("scroll", function () {
  if (100 < this.window.scrollY) {
    pageTop.classList.add("is-show");
  } else {
    pageTop.classList.remove("is-show");
  }
});
//------------------------------

//------------------------------
//ふわっと表示
const intersectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in-view");
    } else {
      // entry.target.classList.remove("is-in-view");
    }
  });
});

const inViewItems = document.querySelectorAll(".js-in-view");
inViewItems.forEach(function (inViewItem) {
  intersectionObserver.observe(inViewItem);
});
//------------------------------