const backgroundUrls = [
    "/static/img/MichaelSchauer.jpg",
    "/static/img/TomAndersWatkins.jpg",
    "/static/img/TomHegen.jpg",
    "/static/img/Fotolia_227313925_XL.jpg",
    "/static/img/Fotolia_228669299_XL.jpg",
    "/static/img/TracieChing.jpg",
    "/static/img/Fotolia_247535207_XL.jpg",
    "/static/img/Fotolia_158229208_XL.jpg",
    "/static/img/Fotolia_235948322_XL.jpg",
    "/static/img/Fotolia_188880972_XL.jpg",
]

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.addEventListener('load', () => resolve(image.src));
        image.addEventListener('error', reject);
    });
}

function renderGalleryImagesInto(container) {
    let promises = [];
    for (const backgroundSrc of backgroundUrls) {
        promises.push(loadImage(backgroundSrc).then(function(src) {
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add("swiper-slide");

            const galleryImg = document.createElement('div');
            galleryImg.classList.add("gallery-image");
            galleryImg.style.backgroundImage = `url(${src})`;
            swiperSlide.appendChild(galleryImg);

            container.appendChild(swiperSlide);
        }));
    }
    return Promise.all(promises);
}

document.addEventListener("DOMContentLoaded", async function () {

    const swiperWrapper = document.querySelector(".swiper-wrapper");

    await renderGalleryImagesInto(swiperWrapper);

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        keyboard: {
            enabled: true,
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
});
