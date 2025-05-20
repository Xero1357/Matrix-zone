document.getElementById('post-button').addEventListener('click', async () => {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (!message) {
        alert("Please enter a message.");
        return;
    }

    // Prompt user for name after message entered
    let name = prompt("Please enter your name:", "Anonymous");
    if (name === null) {  // User cancelled prompt
        name = "Anonymous";
    } else {
        name = name.trim() || "Anonymous";
    }

    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
    });

    if (response.ok) {
        const newPost = await response.json();
        appendPostToDOM(newPost);
        messageInput.value = '';  // Clear input
    } else {
        alert("Something went wrong. Please try again.");
    }
});

function appendPostToDOM(post) {
    const messagesContainer = document.getElementById('messages-container');
    const postDiv = document.createElement('div');
    postDiv.className = 'message-card';
    postDiv.innerHTML = `
        <p><strong>${post.name || 'Anonymous'}</strong></p>
        <p>${new Date(post.createdAt).toLocaleDateString()}</p>
        <p class="message-content">${post.message}</p>
        <h4>Comments</h4>
        <div class="comments-container"></div>
        <input type="text" class="comment-input" placeholder="Your comment here...">
        <button class="comment-button">Comment</button>
    `;
    messagesContainer.prepend(postDiv);
}
