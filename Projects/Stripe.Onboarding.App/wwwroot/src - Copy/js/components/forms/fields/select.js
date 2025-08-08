export default function (data) {
    return ` 
        <!--Hidden input-->
        <input
            style="width: 100%"
            :type="field.type"
            :name="field.name"
            :value="field.value"
            x-model="field.value"
            :hidden="true"
            >
        </input>
        <fieldset role="group" style="minWidth: 100%;">
            <legend x-text="field.name"></legend>
            <details class="dropdown">
                <summary>
                    <span x-if="field.value == null || field.value.length == 0" x-text="field.label"></span>
                    <span x-if="field.value != null || field.value.length > 0" x-text="field.value"></span>
                </summary>
                <ul>
                    <template x-for="item in field.items">
                        <li>
                            <label>
                                <input type="checkbox" :name="item" :checked="field.value.indexOf(item) > -1" 
                                @click="()=> { 
                                    const index = field.value.indexOf(item);
                                    if(index == -1) field.value.push(item)
                                    else field.value.splice(index, 1)
                                }" />
                                <span x-text="item" />
                            </label>
                        </li>
                    </template>
                </ul>
            </details>
        </fieldset>
        
        <small 
            x-show="field.helper != null && field.helper.length > 0"
            :id="field.id || field.name+i" x-text="field.helper"></small>
        `
}