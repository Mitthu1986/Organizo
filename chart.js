

document.getElementById('billUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const lines = evt.target.result.split('\n');
        const labels = [];
        const data = [];
        for (let line of lines) {
            if (!line.trim()) continue; // Skip empty lines
            const [desc, amount] = line.split(',');
            if (desc && amount) {
                labels.push(desc.trim());
                data.push(Number(amount.trim()));
            }
        }
        const ctx = document.getElementById('billChart').getContext('2d');
        if (window.billChart && typeof window.billChart.destroy === 'function') {
    window.billChart.destroy();
}
       // if (window.billChart) window.billChart.destroy();
        window.billChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Bill Amount',
                    data: data,
                    backgroundColor: '#ff6f61'
                }]
            },
            options: {
                responsive: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    };
    reader.readAsText(file);
});

