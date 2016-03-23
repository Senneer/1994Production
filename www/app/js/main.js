'use strict';

var overlay = document.getElementsByClassName('overlay')[0];
var popup = document.getElementsByClassName('popup')[0];
var closeBtn = document.getElementsByClassName('popup__close-button')[0];
var orderBtn = document.getElementsByClassName('order-button')[0];
var submit = document.getElementsByClassName('form__submit')[0];
var successmsg = document.getElementsByClassName('_successmsg')[0];
var popupSuccess = document.getElementsByClassName('popup__message')[0];
var popupError = document.getElementsByClassName('popup__error')[0];
var form = document.getElementById('sendMailForm');
var nameInput = document.getElementById('name');
var contactInput = document.getElementById('phone');
var messageImput = document.getElementById('message');
var is_open = ' _is-open';
function overlayShow() {
  overlay.className = overlay.className.replace(is_open, '');
  overlay.className = overlay.className + is_open;
}
function overlayHide() {
  overlay.className = overlay.className.replace(is_open, '');
}
function successmsgShow() {
  successmsg.style.display = 'flex';
}
function successmsgHide() {
  successmsg.style.display = 'none';
}
function errorShow() {
  popupSuccess.style.display = 'none';
  popupError.style.display = 'block';
}
function errorHide() {
  popupSuccess.style.display = 'block';
  popupError.style.display = 'none';
}
function popupShow() {
  popup.style.display = 'flex';
}
function popupHide() {
  popup.style.display = 'none';
}
function defaultSubmit() {
  submit.value = 'Мотор!';
  submit.className = submit.className.replace(' _error', '');
}
function submitError() {
  submit.className = submit.className.replace(' _error', '');
  submit.className = submit.className + ' _error';
}
function clearInputs() {
  nameInput.value = '';
  contactInput.value = '';
  messageImput.value = '';
}
overlay.addEventListener('click', function () {
  overlayHide();
  defaultSubmit();
});
closeBtn.addEventListener('click', function () {
  overlayHide();
  defaultSubmit();
});
orderBtn.addEventListener('click', overlayShow);
orderBtn.addEventListener('click', successmsgHide);
orderBtn.addEventListener('click', function () {
  popupShow();
  errorHide();
});
orderBtn.addEventListener('click', function () {
  popupShow();
  errorHide();
});
popup.addEventListener('click', function (e) {
  return e.stopPropagation();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var url = form.getAttribute('action');
  var method = form.getAttribute('method');

  var nameInputName = nameInput.getAttribute('name');
  var nameInputValue = nameInput.value;

  var contactInputName = contactInput.getAttribute('name');
  var contactInputValue = contactInput.value;

  var messageImputName = messageImput.getAttribute('name');
  var messageImputValue = messageImput.value;

  var data = {
    name: nameInputValue,
    phone: contactInputValue,
    message: messageImputValue
  };

  nameInput.addEventListener('click', defaultSubmit);
  contactInput.addEventListener('click', defaultSubmit);
  messageImput.addEventListener('click', defaultSubmit);

  if (nameInputValue === '' && contactInputValue === '' && messageImputValue === '') {
    submit.value = 'Заполните хотя бы одно поле';
    submitError();
    return false;
  }
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        popupHide();
        successmsgShow();
        setTimeout(overlayHide, 1000);
      } else {
        popupHide();
        successmsgShow();
        errorShow();
        setTimeout(overlayHide, 2000);
      };
    }
  };
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('name=' + encodeURIComponent(data.name) + '&phone=' + encodeURIComponent(data.phone) + '&message=' + encodeURIComponent(data.message));
  clearInputs();
});

var first = document.getElementsByClassName('first')[0];
var second = document.getElementsByClassName('second')[0];
var logo = document.getElementsByClassName('header__logoImg')[0];

var fast = 0;
var slow = 0;

var clientHeight = document.body.scrollHeight - screen.availHeight;
first.style.display = 'block';
second.style.display = 'block';
logo.style.display = 'block';

function parallax() {
  var bodyScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  fast = bodyScrollTop / 3;
  slow = bodyScrollTop / 2;
  if (bodyScrollTop >= clientHeight) {
    return false;
  }

  first.style.transform = "translate3d(0, " + fast + "px, 0)";
  second.style.transform = "translate3d(0, " + slow + "px, 0)";
  logo.style.transform = "translate3d(0, " + -slow + "px, 0)";
}

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var parallaxAnimation = function parallaxAnimation() {
  window.requestAnimationFrame(parallax);
};

var mql = window.matchMedia('(max-width: 1000px)');
mql.addListener(handleOrientationChange);
handleOrientationChange(mql);

function handleOrientationChange(mql) {
  if (mql.matches) {
    window.removeEventListener('scroll', parallaxAnimation, false);
    first.style.transform = "translate3d(0, 0, 0)";
    second.style.transform = "translate3d(0, 0, 0)";
    logo.style.transform = "translate3d(0, 0, 0)";
  } else {
    window.addEventListener('scroll', parallaxAnimation, false);
  }
}