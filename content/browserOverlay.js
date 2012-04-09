
!function() {
	var prefManager = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);

	var allowed = prefManager.getCharPref('extensions.enablecontextperdomain.domains');

	/*prefManager.QueryInterface(Components.interfaces.nsIPrefBranch2); 
	prefManager.addObserver('extensions.EnableContextPerDomain.domains', function() {
		allowed = prefManager.getCharPref('extensions.EnableContextPerDomain.domains');
		window.alert(allowed);
	}), false);  
	prefManager.QueryInterface(Components.interfaces.nsIPrefBranch);*/

	gBrowser.addProgressListener({
		onLocationChange: function(aProgress, aRequest, aURI) {
			if (allowed.indexOf(',' + gBrowser.contentDocument.location.host + ',') > -1) {
				prefManager.setBoolPref('dom.event.contextmenu.enabled', true);
			} else {
				prefManager.setBoolPref('dom.event.contextmenu.enabled', false);
			}
		},
		onStateChange: function(a, b, c, d) {},
		onProgressChange: function(a, b, c, d, e, f) {},
		onStatusChange: function(a, b, c, d) {},
		onSecurityChange: function(a, b, c) {}
	}, Components.interfaces.nsIWebProgress.NOTIFY_LOCATION);
}();
