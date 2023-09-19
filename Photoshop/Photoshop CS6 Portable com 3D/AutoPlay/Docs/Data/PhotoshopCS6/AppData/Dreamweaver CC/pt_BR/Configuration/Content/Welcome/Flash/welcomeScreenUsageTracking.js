/*************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2013 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
//Different file types opened from welcome page
var UT_WELCOME_SCREEN_NEW_DOCUMENT_CREATION			=	"New Document created from welcome screen";
var UT_WELCOME_SCREEN_NEW_DOCUMENT_HTML				=	"HTML";
var	UT_WELCOME_SCREEN_NEW_DOCUMENT_CSS				=	"CSS";
var UT_WELCOME_SCREEN_NEW_DOCUMENT_LESS				=	"LESS";
var UT_WELCOME_SCREEN_NEW_DOCUMENT_SASS				=	"Sass";
var UT_WELCOME_SCREEN_NEW_DOCUMENT_JAVASCRIPT		=	"JavaScript";
var UT_WELCOME_SCREEN_NEW_DOCUMENT_PHP				=	"PHP";
var UT_WELCOME_SCREEN_NEW_DOCUMENT_XML				=	"XML";
var UT_WELCOME_SCREEN_NEW_DOCUMENT_FLUID_GRID		=	"Fluid grid page";
var UT_WELCOME_SCREEN_NEW_DOCUMENT_SITE				=	"Site";
var UT_WELCOME_SCREEN_NEW_DOCUMENT_MORE_DOCUMENTS	=	"More Documents link clicked from welcome screen";


var UT_WELCOME_SCREEN_VIDEOS = "Welcome Screen Videos";
var UT_WELCOME_SCREEN_VIDEO1 = "Welcome Screen Video1 Link clicked";
var UT_WELCOME_SCREEN_VIDEO2 = "Welcome Screen Video2 Link clicked";
var UT_WELCOME_SCREEN_VIDEO3 = "Welcome Screen Video3 Link clicked";
var UT_WELCOME_SCREEN_VIDEO4 = "Welcome Screen Video4 Link clicked";
var UT_WELCOME_SCREEN_VIDEO5 = "Welcome Screen Video5 Link clicked";
var UT_WELCOME_SCREEN_MORE_VIDEOS = "Welcome Screen More Video Link clicked";

var UT_WELCOME_SCREEN_LINKS = "Welcome Screen Links";
var UT_WELCOME_SCREEN_LINKS1 = "Getting Started Link clicked";
var UT_WELCOME_SCREEN_LINKS2 = "New Features Link clicked";
var UT_WELCOME_SCREEN_LINKS3 = "Resources Link clicked";

// Function for calling logEvent
function logEvent(category, index){
	var eventName, subCategory;
	if(category == "sample"){
		subCategory = UT_WELCOME_SCREEN_VIDEOS;
		if(index == 0){
			eventName = UT_WELCOME_SCREEN_VIDEO1;
		}
		else if(index == 1){
			eventName = UT_WELCOME_SCREEN_VIDEO2;
		}
		else if(index == 2){
			eventName = UT_WELCOME_SCREEN_VIDEO3;
		}
		else if(index == 3){
			eventName = UT_WELCOME_SCREEN_VIDEO4;
		}
		else if(index == 4){
			eventName = UT_WELCOME_SCREEN_VIDEO5;
		}
	}
	else if(category == "more"){
		subCategory = UT_WELCOME_SCREEN_VIDEOS;
		eventName = UT_WELCOME_SCREEN_MORE_VIDEOS;
	}
	else if(category == "link"){
		subCategory = UT_WELCOME_SCREEN_LINKS;
		if(index == 0){
			eventName = UT_WELCOME_SCREEN_LINKS1;
		}
		else if(index ==  1){
			eventName = UT_WELCOME_SCREEN_LINKS2;
		}
		else if(index == 2){
			eventName = UT_WELCOME_SCREEN_LINKS3;
		}
	}
	
	dw.logEvent(subCategory, eventName);
}
