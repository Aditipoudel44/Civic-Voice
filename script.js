// GLOBAL VARIABLES
const form = document.getElementById("reportForm");
const reportsContainer = document.getElementById("reportsContainer");

const totalReports = document.getElementById("totalReports");
const pendingReports = document.getElementById("pendingReports");
const resolvedReports = document.getElementById("resolvedReports");

const adminToggleBtn = document.getElementById("adminToggle");
let isAdmin = false; // default: civilian

// LOAD FROM LOCALSTORAGE
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

// SAVE TO LOCALSTORAGE
function saveToLocalStorage() {
    localStorage.setItem("complaints", JSON.stringify(complaints));
}

// UPDATE DASHBOARD STATS
function updateStats() {
    totalReports.textContent = complaints.length;
    const pending = complaints.filter(c => c.status === "Pending").length;
    const resolved = complaints.filter(c => c.status === "Resolved").length;

    pendingReports.textContent = pending;
    resolvedReports.textContent = resolved;
}
// CREATE COMPLAINT CARD
function createComplaintCard(complaint, index) {
    const card = document.createElement("div");
    card.className = "bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition";

    card.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-lg">${complaint.category}</h3>
            <span class="px-3 py-1 text-sm rounded-full 
                ${complaint.status === "Pending" ? 
                "bg-yellow-200 text-yellow-800" : 
                "bg-green-200 text-green-800"}">
                ${complaint.status}
            </span>
        </div>

        <p class="text-sm"><strong>Name:</strong> ${complaint.name}</p>
        <p class="text-sm"><strong>Municipality:</strong> ${complaint.municipality}</p>
        <p class="text-sm"><strong>Ward:</strong> ${complaint.ward}</p>
        <p class="text-sm"><strong>Location:</strong> ${complaint.location}</p>
        <p class="text-sm mt-2 mb-3">${complaint.description}</p>

        <div class="flex gap-2">
            ${isAdmin ? `<button onclick="markResolved(${index})"
                class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm transition">
                Mark as Resolved
            </button>` : ""}

            ${isAdmin ? `<button onclick="deleteComplaint(${index})"
                class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm transition">
                Delete
            </button>` : ""}
        </div>
    `;

    reportsContainer.appendChild(card);
}
// RENDER ALL COMPLAINTS
function renderComplaints() {
    reportsContainer.innerHTML = "";
    complaints.forEach((complaint, index) => {
        createComplaintCard(complaint, index);
    });
    updateStats();
}
// MARK AS RESOLVED
function markResolved(index) {
    complaints[index].status = "Resolved";
    saveToLocalStorage();
    renderComplaints();
}

// DELETE COMPLAINT
function deleteComplaint(index) {
    if (confirm("Are you sure you want to delete this complaint?")) {
        complaints.splice(index, 1);
        saveToLocalStorage();
        renderComplaints();
    }
}

// FORM SUBMIT
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const municipality = document.getElementById("municipality").value.trim();
    const ward = document.getElementById("ward").value.trim();
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();

    // VALIDATION
    if (!name || !municipality || !ward || !category || !location || !description) {
        alert("Please fill all required fields!");
        return;
    }

    const newComplaint = {
        name,
        municipality,
        ward,
        category,
        location,
        description,
        status: "Pending"
    };

    complaints.push(newComplaint);
    saveToLocalStorage();
    renderComplaints();
    form.reset();
});

// ADMIN TOGGLE BUTTON
adminToggleBtn.addEventListener("click", () => {
    isAdmin = !isAdmin;
    adminToggleBtn.textContent = isAdmin ? "Switch to Civilian Mode" : "Admin Panel";
    renderComplaints();
});
// INITIAL LOAD
renderComplaints();