const form = document.getElementById("reportForm");
const reportsContainer = document.getElementById("reportsContainer");

const totalReports = document.getElementById("totalReports");
const pendingReports = document.getElementById("pendingReports");
const resolvedReports = document.getElementById("resolvedReports");

const adminToggleBtn = document.getElementById("adminToggle");
const adminIndicator = document.getElementById("adminIndicator");

let isAdmin = false;

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

function saveToLocalStorage() {
    localStorage.setItem("complaints", JSON.stringify(complaints));
}

function updateStats() {
    totalReports.textContent = complaints.length;
    const pending = complaints.filter(c => c.status === "Pending").length;
    const resolved = complaints.filter(c => c.status === "Resolved").length;

    pendingReports.textContent = pending;
    resolvedReports.textContent = resolved;
}

function createComplaintCard(complaint, index) {
    const card = document.createElement("div");
    card.className = "bg-gray-50 p-4 rounded-lg shadow-md";

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
        <p class="text-sm"><strong>Date:</strong> ${complaint.date}</p>
        <p class="text-sm mt-2 mb-3">${complaint.description}</p>

        <div class="flex gap-2">
            ${isAdmin && complaint.status === "Pending" ? `
                <button onclick="markResolved(${index})"
                class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">
                Mark as Resolved
                </button>` : ""}

            ${isAdmin ? `
                <button onclick="deleteComplaint(${index})"
                class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">
                Delete
                </button>` : ""}
        </div>
    `;

    reportsContainer.appendChild(card);
}

function renderComplaints() {
    reportsContainer.innerHTML = "";
    complaints.forEach((complaint, index) => {
        createComplaintCard(complaint, index);
    });
    updateStats();
}

function markResolved(index) {
    complaints[index].status = "Resolved";
    saveToLocalStorage();
    renderComplaints();
}

function deleteComplaint(index) {
    if (confirm("Are you sure you want to delete this complaint?")) {
        complaints.splice(index, 1);
        saveToLocalStorage();
        renderComplaints();
    }
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const requiredFields = document.querySelectorAll(".required-field");
    let isValid = true;

    requiredFields.forEach(field => {
        field.classList.remove("error");
        if (!field.value.trim()) {
            field.classList.add("error");
            isValid = false;
        }
    });

    if (!isValid) {
        alert("Please fill all required fields!");
        return;
    }

    const newComplaint = {
        name: document.getElementById("name").value.trim(),
        municipality: document.getElementById("municipality").value.trim(),
        ward: document.getElementById("ward").value.trim(),
        category: document.getElementById("category").value,
        location: document.getElementById("location").value.trim(),
        description: document.getElementById("description").value.trim(),
        status: "Pending",
        date: new Date().toLocaleString()
    };

    complaints.push(newComplaint);
    saveToLocalStorage();
    renderComplaints();
    form.reset();
});

adminToggleBtn.addEventListener("click", () => {
    isAdmin = !isAdmin;

    adminToggleBtn.textContent = isAdmin ? 
        "Switch to Civilian Mode" : 
        "Admin Panel";

    adminIndicator.classList.toggle("hidden");

    renderComplaints();
});

renderComplaints();
