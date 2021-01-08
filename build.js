
const packager = require('electron-packager');
const bash = require('shelljs');

var options = {
    'arch': 'x64',  // all ia32 x64 armv71 arm64
    'platform': 'win32', // all darwin linux mas win32
    //'tmpdir': false, // or path
    'dir': __dirname,
    //'app-copyright': 'Logical Factory', // The human-readable copyright line for the app. Maps to the LegalCopyright metadata property on Windows, and NSHumanReadableCopyright on macOS.
    //'app-version': '0.0.6', // By default the version property in the package.json is used, but it can be overridden with this argument. If neither are provided, the version of Electron will be used. Maps to the ProductVersion metadata property on Windows, and CFBundleShortVersionString on macOS.
    'asar': true,
    'icon': './www/favicon.ico',
    //'name': '[Name]',
    'out': './build', // Gitignore this dir.
    'overwrite': true,
    'prune': true,
    //'version': '1.3.4',
    //'version-string': {
    //    'CompanyName': 'author', // Defaults to the author name from the nearest package.json.
    //    'FileDescription': 'Tierra de colores', // Defaults to either productName or name from the nearest package.json. + This is what display windows on task manager, shortcut and process
    //    'OriginalFilename': 'TierraDesktop', // Defaults to the renamed Electron .exe file.
    //    'ProductName': 'Tierra de colores', // Defaults to either productName or name from the nearest package.json.
    //    'InternalName': 'TierraDesktop,' // Defaults to either productName or name from the nearest package.json.
    //}
};

// Use the lines below to build another /www project.
//bash.rm('-rf', './www');
//bash.cp('-rf', 'TARGET_PATH', './www');

packager(options, (err, appPaths) => {
    console.log("Error: ", err);
    console.log("appPaths: ", appPaths);
});


