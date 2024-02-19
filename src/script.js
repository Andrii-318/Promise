document.getElementById("findPost").addEventListener("click", function () {
  const postId = document.getElementById("postId").value;
  const postContainer = document.getElementById("postContainer");

  // Валідація ID
  if (postId < 1 || postId > 100 || isNaN(postId)) {
    alert("Please enter a valid Post ID (1-100)");
    return;
  }

  // Очищення контейнера поста
  postContainer.innerHTML = "";

  // Запит на отримання поста
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Post not found");
      }
      return response.json();
    })
    .then((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <button onclick="loadComments(${postId})">Load Comments</button>
            `;
      postContainer.appendChild(postElement);
    })
    .catch((error) => {
      alert(error.message);
    });
});

function loadComments(postId) {
  const postContainer = document.getElementById("postContainer");

  // Запит на отримання коментарів до поста
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => response.json())
    .then((comments) => {
      const commentsElement = document.createElement("div");
      comments.forEach((comment) => {
        commentsElement.innerHTML += `
                    <div>
                        <strong>${comment.email}</strong>
                        <p>${comment.body}</p>
                    </div>
                `;
      });
      postContainer.appendChild(commentsElement);
    })
    .catch((error) => {
      alert("Failed to load comments");
    });
}
