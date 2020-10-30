const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 20;
const apiKey = 'ngTHFrLP77-g58bZqVqgMNVPDTcPIFN6TO520KAyp1Q';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function checkImg() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }   
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

//Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    //reset the num of loaded images
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.user.instagram_username,
        })
        //Event Listener, check when each is finished loading
        img.addEventListener('load', checkImg);
        // Put <img> inside <a>, then put image inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray)
    }   catch (error) {
        //Catch error here
    }
}


// Check to see if scrolling near bottom of page, Load more photos

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
            ready = false;
            getPhotos();
        }
    });



// On load
getPhotos();


