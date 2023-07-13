const form = document.querySelector('form');
const alert = document.querySelector('.alert');
const success = document.querySelector('.success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const message = document.querySelector('#message').value;

  if (name === '' || email === '' || message === '') {
    alert.style.display = 'block';
    alert.textContent = 'Please fill in all fields';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000);
  } else {
    success.style.display = 'block';
    success.textContent = 'Your message has been sent';
    setTimeout(() => {
      success.style.display = 'none';
    }, 5000);
    form.reset();
  }
});
