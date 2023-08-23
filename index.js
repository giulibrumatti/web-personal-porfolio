window.addEventListener("scroll", function(){
    let nav = document.querySelector("nav");
    nav.classList.toggle("abajo", window.scrollY > 0);
})

