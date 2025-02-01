const apiKey = "3c06c79b78d44bd591e6c40e5aae74df"; // Replace with your NewsAPI key

document.getElementById("fetch-news").addEventListener("click", async () => {
    const category = document.getElementById("category").value;
    const news = await fetchNews(category);
    displayNews(news);
});

// Fetch news from API
const fetchNews = async (category) => {
    const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    );
    const data = await response.json();
    return data.articles;
};

// Display news on the page
const displayNews = (news) => {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Clear previous results

    news.forEach((article) => {
        const div = document.createElement("div");
        div.classList.add("news-item");

        div.innerHTML = `
            <img src="${article.urlToImage}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(div);
    });
};
