const menuItems = document.querySelectorAll('.item1');
const phoneNumber = document.querySelector('.contact');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('selected');
  });
});

phoneNumber.addEventListener('click', () => {
  const phone = phoneNumber.dataset.phone;
  window.location.href = `tel:${+918193921510}`;
});
