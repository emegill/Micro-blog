var deleteUser = new DeleteUser();

function DeleteUser() {
    var delUserBtn = document.getElementsByClassName('delete-user-btn')[0];
    var delUserModal = document.getElementsByClassName('delete-user-modal')[0];
    var cancelBtn = document.getElementsByClassName('delete-user__cancel-btn')[0];

    delUserBtn.addEventListener("click", function() {
        delUserModal.style.display = "block";
    });
    cancelBtn.addEventListener("click", function() {
        delUserModal.style.display = "none";
    });
}
