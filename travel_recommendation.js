const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');

let travelData = null;

fetch('./travel_recommendation.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log(travelData);
    })
    .catch(error => {
        console.error('Error fetching travel data:', error);
    });

searchBtn.addEventListener('click', function () {
    const keyword = searchInput.value.toLowerCase().trim();

    if (!travelData) {
        results.innerHTML = '<p>Data is still loading.</p>';
        return;
    }

    let recommendations = [];

    if (
        keyword === 'beach' ||
        keyword === 'beaches' ||
        keyword === 'playa' ||
        keyword === 'playas'
    ) {
        recommendations = travelData.beaches;
    }

    else if (
        keyword === 'temple' ||
        keyword === 'temples' ||
        keyword === 'templo' ||
        keyword === 'templos'
    ) {
        recommendations = travelData.temples;
    }

    else {
        const countryResult = travelData.countries.find(country =>
            country.name.toLowerCase() === keyword
        );

        if (countryResult) {
            recommendations = countryResult.cities;
        }
    }

    displayRecommendations(recommendations);
});

function displayRecommendations(recommendations) {
    results.innerHTML = '';

    if (recommendations.length === 0) {
        results.innerHTML = '<p>No results found.</p>';
        return;
    }

    recommendations.forEach(place => {
        const card = document.createElement('div');
        card.className = 'result-card';

        card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
        `;

        results.appendChild(card);
    });
}

resetBtn.addEventListener('click', function () {
    searchInput.value = '';
    results.innerHTML = '';
});