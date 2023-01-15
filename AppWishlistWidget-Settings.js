// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: cogs;

/* 
 *
 * Name: App Wishlist Widget
 * Repo: app-wishlist-widget
 * File: AppWishlistWidget-Settings.js
 * Version: 2.0.0
 * Author: Gavin Gordon
 * Github: https://github.com/gavinggordon
 * 
 */

/*
 * Set the widget size as:
 * 'SMALL', 'MEDIUM', or 'LARGE'
 */
let widget_size = 'LARGE'

class AppWishlistWidgetSettings {
	_INSTANCE = null
	_SIZES = {
		SMALL: 507,
		MEDIUM: 1080,
		LARGE: 1137
	}
	
	NAME
	TITLE
	TYPE
	
	COLOR1
	COLOR2
	COLOR3
	COLOR4
	COLOR5
	COLOR6
	
	FM
	LIB_DIR
	SAVE_DIR_NAME
	SAVE_DIR_PATH
	DB_FNAME
	DB_FPATH
	
	SHORTCUTS_REFRESH_SHORTCUT_URL
	SCRIPTABLE_REMOVE_ENTRY_URL
	constructor(size) {
		this.NAME = 'App Wishlist Widget'
		this.TITLE = 'App Wishlist'
		this.TYPE = size
		
		this.COLOR1 = new Color('#FFFFFF')
		this.COLOR2 = new Color('#0040B6')
		this.COLOR3 = new Color('#0036AC')
		this.COLOR4 = new Color('#002CA2')
		this.COLOR5 = new Color('#002298')
		this.COLOR6 = new Color('#00168E')
		this.COLOR7 = new Color('#000000')
		
		this.FM = FileManager.local()
		this.LIB_DIR = (this.FM).libraryDirectory()
		this.SAVE_DIR_NAME = 'appwishlistwidget'
		this.SAVE_DIR_PATH = (this.FM).joinPath(this.LIB_DIR, this.SAVE_DIR_NAME)
		this.DB_FNAME = 'appwishlist_db.json'
		this.DB_FPATH = (this.FM).joinPath(this.SAVE_DIR_PATH, this.DB_FNAME)
		
		this.SHORTCUTS_REFRESH_SHORTCUT_URL = 'shortcuts://run-shortcut?name=AppWishlistWidget-Refresh'
		this.SCRIPTABLE_REMOVE_ENTRY_URL = 'scriptable:///run/AppWishlistWidget-Remove?id=app'
	}
	
	get SIZE() {
		return this._SIZES[this.TYPE] / 3
	}
	
	get CONTAINER() {
		if(this._INSTANCE instanceof ListWidget == false) {
			this._INSTANCE = new ListWidget()
		}
		return this._INSTANCE
	}
}

module.exports = new AppWishlistWidgetSettings(widget_size)
