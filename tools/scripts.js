// Créer un objet pour stocker les urls précédentes
const previousUrls = [];
let imageIndex = -1;

function afficherContenu(url) {
    const contentContainer = document.getElementById('contentContainer');
    const aContainer = document.getElementById('aContainer');
    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov') || url.endsWith('.MP4')) {
        const video = document.createElement('video');
        video.controls = true;
        video.src = url;
        video.style.maxHeight = window.innerHeight * 0.5 + 'px';
        video.style.maxWidth = window.innerWidth * 0.8 + 'px';
        contentContainer.appendChild(video);
    } else if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif') || url.endsWith('.webp') || url.endsWith('.PNG')) {		
        const image = document.createElement('img');
        image.src = url;
        image.style.maxHeight = window.innerHeight * 0.5 + 'px';
        image.style.maxWidth = window.innerWidth * 0.8 + 'px';
        contentContainer.appendChild(image);
    } else {
        contentContainer.textContent = 'Le format de fichier n\'est pas pris en charge : ' + url;
    }

    // Change image source
    aContainer.href = url;
}

function obtenirNouvelleUrl() {
    fetch('https://api.eylexander.xyz/')
        .then(response => response.json())
        .then(data => {
            const url = data.url;
            const contentContainer = document.getElementById('contentContainer');
            contentContainer.innerHTML = '';
            afficherContenu(url);

            // Ajouter l'url actuelle à previousUrls
            previousUrls.push(url);
            imageIndex = previousUrls.length - 1;
        })
        .catch(error => {
            console.error('Erreur :', error);
        });				
}

// Appeler la fonction obtenirNouvelleUrl() lorsque le bouton est cliqué
document.getElementById('bouton-afficher').addEventListener('click', obtenirNouvelleUrl);

// Retourne à l'url précédente
document.getElementById('previousUrl').addEventListener('click', function() {
    const contentContainer = document.getElementById('contentContainer');

    // Si l'index est inférieur ou égal à 0, ne rien faire
    if (imageIndex <= 0) return;
    imageIndex--;

    // Remplacer le contenu du contentContainer par l'url précédente
    contentContainer.innerHTML = '';
    afficherContenu(previousUrls[imageIndex]);
});

// Appeler la fonction obtenirNouvelleUrl() une première fois au chargement de la page
obtenirNouvelleUrl();