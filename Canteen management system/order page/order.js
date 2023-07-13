document.getElementById('product').addEventListener('change', function() {
    var product = this.value;
    var orderButton = document.getElementById('order-button');
    var orderPhoto = orderButton.querySelector('.order-photo');
    var imageSrc = 'photo/';
    console.log("f")
    switch (product) {
      case 'Shakes':
        imageSrc += 'Shake.jpg';
        break;
      case 'Lunch':
        imageSrc += 'lunch.jpeg';
        break;
      case 'Fast_Food':
        imageSrc += 'fastfood.jpeg';
        break;
      default:
        imageSrc += 'default-photo.jpg';
    }
  
    orderPhoto.src = imageSrc;
  });

  const categorySelect = document.getElementById('category');
const productSelect = document.getElementById('product');

const products = {
  beverages: ['Mango Shakes', 'Juices','Lassi','Cold drink'],
  Fast_food: ['Momos', 'Spring Roll' ,'Burgur' , 'Chaowmin'],
  Lunch: ['Full Talli','Chole Bhatura' , 'Aalo Paratha']
};

categorySelect.addEventListener('change', () => {
  const selectedCategory = categorySelect.value;
  updateProductOptions(selectedCategory);
});
function updateProductOptions(category) {
  productSelect.innerHTML = '<option value="">Select a product</option>';

  if (category) {
    const categoryProducts = products[category];

    categoryProducts.forEach(product => {
      const option = document.createElement('option');
      option.value = product;
      option.textContent = product;
      productSelect.appendChild(option);
    });
  }
}
