jQuery(document).ready(function() {
	
	InputfieldTinyMCE.onReady(function(editor) {
		
		var langid = false;
		var fieldname = editor.id.replace('Inputfield_', '');
		if(/__\d+$/.test(fieldname)) {
			langid = fieldname.replace(/^.*__/, '');
			var baseFieldname = fieldname.replace(/__\d+$/, '');
			var config = ProcessWire.config['InputfieldTinyMCE_' + baseFieldname];
		} else {
			var config = ProcessWire.config['InputfieldTinyMCE_' + fieldname];
		}
		
		if(config && config.inlinecomplete) {

			var triggerNum = 0;			
			for(var i = 0, l = config.inlinecomplete.actions.length; i < l; i++) {
				
				if(Array.isArray(config.inlinecomplete.actions[i].trigger)) {
					var triggers = config.inlinecomplete.actions[i].trigger;
					for(var k = 0; k < triggers.length; k++) {
						var actionSettings = Object.assign({}, config.inlinecomplete.actions[i]);
						actionSettings.trigger = triggers[k];
						if(langid)
							actionSettings.language = langid;
						var autocompleteConfig = InlineCompleteHandler(editor, config.inlinecomplete, actionSettings);
			    		editor.ui.registry.addAutocompleter(fieldname + '_autocomplete' + triggerNum, autocompleteConfig);
			    		triggerNum++;
					}
				} else {
					var actionSettings = Object.assign({}, config.inlinecomplete.actions[i]);
					if(langid)
						actionSettings.language = langid;
					var autocompleteConfig = InlineCompleteHandler(editor, config.inlinecomplete, actionSettings);
		    		editor.ui.registry.addAutocompleter(fieldname + '_autocomplete' + triggerNum, autocompleteConfig);
		    		triggerNum++;
				}
				
	    		
	    	}
		}
		    	
	});

});

function InlineCompleteHandler(editor, config, act) {

	const insertAction = (api, rng, value) => {
		editor.selection.setRng(rng);
		editor.insertContent(value);
		api.hide();
	}
	
	const fetchAction = (pattern) => {
		return new Promise((resolve) => {
			jQuery.ajax({
				url:		act.url,
				dataType:	'json',
				data:		{
					page:			act.page,
					field:			act.name,
					action:			act.action,
					filter:			pattern,
					trigger:		act.trigger,
					language:		act.language
				},
				method:		'POST'
			}).then((data) => {resolve(data)});
		});
	}

	return {
		trigger:			act.typeAheadAfter,
		onAction:			insertAction,
		fetch:				fetchAction
	}
	
}
