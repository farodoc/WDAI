var request = new XMLHttpRequest();
request.open("GET", "questions.json", false);
request.send(null)
var questions = JSON.parse(request.responseText);

var total_que_number = 10;
var picked_questions = [];
pick_questions();

const start_btn = document.querySelector(".start_btn button");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const quit_btn = document.querySelector(".quit");

start_btn.onclick = () =>
{
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

var timeValue = 15;
var que_count = 0;
var que_numb = 1;
var userScore = 0;
var counter;
var counterLine;
var widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");

restart_quiz.onclick = () =>
{
    location.reload();
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () =>
{
    if (que_count < total_que_number - 1)
    {
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    }

    else
    {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showQuetions(index)
{
    const que_text = document.querySelector(".que_text");

    var idx = picked_questions[index];

    var que_tag = '<span>' + questions[idx].question + '</span>';
    var option_tag = '<div class="option"><span>' + questions[idx].A + '</span></div>'
        + '<div class="option"><span>' + questions[idx].B + '</span></div>'
        + '<div class="option"><span>' + questions[idx].C + '</span></div>'
        + '<div class="option"><span>' + questions[idx].D + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");

    for (i = 0; i < option.length; i++)
    {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer)
{
    var idx = picked_questions[que_count];
    clearInterval(counter);
    clearInterval(counterLine);
    var userAns = answer.textContent;
    var correctAns = questions[idx].answer;
    switch (correctAns)
    {
        case "A":
            correctAns = questions[idx].A;
            break;

        case "B":
            correctAns = questions[idx].B;
            break;

        case "C":
            correctAns = questions[idx].C;
            break;

        case "D":
            correctAns = questions[idx].D;
            break;
    }

    const allOptions = option_list.children.length;

    if (userAns == correctAns)
    {
        userScore += 1;
        answer.classList.add("correct");
    }

    else
    {
        answer.classList.add("incorrect");

        for (i = 0; i < allOptions; i++)
        {
            if (option_list.children[i].textContent == correctAns)
            {
                option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }

    for (i = 0; i < allOptions; i++)
    {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult()
{
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    var scoreTag = '<span>You got <p>' + userScore + '</p> out of <p>' + total_que_number + '</p></span>';
    scoreText.innerHTML = scoreTag;
}

function startTimer(time)
{
    counter = setInterval(timer, 1000);
    function timer()
    {
        timeCount.textContent = time;
        time--;
        if (time < 9)
        {
            var addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0)
        {
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            var correctAns = questions[que_count].answer;
            switch (correctAns)
            {
                case "A":
                    correctAns = questions[que_count].A;
                    break;

                case "B":
                    correctAns = questions[que_count].B;
                    break;

                case "C":
                    correctAns = questions[que_count].C;
                    break;

                case "D":
                    correctAns = questions[que_count].D;
                    break;
            }

            for (i = 0; i < allOptions; i++)
            {
                if (option_list.children[i].textContent == correctAns)
                {
                    option_list.children[i].setAttribute("class", "option correct");
                }
            }

            for (i = 0; i < allOptions; i++)
            {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time)
{
    counterLine = setInterval(timer, 29);
    function timer()
    {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549)
        {
            clearInterval(counterLine);
        }
    }
}

function queCounter(idx)
{
    var totalQueCounTag = '<span><p>' + idx + '</p> of <p>' + total_que_number + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

function pick_questions()
{
    while (picked_questions.length < total_que_number)
    {
        var i = Math.floor(Math.random() * questions.length);
        if (picked_questions.indexOf(i) === -1)
        {
            picked_questions.push(i);
        }
    }
}