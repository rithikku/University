// Load course list dynamically
async function loadCourses() {
  const res = await fetch("api/courses.json");
  const data = await res.json();
  const list = document.getElementById("courseList");
  if (!list) return;
  data.courses.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.name} - ${c.duration} (${c.specialization})`;
    list.appendChild(li);
  });
}
loadCourses();

// Show modal with fees
async function showFees() {
  const res = await fetch("api/fees.json");
  const data = await res.json();
  let html = "";
  for (let [course, fee] of Object.entries(data)) {
    html += `<p><b>${course}</b>: ₹${fee.min} - ₹${fee.max}</p>`;
  }
  document.getElementById("feesModalBody").innerHTML = html;
  document.getElementById("feesModal").style.display = "block";
}

function closeModal() {
  document.getElementById("feesModal").style.display = "none";
}

// Pipedream form integration
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("leadForm");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const responseMsg = document.getElementById("responseMsg");

    try {
      const res = await fetch("https://eo7654lfmqtop8m.m.pipedream.net", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      responseMsg.innerText = res.ok ? "✅ Form submitted successfully!" : "❌ Submission failed.";
    } catch {
      responseMsg.innerText = "⚠️ Network error.";
    }
  });
});
