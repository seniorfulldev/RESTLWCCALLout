import { LightningElement, track } from 'lwc';
import getCurrencyDataa from '@salesforce/apex/CurrencyConversioncontroller.retrieveCurrencyConversionrates';
import ContentType from '@salesforce/schema/Attachment.ContentType';
const options =
    [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'CAD', value: 'CAD' },
        { label: 'GBP', value: 'GBP' },
        { label: 'INR', value: 'INR' }
    ];
export default class HTTPCalloutLWC extends LightningElement {
    @track fromCurrencyValue;
    @track toCurrencyValue;
    @track options = options;
    @track toCurrencyOptions = options;
    @track conversionData;

    handleFromCurrencyChange(event) {
        this.fromCurrencyValue = event.detail.value;
        console.log('this.fromCurrencyValue=> ' + this.fromCurrencyValue);
    }

    handleToCurrencyChange(event) {
        this.toCurrencyValue = event.detail.value;
        console.log('this.toCurrencyValue=> ' + this.toCurrencyValue);
    }
    handleCurrencyConversion() {
        //rest api call
        //check the respons
        //display the response
        let objData = {
            From_Currency_Name: '',
            From_Currency_Code: '',
            To_Currency_Name: '',
            To_Currency_Code: '',
            Last_Refreshed: '',
            Exchange_rate: ''
        };
        // let endpoint = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + this.fromCurrencyValue + '&to_currency=' + this.toCurrencyValue
        //     + '&apikey=40067TIT4636SZBB';
        let endpoint = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=40067TIT4636SZBB';
        getCurrencyDataa({ strEndPointURL: endpoint })
            // fetch(endpoint, {
            //     method: "GET",
            //     headers: {
            //         "Content-type": "application/json",
            //         "Authorization": "OAuth 00DDn000000H3Xt!ARUAQJ_hyKOf5HhgGXuDVZ8OPnlv6JXFoC8IJMRKv3tlFtjMSqEKQU.lS2rbhCEYQN3BBRve4aMV1IPKqvGRJ9JFsAfiqMe2"
            //     }
            // })
            .then(data => {

                window.console.log('jsonresponse ===>' + JSON.stringify(data));
                let exchangeData = data['Realtime Currency Exchange Rate'];
                window.console.log('exchangeData==>' + JSON.stringify(exchangeData));

                // objData.From_Currency_Code = exchangeData['1. From_Currency Code'];
                // objData.From_Currency_Name = exchangeData['2. From_Currency Name'];
                // objData.To_Currency_Name = exchangeData['4. To_Currency Name'];
                // objData.To_Currency_Code = exchangeData['3. To_Currency Code'];
                // objData.Last_Refreshed = exchangeData['6. Last Refreshed'];
                // objData.Exchange_rate = exchangeData['5. Exchange Rate'];
                objData.From_Currency_Code = 'USD';
                objData.From_Currency_Name = 'United States Dollar';
                objData.To_Currency_Name = 'Canada Dollar';
                objData.To_Currency_Code = 'CAD';
                // objData.Last_Refreshed = exchangeData['6. Last Refreshed'];
                objData.Exchange_rate = '1.234232';
                this.conversionData = objData;
                window.console.log('objData => ' + JSON.stringify(objData));
            }).catch(error => {
                window.console.log('callout error ' + JSON.stringify(error));

                // if api is not working
                objData.From_Currency_Code = "exchangeData['1. From_Currency Code']";
                objData.From_Currency_Name = "exchangeData['2. From_Currency Name']";
                objData.To_Currency_Name = "exchangeData['4. To_Currency Name']";
                objData.To_Currency_Code = "exchangeData['3. To_Currency Code']";
                objData.Last_Refreshed = "exchangeData['6. Last Refreshed']";
                objData.Exchange_rate = "exchangeData['5. Exchange Rate']";
                this.conversionData = objData;
                window.console.log('Error_objData => ' + JSON.stringify(objData));
            })
    }
}