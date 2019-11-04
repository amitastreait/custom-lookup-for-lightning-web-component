@isTest
public class LookupControllerLWCUnitTest {
	
    @testSetup
    public static void setUpData() {
        Account a = new Account(Name ='Test Account ');
        Account a1 = new Account(Name = 'Amit Singh');
        Account a2 = new Account(Name ='SFDC Panther ');
        insert new List<Account>{ a, a1, a2 };
    }
    
    public static testMethod void lookupTest() {
        LookupControllerLWC con = new LookupControllerLWC();
        Test.startTest();
        	List<sObject> accountList =	LookupControllerLWC.findRecords('Account', 'Name', '');
        	System.assertEquals(3 , accountList.size() );
        Test.stopTest();
    }
    
    public static testMethod void lookupWithValueTest() {
        Test.startTest();
        	List<sObject> accountList =	LookupControllerLWC.findRecords('Account', 'Name', 'Amit');
        	System.assertEquals(1 , accountList.size() );
        Test.stopTest();
    }
}