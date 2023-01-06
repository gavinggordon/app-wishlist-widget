// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: plus;
// get input data
const PARAM_DATA = args.shortcutParameter

const FM = FileManager.local()
const LIB_DIR = FM.libraryDirectory()
const SAVE_DIR_NAME = 'appwishlistwidget'
const SAVE_DIR_PATH = FM.joinPath(LIB_DIR, SAVE_DIR_NAME)
const DB_FNAME = 'appwishlist_db.json'
const DB_FPATH = FM.joinPath(SAVE_DIR_PATH, DB_FNAME)

let resp
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

if(!FM.fileExists(SAVE_DIR_PATH) || !FM.isDirectory(SAVE_DIR_PATH)){
		FM.createDirectory(SAVE_DIR_PATH)
}
if(!FM.fileExists(DB_FPATH)){
		FM.writeString(DB_FPATH, '{}')
}

wishlistjson = await FM.readString(DB_FPATH)
wishlist = JSON.parse(wishlistjson)

if(wishlistitemkey in wishlist){
	resp = appname + ' has already been added to your wishlist.'
	Script.setShortcutOutput(resp)
	Script.complete()
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
	FM.writeString(DB_FPATH, updatedwishlistjson)
	resp = appname + ' has been added to your wishlist.'
	Script.setShortcutOutput(resp)
	Script.complete()
}



