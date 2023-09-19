// JavaScript Document

//Globals
var brsDoc;
var brsCtrl;
var mruArray;
//var newNameArray;
var sampleArray;
var linkArray;
var newCmdArray;
var extensionNameArray;
var startPath  = "/Content/Welcome/Flash/start_content.html";
var pref;
var isInited = false;
var isNewFeaturesLoaded = false;

//Initialize the view and load webview
function initializeUI() {

    if (isInited == false) 
	{
		isNewFeaturesLoaded = false;
        brsCtrl = document.getElementById("browser");

        brsCtrl.addEventListener("BrowserControlLoad", browserControlLoaded, true);
        brsCtrl.openURL(dw.getConfigurationPath() + startPath);
        isInited = true;
    }
}

//This will be called once loading webview is done.
function browserControlLoaded()
{
	/* hack to  avoid recursive calls to browserControlLoaded due to 
		doLayout() which loads an iframe triggers the BrowserControlLoad event,
		which inturn calls doLayout().
		It is not the case with DreamweaverCC only happens with CEF changes.
		[TODO]: needs to work on clean solution */
	try
  	{
		if( !isNewFeaturesLoaded )
		{
    		brsDoc = brsCtrl.getWindowObj();
			brsDoc.handleEvent= handleEvent;
			brsDoc.jsLaunchBrowser = jsLaunchBrowser;
			brsDoc.jsSetPrefShowFalse=jsSetPrefShowFalse;
			brsDoc.jsSetPrefShowTrue=jsSetPrefShowTrue;
			// loadXMLData is done from body itself brsDoc.loadXMLData();
			doLayout();				
			isNewFeaturesLoaded = true;
		}
	}catch(exception)
	{
    }	
}


//reload only the first column whenever the dialog reappears. rest remains same even if we reload.
function populateMRUItems()
{
	loadMRUItems(parseInt(brsDoc.maxItems[0]));
    
    var dont_show = brsDoc.document.getElementById("pref_item");
 jsGetPrefShowDlg()   
    if(pref)
        dont_show.style.background = "url(" + brsDoc.getImgResource("iconcheckoff") + ") 3px 3px no-repeat";
	else
		dont_show.style.background = "url(" + brsDoc.getImgResource("iconcheckon") + ") 3px 3px no-repeat";
}

//Set up layout
function doLayout()
{	jsGetPrefShowDlg();
	loadMRUItems(parseInt(brsDoc.maxItems[0]));
	loadNewItems(parseInt(brsDoc.maxItems[1]));
	brsDoc.loadFromBrowserDoc();
	getLinks();
	getSamples();
	loadNewFeatureUpdates();
	
	//loadSamples(parseInt(brsDoc.maxItems[2]));
	//loadLinks();
	//getMRU();
	//getNew();
	
}

function loadNewFeatureUpdates()
{   
	/* load new features only when connected to internet and version changed */
    brsDoc.loadNewFeatureUpdates(dw.isProductVersionChanged() , dw.startPage.isConnectedToInternet);	
}

function getPref()
{
	try{
		var item=brsDoc.document.getElementById('pref_item');
		item.addEventListener("click", handleEvent, true);
	}catch(expn){alert("Pref"+expn)}
	}

function getLinks()
{ try{
	linkArray=brsDoc.sendLinks();
}catch(expn){alert("GetLinks"+expn);}
}

function getSamples()
{ try{
	sampleArray=brsDoc.sendSamples();
}catch(expn){alert("GEt Samples"+expn);}
}

//Load recently opened files in the first column
function loadMRUItems(maxNumItems)
{ 
try
{
	var ary = jsGetMRU();
var mi = ary[0].length > maxNumItems - 1 ? maxNumItems - 1 : ary[0].length;
	brsDoc.loadMRUItems(mi,ary);
}catch(expn)
	{
		alert("loadMRU" + expn);
	}

}
//Load shortcuts to create new items.
function loadNewItems(maxNumItems)
{
	try
	{
	
	var ary = jsGetNew();
	var mi = ary[0].length > maxNumItems - (1 + 3) ? maxNumItems - (1 + 3) : ary[0].length;	

	
	
	var captions = ary[0];
	var icons = ary[1];
	// array for extension types used later for PIP logging
	extensionNameArray = ary[1];
	newCmdArray  = ary[2];

	icons.push("Multi");
	captions.push(brsDoc.getStringResource("newmulti"));
	newCmdArray.push("mminternal:newmulti");
	
	icons.push("Site");
	captions.push(brsDoc.getStringResource("newsite"));
	newCmdArray.push("mminternal:newsite");

	brsDoc.loadNewItems(captions,icons,mi);	
	}catch(expn)
	{
		alert("loadNew in Welcome.js" + expn);
	}
}

//JS commands per app
//OPEN MOST RECENTLY USED DOCUMENT
//convenience function to get the full array of templates brought over into ActionScript
//formatted to be 1 array containing one array for names and another one for types
//access names with a[0][n] and the types with a[1][n]
//dreamweaver only also has a third array with the action urls for opening the documents:  a[2][n]
function jsGetMRU()
{
	var ary = new Array();
	var aryPaths = new Array();
	var aryTypes = new Array();
	var aryActionURLs = new Array();
	
	var len = jsGetListMRU();

	for (i = 0; i < len; i++)
	{
		aryPaths.push(jsGetItemMRU(i)[0]);
		aryTypes.push(jsGetItemMRU(i)[1]);
		aryActionURLs.push(jsGetItemMRU(i)[2]);
	}

	ary.push(aryPaths);
	ary.push(aryTypes);
	ary.push(aryActionURLs);

	return ary;
}

//get list of most recently used docs and doc types (returns length of list)
function jsGetListMRU()
{
	mruArray = dw.startPage.recentFileList;
	return mruArray.length;
}

//get one MRU item and its type (returning array with name, type)
function jsGetItemMRU(num)
{
	var a = new Array();

	a.push(mruArray[num].label);
	a.push(brsDoc.getExtension(a[0]));
	a.push(mruArray[num].url);

	return a;
}

//open one MRU item
function jsOpenItemMRU(path, type)
{
	dw.startPage.doAction(path);
}

//Open... item
function jsOpenItemOther()
{
	dw.startPage.doAction("mminternal:opendocument=");
}


//CREATE NEW DOCUMENT
//convenience function to get the full array of new doc types brought over into ActionScript
//formatted to be 1 array containing one array for names and another one for types
//access names with a[0][n] and the types with a[1][n]
function jsGetNew()
{
	var ary = new Array();
	var aryNames = new Array();
	var aryTypes = new Array();
	var aryCmds = new Array();
	
	var len = jsGetListNew();
	for (i = 0; i < len; i++)
	{
		aryNames.push(jsGetItemNew(i)[0]);
		aryTypes.push(jsGetItemNew(i)[1]);
		aryCmds.push(jsGetItemNew(i)[2]);
	}
	ary.push(aryNames);
	ary.push(aryTypes);
	ary.push(aryCmds);
	
	return ary;
}

//get list of new doc type _names_ available (returns length of list)
function jsGetListNew()
{
	newNameArray = dw.startPage.newFileList;
	return newNameArray.length;
}

//get one New item and its type (returning array with name, type)
function jsGetItemNew(num)
{
	var a = new Array();
	
	a.push(newNameArray[num].label);
	a.push(brsDoc.getExtensionFromInternalURL(newNameArray[num].url));
	a.push(newNameArray[num].url);

	return a;
}

//create new document from list of types
function jsCreateItemNew(num)
{
	var extensionType = extensionNameArray[num];
	
	if(extensionType == "HTML"){
		dw.logEvent( UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION, UT_WELCOME_SCREEN_NEW_DOCUMENT_HTML);
	}
	else if(extensionType == "CSS"){
		dw.logEvent( UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION, UT_WELCOME_SCREEN_NEW_DOCUMENT_CSS);
	}
	else if(extensionType == "LESS"){
		dw.logEvent( UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION, UT_WELCOME_SCREEN_NEW_DOCUMENT_LESS);
	}
	else if(extensionType == "Sass"){
		dw.logEvent( UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION, UT_WELCOME_SCREEN_NEW_DOCUMENT_SASS);
	}
	else if(extensionType == "JavaScript"){
		dw.logEvent( UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION, UT_WELCOME_SCREEN_NEW_DOCUMENT_JAVASCRIPT);
	}
	else if(extensionType == "PHP_MySQL"){
		dw.logEvent( UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION, UT_WELCOME_SCREEN_NEW_DOCUMENT_PHP);
	}
	else if(extensionType == "XML"){
		dw.logEvent( UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION, UT_WELCOME_SCREEN_NEW_DOCUMENT_XML);
	}
	else if(extensionType == "Multi"){
		dw.logEvent( UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION, UT_WELCOME_SCREEN_NEW_DOCUMENT_FLUID_GRID);
	}
	else if(extensionType == "Site"){
		dw.logEvent( UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION, UT_WELCOME_SCREEN_NEW_DOCUMENT_SITE);
	}
	dw.startPage.doAction(newCmdArray[num]);
}

//Create new More... item
function jsCreateItemNewMore()
{
	dw.logEvent( UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION, UT_WELCOME_SCREEN_NEW_DOCUMENT_MORE_DOCUMENTS);
	dw.startPage.doAction("mminternal:newdocument=");
}

//CREATE NEW DOCUMENT FROM TEMPLATE
//convenience function to get the full array of templates brought over into ActionScript
//formatted to be 1 string per template item
function jsGetTemplates()
{
	var ary = new Array();
	var len = jsGetListTemplates();
	for (i = 0; i < len; i++)
	{
		ary.push(jsGetTemplate(i));
	}
	return ary;
}

//get list of templates available (returns length of that list)
function jsGetListTemplates()
{
	templateNameArray = dw.startPage.templateList;
	return templateNameArray.length;
}

//get template of list (returning name)
function jsGetTemplate(num)
{
	return templateNameArray[ num].label;
}

//create new document from template xyz
function jsCreateItemFromTemplate(num)
{
	dw.startPage.doAction(templateNameArray[num].url);
}

//More... templates
function jsCreateItemFromTemplateMore()
{ 
	dw.startPage.doAction(templateNameArray[0].url);
}

//PREF WHETHER TO SHOW THIS DIALOG
//get this pref (returns true or false)
function jsGetPrefShowDlg()
{
	var b; 

	if (Number(dw.startPage.shouldShow) == 0)
	{
		b = false; 
	}
	else
	{
		b = true; 
	}
	pref=b;
	brsDoc.getPref(pref);

}
//set this pref to false
function jsSetPrefShowFalse()
{

		dw.startPage.doAction("mminternal:dontshow=true");
		jsGetPrefShowDlg();
		
	}
//set this pref to true
function jsSetPrefShowTrue()
{
	dw.startPage.doAction("mminternal:dontshow=false");
	jsGetPrefShowDlg();
}

function handleEvent(e)
{
	if(e.target.id.indexOf("sample") != -1)
	{
		var item_num = parseInt(e.target.id.substring(6));
		if(e.target.id.indexOf("more") != -1){
			logEvent("more", -1);
			jsLaunchBrowser(brsDoc.getStringResource("videourl5"));
		}
		else{
			logEvent("sample", item_num);
			jsLaunchBrowser(brsDoc.getStringResource(sampleArray[item_num]));
		}
	}
	
	if(e.target.id.indexOf("link") != -1)
	{
		var item_num = parseInt(e.target.id.substring(4));
		logEvent("link", item_num);
		dw.browseDocument(brsDoc.getStringResource(linkArray[item_num]));
	}
	
	if(e.target.id.indexOf("new") != -1)
	{
		var item_num = parseInt(e.target.id.substring(3));
		if(e.target.id.indexOf("more") != -1)
			jsCreateItemNewMore();
		else{
			jsCreateItemNew(item_num);
		}
	}
	
	if(e.target.id.indexOf("recent") != -1)
	{
		var item_num = parseInt(e.target.id.substring(6));
		
		if(e.target.id.indexOf("more") != -1)
			jsOpenItemOther();
		else
			jsOpenItemMRU(mruArray[item_num].url);
	}
		
}

function jsLaunchBrowser(url)
{
	dw.browseDocument(url);
}



