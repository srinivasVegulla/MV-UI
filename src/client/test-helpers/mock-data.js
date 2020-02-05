var mockData = (function() {
  return {
    authentication: authenticatedUserData,
    //mockData.authentication().userInfo
    settings: userSettings,
    //mockData.settings().settings
    billing: userProductReport,
    //mockData.billing().reportData
    //mockData.billing().UsageDetails
    currency: currency,
    //mockData.currency().JSON
    billAmount: totalBillAmount,
    //mockData.billAmount().amount,
    // mockData.billAmount().duePayment
    account: getAccountData,
    //mockData.account().intervals,
    //mockData.account().dataIintervals,
    // mockData.account().interval,
    // mockData.account().accountInfo
    layout: settings,
    //mockData.layout().data
    payment: paymentMethods,
    //mockData.payment().paymentMethods,
    //mockData.payment().paymentResponse,
    //mockData.payment().payUsingResponse
    invoice: getInvoices,
    //mockData.invoice().invoiceList,
    //mockData.invoice().statementsList,
    //mockData.invoice().creditNotesList,
    //mockData.invoice().invoiceReportst,
    modalInstance: getModalInstance,
    //mockData.modalInstance()
    layoutManagerSettings: layoutSettings,
    // mockData.layoutManagerSettings()
    subscriptions: getSubscriptions,
    // mockData.subscriptions().subscriptionsData
    //mockData.subscriptions().cancelSubscriptionData
    //mockData.subscriptions().getEligibleOffersData
    //mockData.subscriptions().addSubscriptions
    metaData: getMetaData,
    //mockData.metaData().data.metadataInfo
    billingActivity: getBillingActivityDetails,
    //mockData.billingActivity().billingActivityData
    //mockData.billingActivity().instance
    activityLogs: getAllActivityLogs,
    //mockData.activityLogs()
    adjustmentDetails: getAdjustmentDetails,
    //mockData.adjustmentDetails()
    resetPassword: getResetAccountPassword,
    //mockData.resetPassword()
    offerchargeXmlData: getOfferchargeXmlData,
    //mockData.getOfferchargeXmlData()
    nonStandardCharges: getNonStandardCharges,
    //mockData.nonStandardCharges()
    securitySettings: getSecuritySettings,

    invoiceMethod: getInvoiceMethods,

    usageActivity: getUsageActivityDetails,
    //mockData.usageActivity().usageActivityData

    localStorageData: getLocalStorageData,

    widgets: widgets
  };

  function authenticatedUserData() {
    return {
      userInfo: {
        "userInfo": {
          "authenticationNamespace": "mt",
          "isSiteDownForMaintenance": "F",
          "version": 3,
          "culture": "en-US",
          "updateDate": null,
          "siteName": "/MetraView",
          "rootUrl": "/MetraView",
          "timeZone": 666,
          "description": "Generated site config...",
          "creationDate": null,
          "theme": "blue",
          "logoImage": "Images/Logos/Cirrus-logo.png",
          "physicalPath": null,
          "inlineTax": "F",
          "inlineAdjustments": "T",
          "secondPassData": "F",
          "billSettingId": "1DA53791-AE95-4334-8F88-9D410102887F",
          "siteId": "4E7823DC-A952-4DB5-8B14-9D4101007C36",
          "accountId": 11216951
        },
        "namespace": "mt",
        "settings": {}
      }
    };
  }

  function userSettings() {
    return {
      settings: {
        data: {
          "billConfigs": {
            "allowSelfCare": "T",
            "inlineAdjustments": "T",
            "inlineTax": "F",
            "hardClosedIntervals": "F"
          }
        }
      }
    };
  }

  function userProductReport() {
    return {
      reportData: {
        data: {
          "Report": {
            "id": 0,
            "currency": 'USD',
            "amount": "0",
            "displayAmount": "0",
            "adjustmentInfo": {
              "preBillAdjustmentAmount": 0,
              "preBillAdjustedAmount": 0,
              "postBillAdjustmentAmount": 0,
              "postBillAdjustedAmount": 0
            },
            "preAndPostBillTotalTaxAdjustmentAmount": 0,
            "totalTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "federalTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "stateTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "countyTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "localTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "otherTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "impliedTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "nonImpliedTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "informationalTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "implInfTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "billableTax": {
              "preBillTaxAdjustmentAmount": 0,
              "postBillTaxAdjustmentAmount": 0,
              "taxAmount": 0
            },
            "usageAmount": 0,
            "totalCharges": 0,
            "name": null,
            "ownerSlice": {
              "payerId": {
                "accountId": 11216951,
                "userName": null,
                "namespace": null
              }
            },
            "folderSlice": {
              "payerId": {
                "accountId": 11216951,
                "userName": null,
                "namespace": null
              }
            },
            "totalDisplayAmount": "0",
            "numPreBillAdjustments": 0,
            "numPostBillAdjustments": 0,
            "preBillAdjustmentDisplayAmount": "0",
            "charges": null,
            "productOfferings": [{
              "id": 326,
              "name": "Audio Conf PO",
              "currency": null,
              "amount": "491291.47",
              "charges": [{
                "id": 327,
                "currency": "USD",
                "amount": "491291.47",
                "displayAmount": "491291.47",
                "adjustmentInfo": {
                  "preBillAdjustmentAmount": 0,
                  "preBillAdjustedAmount": 491291.47,
                  "postBillAdjustmentAmount": 0,
                  "postBillAdjustedAmount": 491291.47
                },
                "preAndPostBillTotalTaxAdjustmentAmount": 0,
                "totalTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "federalTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "stateTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "countyTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "localTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "otherTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "impliedTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "nonImpliedTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "informationalTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "implInfTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "billableTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "usageAmount": 0,
                "totalCharges": 0,
                "name": null,
                "ownerSlice": null,
                "folderSlice": null,
                "totalDisplayAmount": "491291.47",
                "numPreBillAdjustments": 0,
                "numPostBillAdjustments": 0,
                "preBillAdjustmentDisplayAmount": null,
                "charges": null,
                "productOfferings": null,
                "hierarchyPath": null,
                "displayName": "AudioConfCall",
                "subCharges": null,
                "productSlice": {
                  "viewId": {
                    "pcId": 2723,
                    "pcName": "metratech.com/audioconfcall"
                  },
                  "viewDisplayName": "Audio Conferencing",
                  "piInstanceId": {
                    "pcId": 327,
                    "pcName": null
                  },
                  "poInstanceId": {
                    "pcId": 326,
                    "pcName": null
                  }
                }
              }]
            }, {
              "id": 389,
              "name": "SAMPLE RC",
              "currency": null,
              "amount": "9845689.00",
              "charges": [{
                "id": 391,
                "currency": "USD",
                "amount": "9845689.00",
                "displayAmount": "9845689.00",
                "adjustmentInfo": {
                  "preBillAdjustmentAmount": 0,
                  "preBillAdjustedAmount": 9845689,
                  "postBillAdjustmentAmount": 0,
                  "postBillAdjustedAmount": 9845689
                },
                "preAndPostBillTotalTaxAdjustmentAmount": 0,
                "totalTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "federalTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "stateTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "countyTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "localTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "otherTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "impliedTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "nonImpliedTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "informationalTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "implInfTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "billableTax": {
                  "preBillTaxAdjustmentAmount": 0,
                  "postBillTaxAdjustmentAmount": 0,
                  "taxAmount": 0
                },
                "usageAmount": 0,
                "totalCharges": 0,
                "name": null,
                "ownerSlice": null,
                "folderSlice": null,
                "totalDisplayAmount": "9845689.00",
                "numPreBillAdjustments": 0,
                "numPostBillAdjustments": 0,
                "preBillAdjustmentDisplayAmount": null,
                "charges": null,
                "productOfferings": null,
                "hierarchyPath": null,
                "displayName": "TEST RC",
                "subCharges": null,
                "productSlice": {
                  "viewId": {
                    "pcId": 1437,
                    "pcName": "metratech.com/flatrecurringcharge"
                  },
                  "viewDisplayName": "Flat Recurring Charge",
                  "piInstanceId": {
                    "pcId": 391,
                    "pcName": null
                  },
                  "poInstanceId": {
                    "pcId": 389,
                    "pcName": null
                  }
                }
              }]
            }],
            "hierarchyPath": null
          },
          "UsageDetails": [{
            "Currency": "USD",
            "Timestamp": "10/31/2016 11:59:59 PM",
            "DisplayAmount": 23.0000000000,
            "RCIntervalStart": "10/01/2016 12:00:00 AM",
            "RCIntervalEnd": "10/31/2016 11:59:59 PM",
            "RCIntervalSubscriptionStart": "10/25/2016 12:00:00 AM",
            "RCIntervalSubscriptionEnd": "10/31/2016 11:59:59 PM",
            "Advance": "1",
            "ProratedIntervalStart": "10/01/2016 12:00:00 AM",
            "ProratedIntervalEnd": "10/31/2016 11:59:59 PM",
            "ProratedDays": 31,
            "ProratedDailyRate": 0.7419354839,
            "RCAmount": 23.0000000000,
            "ProratedOnSubscription": "0",
            "ProratedInstantly": "0",
            "ProratedOnUnsubscription": "0",
            "RCActionType": "Initial"
          }, {
            "Currency": "USD",
            "Timestamp": "10/31/2016 11:59:59 PM",
            "DisplayAmount": 23.0000000000,
            "RCIntervalStart": "11/01/2016 12:00:00 AM",
            "RCIntervalEnd": "11/30/2016 11:59:59 PM",
            "RCIntervalSubscriptionStart": "11/01/2016 12:00:00 AM",
            "RCIntervalSubscriptionEnd": "11/30/2016 11:59:59 PM",
            "Advance": "1",
            "ProratedIntervalStart": "11/01/2016 12:00:00 AM",
            "ProratedIntervalEnd": "11/30/2016 11:59:59 PM",
            "ProratedDays": 30,
            "ProratedDailyRate": 0.7666666667,
            "RCAmount": 23.0000000000,
            "ProratedOnSubscription": "0",
            "ProratedInstantly": "0",
            "ProratedOnUnsubscription": "0",
            "RCActionType": "Advance"
          }]
        }
      }
    };
  }

  function currency() {
    return {
      JSON: {
        data: [
          { "Code": "AED", "Symbol": "" },
          { "Code": "AFN", "Symbol": "?" },
          { "Code": "ALL", "Symbol": "Lek" },
          { "Code": "AMD", "Symbol": "" },
          { "Code": "ANG", "Symbol": "ƒ" },
          { "Code": "AOA", "Symbol": "" },
          { "Code": "ARS", "Symbol": "$" },
          { "Code": "AUD", "Symbol": "$" },
          { "Code": "AWG", "Symbol": "ƒ" },
          { "Code": "AZN", "Symbol": "?" },
          { "Code": "BAM", "Symbol": "KM" },
          { "Code": "BBD", "Symbol": "$" },
          { "Code": "BDT", "Symbol": "" },
          { "Code": "BGN", "Symbol": "??" },
          { "Code": "BHD", "Symbol": "" },
          { "Code": "BIF", "Symbol": "" },
          { "Code": "BMD", "Symbol": "$" },
          { "Code": "BND", "Symbol": "$" },
          { "Code": "BOB", "Symbol": "$b" },
          { "Code": "BRL", "Symbol": "R$" },
          { "Code": "BSD", "Symbol": "$" },
          { "Code": "BTN", "Symbol": "" },
          { "Code": "BWP", "Symbol": "P" },
          { "Code": "BYR", "Symbol": "p." },
          { "Code": "BZD", "Symbol": "BZ$" },
          { "Code": "CAD", "Symbol": "$" },
          { "Code": "CDF", "Symbol": "" },
          { "Code": "CHF", "Symbol": "CHF" },
          { "Code": "CLP", "Symbol": "$" },
          { "Code": "CNY", "Symbol": "¥" },
          { "Code": "COP", "Symbol": "$" },
          { "Code": "CRC", "Symbol": "¢" },
          { "Code": "CUC", "Symbol": "" },
          { "Code": "CUP", "Symbol": "?" },
          { "Code": "CVE", "Symbol": "" },
          { "Code": "CZK", "Symbol": "Kc" },
          { "Code": "DJF", "Symbol": "" },
          { "Code": "DKK", "Symbol": "kr" },
          { "Code": "DOP", "Symbol": "RD$" },
          { "Code": "DZD", "Symbol": "" },
          { "Code": "EGP", "Symbol": "£" },
          { "Code": "ERN", "Symbol": "" },
          { "Code": "ETB", "Symbol": "" },
          { "Code": "EUR", "Symbol": "€" },
          { "Code": "FJD", "Symbol": "$" },
          { "Code": "FKP", "Symbol": "£" },
          { "Code": "GBP", "Symbol": "£" },
          { "Code": "GEL", "Symbol": "?" },
          { "Code": "GGP", "Symbol": "£" },
          { "Code": "GHS", "Symbol": "" },
          { "Code": "GIP", "Symbol": "£" },
          { "Code": "GMD", "Symbol": "" },
          { "Code": "GNF", "Symbol": "" },
          { "Code": "GTQ", "Symbol": "Q" },
          { "Code": "GYD", "Symbol": "$" },
          { "Code": "HKD", "Symbol": "$" },
          { "Code": "HNL", "Symbol": "L" },
          { "Code": "HRK", "Symbol": "kn" },
          { "Code": "HTG", "Symbol": "" },
          { "Code": "HUF", "Symbol": "Ft" },
          { "Code": "IDR", "Symbol": "Rp" },
          { "Code": "ILS", "Symbol": "?" },
          { "Code": "IMP", "Symbol": "£" },
          { "Code": "INR", "Symbol": "?" },
          { "Code": "IQD", "Symbol": "" },
          { "Code": "IRR", "Symbol": "?" },
          { "Code": "ISK", "Symbol": "kr" },
          { "Code": "JEP", "Symbol": "£" },
          { "Code": "JMD", "Symbol": "J$" },
          { "Code": "JOD", "Symbol": "" },
          { "Code": "JPY", "Symbol": "¥" },
          { "Code": "KES", "Symbol": "" },
          { "Code": "KGS", "Symbol": "??" },
          { "Code": "KHR", "Symbol": "?" },
          { "Code": "KMF", "Symbol": "" },
          { "Code": "KPW", "Symbol": "?" },
          { "Code": "KRW", "Symbol": "?" },
          { "Code": "KWD", "Symbol": "" },
          { "Code": "KYD", "Symbol": "$" },
          { "Code": "KZT", "Symbol": "??" },
          { "Code": "LAK", "Symbol": "?" },
          { "Code": "LBP", "Symbol": "£" },
          { "Code": "LKR", "Symbol": "?" },
          { "Code": "LRD", "Symbol": "$" },
          { "Code": "LSL", "Symbol": "" },
          { "Code": "LTL", "Symbol": "Lt" },
          { "Code": "LVL", "Symbol": "Ls" },
          { "Code": "LYD", "Symbol": "" },
          { "Code": "MAD", "Symbol": "" },
          { "Code": "MDL", "Symbol": "" },
          { "Code": "MGA", "Symbol": "" },
          { "Code": "MKD", "Symbol": "???" },
          { "Code": "MMK", "Symbol": "" },
          { "Code": "MNT", "Symbol": "?" },
          { "Code": "MOP", "Symbol": "" },
          { "Code": "MRO", "Symbol": "" },
          { "Code": "MUR", "Symbol": "?" },
          { "Code": "MVR", "Symbol": "" },
          { "Code": "MWK", "Symbol": "" },
          { "Code": "MXN", "Symbol": "$" },
          { "Code": "MYR", "Symbol": "RM" },
          { "Code": "MZN", "Symbol": "MT" },
          { "Code": "NAD", "Symbol": "$" },
          { "Code": "NGN", "Symbol": "?" },
          { "Code": "NIO", "Symbol": "C$" },
          { "Code": "NOK", "Symbol": "kr" },
          { "Code": "NPR", "Symbol": "?" },
          { "Code": "NZD", "Symbol": "$" },
          { "Code": "OMR", "Symbol": "?" },
          { "Code": "PAB", "Symbol": "B/." },
          { "Code": "PEN", "Symbol": "S/." },
          { "Code": "PGK", "Symbol": "" },
          { "Code": "PHP", "Symbol": "?" },
          { "Code": "PKR", "Symbol": "?" },
          { "Code": "PLN", "Symbol": "zl" },
          { "Code": "PYG", "Symbol": "Gs" },
          { "Code": "QAR", "Symbol": "?" },
          { "Code": "RON", "Symbol": "lei" },
          { "Code": "RSD", "Symbol": "???." },
          { "Code": "RUB", "Symbol": "?" },
          { "Code": "RWF", "Symbol": "" },
          { "Code": "SAR", "Symbol": "?" },
          { "Code": "SBD", "Symbol": "$" },
          { "Code": "SCR", "Symbol": "?" },
          { "Code": "SDG", "Symbol": "" },
          { "Code": "SEK", "Symbol": "kr" },
          { "Code": "SGD", "Symbol": "$" },
          { "Code": "SHP", "Symbol": "£" },
          { "Code": "SLL", "Symbol": "" },
          { "Code": "SOS", "Symbol": "S" },
          { "Code": "SRD", "Symbol": "$" },
          { "Code": "STD", "Symbol": "" },
          { "Code": "SYP", "Symbol": "£" },
          { "Code": "SZL", "Symbol": "" },
          { "Code": "THB", "Symbol": "?" },
          { "Code": "TJS", "Symbol": "" },
          { "Code": "TMT", "Symbol": "" },
          { "Code": "TND", "Symbol": "" },
          { "Code": "TOP", "Symbol": "" },
          { "Code": "TRY", "Symbol": "" },
          { "Code": "TTD", "Symbol": "TT$" },
          { "Code": "TWD", "Symbol": "NT$" },
          { "Code": "TZS", "Symbol": "" },
          { "Code": "UAH", "Symbol": "?" },
          { "Code": "UGX", "Symbol": "" },
          { "Code": "USD", "Symbol": "$" },
          { "Code": "UYU", "Symbol": "$U" },
          { "Code": "UZS", "Symbol": "??" },
          { "Code": "VEF", "Symbol": "Bs" },
          { "Code": "VND", "Symbol": "?" },
          { "Code": "VUV", "Symbol": "" },
          { "Code": "WST", "Symbol": "" },
          { "Code": "XAF", "Symbol": "" },
          { "Code": "XAG", "Symbol": "" },
          { "Code": "XAU", "Symbol": "" },
          { "Code": "XCD", "Symbol": "$" },
          { "Code": "XDR", "Symbol": "" },
          { "Code": "XOF", "Symbol": "" },
          { "Code": "XPD", "Symbol": "" },
          { "Code": "XPF", "Symbol": "" },
          { "Code": "XPT", "Symbol": "" },
          { "Code": "YER", "Symbol": "?" },
          { "Code": "ZAR", "Symbol": "S" },
          { "Code": "ZMK", "Symbol": "" }
        ]
      }
    };
  }

  function totalBillAmount() {
    return {
      amount: {
        data: {
          "totalAmount": "92389.68",
          "totalChargedAmount": "0.00",
          "currency": "USD",
          "totalReportAmount": "92389.68"
        }
      },
      duePayment: {
        "PaymentInfo": {
          "amount": "92563.00",
          "dueDate": 1471838400000,
          "invoiceNum": 12685,
          "invoiceDate": 1470801600000,
          "currency": "USD",
          "lastPayment": -1.0,
          "lastPaymentDate": 1474257600000
        }
      },
      duePaymentData: {
        data: {
          "PaymentInfo": {
            "amount": "92563.00",
            "dueDate": 1471838400000,
            "invoiceNum": 12685,
            "invoiceDate": 1470801600000,
            "currency": "USD",
            "lastPayment": -1.0,
            "lastPaymentDate": 1474257600000
          }
        }
      },
      paymentsHistoryJson: {
        data: {
          "key": "accountnumber",
          "displayName": "Account Number",
          "isColumn": true,
          "Sortable" : true,
          "Filterable" : true,
          "Exportable" : true,
          "DefaultColumn": true
        }
      },
      paymentsHistory: {
        data:
          {
           "paymentinstid":"74366393-be2c-4d40-8849-802ffb81368a",
           "transactiondate":1491212855000,
           "transactiontype":"DEBIT",
           "accountnumber":"1111",
           "description":"Payment",
           "currency":"USD",
           "amount":1.0000000000,
           "status":"SUCCESS",
           "paymenttype":"Credit Card",
           "creditcardtype":"Visa"
        }
      }
    };
  }

  function getAccountData() {
    return {
      intervals: {
        "accountIntervals": [{
          "idInterval": 1120993313,
          "startDate": 1475294400000,
          "endDate": 1477972799000,
          "statusCode": "H",
          "invoiceNumber": "000010014",
          "archive": "N",
          "status": "HardClosed",
          "onDemandInterval" : true,
          "startDateAsString": "11/11/2011",
          "endDateAsString": "11/11/2011"
        }, {
          "idInterval": 1120993314,
          "startDate": 1475294400004,
          "endDate": 1477972799004,
          "statusCode": "H",
          "invoiceNumber": "000010015",
          "archive": "N",
          "status": "HardClosed",
          "onDemandInterval" : true,
          "startDateAsString": "11/11/2011",
          "endDateAsString": "11/11/2011"
        }]
      },
      dataIintervals: {
        data: {
          "accountIntervals": [{
            "idInterval": 1120993313,
            "startDate": 1475294400000,
            "endDate": 1477972799000,
            "statusCode": "H",
            "invoiceNumber": "000010014",
            "archive": "N",
            "status": "HardClosed"
          }, {
            "idInterval": 1120993314,
            "startDate": 1475294400004,
            "endDate": 1477972799004,
            "statusCode": "H",
            "invoiceNumber": "000010015",
            "archive": "N",
            "status": "HardClosed"
          }]
        }
      },
      interval: {
        "idInterval": 1120993313,
        "startDate": 1475294400000,
        "endDate": 1477972799000,
        "statusCode": "H",
        "invoiceNumber": "000010014",
        "archive": "N",
        "status": "HardClosed"
      },
      accountInfo: {
        "idAcc": 11216951,
        "contactType": 751,
        "firstName": "Jim",
        "middleInitial": "T",
        "lastName": "Koch",
        "email": "James@ericsson.com",
        "phoneNumber": "9966634200",
        "company": "Cobalt Services N.V.",
        "address1": "Van Stolkweg 55",
        "address2": "Hyderabad",
        "address3": "Hyderabad",
        "city": "Fremont",
        "state": "Hong kong",
        "zip": "2876LK",
        "enumId": 143,
        "enumName": "Antigua and Barbuda",
        "payerUserName": "Vegulla",
        "paysForOthers": true,
        "fax": null
      }
    };
  }

  function settings() {
    return {
      data: {
        settings: {
          "accountInfo": 1,
          "charges": 1,
          "invoice": 1,
          "offerChargeSummary": 1,
          "paymentMethods": 1,
          "paymentsCreditsAdjustments": 1,
          "subscriptions": 1,
          "totalAmountDue": 1,
          "totalBillAmount": 1,
          "nowCast": 1,
          "billingActivity": 1,
          "activityLog": 1
        }

      }
    };
  }

  function paymentMethods() {
    return {
      paymentMethods: {
        data: {
          "PaymentMethods": [{
            "idPaymentInstrument": "cab657c5-0fdd-410c-822f-9eacf2a3f603",
            "idAcct": 1702627707,
            "paymentMethodTypeName": "Credit Card",
            "paymentMethodTypeId": 1601,
            "truncdAcctNum": "*1111",
            "idCreditcardType": 1268,
            "nameCreditcardType": "Visa",
            "accountType": null,
            "expDate": "02/2031",
            "expDateFormat": 6,
            "firstName": "James",
            "middleName": null,
            "lastName": "Test",
            "address1": "LOUIS LOP",
            "address2": "Test",
            "city": "LA",
            "state": "",
            "zip": "789541",
            "idCountry": 151,
            "idPriority": 1,
            "maxChargePerCycle": 0.0,
            "dtCreated": 1475775298000,
            "bankname": null,
            "autoPay": null
          }, {
            "idPaymentInstrument": "1244f4df-3f53-418b-b573-61680ff2bff6",
            "idAcct": 1702627707,
            "paymentMethodTypeName": "ACH",
            "paymentMethodTypeId": 1600,
            "truncdAcctNum": "*3211",
            "idCreditcardType": null,
            "nameCreditcardType": null,
            "accountType": 1534,
            "expDate": null,
            "expDateFormat": null,
            "firstName": "James",
            "middleName": "P",
            "lastName": "Koch",
            "address1": "LOUIS LOP",
            "address2": "",
            "city": "LA",
            "state": "",
            "zip": "789541",
            "idCountry": 376,
            "idPriority": 2,
            "maxChargePerCycle": 0.0,
            "dtCreated": 1475505636000,
            "bankname": "",
            "autoPay": null
          }]

        }
      },
      paymentResponse: {
        data: {
          "ConfirmationNumber": "4762629896816490704012"
        }
      },
      payUsingResponse: {
        data: {
          "payUsing": ["Existing Payment Method","New Payment Method"]
        }
      }
    };
  }

  function getInvoices() {
    return {
      invoiceList: {
        data: {
          "InvoiceList": [{"fileName":"Invoice.pdf", OpenAmt:1},{"fileName":"Invoice2.pdf", OpenAmt: 2},{"fileName":"Invoice3.pdf", OpenAmt: 3}],
          "openInvoices": {
            "m_Items": ["Invoice1.pdf", "Invoice2.pdf", "Invoice3.pdf"]
          }
        }
      },
      statementsList : {
        data : {
          "QuotesList" : [{"fileName":"Quote_1.pdf"},{"fileName":"Quote_5.pdf"}]
        }
      },
      creditNotesList : {
        data : {
          "CreditNotesList" :[{"fileName": "PTCN0000000001_1702627707_11_15.pdf"}]
        }
      },
      invoiceReport: {
        data: {
          "invoiceReport": {
            "invoiceHeader": { "id": null, "invoiceNumber": null, "invoiceString": null, "invoiceDate": null, "invoiceDueDate": null, "intervalId": null, "intervalStartDate": null, "intervalEndDate": null, "currency": null, "payerAccount": { "idAcc": 1817212771, "externalId": "jkoch", "firstName": "Test", "middleInitial": "s", "lastName": "koch", "company": null, "address1": "twest", "address2": null, "address3": null, "city": "test", "state": null, "zip": "test", "country": 147, "countryName": "Australia" }, "payeeAccount": { "idAcc": 1817212771, "externalId": "jkoch", "firstName": "Test", "middleInitial": "s", "lastName": "koch", "company": null, "address1": "twest", "address2": null, "address3": null, "city": "test", "state": null, "zip": "test", "country": 147, "countryName": "Australia" } },
            "previousBalances": { "currency": "USD", "previousBalance": "756.00", "currentBalance": 3652.0, "balanceForward": "730.00", "estimation": "CurrentBalance" },
            "arAdjustments": [],
            "postBillAdjustments": [],
            "payments": [{ "sessionId": 10007, "amount": -1.0, "currency": "USD", "description": "Payment Received. Thank You!", "paymentDate": 1477322136000, "reasonCode": 0, "reasonCodeName": null, "paymentMethod": 1200, "paymentMethodName": "Credit Card", "creditCardType": 1268, "creditCardTypeName": "Visa", "checkOrCardNumber": "1111", "paymentTxnId": null, "referenceId": null }, { "sessionId": 10009, "amount": -25.0, "currency": "USD", "description": "Payment Received. Thank You!", "paymentDate": 1477323339000, "reasonCode": 0, "reasonCodeName": null, "paymentMethod": 1200, "paymentMethodName": "Credit Card", "creditCardType": 1268, "creditCardTypeName": "Visa", "checkOrCardNumber": "1111", "paymentTxnId": null, "referenceId": null }],
            "totalpostBillAdjustments": "0.00",
            "totalPayment": "-26.00"
          }
        }
      }
    };
  }

  function getModalInstance() {
    return {
      close: function() {},
      dismiss: function() {}
    };
  }

  function layoutSettings() {
    return {
      data: {
        "accountInfo": 1,
        "charges": 1,
        "invoice": 1,
        "offerChargeSummary": 1,
        "paymentMethods": 1,
        "paymentsCreditsAdjustments": 1,
        "subscriptions": 1,
        "totalAmountDue": 1,
        "totalBillAmount": 1,
        "nowCast": 1,
        "billingActivity": 1,
        "activityLog": 1
      }
    };
  }

  function getSubscriptions() {
    return {
      subscriptionsData: {
        "Subscriptions": [{
          "subscriptionId": 1812999333,
          "productOfferingId": 326,
          "status": 0,
          "subscriptionName": "product",
          "userUnsubscribe": true,
          "startDate": 1475726400000,
          "startDateAsString": "10/06/2016",
          "endDate": 1476676800000,
          "endDateAsString": "10/17/2016",
          "description": null,
          "createDate": null,
          "accountId": 0,
          "lang": null,
          "languageId": 0,
          "expired": true
        }, {
          "subscriptionId": 1812999333,
          "productOfferingId": 326,
          "status": 0,
          "subscriptionName": "product",
          "userUnsubscribe": true,
          "startDate": 1475726400000,
          "startDateAsString": "10/06/2016",
          "endDate": 1476676800000,
          "endDateAsString": "10/17/2016",
          "description": null,
          "createDate": null,
          "accountId": 0,
          "lang": null,
          "languageId": 0,
          "expired": true
        }]
      },
      cancelSubscriptionData: {
        data: {
          subscriptionId: '123456',
          productOfferingId: '78910',
          startDate: '12-12-2012',
          endDate: '13-12-2013'
        }
      },
      getEligibleOffersData: {
        "EligibleOffers": [
          {
            "id_po": 582,
            "id_eff_date": 579,
            "id_avail": 581,
            "b_user_subscribe": "Y",
            "b_user_unsubscribe": "Y",
            "n_name": 4499,
            "n_desc": 4500,
            "n_display_name": 4498,
            "nm_name": "AudioconferenceC10",
            "nm_desc": "AudioconferenceC10",
            "nm_display_name": "AudioconferenceC10",
            "te_n_begintype": 1,
            "te_dt_start": 986101200000,
            "te_n_beginoffset": 0,
            "te_n_endtype": 4,
            "te_n_endoffset": 0,
            "ta_n_begintype": 1,
            "ta_dt_start": 986101200000,
            "ta_n_beginoffset": 0,
            "ta_n_endtype": 4,
            "ta_n_endoffset": 0,
            "b_recurringcharge": "N",
            "b_discount": "N",
            "c_popartitionid": 1243813454,
            "id_prop": 582,
            "c_glcode": "",
            "c_internalinformationurl": "",
            "c_externalinformationurl": ""
          }]
        },
      addSubscriptions: {
        "responseData": 1
      }
    };
  }

  function getMetaData() {
    return {
      data: {
        "metadataInfo": [{
          "enumId": 135,
          "enumName": "Afghanistan"
        }, {
          "enumId": 136,
          "enumName": "Albania"
        }, {
          "enumId": 137,
          "enumName": "Algeria"
        }, {
          "enumId": 138,
          "enumName": "American Samoa"
        }, {
          "enumId": 139,
          "enumName": "Andorra"
        }, {
          "enumId": 140,
          "enumName": "Angola"
        }, {
          "enumId": 141,
          "enumName": "Anguilla"
        }, {
          "enumId": 142,
          "enumName": "Antarctica"
        }, {
          "enumId": 143,
          "enumName": "Antigua and Barbuda"
        }, {
          "enumId": 144,
          "enumName": "Argentina"
        }, {
          "enumId": 145,
          "enumName": "Armenia"
        }, {
          "enumId": 146,
          "enumName": "Aruba"
        }, {
          "enumId": 147,
          "enumName": "Australia"
        }, {
          "enumId": 148,
          "enumName": "Austria"
        }, {
          "enumId": 149,
          "enumName": "Azerbaijan"
        }, {
          "enumId": 150,
          "enumName": "Bahamas"
        }, {
          "enumId": 151,
          "enumName": "Bahrain"
        }, {
          "enumId": 152,
          "enumName": "Bangladesh"
        }, {
          "enumId": 153,
          "enumName": "Barbados"
        }, {
          "enumId": 154,
          "enumName": "Belarus"
        }, {
          "enumId": 155,
          "enumName": "Belgium"
        }, {
          "enumId": 156,
          "enumName": "Belize"
        }, {
          "enumId": 157,
          "enumName": "Benin"
        }, {
          "enumId": 158,
          "enumName": "Bermuda"
        }, {
          "enumId": 159,
          "enumName": "Bhutan"
        }, {
          "enumId": 160,
          "enumName": "Bolivia"
        }, {
          "enumId": 161,
          "enumName": "Bonaire, Sint Eustatius and Saba"
        }, {
          "enumId": 162,
          "enumName": "Bosnia and Herzegovina"
        }, {
          "enumId": 163,
          "enumName": "Botswana"
        }, {
          "enumId": 164,
          "enumName": "Bouvet Island"
        }, {
          "enumId": 165,
          "enumName": "Brazil"
        }, {
          "enumId": 166,
          "enumName": "British Indian Ocean Territory"
        }, {
          "enumId": 167,
          "enumName": "Brunei Darussalam"
        }, {
          "enumId": 168,
          "enumName": "Bulgaria"
        }, { "enumId": 169, "enumName": "Burkina Faso" }, { "enumId": 170, "enumName": "Burundi" }, { "enumId": 171, "enumName": "Cabo Verde" }, { "enumId": 172, "enumName": "Cambodia" }, { "enumId": 173, "enumName": "Cameroon" }, { "enumId": 174, "enumName": "Canada" }, { "enumId": 175, "enumName": "Cayman Islands" }, { "enumId": 176, "enumName": "Central African Republic" }, { "enumId": 177, "enumName": "Chad" }, { "enumId": 178, "enumName": "Chile" }, { "enumId": 179, "enumName": "China" }, { "enumId": 180, "enumName": "Christmas Island" }, { "enumId": 181, "enumName": "Northern Mariana Islands" }, { "enumId": 182, "enumName": "Cocos (Keeling) Islands" }, { "enumId": 183, "enumName": "Colombia" }, { "enumId": 184, "enumName": "Comores" }, { "enumId": 185, "enumName": "Republic of Congo" }, { "enumId": 186, "enumName": "Cook Islands" }, { "enumId": 187, "enumName": "Costa Rica" }, { "enumId": 188, "enumName": "Croatia" }, { "enumId": 189, "enumName": "Cuba" }, { "enumId": 190, "enumName": "Curaçao" }, { "enumId": 191, "enumName": "Cyprus" }, { "enumId": 192, "enumName": "Czech Republic" }, { "enumId": 193, "enumName": "Denmark" }, { "enumId": 194, "enumName": "Djibouti" }, { "enumId": 195, "enumName": "Dominica" }, { "enumId": 196, "enumName": "Dominican Republic" }, { "enumId": 197, "enumName": "Ecuador" }, { "enumId": 198, "enumName": "Egypt" }, { "enumId": 199, "enumName": "El Salvador" }, { "enumId": 200, "enumName": "Equatorial Guinea" }, { "enumId": 201, "enumName": "Eritrea" }, { "enumId": 202, "enumName": "Estonia" }, { "enumId": 203, "enumName": "Ethiopia" }, { "enumId": 204, "enumName": "Faroe Islands" }, { "enumId": 205, "enumName": "Falkland Islands" }, { "enumId": 206, "enumName": "Fiji" }, { "enumId": 207, "enumName": "Finland" }, { "enumId": 208, "enumName": "France" }, { "enumId": 209, "enumName": "French Guiana" }, { "enumId": 210, "enumName": "French Polynesia" }, { "enumId": 211, "enumName": "French Southern Territories" }, { "enumId": 212, "enumName": "Gabon" }, { "enumId": 213, "enumName": "Gambia" }, { "enumId": 214, "enumName": "Georgia" }, { "enumId": 215, "enumName": "Germany" }, { "enumId": 216, "enumName": "Ghana" }, { "enumId": 217, "enumName": "Gibraltar" }, { "enumId": 218, "enumName": "Greece" }, { "enumId": 219, "enumName": "Greenland" }, { "enumId": 220, "enumName": "Grenada" }, { "enumId": 221, "enumName": "Guadeloupe" }, { "enumId": 222, "enumName": "Guam" }, { "enumId": 223, "enumName": "Guatemala" }, { "enumId": 224, "enumName": "Guernsey" }, { "enumId": 225, "enumName": "Guinea" }, { "enumId": 226, "enumName": "Guinea-Bissau" }, { "enumId": 227, "enumName": "Guyana" }, { "enumId": 228, "enumName": "Haiti" }, { "enumId": 229, "enumName": "Honduras" }, { "enumId": 230, "enumName": "Hong Kong" }, { "enumId": 231, "enumName": "Hungary" }, { "enumId": 232, "enumName": "Iceland" }, { "enumId": 233, "enumName": "India" }, { "enumId": 234, "enumName": "Indonesia" }, { "enumId": 235, "enumName": "Inmarsat - East Atlantic Ocean" }, { "enumId": 236, "enumName": "Inmarsat - Indian Ocean" }, { "enumId": 237, "enumName": "Inmarsat - Pacific Ocean" }, { "enumId": 238, "enumName": "Inmarsat - West Atlantic Ocean" }, { "enumId": 239, "enumName": "Iran" }, { "enumId": 240, "enumName": "Iraq" }, { "enumId": 241, "enumName": "Ireland" }, { "enumId": 242, "enumName": "Isle of Man" }, { "enumId": 243, "enumName": "Israel" }, { "enumId": 244, "enumName": "Italy" }, { "enumId": 245, "enumName": "Cote D'ivoire" }, { "enumId": 246, "enumName": "Jamaica" }, { "enumId": 247, "enumName": "Japan" }, { "enumId": 248, "enumName": "Jersey" }, { "enumId": 249, "enumName": "Jordan" }, { "enumId": 250, "enumName": "Kazakhstan" }, { "enumId": 251, "enumName": "Kenya" }, { "enumId": 252, "enumName": "Kiribati" }, { "enumId": 253, "enumName": "Kuwait" }, { "enumId": 254, "enumName": "Kyrgyzstan" }, { "enumId": 255, "enumName": "Lao Peoples Democratic Republic" }, { "enumId": 256, "enumName": "Latvia" }, { "enumId": 257, "enumName": "Lebanon" }, { "enumId": 258, "enumName": "Lesotho" }, { "enumId": 259, "enumName": "Liberia" }, { "enumId": 260, "enumName": "Libya" }, { "enumId": 261, "enumName": "Liechtenstein" }, { "enumId": 262, "enumName": "Lithuania" }, { "enumId": 263, "enumName": "Luxembourg" }, { "enumId": 264, "enumName": "Macau" }, { "enumId": 265, "enumName": "Macedonia" }, { "enumId": 266, "enumName": "Madagascar" }, { "enumId": 267, "enumName": "Malawi" }, { "enumId": 268, "enumName": "Malaysia" }, { "enumId": 269, "enumName": "Maldives" }, { "enumId": 270, "enumName": "Mali" }, { "enumId": 271, "enumName": "Malta" }, { "enumId": 272, "enumName": "Marshall Islands" }, { "enumId": 273, "enumName": "Martinique" }, { "enumId": 274, "enumName": "Mauritania" }, { "enumId": 275, "enumName": "Mauritius" }, { "enumId": 276, "enumName": "Mayotte" }, { "enumId": 277, "enumName": "Mexico" }, { "enumId": 278, "enumName": "Micronesia" }, { "enumId": 279, "enumName": "Moldova" }, { "enumId": 280, "enumName": "Monaco" }, { "enumId": 281, "enumName": "Mongolia" }, { "enumId": 282, "enumName": "Montenegro" }, { "enumId": 283, "enumName": "MontSerrat" }, { "enumId": 284, "enumName": "Morocco" }, { "enumId": 285, "enumName": "Mozambique" }, { "enumId": 286, "enumName": "Myanmar" }, { "enumId": 287, "enumName": "Namibia" }, { "enumId": 288, "enumName": "Nauru" }, { "enumId": 289, "enumName": "Nepal" }, { "enumId": 290, "enumName": "Netherlands" }, { "enumId": 291, "enumName": "Netherlands Antilles" }, { "enumId": 292, "enumName": "Heard Island and McDonald Islands" }, { "enumId": 293, "enumName": "New Caledonia" }, { "enumId": 294, "enumName": "New Zealand" }, { "enumId": 295, "enumName": "Nicaragua" }, { "enumId": 296, "enumName": "Niger" }, { "enumId": 297, "enumName": "Nigeria" }, { "enumId": 298, "enumName": "Niue" }, { "enumId": 299, "enumName": "Norfolk Island" }, { "enumId": 300, "enumName": "Democratic peoples republic of Korea" }, { "enumId": 301, "enumName": "Norway" }, { "enumId": 302, "enumName": "Oman" }, { "enumId": 303, "enumName": "Pakistan" }, { "enumId": 304, "enumName": "Palau" }, { "enumId": 305, "enumName": "Palestinian Territory" }, { "enumId": 306, "enumName": "Panama" }, { "enumId": 307, "enumName": "Papua New Guinea" }, { "enumId": 308, "enumName": "Paraguay" }, { "enumId": 309, "enumName": "Peru" }, { "enumId": 310, "enumName": "Philippines" }, { "enumId": 311, "enumName": "Pitcairn" }, { "enumId": 312, "enumName": "Poland" }, { "enumId": 313, "enumName": "Portugal" }, { "enumId": 314, "enumName": "Puerto Rico" }, { "enumId": 315, "enumName": "Qatar" }, { "enumId": 316, "enumName": "Reunion" }, { "enumId": 317, "enumName": "Romania" }, { "enumId": 318, "enumName": "Russian Federation" }, { "enumId": 319, "enumName": "Rwanda" }, { "enumId": 320, "enumName": "Saint Barthélemy" }, { "enumId": 321, "enumName": "Saint Helena, Ascension and Tristan da Cunha" }, { "enumId": 322, "enumName": "Saint Kitts and Nevis" }, { "enumId": 323, "enumName": "Saint Lucia" }, { "enumId": 324, "enumName": "Saint Martin (French part)" }, { "enumId": 325, "enumName": "Saint Pierre and Miquelon" }, { "enumId": 326, "enumName": "Saint Vincent and the Grenadines" }, { "enumId": 327, "enumName": "Samoa" }, { "enumId": 328, "enumName": "San Marino" }, { "enumId": 329, "enumName": "Sao Tome and Principe" }, { "enumId": 330, "enumName": "Saudi Arabia" }, { "enumId": 331, "enumName": "Senegal" }, { "enumId": 332, "enumName": "Serbia" }, { "enumId": 333, "enumName": "Serbia and Montenegro" }, { "enumId": 334, "enumName": "Seychelles" }, { "enumId": 335, "enumName": "Sierra Leone" }, { "enumId": 336, "enumName": "Singapore" }, { "enumId": 337, "enumName": "Sint Maarten (Dutch part)" }, { "enumId": 338, "enumName": "Slovakia" }, { "enumId": 339, "enumName": "Slovenia" }, { "enumId": 340, "enumName": "Solomon Islands" }, { "enumId": 341, "enumName": "Somalia" }, { "enumId": 342, "enumName": "South Africa" }, { "enumId": 343, "enumName": "South Georgia and the South Sandwich Islands" }, { "enumId": 344, "enumName": "Republic of Korea" }, { "enumId": 345, "enumName": "South Sudan" }, { "enumId": 346, "enumName": "Spain" }, { "enumId": 347, "enumName": "Sri Lanka" }, { "enumId": 348, "enumName": "Sudan" }, { "enumId": 349, "enumName": "Suriname" }, { "enumId": 350, "enumName": "Svalbard and Jan Mayen" }, { "enumId": 351, "enumName": "Swaziland" }, { "enumId": 352, "enumName": "Sweden" }, { "enumId": 353, "enumName": "Switzerland" }, { "enumId": 354, "enumName": "Syrian Arab Republic" }, { "enumId": 355, "enumName": "Taiwan" }, { "enumId": 356, "enumName": "Tajikistan" }, { "enumId": 357, "enumName": "Tanzania" }, { "enumId": 358, "enumName": "Thailand" }, { "enumId": 359, "enumName": "Timor-Leste" }, { "enumId": 360, "enumName": "Togo" }, { "enumId": 361, "enumName": "Tokelau" }, { "enumId": 362, "enumName": "Tonga" }, { "enumId": 363, "enumName": "Trinidad and Tobago" }, { "enumId": 364, "enumName": "Tunisia" }, { "enumId": 365, "enumName": "Turkey" }, { "enumId": 366, "enumName": "Turkmenistan" }, { "enumId": 367, "enumName": "Turks and Caicos Islands" }, { "enumId": 368, "enumName": "Tuvalu" }, { "enumId": 369, "enumName": "Uganda" }, { "enumId": 370, "enumName": "Ukraine" }, { "enumId": 371, "enumName": "United Arab Emirates" }, { "enumId": 372, "enumName": "United Kingdom" }, { "enumId": 373, "enumName": "United States Minor Outlying Islands" }, { "enumId": 374, "enumName": "Uruguay" }, { "enumId": 375, "enumName": "Virgin Islands (U.S.)" }, { "enumId": 376, "enumName": "United States" }, { "enumId": 377, "enumName": "Uzbekistan" }, { "enumId": 378, "enumName": "Vanuatu" }, { "enumId": 379, "enumName": "Vatican City" }, { "enumId": 380, "enumName": "Venezuela" }, { "enumId": 381, "enumName": "Vietnam" }, { "enumId": 382, "enumName": "British Virgin Islands" }, { "enumId": 383, "enumName": "Wallis and Futuna" }, { "enumId": 384, "enumName": "Western Sahara" }, { "enumId": 385, "enumName": "Samoa" }, { "enumId": 386, "enumName": "Yemen" }, { "enumId": 387, "enumName": "Democratic Republic of the Congo" }, { "enumId": 388, "enumName": "Zambia" }, {
          "enumId": 389,
          "enumName": "Zimbabwe"
        }, {
          "enumId": 390,
          "enumName": "Aaland Islands"
        }]
      }

    };
  }

  function getBillingActivityDetails() {
    return {
      billingActivityData: {
       data: {
        "BillActDetails": [{
          "adjAmount":0,
          "balanceAmount":236237.19,
          "currency":"USD",
          "endDate":1477972799000,
          "endDateAsString":"10/31/2016",
          "intervalId":1120993313,
          "invoiceAmount":79236.73,
          "itemDesc":"000010017",
          "nmOrder":1,
          "nmType":"Invoice",
          "paymentAmount":-930,
          "startDate":1475294400000,
          "startDateAsString":"10/01/2016",
          "transactionId":4,
          "transcDate":1478840400000,
          "transcDateAsString":"11/11/2016"
         }, {
          "adjAmount":0,
          "balanceAmount":157930.46,
          "currency":"USD",
          "endDate":1475294399000,
          "endDateAsString":"09/30/2016",
          "intervalId":1118961697,
          "invoiceAmount":157930.46,
          "itemDesc":"000010014",
          "nmOrder":2,
          "nmType":"Invoice",
          "paymentAmount":0,
          "startDate":1472702400000,
          "startDateAsString":"09/01/2016",
          "transactionId":1,
          "transcDate":1476763200000,
          "transcDateAsString":"10/18/2016"
         }]
       }
      },
      instance: {
          "adjAmount":0,
          "balanceAmount":157930.46,
          "currency":"USD",
          "endDate":1475294399000,
          "endDateAsString":"09/30/2016",
          "intervalId":1118961697,
          "invoiceAmount":157930.46,
          "itemDesc":"000010014",
          "nmOrder":2,
          "nmType":"Invoice",
          "paymentAmount":0,
          "startDate":1472702400000,
          "startDateAsString":"09/01/2016",
          "transactionId":1,
          "transcDate":1476763200000,
          "transcDateAsString":"10/18/2016"
      },
      billingActivityCount: {
          "billCount": "5"
      }
    };
  }

  function getAllActivityLogs() {
    return {
      "activityCount": 1,
      "activityLogDetails": [{
        "Time": 1478013046000,
        "UserName": "jkoch/mt",
        "UserId": 1232764284,
        "EventId": 6000,
        "EventName": "Account Unlock Succeeded",
        "EntityId": 1232764284,
        "EntityType": 8,
        "Details": "Unlock account succeeded for username=jkoch namespace=mt",
        "id_audit": 11425,
        "id_Event": 6000,
        "id_UserId": 1232764284,
        "id_entitytype": 8,
        "id_entity": 1232764284,
        "dt_crt": 1478013046000
      }]
    };
  }

  function getAdjustmentDetails(){
    return {
      "adjustmentDetails": [{
        "id_sess": 33186,
        "Currency": "USD",
        "UnadjustedAmount": 10.8333333333,
        "UnadjustedAmountWithTax": 10.8333333333,
        "TotalFederalTax": 0E-10,
        "TotalStateTax": 0E-10,
        "TotalCountyTax": 0E-10,
        "TotalLocalTax": 0E-10,
        "TotalOtherTax": 0E-10,
        "PostBillFedTaxAdjAmt": 0E-10,
        "PostBillStateTaxAdjAmt": 0E-10,
        "PostBillCntyTaxAdjAmt": 0E-10,
        "PostBillLocalTaxAdjAmt": 0E-10,
        "PostBillOtherTaxAdjAmt": 0E-10,
        "PreBillFedTaxAdjAmt": 0E-10,
        "PreBillStateTaxAdjAmt": 0E-10,
        "PreBillCntyTaxAdjAmt": 0E-10,
        "PreBillLocalTaxAdjAmt": 0E-10,
        "PreBillOtherTaxAdjAmt": 0E-10,
        "AdjustmentAmount": 10.0000000000,
        "AdjustedAmount": 20.8333333333,
        "AdjustmentAmountWithTax": 10.0000000000,
        "AdjustedAmountWithTax": 20.8333333333,
        "AdjustmentTemplateDisplayName": "Order Cookies Flat Debit Adjustment",
        "AdjustmentInstanceDisplayName": "Order Cookies Flat Debit Adjustment",
        "Description": "",
        "ReasonCode": 37,
        "ReasonCodeName": "RateCorrection",
        "ReasonCodeDescription": "Rate Correction",
        "ReasonCodeDisplayName": "Rate Correction",
        "id_usage_interval": 1122959393,
        "id_acc": 1232764284,
        "n_adjustmenttype": 1,
        "dt_session": 1473356115000
      }]
    }
  }

  function getResetAccountPassword(){
    return {
      "resetPasswordData": {
          "username" : "test3",
          "parameters" : "8qYUQKruw9mPh26SF2puPX36RgCJfl+6wdToq1JH4sc=",
          "newPassword" : "12345"
    },
      "resetPasswordVerifyLink": {
          "Username": "miller",
          "Expired": "false"
      }
    }
  }

  function getNonStandardCharges(){
    return {
    "nscDetails": {
      "totalCharge": "-44.00",
      "nonStandardCharges": [
        {
          "issueTime": 1482151142000,
          "chargeAmount": -32,
          "chargeAmountAsString": "-32.00",
          "description": "test",
          "status": "A",
          "chargeCurrency": "USD",
          "glCode": "",
          "issuerAccountId": 137,
          "additionalCode": 1516,
          "chargeTaxAmount": null,
          "externalChargeId": null,
          "internalChargeId": -1,
          "numUnits": 1,
          "rate": 32,
          "additionalRate": 1,
          "subscriberAccountId": 1547259835,
          "guideIntervalId": 1124991009,
          "taxImplied": "N",
          "taxInformational": "N"
        },
        {
          "issueTime": 1482153404000,
          "chargeAmount": -12,
          "chargeAmountAsString": "-12.00",
          "description": "test",
          "status": "A",
          "chargeCurrency": "USD",
          "glCode": "",
          "issuerAccountId": 137,
          "additionalCode": 1516,
          "chargeTaxAmount": null,
          "externalChargeId": null,
          "internalChargeId": -1,
          "numUnits": 1,
          "rate": 12,
          "additionalRate": 1,
          "subscriberAccountId": 1547259835,
          "guideIntervalId": 1124991009,
          "taxImplied": "N",
          "taxInformational": "N"
        }
      ]
    }};
  }
  function getOfferchargeXmlData(){
    return {
      "data" : {
        "GridLayout": {
          "NoRecordsText": "",
          "FilterPanelCollapsed": false,
          "DefaultSortDirection": "Ascending",
          "ShowColumnHeaders": true,
          "Description": "MetraView layout for displaying Compute charges",
          "PageSize": 0,
          "ShowGridHeader": true,
          "ShowBottomBar": true,
          "DefaultSortField": "",
          "DisplayCount": false,
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "EnableColumnConfig": true,
          "ExpanderTemplate": {
          "Elements": {"Element": [
              {
                  "DefaultColumn": true,
                  "IsColumn": false,
                  "Formatter": "",
                  "DropdownItems": "",
                  "HeaderText": "",
                  "FilterReadOnly": false,
                  "AssemblyFilename": "",
                  "ColumnHideable": true,
                  "DataType": "String",
                  "IsIdentity": true,
                  "FilterHideable": true,
                  "ID": "SessionID",
                  "Width": 120,
                  "ShowInExpander": false,
                  "Exportable": true,
                  "DefaultFilter": false,
                  "RecordElement": true,
                  "Resizeable": true,
                  "ElementValue": {"Value": ""},
                  "ObjectName": "",
                  "RequiredFilter": false,
                  "PreventSortable": false,
                  "Sortable": true,
                  "FilterLabel": "",
                  "Filterable": true,
                  "DataIndex": "SessionID",
                  "ElementValue2": {"Value": ""}
              }
            ]}
          }}
        }
      }      
    }

    function getSecuritySettings() {
    return {
      "data": {
        "SelectedSetting": {
          "timeZone": "IST"
        },
        "SelectedQuestion": {
          "securityQuestionId": 797,
          "securityQuestion": "What is the name of the first school you attended?",
          "customSecurityQuestion": null,
          "securityAnswer": "Hello",
          "securityQuestionCode": "FirstSchool"
        },
        "No of records": 5,
        "Questions": [
          {
            "securityQuestionId": 797,
            "securityQuestion": "What is the name of the first school you attended?",
            "customSecurityQuestion": null,
            "securityAnswer": null,
            "securityQuestionCode": "FirstSchool"
          },
          {
            "securityQuestionId": 798,
            "securityQuestion": "What was your childhood nickname?",
            "customSecurityQuestion": null,
            "securityAnswer": null,
            "securityQuestionCode": "MothersMaidenName"
          },
          {
            "securityQuestionId": 799,
            "securityQuestion": "None",
            "customSecurityQuestion": null,
            "securityAnswer": null,
            "securityQuestionCode": "None"
          },
          {
            "securityQuestionId": 800,
            "securityQuestion": "What was the name of your first car?",
            "customSecurityQuestion": null,
            "securityAnswer": null,
            "securityQuestionCode": "PIN"
          },
          {
            "securityQuestionId": 801,
            "securityQuestion": "What school did you attend for sixth grade?",
            "customSecurityQuestion": null,
            "securityAnswer": null,
            "securityQuestionCode": "SSN"
          }
        ]
      }
    };
  }

  function getInvoiceMethods() {
    return {
      invoiceMethodDate: {
        "SelectedMethod": "Standard",
        "InvoiceMethods": [
          {
            "invoiceMethodId": 767,
            "invoiceMethodName": "Detailed"
          },
          {
            "invoiceMethodId": 768,
            "invoiceMethodName": "None"
          },
          {
            "invoiceMethodId": 769,
            "invoiceMethodName": "Paper Invoice"
          },
          {
            "invoiceMethodId": 770,
            "invoiceMethodName": "Standard"
          },
          {
            "invoiceMethodId": 771,
            "invoiceMethodName": "StandardWithBillMessages"
          }
        ],
        "No of records": 5
    }
  };
}

  function getUsageActivityDetails() {
     return {
       usageActivityData: {
        data: {
           "UsageActivity": [
             {
               "rowNum": 1,
               "intervalId": 1124991009,
               "currency": "USD",
               "startDate": "12/01/2016",
               "endDate": "12/31/2016",
               "usageAmount": "449991.00",
               "invoiceDate": "02/09/2017"
             },
             {
               "rowNum": 2,
               "intervalId": 1127022625,
               "currency": "USD",
               "startDate": "01/01/2017",
               "endDate": "01/31/2017",
               "usageAmount": "11625.67",
               "invoiceDate": "02/02/2017"
             }]
         }
        },
        instance: {
               "rowNum": 1,
               "intervalId": 1124991009,
               "currency": "USD",
               "startDate": "12/01/2016",
               "endDate": "12/31/2016",
               "usageAmount": "449991.00",
               "invoiceDate": "02/09/2017"
        }
       }
     }

     function getLocalStorageData() {
       return {
         "i18n": {
           "currentLanguage": "en",
           "currentMetraNetLocale": "us",
           "languageDirection": "LTR"
         },
         "settings": {
           "site": {
             "nameSpace": "mt"
           }
         },
         "user.settings": {
           "settings": {
             "siteName": "metraview",
             "site": {
              "nameSpace": "mt"
            }
           }
         },
         "authorizationData": {
           "userInfo": {
            "SecondPassData": "F"
           }
         },
         "ecbarStatus":  "0",
         "transactionFailure": true,
         "tabularSettings": {},
         "payeeSubscriber": true
       }
     }
     function widgets() {
      return [{
        "widgetName": "ecb-total-amount-due",
        "visible": true,
        "state": "detail",
        "userType": ["payer", "individual"],
        "dependency" :[{
          "widgetName": "ecb-subscription",
          "userType": ["payer", "individual", "subscriber"]
        }]
      }]
    }

})();
