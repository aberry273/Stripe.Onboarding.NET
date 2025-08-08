/*
const tools = {
    header: {
      class: Header,
      inlineToolbar: ['link'],
      config: {
        placeholder: 'Header'
      },
      shortcut: 'CMD+SHIFT+H'
    },
    image: {
      class: SimpleImage,
      inlineToolbar: ['link'],
    },
    list: {
      class: List,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+L'
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },
      shortcut: 'CMD+SHIFT+O'
    },
    warning: Warning,
    marker: {
      class:  Marker,
      shortcut: 'CMD+SHIFT+M'
    },
    code: {
      class:  CodeTool,
      shortcut: 'CMD+SHIFT+C'
    },
    delimiter: Delimiter,
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C'
    },
    linkTool: LinkTool,
    embed: Embed,
  }; 
 */
  export default function (params) {
    return {
          // PROPERTIES
          editor: null,
          readOnly: false,
          blocks: [],
          value: null,
          cssClass: '',
          id: 'editor-js',
          name: 'editor',
          // INIT
          init() {
              // If no ID is set, use a default ID
              if (!params.id) params.id = this.defaultId;  
              this.setValues(params);
              this.render();
              this.initializeEditorJs();
          },
          // GETTERS
          
          // METHODS
          setValues(params) {
              this.id = params.id;
              this.name = params.name;
              this.availableFormats = params.availableFormats;
              this.readOnly = params.readOnly;
              this.cssClass = params.class; 
              this.value = Array.isArray(params.value) ? params.value : []; 
          },
          updateData(blocks) {
              this.value = blocks;
              this.$dispatch('onchange', blocks);
          },
          initializeEditorJs() {
              const self = this;
              console.log('initializeEditorJs');
              console.log(this.id)
              this.$nextTick(() => { 
                  this.editor = new EditorJS({
                      /**
                       * Id of Element that should contain Editor instance
                       */
                      holder: this.id,
                      inlineToolbar: ['link', 'marker', 'bold', 'italic'],
                      placeholder: this.mxField_placeholder,
                      tools,
                      onChange: (api, event) => {
                          api.saver
                              .save()
                              .then((outputData) => { self.updateData(outputData.blocks); })
                              .catch((error) => { console.log('Saving failed: ', error)});
                      },
                      readOnly: self.readOnly,
                      data: {
                          blocks: this.value || []
                      },
                  });
                   
              })
          },
          render() {
              const html =  `
                  <div 
                      :class="cssClass"
                      class="w-full px-0 py-0"
                      :id="id" 
                      :name="name">
                  </div>
  
                  <style>
                      .codex-editor__redactor {
                          padding-bottom: 0 !important; /* This will override the inline style */
                          border: none;
                      }
                      .ce-toolbar__content { max-width: 95%; padding-left: 0px; }
                      .ce-block__content { padding-left: 0px; max-width: 95%; }
                      .ce-block__content .cdx-block {
                          padding: 0!important;
                      }
  
                      // Readonly
                      .readOnly .codex-editor__redactor {
                          padding-bottom: 0 !important; /* This will override the inline style */
                      }
                      .readOnly .ce-toolbar__content { display:none }
                      .readOnly .ce-block__content { padding-left: 0px; max-width: 100%; }
                      
                  </style>
              `
              this.$nextTick(() => { this.$root.innerHTML = html });
        },
      }
  }
  