// Loading Effect Add 
const loadingAdd =()=>{
  const add = document.getElementById('loadingEffect');
  add.classList.remove('hidden');
  add.classList.add('flex')
}

const loadingRemove=()=>{
  const remove = document.getElementById('loadingEffect');
  remove.classList.add('hidden')
  remove.classList.remove('flex');
}


let allCardData = []; 
// Data Fetching and Functionalities Adding 
async function allJobFetching() {
  loadingAdd ()
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  loadingRemove()
   allCardData = data.data
  // console.log(allCardData)
  allJobs(allCardData);
}
allJobFetching();

const allJobs = (job) => {
  const allBtn = document.getElementById("cardSection");

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

      <div>
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


// Btn options 
document.getElementById('allbtn').addEventListener('click',function () {
  // allJobs(allCardData);
  const alBtn = allCardData
  console.log(alBtn)
})

// Open
document.getElementById('openBtn').addEventListener('click',function(){
  const openBtnClick = allCardData.filter(btnOpen => btnOpen.status=='open');
  console.log(openBtnClick)
  // allJobs(openBtnClick)
})
document.getElementById('closeBtn').addEventListener('click',function(){
  const openBtnClick = allCardData.filter(btnClose => btnClose.status=='closed')
  // console.log(openBtnClick)
})