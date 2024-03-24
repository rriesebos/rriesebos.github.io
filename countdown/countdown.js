const endDate = new Date("2024-06-29T09:50:00").getTime();

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

function fireworks() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
}

function countdown() {
    const now = new Date().getTime();
    const distance = endDate - now;

    days.innerText = Math.floor(distance / day);
    hours.innerText = Math.floor((distance % day) / hour);
    minutes.innerText = Math.floor((distance % hour) / minute);
    seconds.innerText = Math.floor((distance % minute) / second);

    if (distance <= 0) {
        clearInterval(intervalRef);

        document.getElementById("headline").innerText = "Vakantietijd !!!";

        days.innerText = 0;
        hours.innerText = 0;
        minutes.innerText = 0;
        seconds.innerText = 0;

        fireworks();
    }
}

const intervalRef = setInterval(() => countdown(intervalRef), 0);

document.getElementById("source").innerText = label;
