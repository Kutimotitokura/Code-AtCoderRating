// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const client = require('cheerio-httpcli');

var rating = "0";

var statusBarRating = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

var getAtCoderRating = function () {
    var username = vscode.workspace.getConfiguration('atcoderrating').get('username');
    client.fetch(`https://beta.atcoder.jp/users/${username}`, {}, function (err, $, res) {
        console.log(res.headers);

        console.log($('title').text());
        console.log($('#main-container > div > div.col-sm-8 > table > tr:nth-child(2) > td').html());
        rating = $('#main-container > div > div.col-sm-8 > table > tr:nth-child(2) > td > span').html();
        statusBarRating.hide();
        statusBarRating.text = `${username}:${rating}`;
        statusBarRating.color = ['gray','brown','green','cyan','#494cff','yellow','orange','red'][Math.min(Math.floor(parseInt(rating) / 400),7)];
        statusBarRating.show();
    });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "code-atcoderrating" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    getAtCoderRating();


    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;