let taplistHTML = '<table class="tabela">';
let currentRowHTML = '';
let rowIndex = 0;

// Iterate over the sheetData array
while (rowIndex < sheetData.length) {
  // Reset the counter for the current row
  counter = 0;

  // Iterate over the cells in the current row
  while (counter < sheetData[rowIndex].length) {
    // Check if the cell contains an image URL
    if (typeof sheetData[rowIndex][counter] === 'string' && /^https?:\/\/.*\.(png|jpg|jpeg|gif|svg)$/i.test(sheetData[rowIndex][counter])) {
      tdClass = `tdClass${counter}`;
      counter++;

      // Append an image tag with the class "image" and the generated class
      currentRowHTML += `<td class="${tdClass}"><img src="${sheetData[rowIndex][counter]}" alt="${sheetData[rowIndex][counter]}" /></td>`;
    } else {
      // Only append text cells if there are less than 9 cells in the row
      if (counter <= 8) {
        tdClass = `tdClass${counter}`;
        counter++;
        currentRowHTML += `<td class="${tdClass}">${sheetData[rowIndex][counter]}</td>`;
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
    taplistHTML += `<tr class="${rowClass}">${currentRowHTML}</tr>`;
  }

  currentRowHTML = ''; // Reset the currentRowHTML variable
}

taplistHTML += '</table>';

// Append the generated HTML to the taplist div
document.getElementById('taplist').innerHTML = taplistHTML;
