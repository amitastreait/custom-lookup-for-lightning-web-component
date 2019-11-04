/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { LightningElement, api, track } from 'lwc';
import findRecords from '@salesforce/apex/LookupControllerLWC.findRecords';
export default class CustomLookup extends LightningElement {

    @api objectApiName;
    @api fieldApiName;
    @api iconname;
    @api label='';
    @api variant='label-hidden';
    @track records;
    @track errors;
    @api itemIndex;
    @api relationshipfield;
    @track selectedRecord;
    @track searchValue;
    @track isNewRecord = false;

    handleSearch(event){
        const searchValue = event.detail;
        this.searchValue = searchValue;
        findRecords({
            objectName : this.objectApiName,
            fieldApiName : this.fieldApiName,
            searchValue : searchValue
        })
        .then( result => {
            this.records  = result;
            for( let i = 0; i < this.records.length; i++){
                if(this.records[i]){
                    this.records[i].Name = this.records[i][this.fieldApiName];
                }
            }
            this.errors = undefined;
            //window.console.log(' records ', this.records);
        })
        .catch(error => {
            this.errors = error;
            this.records = undefined;
            
        });
    }

    handleBlur() {
        this.records = undefined;
    }

    handleSelect(event){
        const recordId = event.detail;
        const selectedRec = this.records.find(
            record => record.Id === recordId
        );
        /*console.log(' Selected Record ',  recordId);
        console.log(' Index ', this.itemIndex);
        console.log(' relationshipfield ', this.relationshipfield);
        */
        this.selectedRecord = selectedRec;

        const lookupEvent = new CustomEvent('lookup',{
            detail : { 
                recordId : recordId, 
                index : this.itemIndex, 
                relationshipfield : this.relationshipfield
            }
        });
        this.dispatchEvent(lookupEvent);
    }
    handleClick(event) {
        event.preventDefault();
    }
    handleRemove(event){
        event.preventDefault();
        this.selectedRecord = undefined;
        this.errors = undefined;
        this.records = undefined;
        const lookupEvent = new CustomEvent('lookup',{
            detail : {
                recordId : undefined , 
                relationshipfield : this.relationshipfield,
                index : this.itemIndex
            }
        });
        this.dispatchEvent(lookupEvent);
    }

    handleNewRecord(event) {
        event.preventDefault();
        this.isNewRecord = true;
    }

    handleOk(event){
        event.preventDefault();
        this.isNewRecord = false;
    }

    handleSuccess(event) {
        event.preventDefault();
        const params = event.detail;
        this.isNewRecord = false;
        const selectedRec = {
            Name : params.recordName,
            Id : params.recordId
        }
        /* Prepare information for Selected Record */
        this.selectedRecord = selectedRec;
        /* Dispatch the Event so that Parent Component can Handle It */
        const lookupEvent = new CustomEvent('lookup',{
            detail : { 
                recordId : params.recordId, 
                index : this.itemIndex, 
                relationshipfield : this.relationshipfield
            }
        });
        this.dispatchEvent(lookupEvent);
    }
    handleCancel( event ) {
        this.isNewRecord = false;
    }
}