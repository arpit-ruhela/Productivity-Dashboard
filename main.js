function openfeatures () {
    let allElems = document.querySelectorAll(".elem")
    let allfullElem = document.querySelectorAll(".fullElem")
    let allfullElembckbtn = document.querySelectorAll('.bckbtn')
    

    allElems.forEach((elem) =>{
        elem.addEventListener('click' , ()=>{
            allfullElem[elem.id].style.display = "block"
        })
    })

    allfullElembckbtn.forEach((bckbtn)=>{
    bckbtn.addEventListener('click', ()=>{
        allfullElem[bckbtn.id].style.display = "none"
    })
})
}
openfeatures();


function todolist() {

    let currenttask = []

    if (localStorage.getItem('currenttask')) {
        currenttask = JSON.parse(localStorage.getItem('currenttask'))
    } else {
        console.log('Task list is Empty');
    }


function showTasks() {
    let alltasks = document.querySelector('.alltask')
    let sum = "";

    currenttask.forEach(function (elem,idx) {

        sum += `
            <div class="task">
                <h5>${elem.task}</h5>
                <button id=${idx}>mark as completed</button>
            </div>
        `;
    });

    alltasks.innerHTML = sum;

    localStorage.setItem(
            "currenttask",
            JSON.stringify(currenttask)
    );

    document.querySelectorAll(".task button").forEach(function(btn){
    btn.addEventListener("click", function(){
        currenttask.splice(btn.id, 1);
        showTasks();
    });
});

}

showTasks(); 

let form = document.querySelector('.add-task form')
let taskinput = document.querySelector('.add-task form input')
let taskDetails = document.querySelector('.add-task form textarea')

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (taskinput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    currenttask.push({
        task: taskinput.value,
        details: taskDetails.value,
    });


    showTasks();

    console.log(currenttask);

    // inputs clear
    taskinput.value = "";
    taskDetails.value = "";
})
}

todolist()

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
</div>`
    })

    dayPlanner.innerHTML = wholeDaySum


    var dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            console.log('hello');
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner()


function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2') 

    async function fetchQuote() {
        let response = await fetch('https://dummyjson.com/quotes/random')
        let data = await response.json()
        console.log(data)

        motivationQuoteContent.innerHTML = data.quote
        motivationAuthor.innerHTML = data.author 
    }

    fetchQuote()
}
motivationalQuote()


function pomodoroTimer() {


    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-btn')
    var pauseBtn = document.querySelector('.pomo-timer .pause-btn')
    var resetBtn = document.querySelector('.pomo-timer .reset-btn')
    var session = document.querySelector('.pomodoro-timer-fullpage .session')
    var isWorkSession = true

    let totalSeconds = 25 * 60
    let timerInterval = null

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60
                }
            }, 1000)
        } else {


            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--green)'
                    totalSeconds = 25 * 60
                }
            }, 1000)
        }

    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()

    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)



}

pomodoroTimer()

function weatherFunctionality() {


    // I have removed API key for security purpose
    var apiKey = '2f0a6a61ad1947028be110244262506'
    var city = 'Mumbai'



    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
     var cityName = document.querySelector(".header1 .city");

    var header2Temp = document.querySelector('.header2 h2')
    var header2Condition = document.querySelector('.header2 h4')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')

    var data = null

    async function weatherAPICall(lat, lon) {
        try {

            var response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
            );

            data = await response.json();

            cityName.innerHTML = `${data.location.name}, ${data.location.country}`;

            header2Temp.innerHTML = `${data.current.temp_c}°C`;
            header2Condition.innerHTML = data.current.condition.text;
            wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
            humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
            precipitation.innerHTML = `Heat Index: ${data.current.heatindex_c}°C`;

        } catch (error) {
            console.log(error);
        }
    }

    // Get Current Location
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function (position) {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                weatherAPICall(lat, lon);

            },

            function () {

                cityName.innerHTML = "Location Denied";

            }

        );

    } else {

        cityName.innerHTML = "Location Not Supported";

    }



    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarik} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`

        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

    setInterval(() => {
        timeDate()
    }, 1000);

}

weatherFunctionality()