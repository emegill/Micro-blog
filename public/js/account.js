var updateBlog = new UpdateBlog();

function UpdateBlog() {

    var editBlogBtns = document.getElementsByClassName('blog-list__edit-blog-btn');
    var updateBlogFormContainers = document.getElementsByClassName('update-blog-form__container');

    for (let k = 0; k < editBlogBtns.length; k++) {
        editBlogBtns[k].addEventListener("click", function() {
            toggleEditBlogForm(k);
        });
    }

    function toggleEditBlogForm(blogNum) {
        if (updateBlogFormContainers[blogNum].style.display === "block") {
            hideUpdateBlogForm(blogNum);
        } else {
            showUpdateBlogFom(blogNum);
        }
    }

    function hideUpdateBlogForm(blogNum) {
        updateBlogFormContainers[blogNum].style.display = "none";
    }

    function showUpdateBlogFom(blogNum) {
        updateBlogFormContainers[blogNum].style.display = "block";
    }

}
