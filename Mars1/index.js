

// Entry point
function main() {
    console.log('Hello, Mars!');
}

document.getElementById('theme').onclick = function() {
    document.body.classList.toggle('light-mode');
    this.textContent = document.body.classList.contains('light-mode') ? '🌙 Mode' : '☀️ Mode';
};
main();