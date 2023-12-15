
// Function to handle file input change
function handleFileInput(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming the data is in the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet data to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Generate taplist using the parsed data
            generateTaplist(jsonData);
        };

        reader.readAsArrayBuffer(file);
        

    }
}

// Function to generate taplist HTML
function generateTaplist(taps) {
    const taplistElement = document.getElementById('taplist');
    taplistElement.innerHTML = ''; // Clear previous content

    taps.forEach(tap => {
        const tapElement = document.createElement('div');
        tapElement.classList.add('tap');
        tapElement.innerHTML = `<table><div class="torneira">${tap.torneira}</div>
        <br><div class="cerveja">${tap.cerveja}</div>
        <br><div class="estilo">${tap.estilo}</div>
        <br><div class="abv">${tap.abv}</div>
        <br><div class="ibu">${tap.ibu}</div>
        <br><div class="half">${tap.half}</div>
        <br><div class="pint">${tap.pint}</div>
        <br><div class="litro">${tap.litro}</div>
        <br><div><img src="${tap.foto}" alt="${tap.foto} Image"></div></table>`;
        taplistElement.appendChild(tapElement);
       
        
    });
}
