/*

    Copyright © 2016-2017 Dominique Climent, Florian Dubath

    This file is part of Monnaie-Leman Wallet.

    Monnaie-Leman Wallet is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Monnaie-Leman Wallet is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Monnaie-Leman Wallet.  If not, see <http://www.gnu.org/licenses/>.

*/
'use strict';
var contactService = function() {

    // Load contacts stored in the local storage  
	function loadContacts(){
      try{
          var contacts = JSON.parse(localStorage.getItem('LemanContacts')); 
      } catch(e){}
      
      if (!contacts){
          contacts=[]; 
      }
      
      return contacts;
    }
    
    function hideContact(contacts, address){
        for (var i in contacts){
        if (contacts[i].address.toUpperCase()== address.toUpperCase()){
          contacts.splice(i, 1);
          break;
        }
      } 
      return contacts;
    }
    
    // Persists contacts in the local storage  
    function storeContacts(contacts){
      localStorage.setItem('LemanContacts',JSON.stringify(contacts));
    }
    
    // Build a blob with the contacts  
    function getContactsBlob(contacts){
      return globalFuncs.getBlob("text/json;charset=UTF-8",contacts );
    }
    
    // Ensure that a contact is present in the storage. If needed add it
    function ensureContact(address){
        var contacts = loadContacts();
        upsertContact(contacts,address,'',false); 
    }
    
    // Add a new contact /edit existing contact name
    function addEditContact(contacts, address, name){ 
         upsertContact(contacts, address, name,true);
    }
    function upsertContact(contacts, address, name,replace_name){     
      var index =-1;
      for (var i in contacts){
        if (contacts[i].address.toUpperCase() == address.toUpperCase()){
          index=i;
        }
      } 
      if (index > -1) {
          if (replace_name){
            contacts[index].name = name;
          }
      } else {
        contacts.push( {name:name,address:address});
      }
      
      contacts.sort(function(a,b){return a.name.localeCompare(b.name); });
      storeContacts(contacts);
      return contacts;
    }
    
    // Delete an existing contact
    function deleteContact(contacts, address){
      for (var i in contacts){
        if (contacts[i].address.toUpperCase()== address.toUpperCase()){
          contacts.splice(i, 1);
          storeContacts(contacts);
          break;
        }
      } 
      return contacts;
    }
    
    // Return the name of the contact
    function getContactName(contacts, address){
      if (contacts.length>0){
        for (var i in  contacts){
          if (contacts[i].address == address){
            return contacts[i].name;
            break;
          }
        }
      }
        
      return '';
    }
    
    function checkAddress(address){
        return address && address.length==42 && address.startsWith('0x');
    }
    
    // Check for contacts in an json string
    function checkForContact(contacts, jsonContacts){
      var new_file_content  = JSON.parse(jsonContacts);
      var count=0;
      var conflict=0;
      var error=true;
      if (new_file_content){
        for (var i in new_file_content){
          if (checkAddress(new_file_content[i].address)){
               ++count;
               for (var j in contacts){
                 if (contacts[j].address.toUpperCase() == new_file_content[i].address.toUpperCase()){
                   ++conflict;
                   break;
                 }
               }
           } 
        }
        error=false;
      }
                
      return {error:error, 
              new_file_content:new_file_content,
              count:count,
              conflict:conflict} ;  
    }
    
    // Merge 2 lists of contacts, if merge_type =0 resolve conflict by taking contacts2 values 
    function mergeContacts(contacts1, contacts2, merge_type){
      for (var i in contacts2){
         if (checkAddress(contacts2[i].address)){
            var ind =-1;
            for (var j in contacts1){
              if (contacts1[j].address.toUpperCase() == contacts2[i].address.toUpperCase()){
                if (merge_type==0){
                  contacts1[j].name = contacts2[i].name;
                }
                ind=j;
              }
            }
            
            if (ind==-1){
              contacts1.push( {name:contacts2[i].name,address:contacts2[i].address});
            }
         }   
      }
      
      contacts1.sort(function(a,b){return a.name.localeCompare(b.name); });
      storeContacts(contacts1);
      return contacts1;
    }
    
    return {loadContacts:loadContacts,
            storeContacts:storeContacts,
            hideContact:hideContact,
            getContactsBlob:getContactsBlob,
            ensureContact:ensureContact,
            addEditContact:addEditContact,
            deleteContact:deleteContact,
            getContactName:getContactName,
            checkForContact:checkForContact,
            mergeContacts:mergeContacts};
   
};
module.exports = contactService;
