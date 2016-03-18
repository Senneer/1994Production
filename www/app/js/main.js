var overlay = document.getElementsByClassName('overlay')[0];
var popup = document.getElementsByClassName('popup')[0];
var closeBtn = document.getElementsByClassName('popup__close-button')[0];
var orderBtn = document.getElementsByClassName('order-button')[0];
var submit = document.getElementsByClassName('form__submit')[0];
var successmsg = document.getElementsByClassName('_successmsg')[0];
var form = document.getElementById('sendMailForm');
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
overlay.addEventListener('click', function() {
  overlayHide();
  defaultSubmit();
});
closeBtn.addEventListener('click', function() {
  overlayHide();
  defaultSubmit();
});
orderBtn.addEventListener('click', overlayShow);
orderBtn.addEventListener('click', successmsgHide);
orderBtn.addEventListener('click', popupShow);
popup.addEventListener('click', function(e) {
  e.stopPropagation();
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  var url = form.getAttribute('action');
  var method = form.getAttribute('method');

  var nameInput = document.getElementById('name');
  var nameInputName = nameInput.getAttribute('name');
  var nameInputValue = nameInput.value;

  var contactInput = document.getElementById('phone');
  var contactInputName = contactInput.getAttribute('name');
  var contactInputValue = contactInput.value;

  var messageImput = document.getElementById('message');
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

  // var formData = new FormData(document.forms.mailForm);

  if (nameInputValue === '' && contactInputValue === '' && messageImputValue === '') {
    submit.value = 'Заполните хотя бы одно поле';
    submitError();
    return false;
  }
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        popupHide();
        successmsgShow();
        setTimeout(overlayHide, 1000);
      } else {
        document.getElementsByClassName('popup__message')[0].innerHTML = '';
        document.getElementsByClassName('popup__message')[0].innerHTML = 'Ой! Что-то пошло не так.<br>Попробуйте повторить попытку позже.';
      };
    }
  };
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send("name="+encodeURIComponent(data.name)+"&phone="+encodeURIComponent(data.phone)+'&message='+encodeURIComponent(data.message));
  nameInput.value = '';
  contactInput.value = '';
  messageImput.value = '';
});