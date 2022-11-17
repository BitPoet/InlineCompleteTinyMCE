jQuery(document).ready(function() {
	
	InputfieldTinyMCE.onReady(function(editor) {
		
		var fieldname = editor.id.replace('Inputfield_', '');
		var config = ProcessWire.config['InputfieldTinyMCE_' + fieldname].inlinecomplete;
		
		for(var i = 0, l = config.actions.length; i < l; i++) {
			
			var autocompleteConfig = InlineCompleteHandler(editor, config, config.actions[i]);
    		editor.ui.registry.addAutocompleter(fieldname + '_autocomplete' + i, autocompleteConfig);
    		
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
					filter:			pattern
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
