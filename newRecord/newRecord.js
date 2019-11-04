/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class NewRecord extends LightningElement {
    @api objectApiName;
    handleSuccess(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        const newrecord = new CustomEvent('success',{
            detail : { 
                recordId : event.detail.id, 
                recordName : fields.Name.value, 
                completeObj : event.detail 
            }
        });
        this.dispatchEvent(newrecord);
    }
    handleCancel( event ){
        event.preventDefault();
        const cancelrecord = new CustomEvent('cancel',{
            detail : { 
                recordId : undefined
            }
        });
        this.dispatchEvent(cancelrecord);
    }
}