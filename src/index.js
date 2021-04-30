const progressBar = document.querySelector(".progress-bar");
let progressComplete = progressBar.getAttribute("data-complete");
const start = document.querySelector(".updateBtn");
const lastUpdate = document.querySelector(".updateDate");
const fileSelected = document.querySelector('#file-name');

start.addEventListener("click", clickEvent);
async function  clickEvent() {


  start.style.background = "#ccc";
  progressComplete = 100;
  lastUpdate.remove()
  start.disabled = true;

  const socket = io("http://localhost:3333")

  socket.on('connect', () => {
    socket.on('update-chunk', (chunk) => {
      
      if (chunk != progressComplete) {
        progressBar.style.opacity = "1";
        progressBar.style.width = chunk + "%";
        progressBar.innerHTML = chunk + "%";
      } else {
        progressBar.innerHTML = chunk + "%";
        start.style.background = '';
        start.disabled = false;
      }
    })
  })

  
  
  const response = await fetch('http://localhost:3333/update', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      file: fileSelected.value
    })
    })
      return response



}

