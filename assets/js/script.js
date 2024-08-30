var add = document.querySelector('.btn-add');
var formAdd = document.querySelector('.form-add');
var closeModal = document.querySelector('.close-modal');
var overflow = document.querySelector('.overflow');
var btnUpdate = document.querySelectorAll('.btn-update');
    add.addEventListener('click', function(){
        overflow.classList.add('active');
    });
    
    closeModal.addEventListener('click', function(){
        overflow.classList.remove('active');
    });
    overflow.addEventListener('click', function(){
        overflow.classList.remove('active');
    });
    formAdd.addEventListener('click', function(e){
        e.stopPropagation();
    });
