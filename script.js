// variables
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

// variable api

const apiURL = "https://api.lyrics.ovh";

// get input values
form.addEventListener("submit", e => {
    e.preventDefault();
    let searchValue = search.value.trim();

    if (!searchValue) {
        alert("Please enter valid song or artist name!")
    } else {
        beginSearch(searchValue);
    }
})

//create search function
async function beginSearch(searchValue){
    const searchResult = await fetch (`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();
   // console.log(data)
    displayData(data);
}
// to display songs
function displayData(data){
    result.innerHTML = `
    <ul class="songs">
        ${data.data
            .map(song=>` <li>
                        <div class="artist">
                        <strong>${song.artist.name}</strong> - ${song.title}
                        </div>
        <div class="getlyrics"><span class="get" data-artist="${song.artist.name}"data-songtitle="${song.title}">Get lyrics</span></div>
                    </li>`
        )
        .join('')
    } 
    </ul>
    `;
}
// to display lyrics
result.addEventListener("click", e =>{
    const clickedElement = e.target;

        //check get lyrics button
        if(clickedElement.tagName === 'SPAN'){
            const artist = clickedElement.getAttribute('data-artist');
            const songTitle = clickedElement.getAttribute('data-songtitle');

            getLyrics(artist, songTitle);

        }
})

async function getLyrics(artist, songTitle){
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

    const data = await response.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}:</h2>
    <p class="songlyrics">${lyrics}</p>`;
}