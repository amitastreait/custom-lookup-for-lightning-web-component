import { LightningElement, api } from 'lwc';

export default class RecordList extends LightningElement {
    @api record;
    @api iconname;

    

    handleSelect(){
        const selectEvent = new CustomEvent(
            'select',
            {
                detail : this.record.Id
            }
        );
        this.dispatchEvent(selectEvent);
    }
}