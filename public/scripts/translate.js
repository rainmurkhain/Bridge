
let arrLang = {
    en: {
        'home': 'ESTONIAN BRIDGE CLUB',
        'lyhend': 'EBC',
        'calendar': 'Calendar',
        'statistics': 'Statistics',
        'news': 'News',
        'addnews': 'Add News',
        'about': 'About us',
        'tournaments': 'Tournaments'

    },

    et: {
        'home': 'EESTI TURNIIRIBRIDŽI LIIT',
        'lyhend': 'ETBL',
        'calendar': 'Kalender',
        'statistics': 'Statistika',
        'news': 'Uudised',
        'addnews': 'Lisa uudis',
        'about': 'Meist',
        'tournaments': 'Turniirid'

    }
};

$(function () {
    let lang = localStorage.getItem('language');
    changeLanguage(lang);


    $('.translate').click(function () {
        lang = $(this).attr('id');
        localStorage.setItem('language', lang);
        changeLanguage(lang);
        alert("Vajutasid nupule");
    });

    function changeLanguage(lang) {
        $('.lang').each(function (index, element) {
            $(this).text(arrLang[lang][$(this).attr('key')]);
        });
    }

});