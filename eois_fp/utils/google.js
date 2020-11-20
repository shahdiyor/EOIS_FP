const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1HMfImH1VZDL1FNwGw2ny6ISoiYOSUR9-OPw-n_Lw8Jo');


async function GetCommonBalance() {
    await doc.useServiceAccountAuth(require('../settings/eoisfp-b24d8a9448a0.json'));
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells('A21:C123');
    let data = [];
    for (let i = sheet.getCellByA1('A21').rowIndex; i < sheet.getCellByA1('C123').rowIndex; i++) {
        data.push({
            name: sheet.getCell(i, 0).value,
            firm: sheet.getCell(i, 1).value,
            balance: sheet.getCell(i, 2).value,
        });
    }
    return data;
}

function summRow(from, to, sheet) {
    let data = [];
    for(let i = sheet.getCellByA1(from).rowIndex; i < sheet.getCellByA1(to).rowIndex;i++)
    {
        let sum = 0;
        for(let j = sheet.getCellByA1(from).columnIndex; j < sheet.getCellByA1(to).columnIndex; j++) {
            
            sum += sheet.getCell(i, j).value;
        }
        data.push(sum);
    }
    return data;
}

async function loadBalanceRows() {
    await doc.useServiceAccountAuth(require('../settings/eoisfp-b24d8a9448a0.json'));
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells('D21:CA123');
    let sport = summRow('D21', 'Q123', sheet);
    let salary = summRow('R21', 'AL123', sheet);
    let best = summRow('AM21', 'AY123', sheet);
    let promotion = summRow('BA21', 'BN123', sheet);
    let penalty = summRow('BO21', 'CA123', sheet);
    return [sport, salary, best, promotion, penalty];
}

doc_fuctions = {
    loadBalanceRows,
    GetCommonBalance 
}

module.exports = doc_fuctions;