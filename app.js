const express = require('express');
const vCardsJS = require('vcards-js');
require('babel-polyfill');
const brandedQRCode = require('branded-qr-code');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/:fName/:lName/:phone/:email/:git', (req, res) => {
  //create a new vCard
  var vCard = vCardsJS();

  //set basic properties shown before
  vCard.firstName = req.params.fName;
  vCard.lastName = req.params.lName;
  vCard.organization = "Strocker Labs";

  vCard.workPhone = req.params.phone;
  vCard.title = 'Software Developer';
  vCard.url = `https://www.github.com/${req.params.git}`;
  vCard.workUrl = 'https://www.strockerlabs.com';

  //set other vitals
  vCard.gender = 'M';
  vCard.role = 'Software Development';

  //set email addresses
  vCard.workEmail = req.params.email;

  //set address information
  vCard.workAddress.label = 'Oficina';
  vCard.workAddress.street = 'Calle Blancos, 200 metros este, 75 metros sur de los Tribunales de Justicia Goicoechea';
  vCard.workAddress.city = 'Goicoechea';
  vCard.workAddress.stateProvince = 'San José';
  vCard.workAddress.postalCode = '10803';
  vCard.workAddress.countryRegion = 'Costa Rica';

  vCard.version = '3.0'; //can also support 2.1 and 4.0, certain versions only support certain fields

  brandedQRCode.generate({ text: vCard.getFormattedString(), path: '../../../strocker.png' })
    .then(qrcode => {
      res.end(qrcode, 'binary');
    })
});

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
})
