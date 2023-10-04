# InlineCompleteTinyMCE
ProcessWire Autocomplete Module for InputfieldTinyMCE

# Status
Beta - please use with caution

# Compatibility
Requires ProcessWire >= 3.0.200 and InputfieldTinyMCE

# Description
This module adds autocomplete capabilities to InputfieldTinyMCE.

You can have multiple autocompleters in one editor. Each autocompleter is called an "action" in the context of this module.

The module ships with two pre-built actions:
- **InlineCompleteTinyMCEActionHannaCode:**
  Autocomplete for Hanna Codes configured in this system, start typing "[[" followed by the starting letters of the Hanna Code, then select from the list.
- **InlineCompleteTinyMCEActionUsers:**
  Add links to user profiles or user emails by typing "@" and the starting letters of the user's name, then select from the list.
  By default, a plain list is shown, but you can optionally enable profile pictures in the list.
- **InlineCompleteTinyMCEActionPages**
  Configure a pages selector in the field settings. The autocompleter then retrieves a list of pages matching the selector (use {filter} as a placeholder).
  You can also configure the trigger character. If you have image fields on selectable pages, you can enable preview images and select which image fields should
  be used as the source for the preview image. The first image found will be included in the dropdown as a thumbnail.

# For Developers
You can program your own action modules. They need to inherit from InlineCompleteTinyMCEAction and implement the following methods:
- init()  
  This init method needs to call parent::init() and set the default values for resultTpl (the text to be shown in the autocomplete result list) and insertTpl (the actual text or HTML to insert in the editor), as well as any additional configuration fields you implement.
- ___getActionSettings()  
  Needs to return an associative array with the following fields:
  "typeAheadAfter": the sequence that triggers this autocompleter
- executeFilter($options)  
  This method does the searching. The string to search for is available in $options->filter. The returned value, when converted to JSON, must be valid for the [TinyMCE autocompleter](https://www.tiny.cloud/docs/tinymce/6/autocompleter/).
- ___getSettingsFields($field, $prefix)  
  Hookable method that returns any additional configurations for the autocompleter in the field's configuration screen.
  The wrapper element for the fields has to be retrieved by calling ```$wrap = parent::___getSettingsFields($field, $prefix);```. The returned wrapper is then included in InputfieldTinyMCE::getConfigInputfields() and can be changed in the field's Input tab.

# ToDo
- Make the autocomplete trigger sequence configurable in module and/or field settings
- Allow multiple autocompleters in InlineCompleteTinyMCEActionPages
- Finish the documentation

# License

Licensed under Mozilla Public License 2.0. See LICENSE file for detail.
