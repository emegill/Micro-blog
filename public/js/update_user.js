var deleteUser = new DeleteUser();
var updateUser = new UpdateUser();

function DeleteUser() {
    var delUserBtn = document.getElementsByClassName('delete-user-btn')[0];
    var delUserModal = document.getElementsByClassName('delete-user-modal')[0];
    var cancelBtn = document.getElementsByClassName('delete-user__cancel-btn')[0];

    delUserBtn.addEventListener("click", function() {
        setDisplayBlock(delUserModal);
    });
    cancelBtn.addEventListener("click", function() {
        setDisplayNone(delUserModal);
    });
}

function UpdateUser() {
    var userDetailsCont = document.getElementsByClassName('user-details__container')[0];
    var editUserBtn = document.getElementsByClassName('edit-user-btn')[0];
    var editUserModal = document.getElementsByClassName('edit-user-modal')[0];

    editUserBtn.addEventListener("click", toggleEditUserModal);

    function toggleEditUserModal() {
        if (editUserModal.style.display === "block") {
            hideEditUserModal();
        } else {
            showEditUserModal();
        }
    }

    function hideEditUserModal() {
        setDisplayNone(editUserModal);
        setDisplayBlock(userDetailsCont);
        editUserBtn.innerHTML = "Edit details";
    }

    function showEditUserModal() {
        setDisplayBlock(editUserModal);
        setDisplayNone(userDetailsCont);
        editUserBtn.innerHTML = "Cancel";
    }

}
