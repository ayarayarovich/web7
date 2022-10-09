const backgroundUrls = [
    "/static/img/funguy.webp",
    "/static/img/1.png",
    "/static/img/2.png",
    "/static/img/3.png",
    "/static/img/4.png",
    "/static/img/5.png",
    "/static/img/6.png",
    "/static/img/7.png",
    "/static/img/8.png",
    "/static/img/9.png",
    "/static/img/10.png",
    "/static/img/11.png",
    "/static/img/12.png",
    "/static/img/13.png",
    "/static/img/14.png",
    "/static/img/15.png",
    "/static/img/16.png"
];

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', reject);
    });
}

const CPreloaderProgressBar = {
    progress: 0,
    finalProgress: backgroundUrls.length,
    increment() {
        this.progress += 1;
        this.render();
    },
    render() {
        const e_progress = document.querySelector(".my-preloader .my-progress");
        const e_progressBar = document.querySelector(".my-preloader .my-progress-bar");
        const percent = (100 * this.progress / this.finalProgress).toFixed(1);
        e_progress.innerText = `${percent} %`;
        e_progressBar.style.width = `${percent}%`;
    }
}

function renderGalleryImagesInto(container) {
    let promises = [];
    for (const backgroundSrc of backgroundUrls) {
        promises.push(
            loadImage(backgroundSrc).then(function(image) {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add("swiper-slide");
                image.classList.add("gallery-image");
                swiperSlide.appendChild(image);
                container.appendChild(swiperSlide);
                CPreloaderProgressBar.increment();
            })
        );
    }
    return Promise.all(promises);
}

window.addEventListener("load", function () {
    const e_preloader = document.querySelector(".my-preloader");
    setTimeout(() => {
        e_preloader.style.transform = `translateY(-100%)`;
        document.body.style.overflow = "";
    }, 1000);
})

document.addEventListener("DOMContentLoaded", async function () {
    CPreloaderProgressBar.render();

    const swiperWrapper = document.querySelector(".swiper-wrapper");
    await renderGalleryImagesInto(swiperWrapper);

    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        centeredSlides: true,
        spaceBetween: 16,
        keyboard: {
            enabled: true,
        },

        slidesPerView: 1,
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 4,
            },
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
});
