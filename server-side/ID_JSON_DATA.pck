create or replace package "ID_JSON_DATA" is

  -- Author  : IDRENSKI
  -- Created : 9/9/2015 2:14:15 PM
  -- Purpose : test AJS promise call and get json resultset
  
    -- Public function and procedure declarations
  PROCEDURE get_account_list;

end ID_JSON_DATA;
/
CREATE OR REPLACE PACKAGE BODY "ID_JSON_DATA" IS

   -- Function and procedure implementations
   PROCEDURE get_account_list IS
   
      obj_json       json;
      obj_list       json_list;
      obj_json_value json_value;
   
   BEGIN
      obj_json := json();
      obj_list := json_list();
   
      FOR va IN (SELECT a.acc_acct_no,
                        a.acc_curr_code,
                        a.acc_origin
                   FROM ibank.accounts a
                  WHERE ROWNUM <= 2)
      LOOP
         obj_json := json();
         obj_json.put('account', va.acc_acct_no);
         obj_json.put('currency', va.acc_curr_code);
         obj_json.put('origin', va.acc_origin);
      
         obj_list.append(obj_json.to_json_value);
      END LOOP;
   
      obj_json := json();
      obj_json.put('result', obj_list.to_json_value);
   
      obj_json_value := obj_json.to_json_value;
   
      obj_json_value.htp;
   
      /*
      {"result":[
                 {"account":"9182989357","currency":"RON","origin":"ATL"},
                 {"account":"9182989365","currency":"RON","origin":"ATL"}
                 ]
             }
      */
   
   END;

END ID_JSON_DATA;
/
