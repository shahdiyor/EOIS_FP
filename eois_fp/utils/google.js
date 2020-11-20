const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1HMfImH1VZDL1FNwGw2ny6ISoiYOSUR9-OPw-n_Lw8Jo');

async function loadData() {
    await doc.useServiceAccountAuth(require('../settings/eoisfp-b24d8a9448a0.json'));
    await doc.loadInfo();
    console.log(doc.title);
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
async function loadBalanceRows(from, to){
    await doc.useServiceAccountAuth(require('../settings/eoisfp-b24d8a9448a0.json'));
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells(from +':'+to);
    let data_sp=[];

    for(let i = sheet.getCellByA1(from).rowIndex; i<sheet.getCellByA1(to).rowIndex;i++)
    {
        let sum = 0;
        for(let j=sheet.getCellByA1(from).columnIndex; j<sheet.getCellByA1(to).columnIndex; j++) {
            
            sum += sheet.getCell(i, j).value;
        }
        data_sp.push(sum);
    }
    return data_sp;
}

doc_fuctions = {
    loadData,
    loadBalanceRows   
}

module.exports = doc_fuctions;