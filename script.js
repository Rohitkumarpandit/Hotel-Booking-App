const properties = [
  {
    id: 1,
    location: "Delhi",
    price: 150,
    bedrooms: 2,
    image: "Hotel1.jpg",
    description: "Beautiful Apartment in Delhi",
  },
  {
    id: 2,
    location: "Gurugram",
    price: 200,
    bedrooms: 3,
    image: "Hotel2.webp",
    description: "Spacious House in Gurugram",
  },
  {
    id: 3,
    location: "Noida",
    price: 300,
    bedrooms: 1,
    image: "Hotel3.jpeg",
    description: "Cozy Studio in Noida",
  },
  {
    id: 4,
    location: "New York",
    price: 500,
    bedrooms: 2,
    image: "Hotel.4.jpeg",
    description: "Beautiful Apartment in New York",
  },
  {
    id: 5,
    location: "Mumbai",
    price: 800,
    bedrooms: 3,
    image: "Hotel5.jpeg",
    description: "Spacious House in Mumbai",
  },
  {
    id: 6,
    location: "Lucknow",
    price: 1000,
    bedrooms: 1,
    image: "Hotel6.jpeg",
    description: "Cozy Studio in Lucknow",
  },
  {
    id: 7,
    location: "Bihar",
    price: 1300,
    bedrooms: 1,
    image: "Hotel7.jpeg",
    description: "Cozy Studio in Bihar",
  },
  {
    id: 6,
    location: "Patna",
    price: 100,
    bedrooms: 1,
    image: "Hotel3.jpeg",
    description: "Cozy Studio in Patna",
  },
];

let cart = [];

function displayProperties(filteredProperties = properties) {
  const propertyListings = document.getElementById("property-listings");
  propertyListings.innerHTML = "";

  filteredProperties.forEach((property) => {
    const propertyElement = document.createElement("div");
    propertyElement.className = "property";
    propertyElement.innerHTML = `
            <img src="${property.image}" alt="${property.description}">
            <h3>${property.description}</h3>
            <p>${property.bedrooms} Bedrooms</p>
            <p>$${property.price}/night</p>
            <button onclick="addToCart(${property.id})">Book Now</button>
        `;
    propertyListings.appendChild(propertyElement);
  });
}

function applyFilters() {
  const location = document.getElementById("locationFilter").value;
  const priceRange = document.getElementById("priceFilter").value;
  const bedrooms = document.getElementById("bedroomsFilter").value;

  const filteredProperties = properties.filter((property) => {
    return (
      (location === "" || property.location === location) &&
      (priceRange === "" ||
        (property.price >= parseInt(priceRange.split("-")[0]) &&
          property.price <= parseInt(priceRange.split("-")[1]))) &&
      (bedrooms === "" || property.bedrooms == bedrooms)
    );
  });

  displayProperties(filteredProperties);
}

function addToCart(propertyId) {
  const property = properties.find((p) => p.id === propertyId);
  cart.push({ ...property, quantity: 1 });

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let totalCost = 0;
  cart.forEach((item) => {
    totalCost += item.price * item.quantity;
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
            <p>${item.description} - $${item.price}/night</p>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
    cartItems.appendChild(itemElement);
  });

  document.getElementById("totalCost").textContent = totalCost;
}

function updateQuantity(propertyId, newQuantity) {
  const cartItem = cart.find((item) => item.id === propertyId);
  if (cartItem) {
    cartItem.quantity = parseInt(newQuantity);
    updateCart();
  }
}

function removeFromCart(propertyId) {
  cart = cart.filter((item) => item.id !== propertyId);
  updateCart();
}

function checkout() {
  document.getElementById("checkoutSection").style.display = "block";
}

function submitBooking(event) {
  event.preventDefault();
  alert("Booking Submitted!");
  // Additional logic for processing booking could go here
}

// Initial display of properties
displayProperties();
