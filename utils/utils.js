import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const showToast = (mode='dismissable',variant='info ',title, message) => {
    const event = new ShowToastEvent({
        mode : mode,
        variant : variant,
        title : title,
        message : message
    });
    return event;
}

const validateForm = () =>{
    const allValid = [...this.template.querySelectorAll('lightning-input')]
        .reduce((validSoFar, inputCmp) => {
                    inputCmp.reportValidity();
                    return validSoFar && inputCmp.checkValidity();
        }, true);
    const allValidTxtArea = [...this.template.querySelectorAll('lightning-textarea')]
        .reduce((validSoFar, inputCmp) => {
                    inputCmp.reportValidity();
                    return validSoFar && inputCmp.checkValidity();
        }, true);
    const allValidTxtSelect = [...this.template.querySelectorAll('lightning-combobox')]
        .reduce((validSoFar, inputCmp) => {
                    inputCmp.reportValidity();
                    return validSoFar && inputCmp.checkValidity();
        }, true);
    
    const isValid = allValid && allValidTxtArea && allValidTxtSelect;
    return isValid;
}

export { showToast , validateForm} 