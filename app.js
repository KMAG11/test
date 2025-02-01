const apiKey = "3c06c79b78d44bd591e6c40e5aae74df"; // Replace with your NewsAPI key

document.getElementById("fetch-news").addEventListener("click", async () => {
    const category = document.getElementById("category").value;
    try {
        const news = await fetchNews(category);
        console.log("Fetched News:", news); // Log the fetched news
        if (news && Array.isArray(news) && news.length > 0) {
            displayNews(news);
        } else {
            alert("No news found for this category.");
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        alert("An error occurred while fetching the news. Please try again later.");
    }
});

// Fetch news from the NewsAPI
const fetchNews = async (category) => {
    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
        );

        // Check if the response was successful (status 200)
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Log the API response
        
        // Ensure the response contains articles
        if (data && data.status === "ok" && Array.isArray(data.articles)) {
            return data.articles;
        } else {
            throw new Error("No articles found in the response.");
        }
    } catch (error) {
        console.error("Error in fetchNews:", error);
        return []; // Return an empty array if there's an error
    }
};

// Display news on the page
const displayNews = (news) => {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Clear previous results

    news.forEach((article) => {
        const div = document.createElement("div");
        div.classList.add("news-item");

        div.innerHTML = `
            <img src="${article.urlToImage}" alt="News Image" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x200?text=No+Image';">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(div);
    });
};
