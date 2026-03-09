// Loading Effect Add
const loadingAdd = () => {
  const add = document.getElementById("loadingEffect");
  add.classList.remove("hidden");
  add.classList.add("flex");
};

const loadingRemove = () => {
  const remove = document.getElementById("loadingEffect");
  remove.classList.add("hidden");
  remove.classList.remove("flex");
};

const addActive = () => {
  const allBtn = document.getElementById("allbtn");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  allBtn.classList.add("active");
  openBtn.classList.add("active");
  closeBtn.classList.add("active");
};

// Modal Data Fetching
const cardDetails = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  modalData(data.data);
};

const modalData = (modal) => {
  const modalCard = document.getElementById("modals");
  modalCard.innerHTML = `    
  <dialog id="cardDetailsModal" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
   
  
  <div class="card-body">
    <h2 class="card-title text-2xl font-bold">
      ${modal.title}
    </h2>
    <div class="flex items-center gap-5">
    <div class="p-2 rounded-md text-white bg-green-600">
  ${modal.status === "open" ? "Opened" : "Closed"}
</div>
      
      <p class="text-[#64748B]">${modal.assignee ? modal.assignee : "No assign"}</p>
      <p class="text-[#64748B]">${modal.createdAt}</p>
    </div>
  
    <div class="card-actions flex "> 
              ${modal.labels
                .map(
                  (label) => `
              <p class="badge badge-warning">${label.toUpperCase()}</p>
            `,
                )
                .join("")}
        </div>
 


    <p class="text-[#64748B]">${modal.description}</p>
    <div class="card-actions flex p-5 bg-gray-200 rounded-md justify-between">
      
       <div>
       <p class="text-[#64748B]">Assign</p>
       <p class="font-bold">${modal.assignee.toUpperCase() ? modal.assignee : "No assign"}</p>
       </div>
       <div>
       <p>Priority</p>
       <p class="badge badge-error text-white">${modal.priority.toUpperCase()}</p>
       
       </div>
     
    </div>
  </div>

    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>`;
  document.getElementById("cardDetailsModal").showModal();
};

let allCardData = [];
// Data Fetching and Functionalities Adding
async function allJobFetching() {
  loadingAdd();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  loadingRemove();
  allCardData = data.data;
  allJobs(allCardData);
}
allJobFetching();

const allJobs = (job) => {
  const allBtn = document.getElementById("cardSection");
  const cardLength = document.getElementById("cardCounter");
  cardLength.textContent = `${job.length}`;
  job.forEach((items) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div onclick="cardDetails(${items.id})">
  <div class="card bg-base-100 h-full border-t-4 ${items.status === "open" ? "border-green-500" : "border-purple-500"} p-5 shadow">

    <div class="flex justify-between px-5 mt-5">
      <img src="${items.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}">

      <div class="priority flex ${items.priority === "high" ? "badge badge-soft badge-error" : "badge badge-soft badge-primary"}">
        ${items.priority.toUpperCase()}
      </div>
    </div>

    <div class="card-body flex flex-col justify-between">
      <h2 class="card-title">${items.title}</h2>

      <p class="line-clamp-2">
        ${items.description}
      </p>

      </div>
        <div class="card-actions flex "> 
              ${items.labels
                .map(
                  (label) => `
              <p class="  bg-yellow-500 ">${label.toUpperCase()}</p>
            `,
                )
                .join("")}
        </div>
        <hr class="my-3">
        <div class="text-[#64748B]">
          <h1>${items.author}</h1>
          <h1>${items.createdAt}</h1>
        </div>
      </div>
    </div>

  </div>
</div>`;
    allBtn.append(div);
  });
};

const cardRemove = () => {
  const card = document.getElementById("cardSection");
  card.innerHTML = "";
};

// Reset all buttons
const removeActive = () => {
  const allBtn = document.getElementById("allbtn");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");

  // Remove active
  allBtn.classList.remove("active");
  openBtn.classList.remove("active");
  closeBtn.classList.remove("active");

  // Reset colors
  allBtn.classList.remove("bg-[#4A00FF]", "text-white");
  openBtn.classList.remove("bg-[#4A00FF]", "text-white");
  closeBtn.classList.remove("bg-[#4A00FF]", "text-white");
};

// All button
document.getElementById("allbtn").addEventListener("click", (event) => {
  removeActive();
  event.target.classList.add("active");
  cardRemove();
  allJobs(allCardData);
});

// Open button
document.getElementById("openBtn").addEventListener("click", (open) => {
  removeActive();
  open.target.classList.add("active");
  const openData = allCardData.filter((item) => item.status == "open");
  cardRemove();
  allJobs(openData);
});

// Close button
document.getElementById("closeBtn").addEventListener("click", (close) => {
  removeActive();
  close.target.classList.add("active");
  const closeData = allCardData.filter((item) => item.status == "closed");
  cardRemove();
  allJobs(closeData);
});

document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchText = input.value.trim().toLowerCase();

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const allData = data.data;
      const filterData = allData.filter((items) =>
        items.title.toLowerCase().includes(searchText),
      );
       cardRemove()
      allJobs(filterData)
    });
});
