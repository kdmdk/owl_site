


//テーブルソート
(function () {
    'use strict';
    var ths = document.getElementsByTagName('th');
    var sortOrder = 1; //1:昇順、-1:降順

    function rebuildTbody(rows) {
        var tbody = document.querySelector('tbody');
        var i;
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        for (i = 0; i < rows.length; i++) {
            tbody.appendChild(rows[i]);
        }
    }

    function updateClassName(th) {
        var k;
        for (k = 0; k < ths.length; k++) {
            ths[k].className = '';
        }
        th.className = sortOrder === 1 ? 'asc' : 'desc';
    }

    function compare(a, b, col, type) {
        var _a = a.children[col].textContent;
        var _b = b.children[col].textContent;
        if (type === "number") {
            _a = _a * 1;
            _b = _b * 1;
        } else if (type === "string") {
            _a = _a.toLowerCase();
            _b = _b.toLowerCase();
        }
        if (_a < _b) {
            return -1;
        }
        if (_a > _b) {
            return 1;
        }
        return 0;
    }

    function sortRows(th) {
        var rows = Array.prototype.slice.call(document.querySelectorAll('tbody > tr'));
        var col = th.cellIndex;
        var type = th.dataset.type; //string,number
        rows.sort(function (a, b) {
            return compare(a, b, col, type) * sortOrder;
        });
        return rows;
    }

    function setup() {
        var i;
        for (i = 0; i < ths.length; i++) {
            ths[i].addEventListener('click', function () {
                var rows;
                rows = sortRows(this);
                rebuildTbody(rows);
                updateClassName(this);
                sortOrder *= -1;
            });
        }
    }
    setup();
})();
//スライダー
(function () {
    'use strict';


    var files = [
        'myimg/owl001.jpg',
        'myimg/owl002.jpg',
        'myimg/owl003.jpg',
        'myimg/owl004.jpg',
        'myimg/owl005.jpg',
        'myimg/owl006.jpg',
        'myimg/owl007.jpg',
        'myimg/owl008.jpg',
        'myimg/owl009.jpg',
        'myimg/owl010.jpg',
        'myimg/owl011.jpg',
        'myimg/owl012.jpg',
        'myimg/owl013.jpg',
        'myimg/owl014.jpg',
        'myimg/owl015.jpg',
        'myimg/owl016.jpg',
        'myimg/owl017.jpg',
        'myimg/owl018.jpg',
        'myimg/owl019.jpg',
        'myimg/owl020.jpg',
        'myimg/owl021.jpg',
        'myimg/owl022.jpg',
        'myimg/owl023.jpg',
        'myimg/owl024.jpg',
        'myimg/owl025.jpg'
    ];

    var capNum = [
        'owl001',
        'owl002',
        'owl003',
        'owl004',
        'owl005',
        'owl006',
        'owl007',
        'owl008',
        'owl009',
        'owl011',
        'owl012',
        'owl013',
        'owl014',
        'owl015',
        'owl016',
        'owl017',
        'owl018',
        'owl019',
        'owl020',
        'owl021',
        'owl022',
        'owl023',
        'owl024',
        'owl025',
    ];
    var currentNum = 0;
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var target = document.getElementById('target');
    var thumbnails = document.getElementById('thumbnails');

    var play = document.getElementById('play');
    var pause = document.getElementById('pause');
    var timer;

    var SLIDESHOW_DURATION = 1500;

    var CLASS_CURRENT = 'current';
    var CLASS_HIDDEN = 'hidden';
    var CLASS_NONE = '';

    var owlno = document.getElementById('owl001');

    function createThumbnails() {
        var i;
        var li;
        var img;
        for (i = 0; i < files.length; i++) {
            li = document.createElement('li');
            //li.setAttribute('data-index', i);
            li.dataset.index = i;
            li.addEventListener('click', function () {
                target.src = this.children[0].src;
                thumbnails.children[currentNum].className = CLASS_NONE;
                currentNum = this.dataset.index;
                this.className = CLASS_CURRENT;
            });

            img = document.createElement('img');
            img.src = files[i];
            li.appendChild(img);
            thumbnails.appendChild(li);

            
            function CapMove() {
                //capNum.className = CLASS_HIDDEN;
                //capNum[i].className = CLASS_NONE;
                owlno.className = CLASS_HIDDEN;
            }
        }
    }
    

            

    function playSlideshow() {
        timer = setTimeout(function () {
            next.click();
            playSlideshow();
        }, SLIDESHOW_DURATION);
    }

    createThumbnails();


    thumbnails.children[currentNum].className = CLASS_CURRENT;

    prev.addEventListener('click', function () {
        thumbnails.children[currentNum].className = CLASS_NONE;
        currentNum--;
        if (currentNum < 0) {
            currentNum = files.length - 1;
        }
        target.src = files[currentNum];
        thumbnails.children[currentNum].className = CLASS_CURRENT;
    });

    next.addEventListener('click', function () {
        thumbnails.children[currentNum].className = CLASS_NONE;
        currentNum++;
        if (currentNum > files.length - 1) {
            currentNum = 0;
        }
        target.src = files[currentNum];
        thumbnails.children[currentNum].className = CLASS_CURRENT;
    });

    play.addEventListener('click', function () {
        playSlideshow();
        this.className = CLASS_HIDDEN;
        pause.className = CLASS_NONE;
    });

    pause.addEventListener('click', function () {
        clearTimeout(timer);
        this.className = CLASS_HIDDEN;
        play.className = CLASS_NONE;
    });
    

})();
