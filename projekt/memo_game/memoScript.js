var level = -1;
var cards = []
var oneVisible = false;
var turnCnt = 0;
var prev = -1;
var lock = false;
var pairsLeft = 0;

var cards_all = ["ciri.jpg", "dettlaff.jpg", "geralt.jpg", "jaskier.jpg", "leszy.jpg", "statek.jpg", "wampir.jpg", "emhyr.jpg", "eredin.jpg", "flag.jpg", "igni.jpg",
    "zoltan.jpg", "balista.jpg", "bear.jpg", "beer.jpg", "deer.jpg",];

setlevel(2);

function revealCard(nr)
{
    var opacityVal = $('#c' + level + '-' + nr).css('opacity');

    if (opacityVal != 0 && lock == false && nr != prev)
    {
        var flip = new Audio("audio/flip.mp4");
        flip.play();

        lock = true;

        var obraz = "url(img/" + cards[nr] + ")";

        $('#c' + level + '-' + nr).css('background-image', obraz);
        $('#c' + level + '-' + nr).addClass('cardRevealed');

        if (oneVisible == false)
        {
            //first card
            oneVisible = true;
            prev = nr;
            lock = false;
        }

        else
        {
            //second card
            if (cards[prev] == cards[nr])
            {
                setTimeout(function () { hide2cards(nr, prev) }, 750);

            }
            else
            {
                setTimeout(function () { restore2cards(nr, prev) }, 1000);
            }

            $('.score').html('Turn counter: ' + ++turnCnt);
            oneVisible = false;
        }
    }
}

function hide2cards(n1, n2)
{
    $('#c' + level + '-' + n1).addClass('cardHidden');
    $('#c' + level + '-' + n2).addClass('cardHidden');

    pairsLeft--;

    if (pairsLeft == 0)
    {
        $('#levels').css('display', 'none');
        $('#restart').css('display', 'flex');
        $('.score').css('display', 'none');
        $('.board').html('<h1>You <span style="color: green;">win</span>!<br>Done in ' + turnCnt + ' turns.</h1>');
        $('.board').css('width', 470);
        $('.board').css('font-family', 'Poppins');
        $('h1').css('Letter-spacing', 0);
    }

    lock = false;
}

function restore2cards(n1, n2)
{
    $('#c' + level + '-' + n1).css('background-image', 'url(img/karta.png)');
    $('#c' + level + '-' + n1).removeClass('cardRevealed');

    $('#c' + level + '-' + n2).css('background-image', 'url(img/karta.png)');
    $('#c' + level + '-' + n2).removeClass('cardRevealed');

    lock = false;
}

function setlevel(level)
{
    if (level != this.level && turnCnt > 0)
    {
        var confirmation = confirm("Are you sure, you want to change the difficulty level?\nAll the progress will be lost.")

        if (!confirmation)
        {
            return;
        }
    }

    if (level != this.level)
    {
        switch (this.level)
        {
            case 1:
                var prev_el_number = 6;
                break;
            case 2:
                var prev_el_number = 12;
                break;
            case 3:
                var prev_el_number = 18;
                break;
            default:
                var prev_el_number = 0;
                break;
        }
        var prev_level = this.level;

        for (var i = 0; i < prev_el_number; i++)
        {
            $('#c' + prev_level + '-' + i).css('background-image', 'url(img/karta.png)');
            $('#c' + prev_level + '-' + i).removeClass('cardRevealed');
            $('#c' + prev_level + '-' + i).removeClass('cardHidden');
        }

        $('#board' + this.level).css('display', 'none');
        this.level = level;
        $('#board' + level).css('display', 'block');

        switch (level)
        {
            case 1:
                var el_number = 6;
                break;
            case 2:
                var el_number = 12;
                break;
            case 3:
                var el_number = 18;
                break;
        }

        pairsLeft = el_number / 2;
        lock = false;
        prev = -1;
        turnCnt = 0;
        oneVisible = false;

        $('.score').html('Turn counter: ' + turnCnt);

        var picked_cards = [];
        while (picked_cards.length < el_number)
        {
            var i = Math.floor(Math.random() * cards_all.length);
            if (picked_cards.indexOf(i) === -1)
            {
                picked_cards.push(i);
                picked_cards.push(i);
            }
        }

        var arr = [];
        while (arr.length < el_number)
        {
            var r = Math.floor(Math.random() * el_number);
            if (arr.indexOf(r) === -1) arr.push(r);
        }

        cards = [];
        for (i = 0; i < el_number; i++)
        {
            cards.push(cards_all[picked_cards[arr[i]]]);
            var el = document.getElementById('c' + level + '-' + i);
            el.addEventListener("click", revealCard.bind(this, i));
        }
    }
}

function resetPage()
{
    location.reload();
}