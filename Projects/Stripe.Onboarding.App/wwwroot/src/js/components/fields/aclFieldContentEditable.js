import { mxField } from '/src/js/mixins/index.js';

const renderers = {
    h1: ({ children }) => `<h1 class="mb-4 text-4xl text-gray-900 md:text-5xl lg:text-6xl  ${sharedClasses}">${children}</h1>`,
    h2: ({ children }) => `<h1 class="mb-4 text-3xl text-gray-900 md:text-5xl lg:text-6xl ${sharedClasses}">${children}</h1>`,
    h3: ({ children }) => `<h3 class="text-3xl ${sharedClasses}">${children}</h3>`,
    h4: ({ children }) => `<h4 class="text-2xl ${sharedClasses}">${children}</h3>`,
    h5: ({ children }) => `<h5 class="text-xl ${sharedClasses}">${children}</h3>`,
    h6: ({ children }) => `<h6 class="text-large ${sharedClasses}">${children}</h3>`,
    p: ({ children }) => `<p class="my-4 text-lg ${bodyClasses} ${sharedClasses}">${children}</p>`,
    ul: ({ children }) => `<ul class="list-disc list-inside my-4 text-lg ${bodyClasses} ${sharedClasses}">${children}</ul>`,
    ol: ({ children }) => `<ol class="list-decimal list-inside my-4 text-lg ${bodyClasses} ${sharedClasses}">${children}</ol>`,
    li: ({ children }) => `<li class="my-2 text-lg ${bodyClasses} ${sharedClasses}">${children}</li>`,
    code: ({ children }) => `<code class="bg-gray-100 dark:bg-gray-800 rounded-md p-2 text-sm ${sharedClasses}">${children}</code>`,
    code_block: ({ children }) => `<pre class="bg-gray-100 dark:bg-gray-800 overflow-y-scroll rounded-md p-2 text-sm ${sharedClasses}">${children}</pre>`,
}
export default function (params) {
	return {
        ...mxField(params),
        // PROPERTIES
        editor: null,
        html: null,
        savedSelection: null,
        showMenu: false,
        isInFocus: false,
        defaultId: 'content-editor',

        nodes: [],
        chunks: [],

        cursorStart: 0,
        cursorEnd: 0,
        selectedText: null,
        // INIT
        init() {
            // If no ID is set, use a default ID
            if (!params.id) params.id = this.defaultId;
            this._mxField_setValues(params);
            this.setValues(params);
            this.render();
            /*
            this.$watch('mxField_value', (newVal) => {
                this.html = newVal;
            })
            */
        },
        // GETTERS
        get getEditorElement() {
            return document.getElementById(this.mxField_id)
        },
        get getInnerHTML() {
            return `${this.getEditorElement.innerHTML}`
        },
        get getInnerText() {
            return `${this.getEditorElement.innerText}`
        },
        get isTextSelection() {
            return (this.cursorStart != this.cursorEnd);
        },
        get formats() {
            return [
                {
                    name: 'newline',
                    key: '\\n',
                    regex: new RegExp('\\n', 'gi'),
                    format: (input) => { return `<a target="_blank" href="${input}">${input}</a>` }
                },
                {
                    name: 'link',
                    key: '@l',
                    regex: new RegExp('@(https?:\/\/[^\\s]+)@l', 'gim'),
                    format: (input) => { return `<a target="_blank" href="${input}">${input}</a>` }
                },
                {
                    name: 'post',
                    key: '@p',
                    regex: new RegExp('@[a-zA-Z0-9.+/]+@p', 'gim'),
                    format: (input) => { 
                        return `<span contenteditable=\"false\" class=\"hover:underline mb-2 font-bold\">${ input }</span>` }
                },
                {
                    name: 'mention',
                    key: '@m',
                    regex: new RegExp('@[a-zA-Z0-9.-_=]+@m', 'gim'),
                    format: (input) => { 
                        return `<span contenteditable=\"false\" class=\"hover:underline mb-2 font-bold\">${ input }</span>` }
                },
                {
                    name: 'quote',
                    key: '@q',
                    regex: new RegExp('@.*@q', 'gim'),
                    format: (input) => { return `<blockquote>${input}</blockquote><br/>` }
                },
                {
                    name: 'underline',
                    key: '@u',
                    regex: new RegExp('@([^@u]*)@u', 'gim'),
                    format: (input) => { return `<u>${input}</u>` }
                },
                {
                    name: 'italics',
                    key: '@i',
                    regex: new RegExp('@([^#i]*)@i', 'gim'),
                    format: (input) => { return `<em>${input}</em>` }
                },
                {
                    name: 'bold',
                    key: '@b',
                    regex: new RegExp('@([^@b]*)@b', 'gim'),
                    format: (input) => { return `<strong>${input}</strong>` }
                },
                {
                    name: 'code',
                    key: '@c',
                    regex: new RegExp('@([^@c]*)@c', 'gim'),
                    format: (input) => { return `<code>${input}</code>` }
                },
            ];
        },
        // METHODS
        setValues(params) {
            this.availableFormats = params.availableFormats;
            console.log(params);
        },
        toggleMenu() {
            this.showMenu = !this.showMenu
        },
        execCommand(command, val) {
            document.execCommand(command, false, val);
            document.getElementById(this.mxField_id).focus();
        },
        getCaretPosition(target) {
            if (target.isContentEditable || document.designMode === 'on') {
                target.focus();
                const _range = document.getSelection().getRangeAt(0);
                const range = _range.cloneRange();
                const temp = document.createTextNode('\0');
                range.insertNode(temp);
                const caretposition = target.innerText.indexOf('\0');
                temp.parentNode.removeChild(temp);
                return caretposition;
            }
        },
        getFormats(text) {
            const nodes = [];
            for(var i = 0; i < this.formats.length; i++) {
                const format = this.formats[i];
                const matches = text.match(format.regex);
                if(matches == null || matches.length == 0) continue;
                
                const formats = {
                    type: format.name,
                    values: matches
                }
                nodes.push(formats);
            }
            return nodes;
        },
        onChange(data) {
          //  this.cursorStart = this.getCaretPosition(data.target); 
            // Update cursor position 
           // console.log(window.getSelection().anchorOffset)
            const decodedChunks = this.decodeText(this.getInnerHTML);
            console.log(decodedChunks);
            return;

            const text = this.getInnerText;
            const splitByTokens = text.split(new RegExp('@(.*)@ ', 'gim'));
            //const newlineNodes = text.split('\n')
            const nodes = this.getFormats(text);
         //   console.log(nodes)
       //     console.log(splitByTokens)
           // console.log(nodes);
           // console.log(splitByTokens)

            const chunks = this.createEncodedChunks(text);
            this.chunks = chunks;

            var decodedText = this.decodeText(this.getInnerHTML);
            //console.log('decoded: '+decodedText)
          
            // Set raw value
            this.mxField_value = text;
            this._mxField_onChange(data);
            
           // var html = this.encodeText2(text, nodes);
            var nodes2 = this.createEncodedChunks(text);
          //  console.log(nodes2);
  /*
            // Format html string
            // Get encoded chunks
            this.encodeText(text, chunks);
            */
        }, 
        
        encodeText2(text, nodes) {
            document.getElementById(this.mxField_id).focus();
            console.log(nodes)
            for (var i = 0; i < nodes.length; i++) {
                //text = text.replace(chunks[i].encoded, '');
                console.log(chunks[i].start+':'+chunks[i].end+' '+chunks[i].formatted)
                //text = this.insertStringIntoString(text, chunks[i].start, chunks[i].end, chunks[i].formatted)

                //insert html
                document.execCommand("insertHTML", false, chunks[i].formatted);
                
                //set selection
                this.setSelection(chunks[i].start, chunks[i].end)
                
                //delete selection
                this.execCommand('delete', false, null);
            }
            return text;
        },
        

        setContentEditableCursorPosition() {
            var el = document.getElementById(this.mxField_id);
            var range = document.createRange();
            var sel = window.getSelection();
            range.setStart(el.childNodes[0], this.cursorStart);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            el.focus();
        },
        setSelection(start, end) {
            const el = document.getElementById(this.mxField_id);
            const range = document.createRange();
            const sel = window.getSelection();
            range.setStart(el.childNodes[0], start);
            range.setEnd(el.childNodes[0], end);
            sel.removeAllRanges();
            sel.addRange(range);
            el.focus();
        },
        createEncodedChunks(text) {
            let chunks = [];
            if (!text) return chunks;
            const self = this;
            // loop through each format type and fetch all instances of it based on the format regex
            for (var i = 0; i < this.formats.length; i++) {
                const formatter = this.formats[i];
                // return array of all instances of the regex pattern
                var links = text.match(formatter.regex)
                // if empty, skip
                if (links == null || links.length == 0) continue;
                // get the formatValues
                const formats = links.map(x => {
                    const index = text.indexOf(x);
                    const cleanedStr = x.slice(1, x.length - 2)
                    return self.createElement(index, formatter, cleanedStr)
                })
                chunks = chunks.concat(formats)
            }
            return chunks;
        },
        createDecodedChunks(html) {
            let chunks = [];
            if (!html) return chunks;
            const self = this;
            // loop through each format type and fetch all instances of it based on the format regex
            for (var i = 0; i < this.formats.length; i++) {
                const formatter = this.formats[i];
                // return array of all instances of the regex pattern
                var links = text.match(formatter.regex)
                // if empty, skip
                if (links == null || links.length == 0) continue;
                // get the formatValues
                const formats = links.map(x => {
                    const index = text.indexOf(x);
                    const cleanedStr = x.slice(1, x.length - 2)
                    return self.createElement(index, formatter, cleanedStr)
                })
                chunks = chunks.concat(formats)
            }
            return chunks;
        },
        addNode(text) {
            if(this.nodes == null) this.nodes = [];
            this.nodes.push(
                {
                    id: this.nodes.length, 
                    value: text
                }
            )
        },
        createElement(index, formatter, value) {
            return {
                start: index,
                end: (index + value.length + formatter.key.length + 1),
                value: value,
                format: formatter.name,
                formatted: formatter.format(value),
                encoded: `@${value}${formatter.key}`
            }
        }, 
        inserHtml(html) {
            //to fix duplicate elements added
            //https://stackoverflow.com/questions/37008776/inserting-text-with-execcommand-causes-a-duplication-issue
            if (document.querySelectorAll('span[data-text="true"]').length === 0) {
                document.execCommand("insertHTML", false, html);
                document.execCommand("undo", false);
            } else {
                document.execCommand("insertHTML", false, html);
            }
        },
        
        insertStringIntoString(string, start, end, substring) {
            if (start < 0) {
                start += string.length;
                if (start < 0)
                start = 0;
            }
            return string.slice(0, start) + (substring || "") + string.slice(start + end);
        },

        encodeText(text, chunks) {
            document.getElementById(this.mxField_id).focus();
            console.log(chunks)
            for (var i = 0; i < chunks.length; i++) {
                //text = text.replace(chunks[i].encoded, '');
                console.log(chunks[i].start+':'+chunks[i].end+' '+chunks[i].formatted)
                //text = this.insertStringIntoString(text, chunks[i].start, chunks[i].end, chunks[i].formatted)

                //insert html
                document.execCommand("insertHTML", false, chunks[i].formatted);
                
                //set selection
                this.setSelection(chunks[i].start, chunks[i].end)
                
                //delete selection
                this.execCommand('delete', false, null);
            }
            return text;
        }, 
        decodeText(html) {
            let encodedText = html;
            for (var i = 0; i < this.chunks.length; i++) {
                encodedText = encodedText.replace(this.chunks[i].formatted, this.chunks[i].encoded);
            }
            return encodedText;
        },
        onPaste(ev) {
            ev.preventDefault();
            // Strip HTML
            const text = (ev.originalEvent || ev).clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
        },
        onMouseUp(ev) {
            this.setCursor();
            if (!this.isTextSelection) {
                this.selectedText = null;
                return;
            }                
            this.selectedText = window.getSelection()
                .anchorNode.data.substring(
                    window.getSelection().anchorOffset,
                    window.getSelection().extentOffset
                );
            console.log(this.selectedText);
        },
        setCursor() {
            this.cursorStart = window.getSelection().anchorOffset;
            this.cursorEnd = window.getSelection().extentOffset;
        },
        render() {
            const html =  `
                <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div x-show="showMenu" class="flex items-center justify-between border-b dark:border-gray-600">
                        <!-- Menu -->
                        <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                            
                            <!-- Action menu 1 -->
                            <div class="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                                
                                <div x-data="aclButton({ icon: 'code' })" @click="execCommand('formatBlock', 'code')"></div>
                                <div x-data="aclButton({ icon: 'bold' })" @click="execCommand('bold')"></div>
                                <div x-data="aclButton({ icon: 'italic' })" @click="execCommand('italic')"></div>
                                <div x-data="aclButton({ icon: 'mention' })" ></div>
                                <div x-data="aclButton({ icon: 'emoji' })" ></div>
                                
                            </div>
                            <!-- Action menu 2 -->
                            <div class="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                                
                            </div>
                        </div>
                        <div id="tooltip-fullscreen" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Show full screen
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                    <!-- Editor -->
                    <div class="relative flex items-center bg-white rounded-b-lg dark:bg-gray-800">
                         
                        <button type="button" @click="toggleMenu" class="absolute start-2.5">
                            <svg x-show="!showMenu" class="w-5 h-5" x-data="aclIconsSvg({ mxIcon_name: 'ellipsisCircle' })"></svg>
                            <svg x-show="showMenu" class="w-5 h-5" x-data="aclIconsSvg({ mxIcon_name: 'closeCircle' })"></svg>
                        </button>
                        
                        <div
                            :id="mxField_id"
                            :name="mxField_name"
                            :disabled="mxField_disabled"
                            contenteditable="true"
                            role="textbox"
                            x-html="html"
                            class="peer block w-full p-4 ps-10 text-xl placeholder-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                            :placeholder="mxField_placeholder"
                            @change="onChange"
                            @paste="onPaste"
                            @keyup="($event) => onChange($event)"
                            @mouseup="($event) => onMouseUp($event)"
                        </div> 
                    </div>
                </div>

            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}