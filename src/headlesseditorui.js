/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module editor-headless/headlesseditorui
 */

import ComponentFactory from '@ckeditor/ckeditor5-ui/src/componentfactory';
import EditorUIView from '@ckeditor/ckeditor5-ui/src/editorui/editoruiview';
import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';
//import InlineEditableUIView from '@ckeditor/ckeditor5-ui/src/editableui/inline/inlineeditableuiview';

/**
 * The headless editor UI class.
 *
 * @implements module:core/editor/editorui~EditorUI
 */
export default class HeadlessEditorUI {
  /**
   * Creates an instance of the editor UI class.
   *
   * @param {module:core/editor/editor~Editor} editor The editor instance.
   * @param {module:ui/editorui/editoruiview~EditorUIView} view The view of the UI.
   */
  constructor( editor, view ) {
    /**
     * @inheritDoc
     */
    this.editor = editor;

    /**
     * @inheritDoc
     */
    this.view = view;

    /**
     * @inheritDoc
     */
    this.componentFactory = new ComponentFactory( editor );

    /**
     * @inheritDoc
     */
    this.focusTracker = new FocusTracker();
  }

  /**
   * Initializes the UI.
   */
  init() {
    this.view.render();
    //this.view.editable.render();

    this.editor.editing.view.attachDomRoot(this.view.editable.editableElement);
    this.focusTracker.add(this.view.editableElement);
  }

  /**
   * Destroys the UI.
   */
  destroy() {
    this.view.editable.destroy();
  }
}
