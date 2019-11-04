import { LightningElement, track, api } from 'lwc';

export default class SearchComponent extends LightningElement {
    @track searchval;
    @api label='';
    @api  variant = 'label-hidden';
    handleChange( event ){
        const value = event.target.value;
        this.searchval = value;

        const searchEvent = new CustomEvent(
            'search',
            {
                detail : this.searchval
            }
        );
        this.dispatchEvent(searchEvent);
    }
    handleBlur(){
        const searchEvent = new CustomEvent(
            'search',
            {
                detail : 'blur'
            }
        );
        this.dispatchEvent(searchEvent);
    }
    handleFocus(){
        const searchEvent = new CustomEvent(
            'search',
            {
                detail : 'focus'
            }
        );
        this.dispatchEvent(searchEvent);
    }
}