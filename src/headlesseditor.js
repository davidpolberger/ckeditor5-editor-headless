/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 *
 * The content of this file has been adapted from the CKEditor 5 documentation
 * describing how to create a custom editor using Bootstrap in combination with
 * CKSource's inline editor.
 */

/**
 * @module editor-headless/headlesseditor
 */

import Editor from '@ckeditor/ckeditor5-core/src/editor/editor';
import DataApiMixin from '@ckeditor/ckeditor5-core/src/editor/utils/dataapimixin';
import ElementApiMixin from '@ckeditor/ckeditor5-core/src/editor/utils/elementapimixin';
import attachToForm from '@ckeditor/ckeditor5-core/src/editor/utils/attachtoform';
import HtmlDataProcessor from '@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor';
import HeadlessEditorUI from './headlesseditorui';
import HeadlessEditorUIView from './headlesseditoruiview';
import setDataInElement from '@ckeditor/ckeditor5-utils/src/dom/setdatainelement';
import getDataFromElement from '@ckeditor/ckeditor5-utils/src/dom/getdatafromelement';
import mix from '@ckeditor/ckeditor5-utils/src/mix';

export default class HeadlessEditor extends Editor {
  /**
   * Creates an instance of the headless editor.
   *
   * @protected
   * @param {HTMLElement} element The DOM element that will be the source for the created editor
   * (on which the editor will be initialized).
   * @param {module:core/editor/editorconfig~EditorConfig} config The editor configuration.
   */
  constructor( element, config ) {
    super( config );

    // Remember the element the editor is created with.
    this.element = element;

    // Use the HTML data processor in this editor.
    this.data.processor = new HtmlDataProcessor();

    // Create the ("main") root element of the model tree.
    this.model.document.createRoot();

    // The UI layer of the editor.
    this.ui = new HeadlessEditorUI( this, new HeadlessEditorUIView( this.locale, element ) );

    // When editor#element is a textarea inside a form element
    // then content of this textarea will be updated on form submit.
    attachToForm( this );
  }

  /**
   * Destroys the editor instance, releasing all resources used by it.
   *
   * Updates the original editor element with the data.
   *
   * @returns {Promise}
   */
  destroy() {
    // Cache the data, then destroy.
    // It's safe to assume that the model->view conversion will not work after super.destroy().
    const data = this.getData();

    this.ui.destroy();

    return super.destroy()
      .then( () => setDataInElement( this.element, data ) );
  }

  /**
   * Creates a headless editor instance.
   */
  static create( element, config ) {
    return new Promise( resolve => {
      const editor = new this( element, config );

      resolve(
	editor.initPlugins()
	  .then( () => {
	    editor.ui.init();
	    editor.fire( 'uiReady' );
	  } )
	  .then( () => editor.data.init( getDataFromElement( element ) ) )
	  .then( () => {
	    editor.fire( 'dataReady' );
	    editor.fire( 'ready' );
	  } )
	  .then( () => editor )
      );
    } );
  }
}

mix( HeadlessEditor, DataApiMixin );
mix( HeadlessEditor, ElementApiMixin );
