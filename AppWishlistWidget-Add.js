// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: plus;

/* 
 *
 * Name: App Wishlist Widget
 * Repo: app-wishlist-widget
 * File: AppWishlistWidget-Add.js
 * Version: 2.0.0
 * Author: Gavin Gordon
 * Github: https://github.com/gavinggordon
 * 
 */
const WIDGET = importModule('AppWishlistWidget-Settings')

// get input data
const PARAM_DATA = args.shortcutParameter

let msg
let wishlist
let wishlistjson
let updatedwishlistjson

// save app info to add to wishlist
let appname = PARAM_DATA.name
let storeid = PARAM_DATA.storeID
let storeurl = PARAM_DATA.storeURL
let artworkurl = PARAM_DATA.artworkURL
let downloadsize = PARAM_DATA.downloadSize
let formattedprice = PARAM_DATA.formattedPrice
// the key of the entry that holds the app info
let wishlistitemkey = 'app' + storeid

if(!WIDGET.FM.fileExists(WIDGET.SAVE_DIR_PATH) || !WIDGET.FM.isDirectory(WIDGET.SAVE_DIR_PATH)){
		WIDGET.FM.createDirectory(WIDGET.SAVE_DIR_PATH)
}
if(!WIDGET.FM.fileExists(WIDGET.DB_FPATH)){
		WIDGET.FM.writeString(WIDGET.DB_FPATH, '{}')
}

wishlistjson = await WIDGET.FM.readString(WIDGET.DB_FPATH)
wishlist = JSON.parse(wishlistjson)

if(wishlistitemkey in wishlist){
	msg = '"' + appname + '" has already been added to the app wishlist.'
} else {
	wishlist[wishlistitemkey] = {
		name: appname,
		storeID: storeid,
		storeURL: storeurl,
		artworkURL: artworkurl,
		downloadSize: downloadsize,
		formattedPrice: formattedprice
	}
	updatedwishlistjson = JSON.stringify(wishlist)
	WIDGET.FM.writeString(WIDGET.DB_FPATH, updatedwishlistjson)
	msg = '"' + appname + '" was added to the app wishlist.'
}

Script.setShortcutOutput(msg)
Script.complete()



