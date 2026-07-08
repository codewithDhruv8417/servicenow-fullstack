let currentProvider = JSON.parse(localStorage.getItem("currentUser"));

if (!currentProvider || currentProvider.role !== "provider") {
  window.location.href = "index.html";
}

document.getElementById("providerWelcome").innerText =
  `Hi, ${currentProvider.name}`;


// =============================
// PROVIDER IMAGE FALLBACK
// =============================
let providerImage =
  currentProvider.image &&
  currentProvider.image.trim() !== "" &&
  currentProvider.image.startsWith("http")
    ? currentProvider.image
    : "https://via.placeholder.com/300x200?text=Provider";

document.getElementById("providerImage").src = providerImage;

document.getElementById("providerName").innerText =
  currentProvider.name;

document.getElementById("providerService").innerText =
  `Service: ${currentProvider.service || ""}`;

document.getElementById("providerExperience").innerText =
  `${currentProvider.experience || 0} Years Experience`;

document.getElementById("providerLocation").innerText =
  `📍 ${currentProvider.location || ""}`;

document.getElementById("providerAbout").innerText =
  currentProvider.about || "";


// =============================
// BUTTONS BY STATUS
// =============================
function getBookingActionButtons(booking) {
  if (booking.status === "Pending") {
    return `
      <div class="appointment-actions">
        <button class="accept-btn"
          onclick="updateBookingStatus(${booking.id}, 'Accepted')">
          Accept
        </button>

        <button class="reject-btn"
          onclick="updateBookingStatus(${booking.id}, 'Rejected')">
          Reject
        </button>
      </div>
    `;
  }

  if (booking.status === "Accepted") {
    return `
      <div class="appointment-actions">
        <button class="complete-btn"
          onclick="updateBookingStatus(${booking.id}, 'Completed')">
          Complete
        </button>
      </div>
    `;
  }

  // For Completed or Rejected
  return "";
}


// =============================
// FETCH PROVIDER BOOKINGS
// =============================
async function renderAppointments() {
  let container = document.getElementById("appointmentsContainer");
  container.innerHTML = "<p>Loading appointments...</p>";

  try {
    let response = await fetch(
      `${API_BASE}/bookings/provider/${currentProvider.username}`
    );

    if (!response.ok) {
      throw new Error("Failed to load provider bookings");
    }

    let myBookings = await response.json();

    container.innerHTML = "";

    if (myBookings.length === 0) {
      container.innerHTML = `<p>No Appointments Yet</p>`;
      return;
    }

    myBookings.forEach(booking => {
      container.innerHTML += `
        <div class="appointment-card">
          <h3>${booking.service}</h3>
          <p>👤 Customer: ${booking.customerName}</p>
          <p>📅 ${booking.date}</p>
          <p>⏰ ${booking.time}</p>
          <p>📍 ${booking.address}</p>
          <p class="status">Status: ${booking.status}</p>

          ${getBookingActionButtons(booking)}
        </div>
      `;
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = `<p>Could not load appointments</p>`;
  }
}


// =============================
// UPDATE BOOKING STATUS
// =============================
async function updateBookingStatus(id, status) {
  try {
    let response = await fetch(
      `${API_BASE}/bookings/${id}/status?status=${encodeURIComponent(status)}`,
      {
        method: "PUT"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    alert(`Booking ${status}`);
    renderAppointments();

  } catch (error) {
    console.error(error);
    alert("Could not update booking status");
  }
}

renderAppointments();