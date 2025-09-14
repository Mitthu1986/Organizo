// Example: Add bill entries to the table
document.getElementById('billForm').onsubmit = function(e) {
    e.preventDefault();
    const desc = document.getElementById('desc').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const table = document.getElementById('billsTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.insertCell(0).textContent = desc;
    row.insertCell(1).textContent = amount;
    row.insertCell(2).textContent = date;
    this.reset();
};

document.getElementById('billForm').onsubmit = function(e) {
    e.preventDefault();
    const desc = document.getElementById('desc').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const table = document.getElementById('billsTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.insertCell(0).textContent = desc;
    row.insertCell(1).textContent = amount;
    row.insertCell(2).textContent = date;
    this.reset();
};

// Download bills as CSV
document.getElementById('downloadBtn').onclick = function() {
    const rows = [];
    const table = document.getElementById('billsTable');
    // Get table headers
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
    rows.push(headers.join(','));
    // Get table rows
    const trs = table.querySelectorAll('tbody tr');
    trs.forEach(tr => {
        const cells = Array.from(tr.querySelectorAll('td')).map(td => td.textContent);
        rows.push(cells.join(','));
    });
    // Create CSV content
    const csvContent = rows.join('\n');
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bills.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};