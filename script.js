const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.categories);
      displayCategories(data.categories);
      loadPlantDes('all');
    });
};


const spinner = document.getElementById('spinner');

const loadPlantDes = (id) => {
  spinner.classList.remove('hidden');
  let url = id === 'all' ? 'https://openapi.programming-hero.com/api/plants' : `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.plants);
      displayPlants(data.plants);
    })
    .catch(err => {
      spinner.classList.add('hidden'); 
      console.error(err);
    });

}

// cart 

let cart = [];

const addToCart = (item) => {
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 }); 
  }

  alert(`${item.name} has been added to cart`);

  renderCart(); 
};

// cart end 




const displayPlants = (items) => {
  const productContainer = document.getElementById('product-item');
  productContainer.innerHTML = "";
  if (!Array.isArray(items) || items.length === 0) {
    productContainer.innerHTML = "<p class='text-center text-gray-500'>No plants found.</p>";
    return;
  }

  items.forEach((item) => {
    console.log(item);
    const card = document.createElement("div");
    card.className = "bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="h-32 w-full object-cover mb-4 rounded">
      <a href="#"> <h3 class="font-semibold text-gray-800">${item.name}</h3></a>
      <p class="text-sm text-gray-600 mt-2 flex-grow">${item.description}</p>
      <div class="flex items-center justify-between mb-4">
        <span class="inline-block px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full w-max">${item.category}</span>
        <span class="text-gray-800 font-semibold">৳${item.price}</span>
      </div>
      <button class="bg-green-600 text-white px-4 py-2 rounded-[60px] hover:bg-green-700 transition onclick="addToCart(item)"">
        Add to Cart
      </button>
    `;


    card.querySelector("button").addEventListener("click", () => addToCart(item));

    productContainer.append(card);


    card.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      openModal(item);
    });
  });
}




const displayCategories = (categories) => {
  // 1. get the container & empty 
  const categoryContainer = document.getElementById('categories-list-item');
  categoryContainer.innerHTML = '';
  // 2. get into every lessons 

  const allLi = document.createElement("li");
  allLi.innerHTML = `<button onclick="setActiveCategory(this); loadPlantDes('all')" class="w-full text-left px-4 py-2 text-black rounded-md bg-green-600 text-white">All Trees</button>`;
  categoryContainer.append(allLi);

  for (let category of categories) {
    // console.log(category);
    // 3. create element 
    const ctnDiv = document.createElement("li");
    ctnDiv.innerHTML = `
        <li><button onclick="setActiveCategory(this); loadPlantDes('${category.id}')" class="w-full text-left px-4 py-2 hover:bg-green-600 rounded-md">${category.category_name}</button></li>`
    // 4. append into container 
    //onclick="loadPlantDes('${category.category_name}')"
    categoryContainer.append(ctnDiv);

  };

  loadPlantDes('all');

}

loadCategories();


// modal function 

const openModal = (item) => {
  const modal = document.getElementById('plant-modal');
  const modalContent = modal.querySelector('div');

  modalContent.innerHTML = `
    <h3 class="font-semibold text-gray-800 text-xl mb-2">${item.name}</h3>
    <img src="${item.image}" alt="${item.name}" class="h-48 w-full object-cover mb-4 rounded">
    <span class="inline-block py-1 text-sm mb-2"><span class="font-bold">Category:</span> ${item.category}</span>
    <span class="block text-gray-800 font-semibold mb-2"><span class="font-bold">Price:</span> ৳${item.price}</span>
    <p class="text-sm"> <span class="font-bold">Description:</span> ${item.description}</p>
    <button id="close-modal" class="absolute pt-10 bottom-2 right-8 font-bold">Close</button>
  `;

  // Show modal
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // Close button
  document.getElementById('close-modal').addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  // Click outside modal closes
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
};


// Add to cart function 
const renderCart = () => {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = ''; 

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement('div');
    div.className = 'flex justify-between items-center bg-green-50 p-3 rounded-lg mb-3';
    div.innerHTML = `
      <div>
        <h3 class="font-semibold">${item.name}</h3>
        <p class="text-gray-600">৳${item.price} × ${item.quantity}</p>
      </div>
      <button class="text-gray-500 hover:text-red-500 text-xl">&times;</button>
    `;

    // remove button
    div.querySelector('button').addEventListener('click', () => {
      cart = cart.filter(i => i.id !== item.id);
      renderCart();
    });

    cartContainer.appendChild(div);
  });

  // Total
  const totalDiv = document.createElement('div');
  totalDiv.className = 'flex justify-between items-center pt-1 border-t-2 border-[#d3d4d4] mt-2';
  totalDiv.innerHTML = `
    <span class="font-semibold">Total:</span>
    <span class="font-semibold">৳${total}</span>
  `;
  cartContainer.appendChild(totalDiv);
};


function setActiveCategory(button) {
  document.querySelectorAll('#categories-list-item button')
    .forEach(btn => btn.classList.remove('bg-green-600', 'text-white'));

  button.classList.add('bg-green-600', 'text-white');
}




