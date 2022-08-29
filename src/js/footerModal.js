const bodyElFooter = document.body;
const modalFooter = document.querySelector("[data-modal]");
const buttonFooter = document.querySelector("[data-modal-open]");
const closeModalButton = document.querySelector("[data-modal-close]");

buttonFooter.addEventListener("click", openModalFooter);
closeModalButton.addEventListener("click", closeModalFooter);

function openModalFooter() {
    bodyElFooter.classList.add('no-scroll-footer');
    modalFooter.classList.remove("is-hidden");
    document.getElementById("backToTop").style.display = "none";
}

buttonFooter.addEventListener("click",function () {
    modalFooter.style.display = "block";
}); 

function onPressEsc(e) {
    if (e.code === 'Escape') {
    closeModalFooter();
    }
}

window.addEventListener("keydown", function(e) {
    if (e.keyCode === 27  && modalFooter.style.display === "block") {
        modalFooter.classList.add('is-hidden');
        bodyElFooter.classList.remove('no-scroll-footer');
        closeModalFooter()
    }
});

window.addEventListener("click",modalFooterClick)
function modalFooterClick(e) {
    if (e.target == modalFooter) { 
        modalFooter.classList.add('is-hidden');
        bodyElFooter.classList.remove('no-scroll-footer');
        closeModalFooter()
    }
}

closeModalButton.addEventListener("click", function() {
    modalFooter.classList.add('is-hidden');
    bodyElFooter.classList.remove('no-scroll-footer');
});

function closeModalFooter() {
    modalFooter.removeEventListener('click', modalFooterClick);
    window.removeEventListener('keydown', onPressEsc);
}
