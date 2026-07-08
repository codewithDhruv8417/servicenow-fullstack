let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "index.html";
}

document.getElementById("welcome").innerText = `Hi, ${currentUser.name}`;

let providers = [];
let currentProviders = [];
let selectedProvider = null;


// =============================
// FETCH ALL PROVIDERS FROM BACKEND
// =============================
async function fetchProviders() {
  try {
    let response = await fetch(`${API_BASE}/providers`);

    if (!response.ok) {
      throw new Error("Failed to load providers");
    }

    providers = await response.json();

  } catch (error) {
    console.error(error);
    alert("Could not load providers from backend");
  }
}


// =============================
// SERVICES RENDER
// =============================
function renderServices(serviceArray) {
  let container = document.getElementById("servicesContainer");
  container.innerHTML = ""
  serviceArray.forEach(service => {
    container.innerHTML += `
      <div class="service-card">
        <img src="${service.image}">
        <div class="service-info">
          <h3>${service.name}</h3>
          <button onclick="showProviders('${service.name}')">
            View Providers
          </button>
        </div>
      </div>
    `;
  });
}


// =============================
// SEARCH SERVICES
// =============================
function searchServices() {
  let value = document.getElementById("searchInput").value.toLowerCase();

  let filtered = services.filter(service =>
    service.name.toLowerCase().includes(value)
  );

  renderServices(filtered);
}


// =============================
// SORT SERVICES
// =============================
function sortServices() {
  let value = document.getElementById("sortSelect").value;
  let sorted = [...services];

  if (value === "az") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (value === "za") {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderServices(sorted);
}


// =============================
// SHOW PROVIDERS OF A SERVICE
// =============================
function showProviders(serviceName) {
  document.getElementById("providerTitle").innerText = `${serviceName} Providers`;

  currentProviders = providers.filter(provider =>
    provider.service &&
    provider.service.toLowerCase() === serviceName.toLowerCase()
  );

  renderProviderCards(currentProviders);

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}


// =============================
// RENDER PROVIDER CARDS
// =============================
function renderProviderCards(providerArray) {
  let container = document.getElementById("providerList");
  container.innerHTML = "";

  if (providerArray.length === 0) {
    container.innerHTML = `<p>No Providers Found</p>`;
    return;
  }

  providerArray.forEach(provider => {

    let providerImage =
      provider.image &&
      provider.image.trim() !== "" &&
      provider.image.startsWith("http")
        ? provider.image
        : "https://via.placeholder.com/300x200?text=Provider";

    container.innerHTML += `
      <div class="provider-card">
        <img src="${providerImage}">
        <h3>${provider.name}</h3>
        <p>${provider.service || ''}</p>
        <p>${provider.experience || 0} Years Experience</p>
        <p>Starting From ₹${provider.price || 0}</p>
        <p>📍 ${provider.location || ''}</p>
        <p>${provider.about || ''}</p>
        <button onclick="bookProvider(${provider.id})">
          Book Now
        </button>
      </div>
    `;
  });
}


// =============================
// SORT PROVIDERS
// =============================
function sortProviders() {
  let value = document.getElementById("providerSort").value;
  let sorted = [...currentProviders];

  if (value === "priceLow") {
    sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
  }

  if (value === "priceHigh") {
    sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  renderProviderCards(sorted);
}


// =============================
// BOOKING MODAL
// =============================
function bookProvider(providerId) {
  selectedProvider = providers.find(p => p.id === providerId);

  if (!selectedProvider) {
    alert("Provider not found");
    return;
  }

  document.getElementById("bookingModal").classList.remove("hidden");
}

function closeBookingModal() {
  document.getElementById("bookingModal").classList.add("hidden");
}


// =============================
// CONFIRM BOOKING -> BACKEND
// =============================
async function confirmBooking() {
  let date = document.getElementById("bookingDate").value;
  let time = document.getElementById("bookingTime").value;
  let address = document.getElementById("bookingAddress").value.trim();

  if (!date || !time || !address) {
    alert("Fill all fields");
    return;
  }

  let booking = {
    customerUsername: currentUser.username,
    customerName: currentUser.name,
    providerUsername: selectedProvider.username,
    providerName: selectedProvider.name,
    service: selectedProvider.service,
    date,
    time,
    address
  };

  try {
    let response = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
    });

    if (!response.ok) {
      throw new Error("Booking failed");
    }

    await response.json();

    alert("Booking confirmed!");
    closeBookingModal();
    renderMyBookings();

  } catch (error) {
    console.error(error);
    alert("Could not create booking");
  }
}


// =============================
// FETCH CUSTOMER BOOKINGS
// =============================
async function renderMyBookings() {
  let container = document.getElementById("myBookingsContainer");
  container.innerHTML = "<p>Loading bookings...</p>";

  try {
    let response = await fetch(`${API_BASE}/bookings/customer/${currentUser.username}`);

    if (!response.ok) {
      throw new Error("Failed to load bookings");
    }

    let myBookings = await response.json();

    container.innerHTML = "";

    if (myBookings.length === 0) {
      container.innerHTML = `<p>No Bookings Yet</p>`;
      return;
    }

    myBookings.forEach(booking => {
      container.innerHTML += `
        <div class="appointment-card">
          <h3>${booking.service}</h3>
          <p>👨‍🔧 Provider: ${booking.providerName}</p>
          <p>📅 ${booking.date}</p>
          <p>⏰ ${booking.time}</p>
          <p>📍 ${booking.address}</p>
          <p class="status">Status: ${booking.status}</p>
        </div>
      `;
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = `<p>Could not load bookings</p>`;
  }
}


// =============================
// PAGE INIT
// =============================
async function initUserPage() {
  await fetchProviders();
  renderServices(services);
  await renderMyBookings();
}

initUserPage();