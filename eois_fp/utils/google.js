const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1HMfImH1VZDL1FNwGw2ny6ISoiYOSUR9-OPw-n_Lw8Jo');
let participants = [];
let sheet = {};

async function loadDoc() {
    console.log('Connecting to Google Docs start');
    await doc.useServiceAccountAuth(require('../settings/eoisfp-b24d8a9448a0.json'));
    await doc.loadInfo();
    console.log('Connecting to Google Docs end');
}

async function loadParticipants() {
    console.log('Participants loading start');
    sheet = doc.sheetsByIndex[0];
    await sheet.loadCells('A21:A123');
    for (let i = sheet.getCellByA1('A21').rowIndex; i < sheet.getCellByA1('A123').rowIndex; i++) {
        participants.push({
            name: sheet.getCell(i, 0).value,
            row: sheet.getCell(i, 0).a1Row
        });
    }
    console.log('Participants loading end');
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

doc_functions = {
    loadDoc,
    loadBalanceRows,
    loadParticipants 
}

module.exports = doc_functions;