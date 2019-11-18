var html = document.getElementsByTagName('html')[0];
var removeLoading = function() {
	// In a production application you would remove the loading class when your
	// application is initialized and ready to go.  Here we just artificially wait
	// 3 seconds before removing the class.
	setTimeout(function() {
		html.className = html.className.replace(/loading/, '');
	}, 3000);
};
removeLoading();