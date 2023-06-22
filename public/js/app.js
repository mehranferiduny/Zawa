$(document).ready(function () {
    const timeobject=$('#timeobject');


    const datepickerDOM = $("#persianDatapicker");
    const dateObject = datepickerDOM.persianDatepicker(
        {
        "inline": false,
        "format": "L",
        "viewMode": "day",
        "initialValue": true,
        "minDate": false,
        "maxDate": false,
        "autoClose": false,
        "position": "auto",
        "altFormat": "lll",
        "altField": "#altfieldExample",
        "onlyTimePicker": false,
        "onlySelectOnDate": true,
        "calendarType": "persian",
        "inputDelay": 800,
        "observer": true,
        "calendar": {
            "persian": {
                "locale": "fa",
                "showHint": true,
                "leapYearMode": "algorithmic"
            },
            "gregorian": {
                "locale": "en",
                "showHint": true
            }
        },
        "navigator": {
            "enabled": true,
            "scroll": {
                "enabled": true
            },
            "text": {
                "btnNextText": "<",
                "btnPrevText": ">"
            }
        },
        "toolbox": {
            "enabled": true,
            "calendarSwitch": {
                "enabled": false,
                "format": "MMMM"
            },
            "todayButton": {
                "enabled": true,
                "text": {
                    "fa": "امروز",
                    "en": "Today"
                }
            },
            "submitButton": {
                "enabled": true,
                "text": {
                    "fa": "تایید",
                    "en": "Submit"
                }
            },
            "text": {
                "btnToday": "امروز"
            }
        },
        "dayPicker": {
            "enabled": true,
            "titleFormat": "YYYY MMMM"
        },
        "monthPicker": {
            "enabled": true,
            "titleFormat": "YYYY"
        },
        "yearPicker": {
            "enabled": true,
            "titleFormat": "YYYY"
        },
     
    });
    
    const dateObject1 = timeobject.persianDatepicker( { onlyTimePicker : true, format : "H:m" , second:  false}); 
    // const dateObject2 = timeobject.persianDatepicker( { onlyTimePicker : true, format : "H:m" }); 
    const date = dateObject.getState().view;
    dateObject1.getState().view;
    
    
});