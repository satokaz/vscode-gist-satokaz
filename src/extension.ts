
import * as vscode from 'vscode';
import * as commands from './commands';
import * as request from 'request';
import Gist = require("./api/gist"); 

// import commands = require("./commands");
// import vscode = require('vscode');
// import path = require("path");

function activate(context: vscode.ExtensionContext) {

  configureHttpRequest();
  vscode.workspace.onDidChangeConfiguration(e => configureHttpRequest());

  context.subscriptions.push(vscode.commands.registerCommand('extension.privateGist', commands.createGist.bind(undefined, Gist.Type.PRIVATE)));
  context.subscriptions.push(vscode.commands.registerCommand('extension.publicGist', commands.createGist.bind(undefined, Gist.Type.PUBLIC)));
  context.subscriptions.push(vscode.commands.registerCommand('extension.anonymousGist', commands.createGist.bind(undefined, Gist.Type.ANONYMOUS)));
  context.subscriptions.push(vscode.commands.registerCommand('extension.openGist', commands.openGist));
  context.subscriptions.push(vscode.commands.registerCommand('extension.openStarredGist', commands.openStarredGist));
  context.subscriptions.push(vscode.commands.registerCommand('extension.deleteCurrentGist', commands.deleteCurrentGist));
  context.subscriptions.push(vscode.commands.registerCommand('extension.removeFileFromGist', commands.removeFileFromGist));
  context.subscriptions.push(vscode.commands.registerCommand('extension.addNewFileToGist', commands.addNewFileToGist));
  context.subscriptions.push(vscode.commands.registerCommand('extension.changeGistDescription', commands.changeGistDescription));
  context.subscriptions.push(vscode.commands.registerCommand('extension.openGistInBrowser', commands.openGistInBrowser));

  vscode.workspace.onDidSaveTextDocument(commands.onSave);
} 

exports.activate = activate;

function configureHttpRequest() {
	let httpSettings = vscode.workspace.getConfiguration('http');
  var baseRequest = request.defaults({'proxy': `${httpSettings.get('proxy')}`});
}