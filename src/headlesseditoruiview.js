/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module editor-headless/headlesseditoruiview
 */

import EditorUIView from '@ckeditor/ckeditor5-ui/src/editorui/editoruiview';
import InlineEditableUIView from '@ckeditor/ckeditor5-ui/src/editableui/inline/inlineeditableuiview';

/**
 * Headless editor UI view. Uses an nline editable and a floating toolbar.
 *
 * @extends module:ui/editorui/editoruiview~EditorUIView
 */
export default class HeadlessEditorUIView extends EditorUIView {
  /**
   * Creates an instance of the headless editor UI view.
   *
   * @param {module:utils/locale~Locale} locale The {@link module:core/editor/editor~Editor#locale} instance.
   */
  constructor( locale, editableElement ) {
    super( locale );

    /**
     * Editable UI view.
     *
     * @readonly
     * @member {module:ui/editableui/inline/inlineeditableuiview~InlineEditableUIView}
     */
    this.editable = new InlineEditableUIView( locale, editableElement );

    this.registerChild( this.editable );
  }

  /**
   * @inheritDoc
   */
  render() {
    super.render();
  }

  /**
   * @inheritDoc
   */
  get editableElement() {
    return this.editable.element;
  }
}
