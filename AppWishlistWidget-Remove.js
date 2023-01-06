// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: times; share-sheet-inputs: plain-text;
const PARAMS = args.queryParameters
const APP_ID = PARAMS['id']
const FM = FileManager.local()
const LIB_DIR = FM.libraryDirectory()
const SAVE_DIR_NAME = 'appwishlistwidget'
const SAVE_DIR_PATH = FM.joinPath(LIB_DIR, SAVE_DIR_NAME)
const DB_FNAME = 'appwishlist_db.json'
const DB_FPATH = FM.joinPath(SAVE_DIR_PATH, DB_FNAME)

var wishlist
var wishlistjson
var removedAppName
var updatedwishlistjson
var updatedwishlist = {}
let msg
let req
let alert
let action

if(FM.fileExists(DB_FPATH)){
	wishlistjson = await FM.readString(DB_FPATH)
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
	FM.writeString(DB_FPATH, updatedwishlistjson)
	
	req = new Request('shortcuts://run-shortcut?name=AppWishlistWidget-Refresh&refscript=Remove')
	req.method = 'GET'
	await req.load()
	msg = '"' + removedAppName + '" was removes from the app wishlist.'
}

alert = new Alert()
alert.title = 'App Wishlist Widget Notice'
alert.message = msg
alert.addAction('Ok')
action = alert.present()
console.log(action)
Script.complete()
