export default function (data) {
    return {
        // PROPERTIES
        mxMedia_src: '',
        mxMedia_id: '',
        mxMedia_alt: '',
        mxMedia_class: '',
        mxMedia_type: '',
        mxMedia_caption: '',
        // IMAGE

        // VIDEO
        mxMedia_webm: '',
        mxMedia_mp4: '',
        mxMedia_ogg: '',
        mxMedia_videoCanPlay: true,
        mxMedia_videoControls: true,
        
        init() {
        },
        // GETTERS
        get mxMedia_video() {
            return 'Video'
        },
        get mxMedia_image() {
            return 'Image'
        },
        // METHODS
    }
}