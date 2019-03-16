import React, { Component } from 'react';
import { s3data } from './companyproducts/s3CompanyProducts';

//var data = require('./data.json'); //Local
console.log(s3data);
var data = s3data; //S3 Bucket json file

export default class productRecommendation {

    getProducts(userintput){
        //alert("here");
        
        var arrayValidProducts = [];

        for(var i in data){
            //alert(i);
            var validProduct = true;
            var rate = 100;
            var term = 0;
            var downPayment=0;
            var amount = 0;
            for(var j in data[i]){
                //alert(j);
                if(!validProduct){
                    //alert("ENDING")
                    break;
                }

                else{
                    if (typeof(data[i][j]) == "object"){
                        var temp = data[i][j];

                        if(j=="loan_type"){
                            var validLoanType = false;
                            var userSelected = userintput[j].toLowerCase();

                            if(userSelected === "refinance"){
                                //alert("refri");
                                userSelected = userintput['purpose'];
                                if(userSelected === "Cash Out"){
                                    //alert("cashout");
                                    userSelected = "cash-out";
                                }
                                else {
                                    userSelected = userintput[j].toLowerCase();
                                }
                            }

                            for(var k in temp){ //k is the subcategories types of loans
                                //alert(k+"-k");


                                if(k === userSelected ){//currently we are only looking for purchase

                                    if(data[i][j][k]){
                                        //alert("FOUND")
                                        validLoanType = true;
                                    }
                                }
                            }
                            if(validLoanType){
                                validProduct = true;
                                //alert('valid');
                            }
                            else{
                                validProduct=false;
                            }
                        }
                        else if(j == "building_type"){
                            var validBuildingType = false;
                            //alert(j);
                            for(var k in temp){

                                //alert(k+"--");
                                if(k === "single_family"){//currently we are only looking for purchase
                                   // alert(k+"--"+userintput[j].toLowerCase());
                                    if( userintput[j].toLowerCase() === "house"){
                                        if(data[i][j][k]){
                                            //alert("FOUND in house")
                                            validBuildingType = true;
                                        }
                                    }
                                }
                                else if (k=== "townhome"){

                                    if( userintput[j] === "Townhome/Duplex"){
                                        if(data[i][j][k]){
                                            //alert("FOUND")
                                            validBuildingType = true;
                                        }
                                    }
                                }
                                else if (k=== "condominium"){

                                    if( userintput[j].toLowerCase() === "condominium"){
                                        if(data[i][j][k]){
                                            //alert("FOUND")
                                            validBuildingType = true;
                                        }
                                    }
                                }
                                else if (k=== "mutli_family"){

                                    if( userintput[j].toLowerCase() === "mutli-family"){
                                        if(data[i][j][k]){
                                            //alert("FOUND")
                                            validBuildingType = true;
                                        }
                                    }
                                } //need to add others but check with data first
                            }
                            if(validBuildingType){
                                validProduct = true;
                            }
                            else{
                                validProduct=false;
                            }

                        }
                        else if(j === "states"){
                            var validState = false;

                            for(var k in temp){ //k is individual state

                                if(k.toLowerCase() === userintput[j].toLowerCase()){//currently only doing abbreviations need to account for full name

                                    if(data[i][j][k]){
                                        validState = true;
                                    }
                                }
                            }
                            if(validState){
                                validProduct = true;
                            }
                            else{
                                validProduct=false;
                            }
                        }
                        else if(j === "credit"){ // need to fix this, This isnt 100 correct
                             //alert("HERE");
                             var validCredit = false;
                             for(var k in temp){ //k are the minimum credit scores

                                 if(+k < +userintput[j]){
                                   // alert(JSON.stringify(k));
                                    var annualIncome = userintput['income'];
                                    var monthlyDebt = userintput['debt'];
                                    downPayment = userintput['downPayment'];
                                    amount = userintput['amount'];

                                    var downPaymentPercentage = data[i][j][k]['down_payment'];
                                    //we do not have the information to calculate ltv
                                    var dti = (monthlyDebt/(annualIncome/12))*100; //double check with erika about dti
                                   // alert(dti+"-dti-"+ data[i][j][k]['dti']);
                                    if((amount * (+downPaymentPercentage) < (+downPayment) )){
                                        if(dti <= +data[i][j][k]['dti']){
                                            validCredit = true;
                                            rate = (+data[i][j][k]['rate']);
                                            term = (+data[i]['term']);
                                        }
                                    }
                                    //alert("HERE");
                                    if(userintput['loan_type'] != "purchase"){//for refinance and other such
                                        //alert("here")
                                        //alert((data[i][j]['term'])+" "+ +userintput['term'] );
                                        if((data[i][j]['term'])==null){
                                            validCredit = true;
                                        }
                                        else{
                                            if(+userintput['term'] >= (+data[i][j]['term'])){
                                                validCredit = true;
                                            }
                                            else{
                                                validCredit = false;
                                            }
                                        }
                                    }

                                 }
                             }
                             if(validCredit){
                                 validProduct = true;
                             }
                             else{
                                 validProduct=false;
                             }
                        }

                    }
                    else{
                        if(j == "minimum_amount" || j == "maximum_amount" ){
                            var validAmount = false;
                            //alert("HERE")

                            if(j == "minimum_amount"){
                                //alert("IN MIN");
                                if(+data[i][j]< +userintput['amount']){
                                    validAmount = true;
                                }

                            }
                            if(j == "maximum_amount"){
                                //alert("IN MAX");
                                //alert("HERE___"+data[i][j]);
                                if(data[i][j] == null){
                                    //alert("NULL");
                                    validAmount = true;
                                }
                                if(+data[i][j]> +userintput['amount']){
                                    validAmount = true;
                                }
                            }

                            if(validAmount){
                                validProduct = true;
                            }
                            else{
                                validProduct=false;
                            }
                            //alert(validAmount +"-"+validProduct);
                       }
                       else if(j == "military"){
                        var validMilitary = false;

                        if(data[i][j] && (userintput[j] == "Yes")){
                            validMilitary = true;
                        }
                        else if(!data[i][j]){
                            validMilitary = true;
                        }

                        if(validMilitary){
                            validProduct = true;
                        }
                        else{
                            validProduct=false;
                        }
                       }
                    }
                }
            }
            if(validProduct){
                var tempObj = {};
                tempObj[i] = {"rate":rate,"term":term,"downPayment":downPayment,"amount":amount};
                arrayValidProducts.push(tempObj);
            }
        }

        var isNotSorted = true;
        if(arrayValidProducts.length > 1){
            for(var i = 1; i < arrayValidProducts.length; i ++){
                var tempObject = arrayValidProducts[i];
                var tempObjectKey = Object.keys(tempObject);
                var key = tempObject[tempObjectKey];
                j = i-1;

                var nextObject = arrayValidProducts[j];
                var nextObjectKey = Object.keys(nextObject);
                var nextKey = nextObject[nextObjectKey];

                while( j >= 0 && (+key)<(+nextKey)){
                    arrayValidProducts[j+1] = arrayValidProducts[j];
                    j-=1;
                    nextObject = arrayValidProducts[j];
                    nextObjectKey = Object.keys(nextObject);
                    nextKey = nextObject[nextObjectKey];
                }

                arrayValidProducts[j+1] = tempObject;

            }
        }
        console.log(arrayValidProducts);
        if(arrayValidProducts.length > 3 ){
            return [arrayValidProducts[0],arrayValidProducts[1],arrayValidProducts[2]];
        }
        else{
            return arrayValidProducts;
        }

    }
}
