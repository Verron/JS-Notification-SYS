/*
 *  Notification v0.0.1
 *	Author:			Verron Knowles
 *	Created:		07-14-2012
 *	Last-Modified:	07-14-2012
 *	Changes:		07-14-2012
 *					
 */
 (function(){
	var undefined,
	note = $('div#appNote'), // Dependent on jQuery
	noteBack = $('div#appNoteBack'), 
	noteBorder = $('div#appNoteBorder');
	
	var notification = (function( options ){
		var defaults = {
			"title" : "Notification Title",
			"titleAlgin" : "center",
			"content" : "Notification Content",
			"contentAlgin" : "left",
			"colors" : {
				"noteForeground" : "#fff",
				"noteBorder" : "rgba(193,91,0,0.5)",
				"noteBorderLine": "#666"
			},
			"dimensions" : {
				"dialogWidth" : "540px",
				"dialogHeight" : "240px"
			},
			"okay" : {
				"show" : false,
				"text" : "Okay"
				},
			"close" : true,
			"callback" : "",
			"onload" : "",
			"onunload" : "",
			"onclose" : ""
		};
		$.extend(defaults, options);
		
		notification.
		
		noteClose = note.find('span#appClose'), noteOkay = note.find('button#appOkay');

		noteExit = function() {
			note.fadeOut('1000');
			noteBack.fadeOut('1000');
			noteClose.hide();
			noteOkay.hide();
			note.undelegate();
			if ( $.isFunction(defaults.onunload) ) defaults.onunload.call(true);
		};

		note.find('div#appNoteTitle').html(defaults.title);
		note.find('div#appNoteContent').html(defaults.content);

		if ( defaults.close ) {
			noteClose.show();

			note.delegate( 'div#appNoteBorder span#appClose', 'click', function(){
				if ( $.isFunction(defaults.onclose) ) defaults.onclose.call(true);
				noteExit();
			});

		}

		if ( defaults.okay.show && $.isFunction(defaults.callback) ) {
			noteOkay.html(defaults.okay.text).show();

			note.delegate( 'div#appNoteBorder button#appOkay', 'click', function(){
				defaults.callback.call(true);
				noteExit();
			});
		}
		note.find('li[data-action]').delegate(null,"click",function(){
			var laThis = $(this);
			var types = laThis.data("action").split(":");
			var typeOptions = {}, tmp = types[0].split(";"), opts;
			typeOptions["option"] = tmp[0];
			for ( var y=1; tmp[y]; y++ ) {
				opts = tmp[y].split("=");
				typeOptions[opts[0]] = opts[1];
			}
			alert(JSON.stringify(typeOptions));
			if ( typeOptions.option = "ajax" ) {
				if ( typeOptions.data != null ) {
					tmp = typeOptions.data.split("<");
					typeOptions.data = {};
					for ( var x=0; tmp[x]; x++ ) {
						opts = tmp[x].split(">");
						typeOptions.data[opts[0]] = opts[1];
					}
					alert(JSON.stringify(typeOptions.data));
				}
			}
		});
        /* $(document).delegate('html','mouseup',function(e){
            e.preventDefault();
        }); */

		note.delegate('div','keypress',function(whichKey){
            var jqThis = $(this);
            if ( whichKey.which == 13 ) {
                whichKey.preventDefault();
                return noteOkay.is(':visible') ? 
                    (function(){
                        jqThis.blur();
                        noteOkay.focus().click();
                    })() : 
                    noteClose.is(':visible') ? 
                        (function(){
                            jqThis.blur();
                            noteClose.focus().click();
                        })() :
                        false;
            }
		});
		note.css({
			"backgroundColor" : defaults.colors.noteBorder,
			"width" : defaults.dimensions.dialogWidth,
			"height" : defaults.dimensions.dialogHeight
		});
		note.css('top',( $(window).height()/2 ) - ( note.height()/2 ) );
		note.css('left',( $(window).width()/2 ) - ( note.width()/2 ) );
        var noteTitle = noteBorder.children('div#appNoteTitle');
        
        // Calculate appNoteContent Height
        var np = parseInt(note.css('padding'),10), nh = note.height()-12, nth = noteTitle.height()+1; // -2 for noteBorder borders, +1 for noteTitle bottom border
        np = String(np) == "NaN" ? 20 : np; // iPad doesn't support css padding, position or offset
        var nch = nh-(np+nth);
        
        // Calculate appNoteContent Width
        var nw = note.width()-2;
        var ncw = nw-np;
		noteBorder.css({
			"backgroundColor" : defaults.colors.noteForeground,
			"borderColor" : defaults.colors.noteBorderLine
		});
        noteTitle.css("textAlgin",defaults.titleAlign);
		noteBorder.children('div#appNoteContent').css({
            "textAlign":defaults.contentAlign,
            "height" :  nch+"px",
            "width" : ncw+"px"
        });

		noteBack.fadeIn('1000');
		note.fadeIn('1000', function(){ noteBorder.attr('tabindex','-1').focus(); if ( $.isFunction(defaults.onload) ) defaults.onload(); });

		return note;
	});
	
	window.notification = notificaton;
	
 })( window );