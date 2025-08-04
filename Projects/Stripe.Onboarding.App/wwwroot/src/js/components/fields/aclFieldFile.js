import { mxField } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxField(params),
        // PROPERTIES
        type: '',
        value: null,
        limitText: null,
        placeholder: '',
        cssClass: '',
        mediaItems: [],
        // INIT
        init() {
            this._mxField_setValues(params);
            this.setValues(params);
            this.render(); 
        },
        // GETTERS
        // METHODS
        setValues(params) {
            if (this.mxField_max != null && this.mxField_max > 0) {
                this.limitText = `Maximum ${this.mxField_max} files allowed`;
            }
            if (this.mxField_value != null) {
                this.mediaItems = [
                    this.createMediaItem('Profile', this.mxField_value, this.mxField_type)
                ]
            }
        },
        createMediaItem(name, imgSrc, type) {
            return {
                type: type,
                name: name,
                caption: name,
                src: imgSrc,
            }
        },
        onChange($ev) {
            let files = Array.from($ev.target.files);
            if (files == null || files.length == 0) return;
            // Limit files to max limit
            if (files.length > this.mxField_max) {
                files = files.slice(0, this.mxField_max);
            }
            const items = files.map(x => 
            {
                const type = x.type.split("/")[0];
                return this.createMediaItem(x.name, this._mxField_GetFilePreview(x), type)
                /*
                return {
                    type: type,
                    name: x.name,
                    caption: x.name,
                    src: this._mxField_GetFilePreview(x)
                }
                */
            });
            // media items
            this.mediaItems = items;   
            
            if (!this.mxField_multiple) {
                this.mxField_value = files[0]
            } else {
                this.mxField_value = files
            }
            this._mxField_onChange();
        },
        removeFile(index) {
            this.mediaItems.splice(index, 1);
            if (!this.mxField_multiple) {
                this.mxField_value = null;
            } else {
                this.mxField_value.splice(index, 1);
            }
        },
        render() {
            const html =  `
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" :for="mxField_id">Upload multiple files</label>
                <input 
                    :id="mxField_id"
                    :name="mxField_name"
                    :aria-invalid="mxField_ariaInvalid"
                    :placeholder="mxField_placeholder"
                    :disabled="mxField_disabled"
                    :min="mxField_min"
                    :required="mxField_required"
                    :max="mxField_max"
                    data-primary="blue-600"
                    data-rounded="rounded-lg"
                    :accept="mxField_max"
                    :class="mxField_cssClass || mxField_inputClass"
                    @change="onChange"
                    type="file" 
                    :multiple="mxField_multiple"
                    class="block w-full py-0 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    >
                <span x-text="limitText" class="absolute -my-1 right-0 text-sm peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                </span>
                <span x-text="mxField_invalidText || 'Invalid input'" class="absolute -my-1 right-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                </span>
                <!--Grid-->
                <div 
                    class="max-w-6xl mx-auto duration-1000 delay-300 opacity-0 select-none ease animate-fade-in-view" 
                    style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);">
                    <ul x-ref="gallery" id="gallery" class="grid grid-cols-2 gap-2 lg:grid-cols-5">
                        <template x-for="(media, index) in mediaItems" :id="media.id">
                            <li>
                                <div
                                    x-data="aclMedia({
                                        ...media,
                                        controls: false,
                                        canPlay: false,
                                        class: 'object-cover select-none w-full h-auto bg-gray-200 rounded cursor-pointer aspect-[5/6] lg:aspect-[2/3] xl:aspect-[3/4]'
                                    })"
                                    @click="(ev) => { imageGalleryOpen(index) }">
                                </div>
                                <figcaption x-show="media.caption" x-text="media.caption" class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400"></figcaption>
                                <div 
                                    class="justify-center text-center z-10"
                                    x-data="aclButton({ text: 'Remove file'})"
                                    @click="(ev) => {
                                        ev.preventDefault();
                                        removeFile(index);
                                    }"
                                ></div>
                            </li>
                        </template>
                    </ul>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}