// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: screwdriver;

/* 
 *
 * Name: App Wishlist Widget
 * Repo: app-wishlist-widget
 * File: AppWishlistWidget.js
 * Version: 2.0.0
 * Author: Gavin Gordon
 * Github: https://github.com/gavinggordon
 * 
 */

/* !!!!! IMPORTANT NOTE !!!!!
 *
 * In order to use this widget, the listed 
 * items (see below) are required.
 *
 *  Hardware:
 *    • iPhone running iOS 15 (or above)
 *
 *  iPhone Apps:
 *    • Shortcuts
 *    • Scriptable
 *
 *  Shortcuts Shortcuts:
 *    • AddAppToWishlist
 *    • AppWishlistWidget-Refresh
 *
 *  Scriptable Scripts:
 *    • AppWishlistWidget.js
 *    • AppWishlistWidget-Add.js
 *    • AppWishlistWidget-Remove.js
 *    • AppWishlistWidget-Settings.js
 *
 * The above-mentioned Shortcuts & Scripts
 * can be found & acquired from the Github:
 *
 * https://github.com/gavinggordon/app-wishlist-widget
 *
 */

const WIDGET = importModule('AppWishlistWidget-Settings')

// if savefile doesn't exist, create it
if(!WIDGET.FM.fileExists(WIDGET.DB_FPATH)){
	WIDGET.FM.writeString(WIDGET.DB_PATH, JSON.stringify({}))
}

// get save file content
let wishlistjson = await WIDGET.FM.readString(WIDGET.DB_FPATH)

// parse json into object
let wishlist = JSON.parse(wishlistjson)
let appsIDs = []
let appsData = []

// iterate over items, pushing IDs and each item's Data into seperate arrays
for(const [key, value] of Object.entries(wishlist)){
	appsIDs.push(key)
	appsData.push(value)
}

let WC = WIDGET.CONTAINER

let wdgtSize = WIDGET.SIZE

let wdgt = WC.addStack()
wdgt.layoutHorizontally()
wdgt.centerAlignContent()
wdgt.size = new Size(wdgtSize, wdgtSize)
wdgt.spacing = 0
wdgt.setPadding(0, 0, 0, 0)

let mainColumn = wdgt.addStack()
mainColumn.layoutVertically()
mainColumn.centerAlignContent()
mainColumn.size = new Size(wdgtSize, wdgtSize)
mainColumn.spacing = 10
mainColumn.setPadding(0, 0, 0, 0)

// refresh the widget every # minutes
let minsToRefresh = 60
const refreshInterval = Date.now() + ((60 * 1000) * minsToRefresh)
WC.refreshAfterDate = new Date(refreshInterval)

let bgGradient = new LinearGradient()
bgGradient.colors = [
	WIDGET.COLOR2,
	WIDGET.COLOR3,
	WIDGET.COLOR4,
	WIDGET.COLOR5,
	WIDGET.COLOR6
]
bgGradient.locations = [
	-0.0, 0.25, 0.5, 0.75, 1.0
]
bgGradient.startPoint = new Point(0.5, 0.0)
bgGradient.endPoint = new Point(0.5, 1.0)
WC.backgroundGradient = bgGradient

let titleStack = mainColumn.addStack()
titleStack.layoutHorizontally()
titleStack.centerAlignContent()
titleStack.size = new Size(wdgtSize, 76)

let title = titleStack.addText(WIDGET.TITLE)
title.centerAlignText()
title.textColor = Color.white()
title.font = new Font('SnellRoundhand', 64)
/**
title.shadowColor = Color.black()
title.shadowOffset = new Point(-1.5, 0.0)
title.shadowRadius = 1
**/

let hrStack = mainColumn.addStack()
hrStack.layoutHorizontally()
hrStack.centerAlignContent()
hrStack.size = new Size(wdgtSize, 8)

let hr = hrStack.addStack()
hr.size = new Size(wdgtSize-54, 8)
hr.borderColor = WIDGET.COLOR3
hr.borderWidth = 1

let hrGradient = new LinearGradient()
hrGradient.colors = [
	new Color('#EEEEEE75'),
	WIDGET.COLOR2,
	WIDGET.COLOR3,
	WIDGET.COLOR4,
	WIDGET.COLOR5,
	WIDGET.COLOR6,
	new Color('#00000090')
]
hrGradient.locations = [
	0.0, 0.15, 0.30, 0.6, 0.8, 0.9, 1.0
]
hrGradient.startPoint = new Point(0.5, 0.0)
hrGradient.endPoint = new Point(0.5, 1.0)
hr.backgroundGradient = hrGradient

let rowWidth = wdgtSize - 10
let rowHeight = 91 + 30
let rowItemWidth = (rowWidth / 4) - 10
let rowItemHeight = rowHeight
var row = mainColumn.addStack()

row.layoutHorizontally()
row.centerAlignContent()
row.size = new Size(rowWidth, rowHeight)
row.spacing = 5
row.setPadding(20, 25, 0, 0)

let app
let rowItem
let appImage
let rowAppImage
let imgPlaceholderIcon
let imgPlaceholder
let removeBtnIcon
let removeBtn
let btnPlaceholderIcon
let btnPlaceholder
let iconStack

// create placeholder icon for image
function drawImgPlaceholderIcon(){
	let ctxLg = new DrawContext()
	ctxLg.size = new Size(64, 64)
	ctxLg.setFillColor(new Color('#2ECD60'))
	ctxLg.setStrokeColor(new Color('#2ECD6000'))
	ctxLg.setLineWidth(0)
	
	let rndRectBig = new Path()
	rndRectBig.move(new Point(0, 0))
	rndRectBig.addRoundedRect(new Rect(0, 0, 64, 64), 16, 16)
	ctxLg.addPath(rndRectBig)
	ctxLg.fillPath()
	ctxLg.setFillColor(new Color('#FFFFFF00'))
	ctxLg.setStrokeColor(new Color('#FFFFFF'))
	ctxLg.setLineWidth(2)
	
	let horizontalLine = new Path()
	horizontalLine.move(new Point(20, 32))
	horizontalLine.addLine(new Point(44, 32))
	ctxLg.addPath(horizontalLine)
	ctxLg.strokePath()
	
	let verticalLine = new Path()
	verticalLine.move(new Point(32, 20))
	verticalLine.addLine(new Point(32, 44))
	ctxLg.addPath(verticalLine)
	ctxLg.strokePath()
	
	return ctxLg.getImage()
}

// create a placeholder icon for the remove button
function drawBtnPlaceholderIcon(i){
	let ctxSm = new DrawContext()
	ctxSm.size = new Size(20, 20)
	if(i < 4){
		ctxSm.setFillColor(new Color('#0029A0'))
	} else {
		ctxSm.setFillColor(new Color('#021992'))
	}
	ctxSm.setStrokeColor(new Color('#BBBBBB00'))
	ctxSm.setLineWidth(3)
	let rndRectSmallBG = new Path()
	rndRectSmallBG.move(new Point(0, 0))
	rndRectSmallBG.addRoundedRect(new Rect(0, 0, 20, 20), 0, 0)
	ctxSm.addPath(rndRectSmallBG)
	ctxSm.fillPath()
	if(i < 4){
		ctxSm.setFillColor(new Color('#0029A0'))
	} else {
		ctxSm.setFillColor(new Color('#021992'))
	}
	ctxSm.setStrokeColor(new Color('#BBBBBB00'))
	ctxSm.setLineWidth(4)
	let rndRectSmall = new Path()
	rndRectSmall.move(new Point(0, 0))
	rndRectSmall.addRoundedRect(new Rect(0, 0, 20, 20), 0, 0)
	ctxSm.addPath(rndRectSmall)
	ctxSm.strokePath()
	ctxSm.setStrokeColor(new Color('#BBBBBB00'))
	ctxSm.setLineWidth(2)
	
	let forwardSlash = new Path()
	forwardSlash.move(new Point(6, 6))
	forwardSlash.addLine(new Point(14, 14))
	ctxSm.addPath(forwardSlash)
	ctxSm.strokePath()
	let backSlash = new Path()
	backSlash.move(new Point(14, 6))
	backSlash.addLine(new Point(6, 14))
	ctxSm.addPath(backSlash)
	ctxSm.strokePath()
	
	return ctxSm.getImage()
}

// iterate 8 times, each time creating either an entry from the save file (wishlist) or a  placeholder
let i = 0;
do {
	app = appsData[i]
	
	// each row contains 4 items
	if(i === 4){
		// if the iteration count is on the fourth index, start a new row
		row = mainColumn.addStack()
		row.layoutHorizontally()
		row.topAlignContent()
		row.size = new Size(rowWidth, rowHeight)
		row.spacing = 5
		row.setPadding(0, 25, 0, 0)
	}
	rowItem = row.addStack()
	rowItem.layoutVertically()
	rowItem.topAlignContent()
	rowItem.size = new Size(rowItemWidth, rowItemHeight)
	if(i > appsData.length - 1){
		// if the iteration index is a number longer than the number of existing wishlist entries, then add a placeholder
		imgPlaceholderIcon = drawImgPlaceholderIcon()
		imgPlaceholder = rowItem.addImage(imgPlaceholderIcon)
		rowItem.setPadding(-2, 0, 0, 0)

		imgPlaceholder.applyFittingContentMode()
		imgPlaceholder.centerAlignImage()
		imgPlaceholder.cornerRadius = 16
		imgPlaceholder.imageSize = new Size(64, 64)
		// add url to open app store when app image placeholder is tapped
		imgPlaceholder.url = 'https://apps.apple.com/ca'
		
		rowItem.addSpacer(14)
		
		iconStack = rowItem.addStack()
		iconStack.setPadding(0, 23, 0, 0)
		iconStack.layoutHorizontally()
		iconStack.centerAlignContent()

		btnPlaceholderIcon = drawBtnPlaceholderIcon(i)
		btnPlaceholder = iconStack.addImage(btnPlaceholderIcon)
		btnPlaceholder.applyFillingContentMode()
		btnPlaceholder.centerAlignImage()
		btnPlaceholder.cornerRadius = 3
		btnPlaceholder.imageSize = new Size(20, 20)

	} else {
		// else add item from wishlist
		var req = new Request(app.artworkURL)
		req.method = 'GET'
		appImage = await req.loadImage()
		rowAppImage = rowItem.addImage(appImage)
		rowAppImage.applyFittingContentMode()
		rowAppImage.centerAlignImage()
		rowAppImage.cornerRadius = 16
		rowAppImage.imageSize = new Size(66, 66)
		// add url to open the app store to the specified app when tapped
		rowAppImage.url = app.storeURL

		rowItem.addSpacer(10)
		
		iconStack = rowItem.addStack()
		iconStack.setPadding(0, 21, 0, 0)
		iconStack.layoutHorizontally()
		iconStack.centerAlignContent()
		removeBtnIcon = SFSymbol.named('xmark.square')
		removeBtnIcon.textColor = Color.red()
		removeBtnIcon.applyRegularWeight()
		removeBtn = iconStack.addImage(removeBtnIcon.image)
		removeBtn.applyFittingContentMode()
		removeBtn.centerAlignImage()
		removeBtn.imageSize = new Size(25, 25)
		// add the url to run the script to remove the specified app from the wishlist
		removeBtn.url = WIDGET.SCRIPTABLE_REMOVE_ENTRY_URL + app.storeID
	}
	i++
} while(i < 8)

Script.setWidget(WC)

// presents the widget, based on defined size
switch(WIDGET.TYPE){
	case 'SMALL':
		WC.presentSmall()
		break
	case 'MEDIUM':
		WC.presentMedium()
		break
	case 'LARGE':
		WC.presentLarge()
		break
	default:
			WC.presentLarge()
}

Script.complete()
