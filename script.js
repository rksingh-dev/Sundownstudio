
var loader = document.getElementById("preloader");

window.addEventListener("load", function () {

    loader.style.display = "none";
})


const API_KEY = 'AIzaSyDoGICuDn-uab0oWyXluWtdjabbbttS-cU';

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search-input').value;
    searchVideos(searchTerm);
});

function searchVideos(query) {
    const errorContainer = document.getElementById('error-container');
    const videoContainer = document.getElementById('video-container');

    errorContainer.textContent = '';
    videoContainer.innerHTML = '';

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('API request failed');
            }
            return response.json();
        })
        .then(data => {
            if (data.items.length === 0) {
                errorContainer.textContent = 'No videos found. Try a different search term.';
                return;
            }

            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                videoItem.innerHTML = `
                    <h3>${title}</h3>
                    <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                `;
                videoContainer.appendChild(videoItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            errorContainer.textContent = 'An error occurred while fetching videos. Please try again later.';
        });
}

