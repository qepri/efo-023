async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok' + response.statusText);
        const jsonData = await response.json(); // directly parse JSON
        createTable(jsonData);
    } catch (error) {
        console.error('Error fetching or parsing JSON', error);
    }
}

function createTable(data) {
    const container = document.getElementById('table-container');
    if(!container) {
        console.error('Container element not found');
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'table table-bordered';
    
    // Create Table Head
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Assuming data is an array and has at least one object
    if(data.length && typeof data[0] === 'object') {
        for(const key in data[0]) {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create Table Body
    const tbody = document.createElement('tbody');
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        for(const key in row) {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    
    container.appendChild(table);
}

// Call the fetchJSON function with the URL of your JSON file
fetchJSON('assets/js/EFO023.json');
