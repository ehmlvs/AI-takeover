const targetDate = new Date('2036-01-19T00:00:00').getTime();
const display = document.getElementById('hours-display');
const btn = document.getElementById('accelerate-btn');

function updateTimer() {
    const userOffset = parseInt(localStorage.getItem('timeOffset') || 0);
    const now = new Date().getTime();
    const distance = targetDate - now - userOffset;
    
    const hours = Math.floor(distance / (1000 * 60 * 60));
    display.innerText = hours.toLocaleString();
}

btn.onclick = () => {
    let currentOffset = parseInt(localStorage.getItem('timeOffset') || 0);
    localStorage.setItem('timeOffset', currentOffset + (24 * 60 * 60 * 1000));
    updateTimer();
};

setInterval(updateTimer, 1000);
updateTimer();
