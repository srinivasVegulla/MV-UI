/**
 * COPYRIGHT (c) Ericsson AB 2016. The copyright to the computer program(s) herein is the property
 * of Ericsson Inc. The programs may be used and/or copied only with written permission from
 * Ericsson Inc. or in accordance with the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */
(function () {
    'use strict';

    angular
        .module('app.nowcast')
        .factory('nowCastService', Service);

    Service.$inject = [
        'logger',
        '$http',
        '$q',
        'translatorHelper',
        '$filter',
        'utilityService',
    ];

    /* @ngInject */
    function Service(logger, $http, $q, translatorHelper, $filter, utilityService) {
        var _accountInfo = {
            idAcc: 0,
            contactType: '',
            firstName: '',
            middleInitial: '',
            lastName: '',
            email: '',
            address1: '',
            address2: '',
            address3: '',
            phoneNumber: '',
            company: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            enumName: '',
            enumId: ''
        };

        var currencyCode;
        var data;
        var humanizeDecissionTypeKeys;

        var _cachedData = {};
        // Public API
        var service = {
            info: _accountInfo,
            loadNowCast: getNowCastData
        }

        var formatRegex = /(\{+)(\w+)(:[^\}]+)?(}+)/g;
        //var formatKeyRegex = /(\{\{+)(\w+)?(}+)/;
        var formatKeyRegex = /{{(.*?)}/;

        return service;

        function getNowCastData(accountId, intervalId) {
            currencyCode = '';
            var request = {
                method: 'GET',
                url: 'api/decisions/' + accountId + '/' + intervalId
//                params: {
//                    lang: translatorHelper.currentMetraNetLocale(),
//                },
            };

            return $http(request)
                .then(function (response) {
                    data = response.data;
                    return data;

                }).then(function(data) {
                    
                    if (data && data.length > 0){
                        return utilityService.getCurrency().then(function() {
                            currencyCode = data[0].currency;
                            formatData(data);
                            return data;
                        })
                    }
                })
                .catch(function (error) {
                    return $q.reject(error);
                });
        }

        /**
         * Main formatting function.  Interrogates each decision field in order
         * to establish whether or not formatting is required.  If so, field value
         * is formatted based on internationalized or default format.
         * @param data
         * @returns {*}
         */
        function formatData(decisions) {
            if (!decisions) {
                return decisions;
            }
            prepareDecissonTypeAttr(decisions);
            decisions.forEach(function (attributes, index) {
                try {
                    processNowCastAttributes(attributes);
                    processMultiBucket(attributes);
                } catch (e) {
                    // statements to handle any exceptions
                    logger.log('ERROR processing decision: ' + e);
                }
            });
            return decisions;
        }

        /**
         * Loop through all decision attributes.  This function is called recursively
         * for decision attributes of type 'array'.
         * @param attributes
         * @param knownFormats
         */
        function processNowCastAttributes(attributes, knownFormats, knownEnums, parentAttributes) {
            var formats;
            var enums;

            if (knownFormats) {
                formats = knownFormats;
            }

            if (knownEnums) {
                enums = knownEnums;
            }

            for (var key in attributes) {
                if (!attributes.hasOwnProperty(key)) {
                    continue;
                }
                var value = attributes[key];

                if (isArray(value)) {
                    continue;
                  /*
                    attributes[key].forEach(function (elem, index) {
                        if (elem || '' !== elem) {
                            var processedElement = processNowCastAttributes({'key': elem}, formats, enums, attributes);
                            if (typeof processedElement['key'] != 'undefined'){
                                attributes[key][index] = processedElement['key'];
                            }
                        }
                    });
                    continue;*/
                }

                // handle special case of formatting metadata here.  formats contain default formatting values,
                // which can/should be overwritten in i18n locale files.
                if (key === 'formats') {
                    formats = attributes[key];
                    continue;
                }

                if (key === 'enums') {
                    enums = attributes[key];
                    continue;
                }

                if (key) {
                    var formatKey = getFormatKey(attributes, key);
                    if (formatKey) {
                        var translatedValue = translateFormat(formatKey);
                        if (translatedValue) {
                            attributes[key] = translatedValue;
                            attributes[key] = resolveDataReferences(translatedValue, attributes, parentAttributes, enums);
                        } else if (formatKey) {
                            var formatedValue = getDefaultFormat(formatKey, formats);
                            if (formatedValue) {
                                var resolvedAttributeValue = resolveDataReferences(formatedValue, attributes, parentAttributes, enums);
                                attributes[key] = resolvedAttributeValue;
                            } else {
                                attributes[key] = '';
                            }
                        }
                    }
                }

            }
            return attributes;
        }

        /**
         * Resolves
         * @param substitutionString
         * @param attributes
         */
        function resolveDataReferences(substitutionString, attributes, parentAttributes, enums){
            if (!attributes && !paarentAttributes){
                return substitutionString;
            }

            var regex = /(\{+)(\w+)(:[^\}]+)?(}+)/;

            if( !regex.test(substitutionString)){
                return substitutionString;
            }

            var substitutionKeys = regex.exec(substitutionString);

            if (substitutionKeys) {
                substitutionKeys.forEach(function (key, index) {
                    switch (index) {
                        case 1:
                            //  '{'
                            break;
                        case 2:
                            var attributeClass = substitutionKeys[3];
                            var replacementValue = getReplacementValue(key, attributes, parentAttributes, enums, attributeClass);

                            if(attributeClass){
                                replacementValue = formatClassValue(replacementValue, attributeClass, enums);
                            }

                            if ((typeof replacementValue === 'undefined') || replacementValue === undefined){
                                replacementValue = '';
                            }

                            substitutionString = substitutionString
                                .replace(substitutionKeys[0], replacementValue);

                            break;
                        case 3:
                            //  ':?' example ':c' for currency
                            break;
                        case 4:
                            // '}'
                            break;
                    }
                });
                substitutionString = resolveDataReferences(substitutionString, attributes, parentAttributes, enums);
            }
            return substitutionString;
        }

        /**
         * Finds replacement value in object attributes, or in parent object attributes, using
         * provided replacement key.  Enums are treated as a special case with attribute class
         * designating attribute key as value, which is later resolved during class formatting procedure.
         * @param key
         * @param attributes
         * @param parentAttributes
         * @param attributeClass
         * @returns {*}
         */
        function getReplacementValue(key, attributes, parentAttributes, attributeClass) {
            var replacementValue;
            if (attributes.hasOwnProperty(key)) {
                replacementValue = attributes[key];
            } else if (parentAttributes && parentAttributes.hasOwnProperty(key)) {
                replacementValue = parentAttributes[key];
            } else if (attributeClass === ':enum'){
                replacementValue = key;
            } else {
                logger.log('substitutionKey not found for: ' +  key
                    + ' in data attributes ' + parentAttributes);
                replacementValue = '';
            }
            return replacementValue;
        }

        /**
         * Helper function, formats currency fields
         * @param value
         * @param symbol
         * @returns {*}
         */
        function formatClassValue(value, formatClass, enums){
            var formattedValue;
            if (value && value !== ''){
                if (formatClass){
                    switch(formatClass){
                        case ':c':
                            formattedValue = utilityService.currencyFormatter(value, currencyCode);
                            break;
                        case ':enum':
                            formattedValue = enums[value];
                            break;
                        case ':#':
                            formattedValue = $filter('number')(value)
                            break;
                        case ':n0':
                            formattedValue = $filter('number')(value)
                            break;
                        default:
                            formattedValue = value;
                            break;
                    }
                } else {
                    logger.log('formatClass not found: ' + value);
                    formattedValue = value;
                }
            }else {
                return value;
            }
            return formattedValue;
        }

        /**
         * Searches attribute value for format key signature, and performs
         * format lookup to provide format string for the field. Each
         * decision contains its specific list of default formats.
         *
         * @param formatKey
         * @param formats
         * @returns format value
         */
        function getDefaultFormat(formatKey, formats) {
            if (formatKey && formats){
                var format = formats[formatKey];
                return format;
            } else {
                return null;
            }
        }

        /**
         * Performs match on attribute value to obtain format key when
         * present. Not all fields contain format key.
         * @param attributes
         * @param key
         * @returns {*}
         */
        function getFormatKey(attributes, key){
            if (!attributes){
                return null;
            }

            // test function performs faster then exec for the purpose
            // of verification that format key exists within attribute
            if (!formatKeyRegex.test(attributes[key])){
                return null;
            }

            var formatKey = formatKeyRegex.exec(attributes[key]);
            if (formatKey) {
                formatKey = formatKey[1];
                return formatKey;
            } else {
                return null;
            }
        }

        /**
         * i18n function, makes attempt to translate the format.
         * @param formatKey
         * @param format
         * @returns {*}
         */
        function translateFormat(formatKey) {
            var translatedFormat = $filter('translate')(formatKey);
            if (translatedFormat && translatedFormat !== formatKey) {
                return translatedFormat;
            } else {
                return null;
            }
        }

        /**
         * Utility function, checks if object is of type Array
         * @param what
         * @returns {boolean}
         */
        function isArray(what) {
            return Object.prototype.toString.call(what) === '[object Array]';
        }

        /**
        * Process Multiple buckets
        * @param attributes
        * @returns {*}
        */
        function processMultiBucket(attributes) {
            var buckets = attributes.buckets;
            var formats = attributes.formats;
            for (var key in attributes) {
                var value = attributes[key];
                if (isArray(value)) {
                    var bucketIndex = -1;
                    attributes[key].forEach(function (elem, index) {
                        if (elem || '' !== elem) {
                            bucketIndex += 1;
                            var formatKey = getFormatKey(attributes, key);
                            if(formatKey) {
                               var translatedValue = translateFormat(formatKey);
                                if (translatedValue) {
                                    attributes[key][index] = translatedValue;
                                }else {
                                    var format;
                                    var dAttr;
                                    if(bucketIndex <= buckets.length - 1) {
                                        dAttr = buckets[bucketIndex].decisionTypeAttributes;
                                        format = getFormatByBucket(formatKey, dAttr);
                                    }else {
                                        dAttr = buckets[0].decisionTypeAttributes;
                                    }
                                    format = !format ? getDefaultFormat(formatKey, formats) : format;
                                    attributes[key][index] = replaceFormattedString(format, dAttr, attributes);
                                }
                            }
                        }
                    });
                }
            }
            
        }

        /**
        * Replace all the formatted string with bucekts attribute
        * @param format
        * @param attributes
        * @returns {*}
        */
        function replaceFormattedString(format, attributes, parentAttributes) {
            if(format && attributes) {
                var matches = getUnformattedStrings(format);
                var replaceValues = [];
                for(var key in matches) {
                    var index = matches[key].lastIndexOf(':');
                    var atrributeClass = index > -1 ? matches[key].slice(index): null;
                    var proprty = matches[key].split(':')[0];
                    var attributeKeys = Object.keys(attributes);
                    var value;
                    if(attributeKeys.indexOf(proprty) > -1){
                        value = attributes[proprty];
                    }else {
                        var decsnKey = humanize(proprty);
                        value = parentAttributes[(decsnKey.charAt(0).toLowerCase() + decsnKey.slice(1))];
                    }
                    if(atrributeClass) {
                        value = formatClassValue(value, atrributeClass, attributes['enum']);
                    }
                    replaceValues.push(value ? value : '');
                }
                for(var i = 0; i < matches.length; i++) {
                    format = format.replace(new RegExp('{' + matches[i] + '}', 'gi'), replaceValues[i]);
                }
                // checkRecursively matches
                var newMatches = getUnformattedStrings(format);
                if(newMatches.length > 0) {
                    return replaceFormattedString(format, attributes, parentAttributes);
                }else {
                    return format; 
                }
            }
            return format;
        }

        /**
        * Replace all the formatted string with bucekts attribute
        * @param str
        * @returns [*]
        */
        function getUnformattedStrings(str) {
            var found = [],
            rxp = /{([^}]+)}/g,
            curMatch;
            while( curMatch = rxp.exec( str ) ) {
                found.push( curMatch[1] );
            }
            return found;
        }

        /**
        * Get the attribute values from buckets
        * @param formatKey
        * @param decissionTypeAttr
        * @returns String
        */
        function getFormatByBucket(formatKey, decissionTypeAttr) {
            if (formatKey && decissionTypeAttr){
                var keys = formatKey.split('.');
                formatKey = keys[keys.length - 1];
                var key = humanizeDecissionTypeKeys[formatKey];
                return key ? capitalizeWords(decissionTypeAttr[key]) : null;
            }
            return null;
        }

        // Converting the strings into java variable format
        function prepareDecissonTypeAttr(decisions) {
            if(decisions && decisions.length > 0) {
                var attrs = decisions[0].buckets[0].decisionTypeAttributes;
                humanizeDecissionTypeKeys = {};
                for(var key in attrs) {
                    humanizeDecissionTypeKeys[humanize(key.slice())] = key;
                }
                return humanizeDecissionTypeKeys;
            }
        }

        //converting string to java variable format
        function humanize(str) {
            if(str) {
              var frags = str.split('_');
              for (var i=0; i < frags.length; i++) {
                frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
              }
              return frags.join('');
            }
            return str;
        }

        //capitalize_Words 
        function capitalizeWords(str)
        {   if(str) {
                var splitStr = str.split(' ');
                for (var i = 0; i < splitStr.length; i++) {
                   splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);     
                }
                return splitStr.join(' '); 
            }
            return str;
        }
    }


}());
