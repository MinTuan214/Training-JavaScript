var add = document.querySelector('.btn-add');
var formAdd = document.querySelector('.form-add');
var closeModal = document.querySelector('.close-modal');
var overflow = document.querySelector('.overflow');
var btnUpdate = document.querySelectorAll('.btn-update');
    add.addEventListener('click', function(){
        overflow.classList.add('active');
    });
    btnUpdate.forEach(element => {
        element.addEventListener('click', function(){
            overflow.classList.add('active');
        });
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



    document.querySelector('.cancel').onclick = function() {
        document.querySelector('.confirm-delete').style.display = 'none';
    }
    // var cancel = document.querySelector('.cancel');

    // Confirm delete
    // var Delete = document.querySelectorAll('.btn-delete');
    // var modal = document.querySelector('.modal');
    // var cancel = document.querySelector('.cancel');
    // var confirmDelete = document.querySelector('.confirm-delete');
    // var btnDelete = document.querySelectorAll('.btn-delete');
    // Delete.forEach(element => {
    //     element.addEventListener('click', function(){
    //         confirmDelete.classList.add('active');
    //     });
    // });
    //     btnDelete.forEach(element => {
    //         element.addEventListener('click', function(){
    //             confirmDelete.classList.add('active');
    //         });
    //     });
        
    //     cancel.addEventListener('click', function(){
    //         confirmDelete.classList.remove('active');
    //     });
    //     confirmDelete.addEventListener('click', function(){
    //         confirmDelete.classList.remove('active');
    //     });
    //     modal.addEventListener('click', function(e){
    //         e.stopPropagation();
    //     });