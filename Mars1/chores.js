const choreForm = document.getElementById('choreForm');
const choresTable = document.getElementById('choresTable').getElementsByTagName('tbody')[0];
let choresData = {};

choreForm.onsubmit = function(e) {
    e.preventDefault();
    const member = document.getElementById('member').value.trim();
    const chore = document.getElementById('chore').value.trim();
    if (!member || !chore) return;

    // Add to table
    const row = choresTable.insertRow();
    row.insertCell(0).textContent = member;
    row.insertCell(1).textContent = chore;

    // Update data
    choresData[member] = (choresData[member] || 0) + 1;
    updateChart();
    choreForm.reset();
};

let choresChart;
function updateChart() {
    const ctx = document.getElementById('choresChart').getContext('2d');
    const labels = Object.keys(choresData);
    const data = Object.values(choresData);

    if (choresChart && typeof choresChart.destroy === 'function') {
        choresChart.destroy();
    }
    choresChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Chores',
                data: data,
                backgroundColor: '#4fc3f7'
            }]
        },
        options: {
            responsive: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// ...existing code...

function getChoresRows() {
    const rows = [];
    const table = document.getElementById('choresTable');
    // Get headers
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
    rows.push(headers.join(','));
    // Get table rows
    const trs = table.querySelectorAll('tbody tr');
    trs.forEach(tr => {
        const cells = Array.from(tr.querySelectorAll('td')).map(td => td.textContent);
        rows.push(cells.join(','));
    });
    return rows;
}

document.getElementById('downloadCsvBtn').onclick = function() {
    const csvContent = getChoresRows().join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chores.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

document.getElementById('downloadTxtBtn').onclick = function() {
    const txtContent = getChoresRows().join('\n');
    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chores.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};