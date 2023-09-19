﻿// c2008 Adobe Systems, Inc. All rights reserved.// Written by Jeffrey Tranberry/*@@@BUILDINFO@@@ Flatten All Masks.jsx 1.0.0.2*//*// BEGIN__HARVEST_EXCEPTION_ZSTRING<javascriptresource><name>$$$/JavaScripts/FlattenAllMasks/Menu=Flatten All Masks</name><category>Flatten</category><enableinfo>true</enableinfo><eventid>e805a6ee-6d75-4b62-b6fe-f5873b5fdf20</eventid><terminology><![CDATA[<< /Version 1                          /Events <<                           /e805a6ee-6d75-4b62-b6fe-f5873b5fdf20 [($$$/JavaScripts/FlattenAllMasks/Menu=Flatten All Masks) /noDirectParam <<                          >>]                          >>                       >> ]]></terminology></javascriptresource>// END__HARVEST_EXCEPTION_ZSTRING*/// enable double clicking from the // Macintosh Finder or the Windows Explorer#target photoshop// Make Photoshop the frontmost applicationapp.bringToFront();/////////////////////////// SETUP/////////////////////////// all the strings that need localizedstrFlattenAllMasksHistoryStepName = localize( "$$$/JavaScripts/FlattenAllMasks/Menu=Flatten All Masks" );/////////////////////////// MAIN/////////////////////////var doc = app.activeDocument; // remember the document, the selected layer, the visibility setting of the selected layervar currentLayer = doc.activeLayer; // remember the selected layervar currentVisible = currentLayer.visible;// remember the visibility setting of the selected layervar mySelectedLayers = getSelectedLayers(); // remember the selected layers// Create only one history state for the entire scriptdoc.suspendHistory(strFlattenAllMasksHistoryStepName, "main()");// restore the selected layertry{ 	doc.activeLayer = currentLayer;}catch(e) {	; // do nothing}// restore the visibility setting of the original layertry{ 	currentLayer.visible = currentVisible;}catch(e) {	; // do nothing}// restore the visibility setting of the original layertry{ 	currentLayer.visible = currentVisible;}catch(e) {	; // do nothing}if (mySelectedLayers.length != 0){//,more than one layer selected	// restore the selected layers	try{ 		setSelectedLayers(mySelectedLayers);	}catch(e) {		; // do nothing	}}// Record the script in the Actions palette when recording an actiontry{ 	var playbackDescription = new ActionDescriptor;	var playbackReference = new ActionReference;	playbackReference.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );	playbackDescription.putReference( charIDToTypeID("null"), playbackReference);	app.playbackDisplayDialogs = DialogModes.NO;	app.playbackParameters = playbackDescription;}catch(e) {	; // do nothing}/////////////////////////// FUNCTIONS////////////////////////////////////////////////////////////////////////////////////////////////////////// Function: main// Usage: container function to hold all the working code that generates history states// Input: <none> Must have an open document// Return: <none>///////////////////////////////////////////////////////////////////////////////function main(){		// Do some voodoo on the layer selection incase no layer is selected or multiple layers are selected	try{ 		touchUpLayerSelection()	}catch(e) {		; // do nothing	}		// create an array and store all the art layers in that array	var allArtLayers = new Array;	var allVisibleInfo = new Array;	getAllArtLayers(doc, allArtLayers, allVisibleInfo);	// Walk the layer stack	for (var i = 0; i < allArtLayers.length; i++){ 		try{ 			doc.activeLayer = allArtLayers[i];			if (hasVectorMask() == true){ // Only if it has a layer mask					rasterizeLayer(); // Rasterize the layer in case it's a fill layer, smart object, video or 3D layer (since you can't apply masks to these kinds of layers)					selectVectorMask(); // Select the vector mask					rasterizeVectorMask(); // rasterize the vector mask					applyLayerMask(); // Apply the layer mask				}			if (hasLayerMask() == true){ // Only if it has a layer mask					rasterizeLayer(); // Rasterize the layer in case it's a fill layer, smart object, video or 3D layer (since you can't apply masks to these kinds of layers)					selectLayerMask(); // Select the layer mask					applyLayerMask(); // Apply the layer mask				}			if (hasFilterMask() == true){ // Only if it has a Smart Filter mask					rasterizeLayer(); // Rasterize the layer - It's the only way to apply a Smart Filter Mask				}			allArtLayers[i].visible = allVisibleInfo[i];		}catch(e) {			; // do nothing		}	}}///////////////////////////////////////////////////////////////////////////////// Function: touchUpLayerSelection// Usage: deal with odd layer selections of no layer selected or multiple layers// Input: <none> Must have an open document// Return: <none>///////////////////////////////////////////////////////////////////////////////function touchUpLayerSelection() {	try{ 		// Select all Layers		var idselectAllLayers = stringIDToTypeID( "selectAllLayers" );			var desc252 = new ActionDescriptor();			var idnull = charIDToTypeID( "null" );				var ref174 = new ActionReference();				var idLyr = charIDToTypeID( "Lyr " );				var idOrdn = charIDToTypeID( "Ordn" );				var idTrgt = charIDToTypeID( "Trgt" );				ref174.putEnumerated( idLyr, idOrdn, idTrgt );			desc252.putReference( idnull, ref174 );		executeAction( idselectAllLayers, desc252, DialogModes.NO );		// Select the previous layer		var idslct = charIDToTypeID( "slct" );			var desc209 = new ActionDescriptor();			var idnull = charIDToTypeID( "null" );				var ref140 = new ActionReference();				var idLyr = charIDToTypeID( "Lyr " );				var idOrdn = charIDToTypeID( "Ordn" );				var idBack = charIDToTypeID( "Back" );				ref140.putEnumerated( idLyr, idOrdn, idBack );			desc209.putReference( idnull, ref140 );			var idMkVs = charIDToTypeID( "MkVs" );			desc209.putBoolean( idMkVs, false );		executeAction( idslct, desc209, DialogModes.NO );	}catch(e) {		; // do nothing	}}///////////////////////////////////////////////////////////////////////////////// Function: hasLayerMask// Usage: see if there is a raster layer mask// Input: <none> Must have an open document// Return: true if there is a vector mask///////////////////////////////////////////////////////////////////////////////function hasLayerMask() {	var hasLayerMask = false;	try {		var ref = new ActionReference();		var keyUserMaskEnabled = app.charIDToTypeID( 'UsrM' );		ref.putProperty( app.charIDToTypeID( 'Prpr' ), keyUserMaskEnabled );		ref.putEnumerated( app.charIDToTypeID( 'Lyr ' ), app.charIDToTypeID( 'Ordn' ), app.charIDToTypeID( 'Trgt' ) );		var desc = executeActionGet( ref );		if ( desc.hasKey( keyUserMaskEnabled ) ) {			hasLayerMask = true;		}	}catch(e) {		hasLayerMask = false;	}	return hasLayerMask;}///////////////////////////////////////////////////////////////////////////////// Function: hasVectorMask// Usage: see if there is a vector layer mask// Input: <none> Must have an open document// Return: true if there is a vector mask///////////////////////////////////////////////////////////////////////////////function hasVectorMask() {	var hasVectorMask = false;	try {		var ref = new ActionReference();		var keyVectorMaskEnabled = app.stringIDToTypeID( 'vectorMask' );		var keyKind = app.charIDToTypeID( 'Knd ' );		ref.putEnumerated( app.charIDToTypeID( 'Path' ), app.charIDToTypeID( 'Ordn' ), keyVectorMaskEnabled );		var desc = executeActionGet( ref );		if ( desc.hasKey( keyKind ) ) {			var kindValue = desc.getEnumerationValue( keyKind );			if (kindValue == keyVectorMaskEnabled) {				hasVectorMask = true;			}		}	}catch(e) {		hasVectorMask = false;	}	return hasVectorMask;}///////////////////////////////////////////////////////////////////////////////// Function: hasFilterMask// Usage: see if there is a Smart Filter mask// Input: <none> Must have an open document// Return: true if there is a Smart Filter mask///////////////////////////////////////////////////////////////////////////////function hasFilterMask() {	var hasFilterMask = false;	try {		var ref = new ActionReference();		var keyFilterMask = app.stringIDToTypeID("hasFilterMask");		ref.putProperty( app.charIDToTypeID( 'Prpr' ), keyFilterMask);		ref.putEnumerated( app.charIDToTypeID( 'Lyr ' ), app.charIDToTypeID( 'Ordn' ), app.charIDToTypeID( 'Trgt' ) );		var desc = executeActionGet( ref );		if ( desc.hasKey( keyFilterMask ) && desc.getBoolean( keyFilterMask )) {			hasFilterMask = true;		}	}catch(e) {		hasFilterMask = false;	}	return hasFilterMask;}///////////////////////////////////////////////////////////////////////////////// Function: selectLayerMask// Usage: select the layer mask on the current layer// Input: <none> Must have an open document// Return: <none>///////////////////////////////////////////////////////////////////////////////function selectLayerMask() {	try{ 		var id759 = charIDToTypeID( "slct" );			var desc153 = new ActionDescriptor();			var id760 = charIDToTypeID( "null" );				var ref92 = new ActionReference();				var id761 = charIDToTypeID( "Chnl" );				var id762 = charIDToTypeID( "Chnl" );				var id763 = charIDToTypeID( "Msk " );				ref92.putEnumerated( id761, id762, id763 );			desc153.putReference( id760, ref92 );			var id764 = charIDToTypeID( "MkVs" );			desc153.putBoolean( id764, false );		executeAction( id759, desc153, DialogModes.NO );	}catch(e) {		; // do nothing	}}///////////////////////////////////////////////////////////////////////////////// Function: selectVectorMask// Usage: select the vector mask on the current layer// Input: <none> Must have an open document// Return: <none>///////////////////////////////////////////////////////////////////////////////function selectVectorMask() {	try{ 		var id55 = charIDToTypeID( "slct" );		var desc15 = new ActionDescriptor();		var id56 = charIDToTypeID( "null" );			var ref13 = new ActionReference();			var id57 = charIDToTypeID( "Path" );			var id58 = charIDToTypeID( "Path" );			var id59 = stringIDToTypeID( "vectorMask" );			ref13.putEnumerated( id57, id58, id59 );			var id60 = charIDToTypeID( "Lyr " );			var id61 = charIDToTypeID( "Ordn" );			var id62 = charIDToTypeID( "Trgt" );        ref13.putEnumerated( id60, id61, id62 );    desc15.putReference( id56, ref13 );	executeAction( id55, desc15, DialogModes.NO );	}catch(e) {		; // do nothing	}}///////////////////////////////////////////////////////////////////////////////// Function: applyLayerMask// Usage: apply the vector mask on the current layer// Input: <none> Must have an open document// Return: <none>///////////////////////////////////////////////////////////////////////////////function applyLayerMask() {	try{ 		var id765 = charIDToTypeID( "Dlt " );			var desc154 = new ActionDescriptor();			var id766 = charIDToTypeID( "null" );				var ref93 = new ActionReference();				var id767 = charIDToTypeID( "Chnl" );				var id768 = charIDToTypeID( "Ordn" );				var id769 = charIDToTypeID( "Trgt" );				ref93.putEnumerated( id767, id768, id769 );			desc154.putReference( id766, ref93 );			var id770 = charIDToTypeID( "Aply" );			desc154.putBoolean( id770, true );		executeAction( id765, desc154, DialogModes.NO );	}catch(e) {		; // do nothing	}}///////////////////////////////////////////////////////////////////////////////// Function: rasterizeLayer// Usage: rasterize the current layer to pixels// Input: <none> Must have an open document// Return: <none>///////////////////////////////////////////////////////////////////////////////function rasterizeLayer() {	try{ 		var id1242 = stringIDToTypeID( "rasterizeLayer" );			var desc245 = new ActionDescriptor();			var id1243 = charIDToTypeID( "null" );				var ref184 = new ActionReference();				var id1244 = charIDToTypeID( "Lyr " );				var id1245 = charIDToTypeID( "Ordn" );				var id1246 = charIDToTypeID( "Trgt" );				ref184.putEnumerated( id1244, id1245, id1246 );			desc245.putReference( id1243, ref184 );		executeAction( id1242, desc245, DialogModes.NO );	}catch(e) {		; // do nothing	}}///////////////////////////////////////////////////////////////////////////////// Function: rasterizeVectorMask// Usage: rasterize the vector mask on the // current layer to pixels// Input: <none> Must have an open document// Return: <none>///////////////////////////////////////////////////////////////////////////////function rasterizeVectorMask() {	try{ 		var id488 = stringIDToTypeID( "rasterizeLayer" );		var desc44 = new ActionDescriptor();		var id489 = charIDToTypeID( "null" );			var ref29 = new ActionReference();			var id490 = charIDToTypeID( "Lyr " );			var id491 = charIDToTypeID( "Ordn" );			var id492 = charIDToTypeID( "Trgt" );			ref29.putEnumerated( id490, id491, id492 );		desc44.putReference( id489, ref29 );		var id493 = charIDToTypeID( "What" );		var id494 = stringIDToTypeID( "rasterizeItem" );		var id495 = stringIDToTypeID( "vectorMask" );		desc44.putEnumerated( id493, id494, id495 );		executeAction( id488, desc44, DialogModes.NO );	}catch(e) {		; // do nothing	}}///////////////////////////////////////////////////////////////////////////////// Function: getAllArtLayers// Usage: get a reference to all artLayers in // the document, does recursion into groups// Input: obj, current object, document or layerSet// layersArray, place to put the resulting artLayers,// layersArray is both input and output// Return: <none>///////////////////////////////////////////////////////////////////////////////function getAllArtLayers(obj, layersArray, visibleArray) {	for( var i = 0; i < obj.artLayers.length; i++) {		layersArray.push(obj.artLayers[i]);		visibleArray.push(obj.artLayers[i].visible);	}	for( var i = 0; i < obj.layerSets.length; i++) {		getAllArtLayers(obj.layerSets[i], layersArray, visibleArray);	// recursive call	}}///////////////////////////////////////////////////////////////////////////////// Function: getSelectedLayers// Usage: creates and array of the currently selected layers// Input: <none> Must have an open document// Return: Array selectedLayers///////////////////////////////////////////////////////////////////////////////function getSelectedLayers() {	var selectedLayers = [];	try {		var backGroundCounter = activeDocument.artLayers[activeDocument.artLayers.length-1].isBackgroundLayer ? 0 : 1;		var ref = new ActionReference();		var keyTargetLayers = app.stringIDToTypeID( 'targetLayers' );		ref.putProperty( app.charIDToTypeID( 'Prpr' ), keyTargetLayers );		ref.putEnumerated( app.charIDToTypeID( 'Dcmn' ), app.charIDToTypeID( 'Ordn' ), app.charIDToTypeID( 'Trgt' ) );		var desc = executeActionGet( ref );		if ( desc.hasKey( keyTargetLayers ) ) {			var layersList = desc.getList( keyTargetLayers );			for ( var i = 0; i < layersList.count; i++) {				var listRef = layersList.getReference( i );				selectedLayers.push( listRef.getIndex() + backGroundCounter );			}			//hasLayerMask = true;		}	}catch(e) {		; // do nothing	}	return selectedLayers;}///////////////////////////////////////////////////////////////////////////////// Function: setSelectedLayers// Usage: Selects an array of layers// Input:  Array selectedLayers// Return: <none>///////////////////////////////////////////////////////////////////////////////function setSelectedLayers( layerIndexesOrNames ) {	// first select the first one	setSelectedLayer( layerIndexesOrNames[0] );	// then add to the selection	for ( var i = 1; i < layerIndexesOrNames.length; i++) {		addSelectedLayer( layerIndexesOrNames[i] );	}}///////////////////////////////////////////////////////////////////////////////// Function: setSelectedLayer// Usage: Selects the first layer// Input:  Array selectedLayers// Return: <none>///////////////////////////////////////////////////////////////////////////////function setSelectedLayer( layerIndexOrName ) {	try {		var id239 = charIDToTypeID( "slct" );		var desc45 = new ActionDescriptor();		var id240 = charIDToTypeID( "null" );		var ref43 = new ActionReference();		var id241 = charIDToTypeID( "Lyr " );		if ( typeof layerIndexOrName == "number" ) {			ref43.putIndex( id241, layerIndexOrName );		} else {			ref43.putName( id241, layerIndexOrName );		}		desc45.putReference( id240, ref43 );		var id242 = charIDToTypeID( "MkVs" );		desc45.putBoolean( id242, false );		executeAction( id239, desc45, DialogModes.NO );	}catch(e) {		; // do nothing	}}///////////////////////////////////////////////////////////////////////////////// Function: addSelectedLayer// Usage: adds the rest of the layers in the array to the first layer// Input:  Array selectedLayers// Return: <none>///////////////////////////////////////////////////////////////////////////////function addSelectedLayer( layerIndexOrName ) {	try {		var id243 = charIDToTypeID( "slct" );		var desc46 = new ActionDescriptor();		var id244 = charIDToTypeID( "null" );		var ref44 = new ActionReference();		var id245 = charIDToTypeID( "Lyr " );		if ( typeof layerIndexOrName == "number" ) {			ref44.putIndex( id245, layerIndexOrName );		} else {			ref44.putName( id245, layerIndexOrName );		}		desc46.putReference( id244, ref44 );		var id246 = stringIDToTypeID( "selectionModifier" );		var id247 = stringIDToTypeID( "selectionModifierType" );		var id248 = stringIDToTypeID( "addToSelection" );		desc46.putEnumerated( id246, id247, id248 );		var id249 = charIDToTypeID( "MkVs" );		desc46.putBoolean( id249, false );		executeAction( id243, desc46, DialogModes.NO );	}catch(e) {		; // do nothing	}}// End Flatten All Masks.jsx