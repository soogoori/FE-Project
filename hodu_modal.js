const modal = document.querySelector(".modal");
const openBtn = document.querySelector("#btn-subscribe");
const closeBtn = document.querySelector(".btn-ok");

function openModal() {
    modal.style.display = "flex";
}
function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if(event.target == modal) {
        closeModal();
    }
};

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);