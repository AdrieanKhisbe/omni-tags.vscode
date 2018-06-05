import * as vscode from 'vscode';
import * as path from 'path';
import { keywordTagRegex } from './tags-definitions';

export class OmniTagsNodeProvider implements vscode.TreeDataProvider<OmniTagItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<OmniTagItem | undefined> = new vscode.EventEmitter<OmniTagItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<OmniTagItem | undefined> = this._onDidChangeTreeData.event;

	constructor() {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: OmniTagItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: OmniTagItem): Thenable<OmniTagItem[]> {
		
		return new Promise(resolve => {
			if (element) {
				resolve([]); // No nesting so far
			} else if (vscode.window.activeTextEditor) {
				const document = vscode.window.activeTextEditor.document;
				const pattern = new RegExp(keywordTagRegex, 'g');
				const tags = [];
				let match;
				const documentText = document.getText();
				while (match = pattern.exec(documentText)) {
					console.log(match)
					const range = new vscode.Range(
						document.positionAt(match.index),
						document.positionAt(match.index + match[0].length)
					);
					tags.push(new OmniTagItem(match[0], range, vscode.TreeItemCollapsibleState.None));
				}
				return resolve(tags);
			}
		});
	}

}

class OmniTagItem extends vscode.TreeItem {

	constructor(
		public readonly label: string,
		public readonly range: vscode.Range,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return `${this.label}`
	}

	iconPath = {
		light: path.join(__filename, '..', '..', '..', 'resources', 'light', 'dependency.svg'),
		dark: path.join(__filename, '..', '..', '..', 'resources', 'dark', 'dependency.svg')
	};

	contextValue = 'omni-tags';

}