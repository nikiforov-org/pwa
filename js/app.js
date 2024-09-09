var dataURL = "https://radonezh.ru/ajax/update";

var update = 60000;

var getBitrate = localStorage.getItem("bitrate");

if (getBitrate === null) {
    localStorage.setItem("bitrate", "https://icecast-radonezh.cdnvideo.ru/rad128");
}

var $$ = Dom7;

var app = new Framework7({
    // App Theme
    theme: 'ios',
    // App root element
    root: '#app',
    // App Name
    name: 'Радио «Радонеж»',
    // App id
    id: 'ru.radonezh.radio',
    // Enable swipe panel
    panel: {
        swipe: 'left'
    },
    routes: [
        {
            name: 'about',
            path: '/about/',
            url: './pages/about.html'
        },
        {
            name: 'settings',
            path: '/settings/',
            url: './pages/settings.html',
            on: {
                pageAfterIn: function (e, page) {
                    var getBitrate = localStorage.getItem("bitrate");
                    $$('[name="bitrate"]').each(function () {
                        if (this.value === getBitrate) {
                            this.checked = true;
                        } else {
                            this.checked = false;
                        }
                    });
                    $$('[name="bitrate"]').on("change", function () {
                        localStorage.setItem("bitrate", this.value);
                        location.reload();
                    });
                },
                pageInit: function (e, page) {
                    // do something when page initialized
                }
            }
        }
    ]
});

// Create main view
var mainView = app.views.create('.view-main');


// Получаем URL потока из localStorage
const streamURL = localStorage.getItem('bitrate');

if (!streamURL) {
    alert('Stream URL is not available in localStorage!');
    throw new Error('Stream URL is not available.');
}

// Динамическое создание объекта audio
const audioPlayer = new Audio(streamURL);

// Функции для отображения состояний кнопки
function playView() {
    $$('.r-play-button-play').hide();
    $$('.r-play-button-pause').show();
    $$('.r-play-button-loading').hide();
    $$('.r-block-progress-playback').show();
    $$('.r-block-progress-loading').hide();
}

function pauseView() {
    $$('.r-play-button-play').show();
    $$('.r-play-button-pause').hide();
    $$('.r-play-button-loading').hide();
    $$('.r-block-progress-playback').hide();
    $$('.r-block-progress-loading').show();
}

function loadingView() {
    $$('.r-play-button-play').hide();
    $$('.r-play-button-pause').hide();
    $$('.r-play-button-loading').show();
    $$('.r-block-progress-playback').hide();
    $$('.r-block-progress-loading').show();
}

// Клик по кнопке Play
$$('.r-play-button-play').click(function () {
    loadingView(); // Переход в состояние загрузки
    audioPlayer.play().then(() => {
        playView();  // Переключение в состояние воспроизведения
    }).catch(() => {
        pauseView(); // Переключение в состояние паузы в случае ошибки
    });
});

// Клик по кнопке Pause
$$('.r-play-button-pause').click(function () {
    audioPlayer.pause();
    pauseView();  // Переключение в состояние паузы
});

// Когда поток начал загрузку
audioPlayer.addEventListener('waiting', () => {
    loadingView();
});

// Когда поток воспроизводится
audioPlayer.addEventListener('playing', () => {
    playView();
});

// Когда поток остановлен
audioPlayer.addEventListener('pause', () => {
    pauseView();
});

// Когда поток завершил загрузку данных
audioPlayer.addEventListener('canplay', () => {
    pauseView();
});

// Обработчик ошибок при загрузке потока
audioPlayer.addEventListener('error', () => {
    pauseView();  // Переход в паузу при ошибке
    app.dialog.alert('Проверьте подключение к сети');
});



/*

// Ask Radonezh for playlists using fetch
var getData = function () {
    fetch(dataURL)
        .then(response => response.text())
        .then(responseText => {
            // Parse the response HTML
            var parser = new DOMParser();
            var doc = parser.parseFromString(responseText, "text/html");

            // Remove <span> elements to extract clean text
            var currentElement = doc.querySelector("#current");
            var nextElement = doc.querySelector("#next");

            if (currentElement) {
                var currentSpan = currentElement.querySelector("span");
                if (currentSpan) currentSpan.remove();  // Remove <span>
            }

            if (nextElement) {
                var nextSpan = nextElement.querySelector("span");
                if (nextSpan) nextSpan.remove();  // Remove <span>
            }

            // Extract the text for current and next programs
            var currentDescription = currentElement ? currentElement.textContent.trim() : "N/A";
            var nextDescription = nextElement ? nextElement.textContent.trim() : "N/A";

            // Update the DOM elements with the extracted data
            $$('#playing-now').text(currentDescription);
            $$('#playing-next').text(nextDescription);
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            setTimeout(function () {
                getData();
            }, update);
        });
};

getData();
*/

/*



















// Stream Player
document.addEventListener("online", onOnline, false);
document.addEventListener("offline", onOffline, false);

var isPlaying = false;
var networkError = false;
var audio;

function onOnline() {

    getData();

    init();

    audio.onplaying = function () {
        playView();
        isPlaying = true;
    };

    audio.onpause = function () {
        pauseView();
        isPlaying = false;
    };

    audio.onwaiting = function () {
        loadingView();
    };

    $$('.r-play-button-play').click(function () {
        audio.play();
    });

    $$('.r-play-button-pause').click(function () {
        audio.pause();
    });

    if (networkError === true && isPlaying === true) {
        audio.play();
        networkError = false;
    }

}

function onOffline() {
    networkError = true;
    loadingView();
    app.dialog.alert('Проверьте подключение к сети');
}

function playView() {
    $$('.r-play-button-play').hide();
    $$('.r-play-button-pause').show();
    $$('.r-play-button-loading').hide();
    $$('.r-block-progress-playback').show();
    $$('.r-block-progress-loading').hide();
}

function pauseView() {
    $$('.r-play-button-play').show();
    $$('.r-play-button-pause').hide();
    $$('.r-play-button-loading').hide();
    $$('.r-block-progress-playback').hide();
    $$('.r-block-progress-loading').show();
}

function loadingView() {
    $$('.r-play-button-play').hide();
    $$('.r-play-button-pause').hide();
    $$('.r-play-button-loading').show();
    $$('.r-block-progress-playback').hide();
    $$('.r-block-progress-loading').show();
}

function init() {
    var streamURL = localStorage.getItem("bitrate");

    // If the player is not playing, initialize a new Audio object
    if (!isPlaying) {
        pauseView();
        audio = new Audio(streamURL);
    } else {
        // If the player is already playing, reset and start the new stream
        audio.pause();
        audio.currentTime = 0;
        audio.src = streamURL;
        audio.play();
    }
}

// Update Radonezh playlists data on swipe down
$$('.ptr-content').on('ptr:refresh', function () {
    setTimeout(function () {
        getData();
        // When loading done, we need to reset it
        app.ptr.done(); // or e.detail();
    }, 500);
});

// Redirect on donation page
$$('#donate').on('click', function () {
    var json = app.form.convertToData('#donation');
    var product_price = json.sum;
    if (parseInt(product_price) > 0) {
        var sign = md5(product_id + "-" + product_price + secret);
        var donateUrl = host + "?product_id=" + product_id + "&product_price=" + product_price + "&sign=" + sign;
        window.open(donateUrl, '_system')
    } else {
        keypad.open();
    }
});
*/