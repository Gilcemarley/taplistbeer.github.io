function handleFileInput(event) {
  event.preventDefault(); // prevent form submission from refreshing the page
  const fileInput = event.target.elements[0];
  const file = fileInput.files[0]; // get the selected file
  const reader = new FileReader(); // create a file reader

  // define the function to be called when the file has been successfully read
  reader.onload = function (e) {
    const data = e.target.result; // get the data from the file reader
    const workbook = XLSX.read(data, { type: 'binary' }); // read the data into a workbook using the xlsx library
    const sheetName = workbook.SheetNames[0]; // get the name of the first sheet in the workbook
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }); // convert the sheet data into an array of arrays using the xlsx library






    // generate HTML to display the taplist
    let taplistHTML = '<table class="tabela">';

    let currentRowHTML = '';
    let rowIndex = 0;

    // Iterate over the sheetData array
    for (let i = 0; i < sheetData.length; i++) {

      let counter = 0;

      // Iterate over the cells in the current row
      for (let j = 0; j < sheetData[i].length; j++) {
        // Check if the cell contains an image URL
        if (typeof sheetData[i][j] === 'string' && /^https?:\/\/.*\.(png|jpg|jpeg|gif|svg)$/i.test(sheetData[i][j])) {
          let tdClass = `tdClass${counter}`;
          counter++;
          // Append an image tag with the class "image" and the generated class
          currentRowHTML += `<td class="${tdClass}"><img src="${sheetData[i][j]}" alt="${sheetData[i][j]}" /></td>`;
        } else {
          //if (counter === sheetData[i][j].length) {
          if (counter <= 8) {
            let tdClass = `tdClass${counter}`;
            counter++;
            let tdTag = `<td class="${tdClass}">${sheetData[i][j]}</td>`;
            currentRowHTML += tdTag;

          } else {
            break;

          }

        }

      }

      // Create a unique class for the current row
      rowClass = `rowClass${rowIndex}`;
      rowIndex++;

      // Append the row HTML with the unique class to the taplistHTML variable
      if (currentRowHTML) {
        taplistHTML += `<tr id="${rowClass}">${currentRowHTML}</tr>`;
      }

      currentRowHTML = ''; // Reset the currentRowHTML variable
    }

    taplistHTML += '</table>';
    // Append the generated HTML to the taplist div
    document.getElementById('taplist').innerHTML = taplistHTML;
  }





  // read the file
  reader.readAsBinaryString(file);
  var element = document.getElementById("inputfile"); // notice the change
  element.parentNode.removeChild(element);
  var element2 = document.getElementById("buttonfile"); // notice the change
  element2.parentNode.removeChild(element2);
  var element3 = document.getElementById("formpost"); // notice the change
  element3.parentNode.removeChild(element3);
}


