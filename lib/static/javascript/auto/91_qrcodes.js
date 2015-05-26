/* This script adds QR codes to EPrints.  It will not work until you make the following changes.
 For use on Individual items, you need to add:
 <img src="" id="qrcode"/>
 <br /><small id="caption"></small>
 to the citation.  You will also need to identify which field has the DOI link with the id "doi" and the field which has the URI with the id "uri".
 You will need to update the references to your DOI prefix (line 33 & line 55) to an appropriate regexp.
 You will need to pad the EPrints ID to the appropriate length (or update this to match your generation code) on lines 51 - 53.
 You may want to make other changes to the style for the Creator QR codes.
*/

/*
 * QR codes for individual items
*/
document.observe("dom:loaded",function(){
	// This looks for a qrcode element to add the qr code to individual records.  You need to add this in to the citation.
	var qr = document.getElementById("qrcode");
	// You may be using the doi field or id field or something else.  Add the id to the citation to pick up the DOI.
    var doilink = document.getElementById( "doi" );
	// If your repository doesn't assign DOIs, you may just want to use the URI.  Again, add the id in the citation to pick up the URI field.
  	var uri = document.getElementById( "uri" );
	// Our DOIs render as links.  If yours don't you'll want to add the prefix http://dx.doi.org/ here to make the DOI into a link
	if (doilink) {
		doilink = doilink.firstChild.getAttribute( "href" );
	}
	if (uri) {
		uri = uri.firstChild.getAttribute( "href" ); 
	}
	if (qr) {
		if (doilink) {
/*
 * WARNING - LOCALIZATION NEEDED HERE
*/
			if ( doilink.search( /10\.[your prefix plus any other defining parts of the DOI]/ ) >= 1 ) { 
				qr.setAttribute( "src", "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" + doilink + "&choe=UTF-8&chld=L&margin=4" );
			} else {
				qr.setAttribute( "src", "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" + uri + "&choe=UTF-8&chld=L&margin=4" );
			}
		} else {
			var uriarray = uri.split("/");
			var epid = uriarray.pop();
			var cgi = window.location.href;
			// This identifies whether the user is on a screen that is likely to be a draft.
			cgi = cgi.split("/");
			cgi = cgi[3];
/*
 * WARNING - LOCALIZATION NEEDED HERE
*/
			if ( cgi == "cgi" ) {
				// Our DOIs are generated from the Eprints ID as per https://github.com/eprintsug/DataCiteDoi but reduced to five digits from the default eight.
				// Change this to the length of padding used if you want to predict the DOI which will be applied - really useful for linking to data from Posters.
				while ( epid.length < 5 ) {
					epid = "0".concat(epid);
				}
			// You will need to include the fixed part of your DOI formula here
			var predicteddoi = "http://dx.doi.org/[your prefix]/[Any other part of the generated DOI that is fixed]" + epid;
			qr.setAttribute( "src", "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" + predicteddoi + "&choe=UTF-8&chld=L&margin=4" );
			// Quiet alert to the user that the QR code won't work until the record is live.
			document.getElementById("caption").innerHTML = "This QR code is not active until the record is published";
			} else {
				qr.setAttribute( "src", "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" + uri + "&choe=UTF-8&chld=L&margin=4" );
			}
		}
	}
});

/*
 * QR Codes for Author profiles
*/

document.observe("dom:loaded",function(){
	// If your view has a different path, you can change that here
	if (window.location.href.search( /view\/creators/ ) >= 1 ) {
		// This was a convenient location in our layout.  You might wish to put it elsewhere.
		var parent = document.getElementsByClassName( "ep_view_creators_type_jump" )[0];
		var qrcode = document.createElement( "img" );
		qrcode.setAttribute( "src", "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" + window.location.href + "&choe=UTF-8&chld=L&margin=4" );
		// Again, your layout might need something different here.
		qrcode.setAttribute( "style", "float: right; margin-top: -25px;" );
		parent.appendChild( qrcode );
	}
});
