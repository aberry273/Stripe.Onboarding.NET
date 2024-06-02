export default function (data) {
    return ` 
        <!--Hidden input-->
        <input
            :type="field.type"
            :name="field.name"
            :value="field.value"
            x-model="field.value"
            :hidden="true"
            ></input>
            <template x-for="(item, i) in field.items || []"> 
                <!--Single line quote--> 
                <div >
                    <summary class="primary blockquote">
                        <div>
                        <i class="material-icons icon-click" @click="() => {
                            field.items.splice(i, 1);
                        }">close</i>

                        <sup class="primary">
                            <i class="material-icon"></i>
                            <i><strong x-text="item.preview"></strong></i>
                        
                        </sup>
                            <label>
                                <input name="Partial" type="checkbox" role="switch" checked x-model="item.partial" :value="item.partial" />
                                Partial quote
                            </label>
                        </div>
                    </summary>
                  

                    <div x-show="item.partial">
                        <div>
                            <span>Quote</span>
                            <input
                                name="quoteContent"
                                x-model="item.content"
                                :placeholder="item.content"
                                ></input>
                        </div>
                        <div>
                            <span>Response</span>
                            <input
                                name="quoteContent"
                                :value="item.response"
                                x-model="item.response"
                                placeholder="Your response"
                                ></input>
                        </div>
                    </div>
                </div> 
            </template>
        
        <small 
            x-show="field.helper != null && field.helper.length > 0"
            :id="field.id || field.name+i" x-text="field.helper"></small>
        `
}