// JavaScript Document

	function TextFormat()
	{
		this.font = "Arial";
		this.size = 11;
		this.color = 0x000000;
		this.bold = false;
		this.italic = false;
	}
	
	var xmlhttp;
	//vars
	//xml vars
	var configData = "resources/config.xml";

	//layout info
	var cols = new Array();
	var colCaptions = new Array();
	var maxItems = new Array();

	//maximum # of items for each of the lists
	//mru's
	var mrus = new Array();

	//file types
	var ftypes = new Array();

	//var ftnames = new Array();
	var fticons = new Array();

	//img resources
	var rsrcs = new Array();
	var rsrcurls = new Array();

	//string resources
	var strnames = new Array();
	var strings = new Array();

	//dimensions
	var dims = new Array();
	
	var linkArray;	

	//general style vars
	var cBackground;
	var cFooter;
	var cLinksArea;
	var tfItemLine = new TextFormat();
	var tfItemLineEmph = new TextFormat();
	var tfHeadLine = new TextFormat();
	var wDialog;
	var hDialog;
	var wShimArea;
	var hShimArea;
	var wIcon;
	var hIcon;
	var wProductIcon;
	var hProductIcon;
	var hHeader;
	var hFooter;
	var hListArea;
	var hLinksArea;
	var hItemLine;
	var xIndentItemLine;
	var hHeadLine;
	var xPadding;
	var yPadding;	
	var osType;
	var NODE_TYPE_TEXT = 3;
	var NODE_TYPE_COMMENT = 8;
	var pref;
	var bIsConnectToInternet = false;
	function loadXMLData(){
		//alert("in loadXMLData");
			if (window.XMLHttpRequest){
				xmlhttp=new XMLHttpRequest();
			}
			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState == 4){
					setDefaults();
					parseConfig(xmlhttp.responseXML);
				}
			};
			xmlhttp.open("GET", configData, false);
			xmlhttp.send();
	}
	//load defaults
	function setDefaults()
	{
		if(navigator.appVersion.indexOf("Windows")!=-1)
			osType = "W";
		else
			osType = "M";
			
		//in case xml is not parseable
		cBackground = 0xEEEEEE;
		cFooter = 0xEEEEEE;
		cLinksArea = 0xFFFFFF;
		wDialog = 700; //650;
		hDialog = 500;
		tfItemLine.font = "Arial";
		tfItemLine.size = 11;
		tfItemLine.color = 0x000000;
		tfItemLine.bold = false;
		tfItemLine.italic = false;
		tfItemLineEmph.font = "Arial";
		tfItemLineEmph.size = 11;
		tfItemLineEmph.color = 0x000000;
		tfItemLineEmph.bold = true;
		tfItemLineEmph.italic = false;
		tfHeadLine.font = "Arial";
		tfHeadLine.size = 13;
		tfHeadLine.color = 0x333333;
		tfHeadLine.bold = true;
		tfHeadLine.italic = false;
	}
	
	function parseConfig(config_xml)
	{
		for (var configNode = config_xml.firstChild.firstChild; 
			 configNode != null; configNode = configNode.nextSibling)
		{
			switch (configNode.nodeName)
			{
			case "layout" :
				parseLayout(configNode);
				break;
			case "strings" :
				parseStringResources(configNode);
				break;
			case "resources" :
				parseImgResources(configNode);
				break;
			case "filetypes" :
				parseFileTypes(configNode);
				break;
			case "dimensions" :
				parseDims(configNode);
				break;
			case "colors" :
				parseColors(configNode);
				break;
			case "fonts" :
				parseFonts(configNode);
				break;
			}
		}
	}
	function parseLayout(xN)
	{
		cols = new Array();
		for (var aNode = xN.firstChild; aNode != null; aNode = aNode.nextSibling)
		{
			if (aNode.nodeName == "column")
			{
				var colContents = new Array();
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					if(bNode.nodeType != NODE_TYPE_TEXT && bNode.nodeType != NODE_TYPE_COMMENT )
					{
						colContents.push(bNode.nodeName);
						maxItems.push(bNode.attributes.getNamedItem("max").value);
					}
				}
				cols.push(colContents);
				//now it's a 2D array with columns each containing an array of column contents
				//e.g. access column 3, item 2 with cols[2][1]
			}
		}
	}
	function parseFileTypes(xN)
	{
		ftypes = new Array();
		//ftnames = new Array();
		fticons = new Array();
		for (var aNode = xN.firstChild; aNode != null; aNode = aNode.nextSibling)
		{
			if (aNode.nodeName == "type")
			{
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "ftextension" :
						var ext = bNode.firstChild.nodeValue;
						break;
						//case "ftname":
						//var fname = bNode.firstChild.nodeValue;
						//break;
					case "fticon" :
						var iconrsrc = bNode.firstChild.nodeValue;
						break;
					}
				}
				ftypes.push(ext);
				//ftnames.push(fname);
				fticons.push(iconrsrc);
			}
		}
	}

	function parseFonts(xN)
	{
		for (var aNode = xN.firstChild; aNode != null; aNode = aNode.nextSibling)
		{
			switch (aNode.nodeName)
			{
			case "headline" :
				tfHeadLine = parseAFont(aNode);
				break;
			case "itemline" :
				tfItemLine = parseAFont(aNode);
				break;
			case "itemlineEmph" :
				tfItemLineEmph = parseAFont(aNode);
				break;
			}
		}
	}

	function parseAFont(xN)
	{
		var tf = new TextFormat();
		for (var aNode = xN.firstChild; aNode != null; aNode = aNode.nextSibling)
		{
			switch (aNode.nodeName)
			{
			case "name" :
				tf.font = aNode.firstChild.nodeValue;
				//NOTE: On the Mac the spacing is odd with Arial 11. Instead, use Lucida Grande.
				if( osType == "M")
				{	
					tf.font = "Lucida Grande"; 
				}
				break;
			case "size" :
				tf.size = strToNum(aNode.firstChild.nodeValue);
				break;
			case "bold" :
				tf.bold = aNode.firstChild.nodeValue == "true" ? true : false;
				break;
			case "italic" :
				tf.italic = aNode.firstChild.nodeValue == "true" ? true : false;
				break;
			case "color" :
				tf.color = aNode.firstChild.nodeValue;
				break;
			}
		}
		return tf;
	}


	function parseColors(xN)
	{
		for (var aNode = xN.firstChild; aNode != null; aNode = aNode.nextSibling)
		{
			switch (aNode.nodeName)
			{
			case "cbackground" :
				cBackground = strHexToNum("0x" + aNode.firstChild.nodeValue);
				break;
			case "clinksarea" :
				cLinksArea = strHexToNum("0x" + aNode.firstChild.nodeValue);
				/* TEMPORARY TESTING: This area is 1px too wide */
				// cLinksArea = 65331;
				break;
			case "cfooter" :
				cFooter = strHexToNum("0x" + aNode.firstChild.nodeValue);
				break;
			}
		}
	}


	function parseImgResources(xN)
	{
		rsrcs = new Array();
		rsrcurls = new Array();
		for (var aNode = xN.firstChild; aNode != null; aNode = aNode.nextSibling)
		{
			if(aNode.nodeType != NODE_TYPE_TEXT&& aNode.nodeType != NODE_TYPE_COMMENT )
			{
				rsrcs.push(aNode.nodeName); //trace("node: " + aNode.nodeName);
				rsrcurls.push(aNode.firstChild.nodeValue);
			}
		}
	}

	function getImgResource(aname)
	{
		for (var i = 0; i < rsrcs.length; i++)
		{
			if (rsrcs[i] == aname)
			{
				return rsrcurls[i];
			}
		}
		return "";
	}

	function fileType2ImgResource(ftype)
	{
		//if dreamweaver process first since we get a url propery here not a ftype
		//if(getStringResource("appobject") == "dw") {ftype = getExtension(ftype);};
		for (var i = 0; i < ftypes.length; i++)
		{
			if (ftypes[i].toLowerCase() == ftype.toLowerCase())
			{
				return fticons[i];
			}
		}

		return "icondocsecondary";
	}

	function parseStringResources(xN)
	{
		rsrcs = new Array();
		rsrcurls = new Array();
		for (var aNode = xN.firstChild; aNode != null; aNode = aNode.nextSibling)
		{
			if(aNode.nodeType != NODE_TYPE_TEXT && aNode.nodeType != NODE_TYPE_COMMENT )
			{
				strnames.push(aNode.nodeName);
				strings.push(aNode.firstChild.nodeValue);
			}
		}
	}

	function getStringResource(aname)
	{
		for (var i = 0; i < strnames.length; i++)
		{
			if (strnames[i] == aname)
			{
				return strings[i];
			}
		}
		return "";
	}
	
	// updated for CS4 - show videos in right column instead of Samples
	function getTopFeatures()
	{
		var arr = new Array;
		var totalRows = maxItems[2] - 1; 
		for( var i = 0; i < totalRows; i++)
		{
			arr.push(getStringResource("topvideos"+i));
		}
		
		return arr;
	}

	function parseDims(xN)
	{
		for (var aNode = xN.firstChild; aNode != null; aNode = aNode.nextSibling)
		{
			switch (aNode.nodeName)
			{
			case "dialog" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "w" :
						wDialog = strToNum(bNode.firstChild.nodeValue);
						break;
					case "h" :
						hDialog = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				break;
			case "icon" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "w" :
						wIcon = strToNum(bNode.firstChild.nodeValue);
						break;
					case "h" :
						hIcon = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				break;
			case "prodicon" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "w" :
						wProductIcon = strToNum(bNode.firstChild.nodeValue);
						break;
					case "h" :
						hProductIcon = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				break;
			case "header" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "h" :
						hHeader = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				break;
			case "footer" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "h" :
						hFooter = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				break;
			case "listarea" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "h" :
						hListArea = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				break;
			case "linksarea" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "h" :
						hLinksArea = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				wShimArea = wDialog / 2;
				hShimArea = hLinksArea;
				break;
			case "itemline" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "h" :
						hItemLine = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				break;
			case "headline" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "h" :
						hHeadLine = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				break;
			case "paddingoverall" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "w" :
						xPadding = strToNum(bNode.firstChild.nodeValue);
						break;
					case "h" :
						yPadding = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				break;
			case "indentitemline" :
				for (var bNode = aNode.firstChild; bNode != null; bNode = bNode.nextSibling)
				{
					switch (bNode.nodeName)
					{
					case "w" :
						xIndentItemLine = strToNum(bNode.firstChild.nodeValue);
						break;
					}
				}
				break;
			}
		}
	}

	function testXML()
	{
		var s = "\n";
		s += "XML test\n\n";
		s += "Layout (" + cols.length + " columns)\n";
		s += colCaptions + "\n";
		s += cols + "\n";
		s += "max. # of items per each list\n" + maxItems + "\n";
		s += "column width is " + getWCol();
		s += "\n";
		s += "string resources:\n";
		s += strnames + "\n";
		s += strings + "\n";
		s += "\n";
		s += "file types:\n";
		s += ftypes + "\n";
		s += ftnames + "\n";
		s += fticons + "\n";
		s += "\n";
		s += "img resources:\n";
		s += rsrcs + "\n";
		s += rsrcurls + "\n";
		s += "\n";
		s += "general style information:\n";
		s += "color background: " + cBackground + "\n";
		s += "color footer: " + cFooter + "\n";
		s += "color links arear: " + cLinksArea + "\n";
		s += "\n";
		s += "Text format item line: " + tfItemLine.font + ", " + tfItemLine.size + "\n";
		s += "Text format item line emphasis: " + tfItemLineEmph.font + ", " + tfItemLineEmph.size + "\n";
		s += "Text format head line: " + tfHeadLine.font + ", " + tfHeadLine.size + "\n";
		s += "\n";
		s += "Icon size: " + wIcon + ", " + hIcon + "\n";
		s += "Product icon size: " + wProductIcon + ", " + hProductIcon + "\n";
		s += "Header height: " + hHeader + "\n";
		s += "Footer height: " + hFooter + "\n";
		s += "List area size: " + hListArea + "\n";
		s += "Links (shim) area size: " + hLinksArea + "\n";
		s += "\n";
		s += "Item lineheight: " + hItemLine + "\n";
		s += "Item indentation: " + xIndentItemLine + "\n";
		s += "Edge Padding: x:" + xPadding + ", y:" + yPadding + "\n";
		s += "\n";
		return s;
	}

	//UTILITY FUNCTIONS

	//generate file names from the paths
	function path2fname_test(p)
	{
		// strip out path from file name 
		if (osType == "W")
		{
			return p.slice(p.lastIndexOf("\\") + 1);
		}
		else
		{
			return p.slice(p.lastIndexOf("/") + 1);
		}
	}

	//conversion utils
	function strToNum(s)
	{
		return parseInt(s);
	}

	function strHexToNum(s)
	{
		return parseInt(s, 16);
	}

	//string trunc utility
	function truncateStringMiddle(whichTF, s, w)
	{
		// truncs in middle
		var output;
		var ts;
		var L;
		var ell = "...";
		// 3.27.08: removing one more character to account for space added before strings
		w = w-25; //w-4;
		if (getTextExtent(s, whichTF) < w)
		{
			return s;
		}
		var L = s.length;
		//skip 1 since result prob  longer string
		for (var i = 2; i <= L; i++)
		{
			ts = s.substr(0, (L - i) / 2) + ell + s.substr(L - ((L - i) / 2), L);
			if (getTextExtent(ts, whichTF) < w)
			{
				return ts;
			}
		}
		return ell;
	}

	function getTextExtent(txt, txtStyle) {
		var div = document.createElement('div');
		
		div.style.fontFamily = txtStyle.font;
		div.style.fontSize = txtStyle.size + "px";
		
		div.style.position = 'absolute';
		div.style.whiteSpace = 'nowrap';
		div.style.visibility = 'hidden';
		div.innerHTML = txt;

		var container = document.body;
		if (container.firstChild) {
			container.insertBefore(div, container.firstChild);
		}
		else {
			container.appendChild(div);
		}
		var ext = div.offsetWidth;
		container.removeChild(div);

		return ext;
	};

	
	//filename parsing utilities
	//get filename extension from path or filename
	function getExtension(s)
	{
		if (s.indexOf(".") == -1)
		{
			return "";
		}
		var ary = s.split(".");
		return ary[ary.length - 1];
	}

	//get file type from internal url (Dreamweaver style)
	function getExtensionFromInternalURL(s)
	{
		if (s.indexOf("=") == -1)
		{
			return "";
		}
		var ary = s.split("=");
		return ary[ary.length - 1];
	}

	function path2fname(strTemp)
	{
		// Declare the variables.
		var i = 0;
		var Done = false;
		var tmpFile = "";
		var tmpChar = "";
		var sepChar = "/";

		//in windows we look for "\" as delimiter
		if (osType == "W")
		{
			sepChar = "\\";
		}
		// Get the length of the string minus one.   
		i = strTemp.length - 1;
		
		// Loop through the string backwards looking for sep. char.
		while ((i >= 0) && (Done != true))
		{
			// Get a character from the string.
			tmpChar = strTemp.charAt(i);
			// Look for the forward slash, this indicates that we
			// have the file name.
			if (tmpChar != sepChar)
			{
				tmpFile = tmpChar + tmpFile;
				i--;
			}
			else
			{
				Done = true;
			}
		}
		
		// Get the length of the string minus one.
		strTemp = tmpFile;
		tmpFile = "";
		i = 0;
		iLen = strTemp.length - 1;
		
		// Loop through the string backwards looking for forward slash.
		while (i <= iLen)
		{
			// Get a character from the string.
			tmpChar = strTemp.charAt(i);
			// Look for the % character.
			if (tmpChar == "%")
			{
				if ((i + 2) <= iLen)
				{
					if ((tmpChar + strTemp.charAt(i + 1) + strTemp.charAt(i + 2)) == "%20")
					{
						i = i + 2;
						tmpChar = " ";
					}
				}
			}
			tmpFile = tmpFile + tmpChar;
			i++;
		}
		return tmpFile;
	}

	function makeFileURL(strTemp)
	{
		if (osType == "W")
		{
			//debug("Win:  " + makeURLFileName(strTemp));
			return makeURLFileName(strTemp);
		}
		else if (osType == "M")
		{
			//debug("Mac:  " + makeOSXFileName(strTemp));
			return makeOSXFileName(strTemp);
		}
	}

	function makeURLFileName(strTemp)
	{
		// Declare the variables.
		var i = 0;
		var tmpFile = "";
		var iStrLen;
		var tmpChar = "";
		// Get the length of the string.
		iStrLen = strTemp.length;
		while (i < iStrLen)
		{
			tmpChar = strTemp.charAt(i);
			if (tmpChar == "\\")
			{
				tmpFile = tmpFile + "/";
			}
			else if (tmpChar == ":")
			{
				tmpFile = tmpFile + "|";
			}
			else
			{
				tmpFile = tmpFile + tmpChar;
			}
			i++;
		}
		tmpFile = "file:///" + tmpFile;
		return tmpFile;
	}

	//
	function makeOSXFileName(strTemp)
	{
		return "file://" + strTemp;
	}

	//utility function to check on where the user hovering over
	//is used for visual hover feedback, can also be used for tooltips later etc
	function isOver(px, py, aMc)
	{
		//trace(aMc);
		if (aMc.length == 0)
		{
			return -1;
		}

		if (aMc.length == 1)
		{
			var bo = aMc[0].getBounds(this);
			if (px >= bo.xMin && px <= bo.xMax && py >= bo.yMin && py <= (bo.yMin + hItemLine))
			{
				return 0;
			}
			else
			{
				return -1;
			}
		}
		//if the array has at least 2 members  
		var depthMax = -100000;
		var res = -1;
		for (var i = 0; i < aMc.length; i++)
		{
			var bo = aMc[i].getBounds(this);
			
			if (px >= bo.xMin && 
				px <= bo.xMax && 
				py >= bo.yMin && 
				py <= (bo.yMin + hItemLine) 
				&& aMc[i].getDepth() > depthMax)
			{
				res = i;
				depthMax = aMc[i].getDepth();
			}
		}
		return res;
	}
	
function loadFromBrowserDoc(){
	loadLinks();
	loadSamples(parseInt(maxItems[2]));
	loadStatics();
	}

function clickHandler(url)
{
	if(bIsConnectToInternet)
	{
		jsLaunchBrowser(url);
	}
}
	
function loadNewFeatureUpdates(isVersionChanged, isConnectedToInterNet){
	
	bIsConnectToInternet = isConnectedToInterNet ;
	if( isVersionChanged && isConnectedToInterNet ){
		var myNode = document.getElementById('logo');
		var fc = myNode.firstChild;

		while( fc ) {
			myNode.removeChild( fc );
			fc = myNode.firstChild;
		}
		var el = document.createElement("iframe");
		el.setAttribute('id', 'ifrm');
		myNode.appendChild(el);
		el.setAttribute('src', 'http://www.adobe.com/go/dw_start_market');
		el.setAttribute('width', '325px');
		el.setAttribute('height', '65px');
		el.setAttribute('scrolling', 'no');
		el.setAttribute('frameBorder', '0');  
		}
	else{
		
		document.getElementById('logo_image').style.cssFloat="left";		
		document.getElementById('logo_image').style.paddingLeft = "10px";
		document.getElementById('logo_image').setAttribute('src', 'resources/images/appicon_xl.png');
		document.getElementById('logo_para').style.cssFloat="left";
		document.getElementById('logo_para').style.fontFamily="Arial";
		document.getElementById('logo_para').style.color="#555555";
		document.getElementById('logo_para').style.fontSize="13px";
		document.getElementById('logo_para').style.fontWeight="bold";
		document.getElementById('logo_para').innerHTML="Adobe Dreamweaver CC";
		if(isConnectedToInterNet)
		{
			document.getElementById('logo_para').style.textDecoration = "underline";
			document.getElementById('logo_para').style.cursor = "pointer";
		}
		else
		{
			document.getElementById('logo_para').style.textDecoration = "none";
		}
	}
}	
//Load help links
function loadLinks()
{
	try 
{
	var icons = new Array();
	var captions = new Array();
	var urls = new Array();
	

	captions.push(getStringResource("quicktour"));
	urls.push("urlquicktour");
	
	captions.push(getStringResource("tutorial"));
	urls.push("urltutorial");
	
	captions.push(getStringResource("training"));
	urls.push("urltraining");
		
	var items = document.getElementById('links').getElementsByTagName('p');
	for (var i = 0; i < captions.length; i++)
	{
		if(urls[i] != "urlquicktour")
			placeIconTextButton(items[i], captions[i], tfItemLine, icons[i]);
		else
			placeIconTextButton(items[i], captions[i], tfItemLineEmph, icons[i]);
		items[i].id = "link" + i;
	}
	
	linkArray = urls;
}catch(expn)
{alert("loadLinks"+expn);}
}


//Place text in a HTML element along with style.
function placeText(element, text, txtStyle)
{	
	setTxtStyle(element, txtStyle);
	element.innerHTML = truncateStringMiddle(txtStyle, text, element.offsetWidth);
}

//Make HTML element clickable and set background for hover response.
function placeIconTextButton(element, text, txtStyle, icon)
{
    if (icon) {
        element.style.background = "url(" + getImgResource(icon) + ") 3px 3px no-repeat";
    }
	element.style.cursor = "pointer";
	placeText(element, text, txtStyle);
	
	element.addEventListener("click", handleEvent, true);
}

//Apply text styles to a HTML element
function setTxtStyle(element, txtStyle)
{
	element.style.fontFamily = txtStyle.font;
	if(txtStyle.bold)
		element.style.fontWeight = "bold";
	if(txtStyle.italic)
		element.style.fontStyle = "italic";
		
	element.style.fontSize = txtStyle.size + "px";
	element.style.color = "#" + txtStyle.color;
}

function loadSamples(maxNumItems)
{
	try
	{
	var ary = new Array();
	var urls = new Array();
	//access template names by ary[n]
	ary = getTopFeatures(ary);
	
	var mi = ary[0].length > maxNumItems - 1 ? maxNumItems - 1 : ary[0].length;	

	var items = document.getElementById('video_items').getElementsByTagName('p');
	for (var i = 0; i < mi; i++)
	{
		urls[i] = "videourl" + i;
		items[i].id = "sample" + i;
		placeIconTextButton(items[i], ary[i], tfItemLine, ("iconvideo"+i));
		
	}
	
	sampleArray = urls;
	placeIconTextButton(items[mi], getStringResource("more"), tfItemLine, "iconfolder");
	items[mi].id = "more_sample";
	}catch(expn)
	{
		alert("loadSamples" + expn);
	}
}

function loadStatics()
{
	try
	{
		//var test=document.getElementById("text").addEventListener("click", handleEvent1, true);
	var captions = new Array();
	captions.push(getStringResource("openrecentitem"));
	captions.push(getStringResource("createnew"));
	captions.push(getStringResource("createfromtemplates"));

	var headers = document.getElementById('content_table').rows[0].cells;

	for(var i=0; i < captions.length; i++)
		placeText(headers[i], captions[i], tfHeadLine);
		

		
	var dont_show = document.getElementById("pref_item");
	
	dont_show.style.background = "url(" + getImgResource("iconcheckoff") + ") 3px 3px no-repeat";
	setTxtStyle(dont_show, tfItemLine);
	dont_show.innerHTML = getStringResource("dontshowagain");
	dont_show.style.cursor = "pointer"; //change the cursor to hand pointer when we hover on the preference checkbox and the text.
	dont_show.style.width = getTextExtent(getStringResource("dontshowagain"), tfItemLine) + "px"; // limit the clickable width.
	dont_show.addEventListener("click", handleAlert, true);
		
	}catch(expn)
	{
		alert("loadStatics" + expn);
	}
	
}

function sendLinks()
{
	return linkArray;
	}
	
function loadNewItems(captions,icons,mi){

try{

	var items =document.getElementById('new_items').getElementsByTagName('p');
	for(var i=0;i < (mi + 3);i++)
	{
		placeIconTextButton(items[i], captions[i], tfItemLine, fileType2ImgResource(icons[i]));
		items[i].id = "new" + i;
	}
	
	placeIconTextButton(items[mi+3], getStringResource("more"), tfItemLine, "iconfolder");
	items[mi+3].id = "more_new";
	}catch(expn)
	{
		alert("loadNew" + expn);
	}

}



function loadMRUItems(mi,ary){

	var items = document.getElementById('recent_items').getElementsByTagName('p');

	for(var i=0;i < mi;i++)
	{
		placeIconTextButton(items[i], path2fname(ary[0][i]), tfItemLine, fileType2ImgResource(ary[1][i]));
		items[i].id = "recent" + i;
	}
	
	placeIconTextButton(items[mi], getStringResource("open"), tfItemLine, "iconfolder");	
	items[mi].id = "more_recent";
}

function sendSamples(){
	return sampleArray;
	
	}

	
function getPref(val){
	pref=val;
	}	

function handleAlert(e){
	try{
	if(e.target.id.indexOf("pref_item") != -1)
	{
	var dont_show = document.getElementById("pref_item");
		if(pref)
		{if(!alert(getStringResource("checkboxalert")))
		dont_show.style.background = "url(" + getImgResource("iconcheckon") + ") 3px 3px no-repeat";
		jsSetPrefShowFalse();}
		else{
		dont_show.style.background = "url(" + getImgResource("iconcheckoff") + ") 3px 3px no-repeat";
		jsSetPrefShowTrue();	}
				
	}
	}catch (expn){alert("handlealert"+expn);}
	
}
