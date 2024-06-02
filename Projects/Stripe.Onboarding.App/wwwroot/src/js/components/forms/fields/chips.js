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
        <fieldset x-data role="group" class="form-input chips">
        
            <div class="grid" role="group">
                <div class="container">
                    <template x-for="(item, i) in field.value || []">
                        <button class="tag outline secondary small" x-text="item" @click="()=> { 
                            const index = field.value.indexOf(item);
                            field.value.splice(index, 1)
                        }"></button>
                    </template>
                </div>
            </div>    
            <input :style="mxResponsive_IsSmall ? 'width:30%' : 'width: 100%'" name="Tag" type="text" x-model="field.newtag" placeholder="tag your post.." />
            
            <button class="small flat secondary material-icons" @click="()=> {
                if(field.value == null) field.value = [];
                const index = field.value.indexOf(field.newtag);
                if (index == -1) {
                    field.value.push(field.newtag)
                    field.newtag = null;
                    field.helper = null;
                }
                else {
                    field.helper = 'Already exists'
                }
            }" :disabled="field.newtag == null">add</button>
        </fieldset>
        
        
        <small 
            x-show="field.helper != null && field.helper.length > 0"
            :id="field.id || field.name+i" x-text="field.helper"></small>
        `
}