function download(url, fileName) {
	
	$.mobile.loading(
		"show", {
				text: "download",
				textVisible: true,
				theme: "b",
				textonly: false
	});
	
	var fileTransfer = new FileTransfer();
			
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			
			fileSystem.root.getDirectory("ccn", {create: true, exclusive: false}, function(dirEntry) {
			
				dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
										
					var localPath = fileEntry.fullPath;

					if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
							localPath = localPath.substring(7);
					}

					fileTransfer.download(
						url,
						localPath,
						function(entry) {
							console.log("download complete: " + entry.fullPath);
							$.mobile.loading( "hide" );
							//alert("Download Completato");
						},
						function(error) {
							console.log("download error source " + error.source);
							console.log("download error target " + error.target);
						},
						false,
						{
							headers: {
								"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
							}
						}
				
					); // end of fileTransfer.download
				}); // end of dirEntry.getFile
			
			}); // fileSystem.root.getDirectory
			
		}); // end of window.requestFileSystem
} // end of function download