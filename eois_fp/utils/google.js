const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1HMfImH1VZDL1FNwGw2ny6ISoiYOSUR9-OPw-n_Lw8Jo');

let sheet = {};
let participants = [];
let sportColumns = [];
let salaryColumns = [];
let bestColumns = [];
let promotionColumns = [];
let penaltyColumns = [];

async function loadDoc() {
    console.log('Connecting to Google Docs start');
    await doc.useServiceAccountAuth(require('../settings/eoisfp-b24d8a9448a0.json'));
    await doc.loadInfo();
    console.log('Connecting to Google Docs end');
}

async function loadParticipantsWithDays() {
    sheet = doc.sheetsByIndex[0];
    console.log('Cells loading start');
    await sheet.loadCells('A21:A123');
    await sheet.loadCells('D12:CA12');
    console.log('Cells loading end');
    for (let i = sheet.getCellByA1('A21').rowIndex; i <= sheet.getCellByA1('A123').rowIndex; i++) {
        participants.push({
            name: sheet.getCell(i, 0).value,
            row: sheet.getCell(i, 0).a1Row
        });
    }
    let row = sheet.getCellByA1('D12').rowIndex;
    for (let i = sheet.getCellByA1('D12').columnIndex; i <= sheet.getCellByA1('Q12').columnIndex; i++) {
        sportColumns.push({
            day: sheet.getCell(row, i).value,
            column: sheet.getCell(row, i).a1Column
        });
    }
    for (let i = sheet.getCellByA1('R12').columnIndex; i <= sheet.getCellByA1('AL12').columnIndex; i++) {
        salaryColumns.push({
            day: sheet.getCell(row, i).value,
            column: sheet.getCell(row, i).a1Column
        });
    }
    for (let i = sheet.getCellByA1('AM12').columnIndex; i <= sheet.getCellByA1('AY12').columnIndex; i++) {
        bestColumns.push({
            day: sheet.getCell(row, i).value,
            column: sheet.getCell(row, i).a1Column
        });
    }
    for (let i = sheet.getCellByA1('BA12').columnIndex; i <= sheet.getCellByA1('BN12').columnIndex; i++) {
        promotionColumns.push({
            day: sheet.getCell(row, i).value,
            column: sheet.getCell(row, i).a1Column
        });
    }
    for (let i = sheet.getCellByA1('BO12').columnIndex; i <= sheet.getCellByA1('CA12').columnIndex; i++) {
        penaltyColumns.push({
            day: sheet.getCell(row, i).value,
            column: sheet.getCell(row, i).a1Column
        });
    }
}

function summRow(row, from, to, sheet) {
    let sum = 0;
    for (let j = sheet.getCellByA1(from).columnIndex; j < sheet.getCellByA1(to).columnIndex; j++) {
        sum += sheet.getCell(row, j).value;
    }
    return sum;
}

async function loadBalanceRows(name) {
    let participant = participants.find(p => p.name == name);
    let row = participant.row;
    console.log(`A${row}:CA${row}`);
    let range = `A${row}:CA${row}`;
    console.log(range);
    await sheet.loadCells(range);
    console.log(sheet.cellStats);
    let sport = summRow(row - 1, `D${row}`, `Q${row}`, sheet);
    let salary = summRow(row - 1, `R${row}`, `AL${row}`, sheet);
    let best = summRow(row - 1, `AM${row}`, `AY${row}`, sheet);
    let promotion = summRow(row - 1, `BA${row}`, `BN${row}`, sheet);
    let penalty = summRow(row - 1, `BO${row}`, `CA${row}`, sheet);
    return {
        name,
        firm: sheet.getCellByA1(`B${row}`).value,
        balance: sheet.getCellByA1(`C${row}`).value,
        sport,
        salary,
        best,
        promotion,
        penalty
    };
}

async function editCell(name, day, reason, value) {
    let row = participants.find(p => p.name == name).row;
    let column = '';
    if (reason === 'sport') {
        column = sportColumns.find(c => c.day == day).column;
    } else if (reason === 'salary') {
        column = salaryColumns.find(c => c.day == day).column;
    } else if (reason === 'best') {
        column = bestColumns.find(c => c.day == day).column;
    } else if (reason === 'promotion') {
        column = promotionColumns.find(c => c.day == day).column;
    } else {
        column = penaltyColumns.find(c => c.day == day).column;
    }
    console.log(column + row);
    await sheet.loadCells(column + row);
    sheet.getCellByA1(column + row).value = value;
    sheet.saveUpdatedCells();
}

doc_functions = {
    loadDoc,
    loadBalanceRows,
    loadParticipantsWithDays,
    editCell 
}

module.exports = doc_functions;