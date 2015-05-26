# qrcodes
A JavaScript starter for adding QR codes to EPrints

This script adds QR codes to EPrints, and is designed for individual items and creator profiles.  It has come from requests to be able to include QR codes for datasets in conference posters and other physical research outputs.

It uses the Google Charts QR Code Generation API: [https://developers.google.com/chart/infographics/docs/qr_codes](https://developers.google.com/chart/infographics/docs/qr_codes)

Because it requires some updates to citations, you will need to make some changes in order for it to work.

## Individual items

### Citation updates
For use on Individual items, you need to add:
``` html
<img src="" id="qrcode"/>
<br /><small id="caption"></small>
```
or similar to the citation.

You will also need to identify which field has the DOI link with the id "doi" and the field which has the URI with the id "uri".

### Updates to 91_qrcodes.js

You will need to update the references to your DOI prefix (line 33 & line 55) to an appropriate regexp.

You will need to pad the EPrints ID to the appropriate length (or update this to match your unique DOI generation code) on lines 51 - 53.

## Creator / Author pages

You will need to check that the URL matches the pattern described ( i.e. view/creators ), and may need to check the class to which the QR code is appended.

You may want to make other changes to the style for the Creator QR codes.