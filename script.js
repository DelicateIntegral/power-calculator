const N0 = 500;  // Initial quantity at n=0
const r = 1.6218;  // Growth rate per iteration
let power_Cost = 0;
let power_Strength = N0;
let theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.body.setAttribute('data-theme', theme);

function powerStrength() {
    const n = parseInt(document.getElementById('cost').value);
    if (isNaN(n) || n < 0 || n > 100) {
        alert('Please enter a valid number between 0 and 100.');
        return;
    }
    power_Cost = n;
    const Nn = N0 * Math.exp(r * n);
    const relativeStrength = Nn / N0;
    power_Strength = relativeStrength;
    const relativeStrengthFormatted = formatScientific(relativeStrength);
    
    document.getElementById('power-strength').innerHTML = `This is ${relativeStrengthFormatted} times stronger than 0 PP`;
}

function calculatePower() {
    const n = parseInt(document.getElementById('iteration').value);
    if (isNaN(n) || n < power_Cost || n > 1000000) {
        alert('Please enter a valid number between your power cost and 1000000.');
        return;
    }

    const Nn = N0 * Math.exp(r * n);
    const relativeStrength = (Nn / N0) / power_Strength;

    const relativeStrengthFormatted = formatScientific(relativeStrength);

    document.getElementById('relative-strength').innerHTML = `This is ${relativeStrengthFormatted} times stronger than your initial power.`;
}

function formatScientific(number) {
    const exponent = Math.floor(Math.log10(number));
    const mantissa = number / Math.pow(10, exponent);
    return `${mantissa.toFixed(2)} * 10^${exponent}`;
}

function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    document.getElementById('themeToggle').textContent = theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme';
    // Store the user's preference in local storage
    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.body.setAttribute('data-theme', theme);
    document.getElementById('themeToggle').textContent = theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme';
});

// Add event listener for the Enter key on the input field
document.getElementById('cost').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        powerStrength();
    }
});

// Add event listener for the Enter key on the input field
document.getElementById('iteration').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculatePower();
    }
});


