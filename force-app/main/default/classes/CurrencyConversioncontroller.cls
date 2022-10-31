public with sharing class CurrencyConversioncontroller {
    @AuraEnabled
    public static map<String, Object> retrieveCurrencyConversionrates(String strEndPointURL)
    {
       
            Map<string, Object> mapjsondata = new Map<string, Object>();
            string strresponse=null;
            if(string.isNotBlank(strEndPointURL)){
                HttpRequest httpRequest = new httpRequest();
                httpRequest.setEndpoint(strEndPointURL);
                httpRequest.setMethod('GET');
                httpRequest.setHeader('Authorization', 'OAuth ' + UserInfo.getSessionId());
                httpRequest.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
                try {
                    Http http = new Http();
                    HttpResponse httpResponse = http.send(httpRequest);
                    if(httpResponse.getStatusCode() == 200)
                    {
                        strresponse = httpResponse.getBody();
                    } else {
                        throw new CalloutException(HttpResponse.getBody());
                    }
                } catch (Exception e) {
                    throw e;
                }
            }
            if(string.isNotBlank(strresponse))
            {
                mapjsondata=(map<string, Object>) JSON.deserializeUntyped(strresponse);
                System.debug('mapjsondata=> ' + mapjsondata);
            }
            return mapjsondata;
    }

   
}
