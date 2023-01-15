// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: times; share-sheet-inputs: plain-text;

/* 
 *
 * Name: App Wishlist Widget
 * Repo: app-wishlist-widget
 * File: AppWishlistWidget-Remove.js
 * Version: 2.0.0
 * Author: Gavin Gordon
 * Github: https://github.com/gavinggordon
 * 
 */
const WIDGET = importModule('AppWishlistWidget-Settings')
const PARAMS = args.queryParameters
const APP_ID = PARAMS['id']

var wishlist
var wishlistjson
var removedAppName
var updatedwishlistjson
var updatedwishlist = {}
let msg
let req
let alert
let action

if(WIDGET.FM.fileExists(WIDGET.DB_FPATH)){
	wishlistjson = await WIDGET.FM.readString(WIDGET.DB_FPATH)
}

wishlist = JSON.parse(wishlistjson)

for(const [key, value] of Object.entries(wishlist)){
	if(key != APP_ID){
		updatedwishlist[key] = value
	} else {
		removedAppName = value.name
	}
}

if(APP_ID in updatedwishlist){
	msg = 'Unable to remove "' + removedAppName + '" from the app wishlist.'
} else {
	updatedwishlistjson = JSON.stringify(updatedwishlist)
	WIDGET.FM.writeString(WIDGET.DB_FPATH, updatedwishlistjson)
	
	req = new Request(WIDGET.SHORTCUTS_REFRESH_SHORTCUT_URL)
	req.method = 'GET'
	await req.load()
	msg = '"' + removedAppName + '" was removes from the app wishlist.'
}

alert = new Alert()
alert.title = WIDGET.TITLE + ' Notice'
alert.message = msg
alert.addAction('Ok')
action = alert.present()
Script.complete()
