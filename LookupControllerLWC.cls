public with sharing class LookupControllerLWC {
    /*
    String ObjectName,
    String FiledAPI Name,
    String searchvalue
    */
    @AuraEnabled
    public static List<sObject> findRecords(String objectName, 
    										String fieldApiName, String searchValue){
        String key = '%' + searchValue + '%';
        String Query = '';
        if (!String.isBlank(searchValue)){
            Query = 'Select Id, '+fieldApiName+' FROM '+objectName+' Where '+fieldApiName+ ' LIKE : key';
        } else {
            Query = 'Select Id, '+fieldApiName+' FROM '+objectName+' Limit 5';
        }
        List<sObject> sobjectList = Database.query(Query);
        return sobjectList;
    }
}