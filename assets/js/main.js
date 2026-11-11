/* Titik masuk: klik tab = mulai game (klik tab aktif = ulang) */
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>go(b.dataset.g)));
go('bb');
