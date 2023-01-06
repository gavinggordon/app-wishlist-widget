// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: magic;
/* 
 *
 * App Wishlist Widget
 * Author: Gavin Gordon
 * Github: www.github.com/gavinggordon
 * 
 */

// access to the Library directory
const FM = FileManager.local()
const LIB_DIR = FM.libraryDirectory()
// the directory containing the save file
const SAVE_DIR_NAME = 'appwishlistwidget'
const SAVE_DIR_PATH = FM.joinPath(LIB_DIR, SAVE_DIR_NAME)
// the name and path of the save file
const DB_FNAME = 'appwishlist_db.json'
const DB_FPATH = FM.joinPath(SAVE_DIR_PATH, DB_FNAME)

// setting theme colours
const COLOR1 = new Color('#FFFFFF')
const COLOR2 = new Color('#0040B6')
const COLOR3 = new Color('#0036AC')
const COLOR4 = new Color('#002CA2')
const COLOR5 = new Color('#002298')
const COLOR6 = new Color('#00168E')
const COLOR7 = new Color('#000000')

let wdgtSize = widgetSize('large')
let wishlistjson = "{}"

function widgetSize(size){
	let sizes = {
		large: 1137,
		medium: 1080,
		small: 507	
	}
	if (typeof sizes[size] == 'number' && sizes[size] > 0) {
		return sizes[size] / 3
	}
	return null
}

// if savefile doesn't exist, create it
if(!FM.fileExists(DB_FPATH)){
	FM.writeString(DB_PATH, JSON.stringify({}))
}
// get save file content
wishlistjson = await FM.readString(DB_FPATH)
// parse json into object
let wishlist = JSON.parse(wishlistjson)
let appsIDs = []
let appsData = []
// iterate over items, pushing IDs and each item's Data into seperate arrays
for(const [key, value] of Object.entries(wishlist)){
	appsIDs.push(key)
	appsData.push(value)
}

// begin creating the Widget
let LW = new ListWidget()

let widgetContainer = LW.addStack()
widgetContainer.layoutHorizontally()
widgetContainer.centerAlignContent()
widgetContainer.size = new Size(wdgtSize, wdgtSize)
widgetContainer.spacing = 0
widgetContainer.setPadding(0, 0, 0, 0)

let mainColumn = widgetContainer.addStack()
mainColumn.layoutVertically()
mainColumn.centerAlignContent()
mainColumn.size = new Size(wdgtSize, wdgtSize)
mainColumn.spacing = 10
mainColumn.setPadding(0, 0, 0, 0)

// refresh the widget every # minutes
let minsToRefresh = 60
const refreshInterval = Date.now() + ((60 * 1000) * minsToRefresh)
LW.refreshAfterDate = new Date(refreshInterval)

let bgGradient = new LinearGradient()
bgGradient.colors = [
	COLOR2,
	COLOR3,
	COLOR4,
	COLOR5,
	COLOR6
]
bgGradient.locations = [
	-0.0, 0.25, 0.5, 0.75, 1.0
]
bgGradient.startPoint = new Point(0.5, 0.0)
bgGradient.endPoint = new Point(0.5, 1.0)
LW.backgroundGradient = bgGradient

let titleStack = mainColumn.addStack()
titleStack.layoutHorizontally()
titleStack.centerAlignContent()
titleStack.size = new Size(wdgtSize, 76)

let title = titleStack.addText('App Wishlist')
title.centerAlignText()
title.textColor = COLOR1
title.font = new Font('Didot-italic', 54)

let hrStack = mainColumn.addStack()
hrStack.layoutHorizontally()
hrStack.centerAlignContent()
hrStack.size = new Size(wdgtSize, 4)

let hr = hrStack.addStack()
hr.size = new Size(wdgtSize-54, 3)
hr.borderColor = Color.white()
hr.borderWidth = 1

let hrGradient = new LinearGradient()
hrGradient.colors = [
	Color.white(),
	COLOR6,
	Color.white()
]
hrGradient.locations = [
	-0.0, 0.5, 1.0
]
hrGradient.startPoint = new Point(0.5, -0.0)
hrGradient.endPoint = new Point(0.5, 1.0)
hr.backgroundGradient = hrGradient

//rowsStack.addSpacer(10)
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
function drawBtnPlaceholderIcon(){
	let ctxSm = new DrawContext()
	ctxSm.size = new Size(20, 20)
	ctxSm.setFillColor(new Color('#041E94'))
	ctxSm.setStrokeColor(new Color('#BBBBBB75'))
	ctxSm.setLineWidth(3)
	let rndRectSmallBG = new Path()
	rndRectSmallBG.move(new Point(0, 0))
	rndRectSmallBG.addRoundedRect(new Rect(0, 0, 20, 20), 3, 3)
	ctxSm.addPath(rndRectSmallBG)
	ctxSm.fillPath()
	ctxSm.setFillColor(new Color('#041E94'))
	ctxSm.setStrokeColor(new Color('#BBBBBB75'))
	ctxSm.setLineWidth(4)
	let rndRectSmall = new Path()
	rndRectSmall.move(new Point(0, 0))
	rndRectSmall.addRoundedRect(new Rect(0, 0, 20, 20), 3, 3)
	ctxSm.addPath(rndRectSmall)
	ctxSm.strokePath()
	ctxSm.setStrokeColor(new Color('#BBBBBB75'))
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

		btnPlaceholderIcon = drawBtnPlaceholderIcon()
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
		removeBtn.url = 'scriptable:///run/AppWishlistWidget-Remove?id=app' + app.storeID
	}
	i++
} while(i < 8)

Script.setWidget(LW)

// presents the widget, based on defined size
switch(wdgtSize){
	case widgetSize('small'):
		LW.presentSmall()
		break
	case widgetSize('medium'):
		LW.presentMedium()
		break
	case widgetSize('large'):
		LW.presentLarge()
		break
	default:
			LW.presentLarge()
}

Script.complete()
