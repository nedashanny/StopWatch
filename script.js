let strtBtn = document.querySelector('.startBtn');
/*counters*/
let counter = document.querySelector('.counters');
let timerText = document.querySelector('.time');
/*stop lap buttons*/
let stopLap = document.querySelector('.stop-lap');
let stopResumeBtn = document.querySelector('.stopResume');
let lapResetBtn = document.querySelector('.lapReset');
/*lap counters*/
let lapCounter = document.querySelector('.lap-counters');
let lapTimerText = document.querySelector('.lap-time');

let list = document.querySelector('#lap-list');

let interval;
let isStart = false;
let miliSecond = 0;
let second = 0;
let minute = 0;
let hour = 0;

let lapInterval;
let lapIsStart = false;
let lapIsRecording = false;
let lapMiliSecond = 0;
let lapSecond = 0;
let lapMinute = 0;
let lapHour = 0;

let secondString = "00";
let minuteString = "00";
let hourString = "00";
let miliSecondString = "00";

let lapSecondString = "00";
let lapMinuteString = "00";
let lapHourString = "00";
let lapMiliSecondString = "00";

let firstLapRecord;

stopLap.style.visibility = "hidden";

strtBtn.addEventListener("click", e => {
    // hide start button
    strtBtn.classList.remove('d-flex');
    strtBtn.classList.add('d-none');
    // show stop and lap buttons
    stopLap.style.visibility = "visible";
    stopLap.classList.add('show');
    // start counting
    interval = setInterval(function() {
        countMiliSeconds();
        makeCounterText();
    }, 10);
    isStart = true;
});

stopResumeBtn.addEventListener('click', e => {
    if (isStart) {
        clearInterval(interval);
        if (lapIsRecording) {
            clearInterval(lapInterval);
        }
        setTextColorTogreen();
    } else {
        interval = setInterval(function() {
            countMiliSeconds();
            makeCounterText();
        }, 10);
        if (lapIsRecording) {
            lapInterval = setInterval(function() {
                countLapMiliSeconds();
                makeLapCounterText();
            }, 10);
        }
        setTextColorToRed();
    }
});

lapResetBtn.addEventListener('click', e => {
    if (e.target.textContent == "Reset" && !isStart) {
        // reset time
        clearFromCounter();
        clearLAPFromCounter();
        // stop counting
        clearInterval(interval);
        clearInterval(lapInterval);
        // show start button
        strtBtn.classList.add('d-flex');
        strtBtn.classList.remove('d-none');
        // hide stop and lap buttons
        stopLap.style.visibility = "hidden";
        // hide lap counter and list
        lapCounter.style.visibility = "hidden";
        list.style.visibility = "hidden";
        list.innerHTML = "";
        // remove css animation
        stopLap.classList.remove('show');
        // show time as was show before click lap button
        counter.classList.remove('lap-is-clicked');
        counter.classList.add('lap-is-not-clicked');
        lapIsRecording = false;
        setTextColorToRed();
    } else if (e.target.textContent == "LAP") {
        // show time as when timer have a lap list
        counter.classList.remove('lap-is-not-clicked');
        counter.classList.add('lap-is-clicked');
        // show lap conter and list
        lapCounter.style.visibility = "visible";
        list.style.visibility = "visible";
        // start counting lap time
        if (!lapIsRecording) {
            lapIsRecording = true;
            lapIsStart = true;
            lapInterval = setInterval(function() {
                countLapMiliSeconds();
                makeLapCounterText();
            }, 10);
            // show lap records list
            list.style.visibility = "visible";
            list.innerHTML = `<li><span class="d-flex justify-content-center">${hourString + ":" + minuteString + ":" + secondString + "." + miliSecondString}</span></li>`;
        } else {
            // reset lap
            clearInterval(lapInterval);
            clearLAPFromCounter();
            // and counting again
            lapInterval = setInterval(function() {
                makeLapCounterText();
                countLapMiliSeconds();
            }, 10);
            // add records to lap list
            let li = document.createElement('li');
            li.innerHTML = `<li><span class="d-flex justify-content-center">${lapHourString + ":" + lapMinuteString + ":" + lapSecondString + "." + lapMiliSecondString}</span></li>`;
            document.querySelector('ul li').append(li);
        }

    }

});

function setTextColorToRed() {
    stopResumeBtn.textContent = "Stop";
    stopResumeBtn.classList.remove('green-text');
    stopResumeBtn.classList.add('red-text');
    lapResetBtn.textContent = "LAP";
    isStart = true;
    if (lapIsRecording) { lapIsStart = true; }
}

function setTextColorTogreen() {
    stopResumeBtn.textContent = "Resume";
    stopResumeBtn.classList.remove('red-text');
    stopResumeBtn.classList.add('green-text');
    lapResetBtn.textContent = "Reset";
    isStart = false;
    if (lapIsRecording) { lapIsStart = false; }
}

// count

function countMiliSeconds() {
    miliSecond++;
    if (miliSecond === 100) {
        miliSecond = 0;
        second++;
        secondString = second < 10 ? "0" + second : second + "";
        countSeconds();
    }
}

function countSeconds() {
    if (second === 59) {
        second = 0;
        minute++;
        minuteString = minute < 10 ? "0" + minute : minute + "";
        countMinutes();
    }
}

function countMinutes() {
    if (minute === 59) {
        minute = 0;
        hour++;
        hourString = hour < 10 ? "0" + hour : hour + "";
        countHours();
    }
}

// LAP

function countLapMiliSeconds() {
    lapMiliSecond++;
    if (lapMiliSecond === 100) {
        lapMiliSecond = 0;
        lapSecond++;
        lapSecondString = lapSecond < 10 ? "0" + lapSecond : lapSecond + "";
        countLapSeconds();
    }
}

function countLapSeconds() {
    if (lapSecond === 59) {
        lapSecond = 0;
        lapMinute++;
        lapMinuteString = lapMinute < 10 ? "0" + lapMinute : lapMinute + "";
        countLapMinutes();
    }
}

function countLapMinutes() {
    if (lapMinute === 59) {
        lapMinute = 0;
        lapHour++;
        lapHourString = lapHour < 10 ? "0" + lapHour : lapHour + "";
        countLapHours();
    }
}

// write time

function makeCounterText() {
    miliSecondString = miliSecond < 10 ? "0" + miliSecond : miliSecond + "";
    let timeText = hourString + ":" + minuteString + ":" + secondString + "." + miliSecondString;
    timerText.textContent = timeText;
}

function makeLapCounterText() {
    lapMiliSecondString = miliSecond < 10 ? "0" + miliSecond : miliSecond + "";
    let timeText = lapHourString + ":" + lapMinuteString + ":" + lapSecondString + "." + lapMiliSecondString;
    lapTimerText.textContent = timeText;
}

// reset

function clearFromCounter() {
    miliSecond = 0;
    second = 0;
    minute = 0;
    hour = 0;
    timerText.textContent = "00:00:00.00"
}

function clearLAPFromCounter() {
    lapMiliSecond = 0;
    lapSecond = 0;
    lapMinute = 0;
    lapHour = 0;
    lapTimerText.textContent = "00:00:00.00"
}