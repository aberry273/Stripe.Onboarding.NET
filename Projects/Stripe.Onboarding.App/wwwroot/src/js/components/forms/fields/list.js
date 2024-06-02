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

            <template x-for="item in field.items || []">
                <div class="blockquote">
                    <summary class="primary">
                        <i class="material-icons icon-click" @click="() => {
                            const index = field.items.indexOf(item);
                            if(index > -1) field.items.splice(index, 1);
                        }">close</i>
                        <sup class="primary">
                            <i class="material-icon"></i>
                            <strong x-text="item"></strong>
                        </sup>
                    </summary>
                </div>
            </template>
        
        <small 
            x-show="field.helper != null && field.helper.length > 0"
            :id="field.id || field.name+i" x-text="field.helper"></small>
        `
}