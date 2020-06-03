import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, ViewEncapsulation, ChangeDetectorRef, ViewChild, forwardRef, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { LocaleService } from "./services/mydatepicker.locale.service";
import { UtilService } from "./services/mydatepicker.util.service";
export var MYDP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MyDatePicker; }),
    multi: true
};
var CalToggle;
(function (CalToggle) {
    CalToggle[CalToggle["Open"] = 1] = "Open";
    CalToggle[CalToggle["CloseByDateSel"] = 2] = "CloseByDateSel";
    CalToggle[CalToggle["CloseByCalBtn"] = 3] = "CloseByCalBtn";
    CalToggle[CalToggle["CloseByOutClick"] = 4] = "CloseByOutClick";
    CalToggle[CalToggle["CloseByEsc"] = 5] = "CloseByEsc";
    CalToggle[CalToggle["CloseByApi"] = 6] = "CloseByApi";
})(CalToggle || (CalToggle = {}));
var Year;
(function (Year) {
    Year[Year["min"] = 1000] = "min";
    Year[Year["max"] = 9999] = "max";
})(Year || (Year = {}));
var InputFocusBlur;
(function (InputFocusBlur) {
    InputFocusBlur[InputFocusBlur["focus"] = 1] = "focus";
    InputFocusBlur[InputFocusBlur["blur"] = 2] = "blur";
})(InputFocusBlur || (InputFocusBlur = {}));
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["enter"] = 13] = "enter";
    KeyCode[KeyCode["esc"] = 27] = "esc";
    KeyCode[KeyCode["space"] = 32] = "space";
})(KeyCode || (KeyCode = {}));
var MonthId;
(function (MonthId) {
    MonthId[MonthId["prev"] = 1] = "prev";
    MonthId[MonthId["curr"] = 2] = "curr";
    MonthId[MonthId["next"] = 3] = "next";
})(MonthId || (MonthId = {}));
var MMM = "mmm";
var MyDatePicker = /** @class */ (function () {
    function MyDatePicker(elem, cdr, localeService, utilService) {
        var _this = this;
        this.elem = elem;
        this.cdr = cdr;
        this.localeService = localeService;
        this.utilService = utilService;
        this.dateChanged = new EventEmitter();
        this.inputFieldChanged = new EventEmitter();
        this.calendarViewChanged = new EventEmitter();
        this.calendarToggle = new EventEmitter();
        this.inputFocusBlur = new EventEmitter();
        this.onChangeCb = function () { };
        this.onTouchedCb = function () { };
        this.showSelector = false;
        this.visibleMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.selectedDate = { year: 0, month: 0, day: 0 };
        this.weekDays = [];
        this.dates = [];
        this.months = [];
        this.years = [];
        this.selectionDayTxt = "";
        this.invalidDate = false;
        this.disableTodayBtn = false;
        this.dayIdx = 0;
        this.selectMonth = false;
        this.selectYear = false;
        this.prevMonthDisabled = false;
        this.nextMonthDisabled = false;
        this.prevYearDisabled = false;
        this.nextYearDisabled = false;
        this.prevYearsDisabled = false;
        this.nextYearsDisabled = false;
        this.prevMonthId = MonthId.prev;
        this.currMonthId = MonthId.curr;
        this.nextMonthId = MonthId.next;
        // Default options
        this.opts = {
            dayLabels: {},
            monthLabels: {},
            dateFormat: "",
            showTodayBtn: true,
            todayBtnTxt: "",
            firstDayOfWeek: "",
            satHighlight: false,
            sunHighlight: true,
            highlightDates: [],
            markCurrentDay: true,
            markCurrentMonth: true,
            markCurrentYear: true,
            disableUntil: { year: 0, month: 0, day: 0 },
            disableSince: { year: 0, month: 0, day: 0 },
            disableDays: [],
            enableDays: [],
            markDates: [],
            markWeekends: {},
            disableDateRanges: [],
            disableWeekends: false,
            disableWeekdays: [],
            showWeekNumbers: false,
            height: "34px",
            width: "100%",
            selectionTxtFontSize: "14px",
            selectorHeight: "232px",
            selectorWidth: "252px",
            allowDeselectDate: false,
            inline: false,
            showClearDateBtn: true,
            showDecreaseDateBtn: false,
            showIncreaseDateBtn: false,
            alignSelectorRight: false,
            openSelectorTopOfInput: false,
            indicateInvalidDate: true,
            editableDateField: true,
            monthSelector: true,
            yearSelector: true,
            disableHeaderButtons: true,
            minYear: Year.min,
            maxYear: Year.max,
            componentDisabled: false,
            showSelectorArrow: true,
            showInputField: true,
            openSelectorOnInputClick: false,
            allowSelectionOnlyInCurrentMonth: true,
            ariaLabelInputField: "Date input field",
            ariaLabelClearDate: "Clear Date",
            ariaLabelDecreaseDate: "Decrease Date",
            ariaLabelIncreaseDate: "Increase Date",
            ariaLabelOpenCalendar: "Open Calendar",
            ariaLabelPrevMonth: "Previous Month",
            ariaLabelNextMonth: "Next Month",
            ariaLabelPrevYear: "Previous Year",
            ariaLabelNextYear: "Next Year",
            ariaLabelDay: "Select day"
        };
        this.onClickListener = function (evt) { return _this.onClickDocument(evt); };
        this.setLocaleOptions();
    }
    MyDatePicker.prototype.setLocaleOptions = function () {
        var _this = this;
        var opts = this.localeService.getLocaleOptions(this.locale);
        Object.keys(opts).forEach(function (k) {
            _this.opts[k] = opts[k];
        });
    };
    MyDatePicker.prototype.setOptions = function () {
        var _this = this;
        if (this.options !== undefined) {
            Object.keys(this.options).forEach(function (k) {
                _this.opts[k] = _this.options[k];
            });
        }
        if (this.opts.minYear < Year.min) {
            this.opts.minYear = Year.min;
        }
        if (this.opts.maxYear > Year.max) {
            this.opts.maxYear = Year.max;
        }
        if (this.disabled !== undefined) {
            this.opts.componentDisabled = this.disabled;
        }
    };
    MyDatePicker.prototype.getSelectorTopPosition = function () {
        if (this.opts.openSelectorTopOfInput) {
            return this.elem.nativeElement.children[0].offsetHeight + "px";
        }
    };
    MyDatePicker.prototype.resetMonthYearSelect = function () {
        this.selectMonth = false;
        this.selectYear = false;
    };
    MyDatePicker.prototype.onSelectMonthClicked = function (event) {
        event.stopPropagation();
        this.selectMonth = !this.selectMonth;
        this.selectYear = false;
        this.cdr.detectChanges();
        if (this.selectMonth) {
            var today = this.getToday();
            this.months.length = 0;
            for (var i = 1; i <= 12; i += 3) {
                var row = [];
                for (var j = i; j < i + 3; j++) {
                    var disabled = this.utilService.isMonthDisabledByDisableUntil({ year: this.visibleMonth.year, month: j, day: this.daysInMonth(j, this.visibleMonth.year) }, this.opts.disableUntil)
                        || this.utilService.isMonthDisabledByDisableSince({ year: this.visibleMonth.year, month: j, day: 1 }, this.opts.disableSince);
                    row.push({ nbr: j, name: this.opts.monthLabels[j], currMonth: j === today.month && this.visibleMonth.year === today.year, selected: j === this.visibleMonth.monthNbr, disabled: disabled });
                }
                this.months.push(row);
            }
        }
    };
    MyDatePicker.prototype.onMonthCellClicked = function (cell) {
        var mc = cell.nbr !== this.visibleMonth.monthNbr;
        this.visibleMonth = { monthTxt: this.monthText(cell.nbr), monthNbr: cell.nbr, year: this.visibleMonth.year };
        this.generateCalendar(cell.nbr, this.visibleMonth.year, mc);
        this.selectMonth = false;
        this.selectorEl.nativeElement.focus();
    };
    MyDatePicker.prototype.onMonthCellKeyDown = function (event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onMonthCellClicked(cell);
        }
    };
    MyDatePicker.prototype.onSelectYearClicked = function (event) {
        event.stopPropagation();
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.cdr.detectChanges();
        if (this.selectYear) {
            this.generateYears(Number(this.visibleMonth.year));
        }
    };
    MyDatePicker.prototype.onYearCellClicked = function (cell) {
        var yc = cell.year !== this.visibleMonth.year;
        this.visibleMonth = { monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: cell.year };
        this.generateCalendar(this.visibleMonth.monthNbr, cell.year, yc);
        this.selectYear = false;
        this.selectorEl.nativeElement.focus();
    };
    MyDatePicker.prototype.onYearCellKeyDown = function (event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onYearCellClicked(cell);
        }
    };
    MyDatePicker.prototype.onPrevYears = function (event, year) {
        event.stopPropagation();
        this.generateYears(Number(year) - 25);
    };
    MyDatePicker.prototype.onNextYears = function (event, year) {
        event.stopPropagation();
        this.generateYears(Number(year) + 25);
    };
    MyDatePicker.prototype.generateYears = function (year) {
        this.years.length = 0;
        var today = this.getToday();
        for (var i = year; i <= 20 + year; i += 5) {
            var row = [];
            for (var j = i; j < i + 5; j++) {
                var disabled = this.utilService.isMonthDisabledByDisableUntil({ year: j, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, j) }, this.opts.disableUntil)
                    || this.utilService.isMonthDisabledByDisableSince({ year: j, month: this.visibleMonth.monthNbr, day: 1 }, this.opts.disableSince);
                var minMax = j < this.opts.minYear || j > this.opts.maxYear;
                row.push({ year: j, currYear: j === today.year, selected: j === this.visibleMonth.year, disabled: disabled || minMax });
            }
            this.years.push(row);
        }
        this.prevYearsDisabled = this.years[0][0].year <= this.opts.minYear || this.utilService.isMonthDisabledByDisableUntil({ year: this.years[0][0].year - 1, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, this.years[0][0].year - 1) }, this.opts.disableUntil);
        this.nextYearsDisabled = this.years[4][4].year >= this.opts.maxYear || this.utilService.isMonthDisabledByDisableSince({ year: this.years[4][4].year + 1, month: this.visibleMonth.monthNbr, day: 1 }, this.opts.disableSince);
    };
    MyDatePicker.prototype.onUserDateInput = function (value) {
        if (value.length === 0) {
            if (this.utilService.isInitializedDate(this.selectedDate)) {
                this.clearDate();
            }
            else {
                this.invalidInputFieldChanged(value);
            }
        }
        else {
            var date = this.utilService.isDateValid(value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDays);
            if (this.utilService.isInitializedDate(date)) {
                if (!this.utilService.isSameDate(date, this.selectedDate)) {
                    this.selectDate(date, CalToggle.CloseByDateSel);
                }
                else {
                    this.updateDateValue(date);
                }
            }
            else {
                this.invalidInputFieldChanged(value);
            }
        }
    };
    MyDatePicker.prototype.onFocusInput = function (event) {
        this.inputFocusBlur.emit({ reason: InputFocusBlur.focus, value: event.target.value });
    };
    MyDatePicker.prototype.onBlurInput = function (event) {
        this.selectionDayTxt = event.target.value;
        this.onTouchedCb();
        this.inputFocusBlur.emit({ reason: InputFocusBlur.blur, value: event.target.value });
    };
    MyDatePicker.prototype.onCloseSelector = function (event) {
        if (event.keyCode === KeyCode.esc && this.showSelector && !this.opts.inline) {
            this.removeGlobalListener();
            this.calendarToggle.emit(CalToggle.CloseByEsc);
            this.showSelector = false;
        }
    };
    MyDatePicker.prototype.invalidInputFieldChanged = function (value) {
        this.invalidDate = value.length > 0;
        this.inputFieldChanged.emit({ value: value, dateFormat: this.opts.dateFormat, valid: false });
        this.onChangeCb(null);
        this.onTouchedCb();
    };
    MyDatePicker.prototype.isTodayDisabled = function () {
        this.disableTodayBtn = this.utilService.isDisabledDay(this.getToday(), this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays);
    };
    MyDatePicker.prototype.parseOptions = function () {
        if (this.locale) {
            this.setLocaleOptions();
        }
        this.setOptions();
        var weekDays = this.utilService.getWeekDays();
        this.isTodayDisabled();
        this.dayIdx = weekDays.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            var idx = this.dayIdx;
            for (var i = 0; i < weekDays.length; i++) {
                this.weekDays.push(this.opts.dayLabels[weekDays[idx]]);
                idx = weekDays[idx] === "sa" ? 0 : idx + 1;
            }
        }
    };
    MyDatePicker.prototype.writeValue = function (value) {
        if (value && (value["date"] || value["jsdate"] || value["formatted"])) {
            this.selectedDate = value["date"] ? this.parseSelectedDate(value["date"]) : value["jsdate"] ? this.parseSelectedDate(this.jsDateToMyDate(value["jsdate"])) : this.parseSelectedDate(value["formatted"]);
            var cvc = this.visibleMonth.year !== this.selectedDate.year || this.visibleMonth.monthNbr !== this.selectedDate.month;
            if (cvc) {
                this.visibleMonth = { monthTxt: this.opts.monthLabels[this.selectedDate.month], monthNbr: this.selectedDate.month, year: this.selectedDate.year };
                this.generateCalendar(this.selectedDate.month, this.selectedDate.year, cvc);
            }
            this.selectionDayTxt = this.utilService.formatDate(this.selectedDate, this.opts.dateFormat, this.opts.monthLabels);
        }
        else if (value === null || value === "") {
            this.selectedDate = { year: 0, month: 0, day: 0 };
            this.selectionDayTxt = "";
        }
        this.inputFieldChanged.emit({ value: this.selectionDayTxt, dateFormat: this.opts.dateFormat, valid: this.selectionDayTxt.length > 0 });
        this.invalidDate = false;
    };
    MyDatePicker.prototype.setDisabledState = function (disabled) {
        this.opts.componentDisabled = disabled;
        this.cdr.detectChanges();
    };
    MyDatePicker.prototype.registerOnChange = function (fn) {
        this.onChangeCb = fn;
    };
    MyDatePicker.prototype.registerOnTouched = function (fn) {
        this.onTouchedCb = fn;
    };
    MyDatePicker.prototype.ngOnDestroy = function () {
        this.removeGlobalListener();
    };
    MyDatePicker.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.hasOwnProperty("selector")) {
            var s = changes["selector"].currentValue;
            if (typeof s === "object") {
                if (s.open) {
                    this.showSelector = true;
                    this.openSelector(CalToggle.Open);
                }
                else {
                    this.showSelector = false;
                    this.closeSelector(CalToggle.CloseByApi);
                }
            }
            else if (s > 0) {
                this.openBtnClicked();
            }
        }
        if (changes.hasOwnProperty("placeholder")) {
            this.placeholder = changes["placeholder"].currentValue;
        }
        if (changes.hasOwnProperty("locale")) {
            this.locale = changes["locale"].currentValue;
        }
        if (changes.hasOwnProperty("disabled")) {
            this.disabled = changes["disabled"].currentValue;
        }
        if (changes.hasOwnProperty("options")) {
            this.options = changes["options"].currentValue;
        }
        this.weekDays.length = 0;
        this.parseOptions();
        var dmChange = false;
        if (changes.hasOwnProperty("defaultMonth")) {
            var dm = changes["defaultMonth"].currentValue;
            if (typeof dm === "object") {
                dm = dm.defMonth;
            }
            if (dm !== null && dm !== undefined && dm !== "") {
                this.selectedMonth = this.parseSelectedMonth(dm);
            }
            else {
                this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
            }
            dmChange = true;
        }
        if (changes.hasOwnProperty("selDate")) {
            var sd = changes["selDate"];
            if (sd.currentValue !== null && sd.currentValue !== undefined && sd.currentValue !== "" && Object.keys(sd.currentValue).length !== 0) {
                this.selectedDate = this.parseSelectedDate(sd.currentValue);
                setTimeout(function () {
                    _this.onChangeCb(_this.getDateModel(_this.selectedDate));
                });
            }
            else {
                // Do not clear on init
                if (!sd.isFirstChange()) {
                    this.clearDate();
                }
            }
        }
        if (this.visibleMonth.year === 0 && this.visibleMonth.monthNbr === 0 || dmChange) {
            this.setVisibleMonth();
        }
        else {
            this.visibleMonth.monthTxt = this.opts.monthLabels[this.visibleMonth.monthNbr];
            this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, false);
        }
    };
    MyDatePicker.prototype.removeBtnClicked = function () {
        // Remove date button clicked
        this.clearDate();
        if (this.showSelector) {
            this.calendarToggle.emit(CalToggle.CloseByCalBtn);
            this.removeGlobalListener();
        }
        this.showSelector = false;
    };
    MyDatePicker.prototype.onDecreaseBtnClicked = function () {
        // Decrease date button clicked
        this.decreaseIncreaseDate(true);
    };
    MyDatePicker.prototype.onIncreaseBtnClicked = function () {
        // Increase date button clicked
        this.decreaseIncreaseDate(false);
    };
    MyDatePicker.prototype.openBtnClicked = function () {
        // Open selector button clicked
        this.showSelector = !this.showSelector;
        this.cdr.detectChanges();
        if (this.showSelector) {
            this.openSelector(CalToggle.Open);
        }
        else {
            this.closeSelector(CalToggle.CloseByCalBtn);
            this.removeGlobalListener();
        }
    };
    MyDatePicker.prototype.addGlobalListener = function () {
        document.addEventListener("click", this.onClickListener);
    };
    MyDatePicker.prototype.removeGlobalListener = function () {
        document.removeEventListener("click", this.onClickListener);
    };
    MyDatePicker.prototype.onClickDocument = function (evt) {
        if (this.showSelector && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
            this.showSelector = false;
            this.cdr.detectChanges();
            this.calendarToggle.emit(CalToggle.CloseByOutClick);
            this.removeGlobalListener();
        }
        if (this.opts.monthSelector || this.opts.yearSelector) {
            this.resetMonthYearSelect();
        }
    };
    MyDatePicker.prototype.openSelector = function (reason) {
        this.addGlobalListener();
        this.setVisibleMonth();
        this.calendarToggle.emit(reason);
    };
    MyDatePicker.prototype.closeSelector = function (reason) {
        this.calendarToggle.emit(reason);
    };
    MyDatePicker.prototype.setVisibleMonth = function () {
        // Sets visible month of calendar
        var y = 0, m = 0;
        if (!this.utilService.isInitializedDate(this.selectedDate)) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                var today = this.getToday();
                y = today.year;
                m = today.month;
            }
            else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
        }
        else {
            y = this.selectedDate.year;
            m = this.selectedDate.month;
        }
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        // Create current month
        this.generateCalendar(m, y, true);
    };
    MyDatePicker.prototype.onPrevMonth = function () {
        // Previous month from calendar
        var d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    MyDatePicker.prototype.onNextMonth = function () {
        // Next month from calendar
        var d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    MyDatePicker.prototype.onPrevYear = function () {
        // Previous year from calendar
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    MyDatePicker.prototype.onNextYear = function () {
        // Next year from calendar
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    MyDatePicker.prototype.onTodayClicked = function () {
        // Today button clicked
        var today = this.getToday();
        this.selectDate(today, CalToggle.CloseByDateSel);
        if (this.opts.inline && today.year !== this.visibleMonth.year || today.month !== this.visibleMonth.monthNbr) {
            this.visibleMonth = { monthTxt: this.opts.monthLabels[today.month], monthNbr: today.month, year: today.year };
            this.generateCalendar(today.month, today.year, true);
        }
    };
    MyDatePicker.prototype.onCellClicked = function (cell) {
        // Cell clicked on the calendar
        if (cell.cmo === this.prevMonthId) {
            // Previous month day
            this.onPrevMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj, CalToggle.CloseByDateSel);
            }
        }
        else if (cell.cmo === this.currMonthId) {
            // Current month day - if date is already selected clear it
            if (this.opts.allowDeselectDate && this.utilService.isSameDate(cell.dateObj, this.selectedDate)) {
                this.clearDate();
            }
            else {
                this.selectDate(cell.dateObj, CalToggle.CloseByDateSel);
            }
        }
        else if (cell.cmo === this.nextMonthId) {
            // Next month day
            this.onNextMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj, CalToggle.CloseByDateSel);
            }
        }
        this.resetMonthYearSelect();
    };
    MyDatePicker.prototype.onCellKeyDown = function (event, cell) {
        // Cell keyboard handling
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onCellClicked(cell);
        }
    };
    MyDatePicker.prototype.clearDate = function () {
        // Clears the date
        this.updateDateValue({ year: 0, month: 0, day: 0 });
        this.setFocusToInputBox();
    };
    MyDatePicker.prototype.decreaseIncreaseDate = function (decrease) {
        // Decreases or increases the date depending on the parameter
        var date = this.selectedDate;
        if (this.utilService.isInitializedDate(date)) {
            var d = this.getDate(date.year, date.month, date.day);
            d.setDate(decrease ? d.getDate() - 1 : d.getDate() + 1);
            date = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
        }
        else {
            date = this.getToday();
        }
        this.selectDate(date, CalToggle.CloseByCalBtn);
    };
    MyDatePicker.prototype.selectDate = function (date, closeReason) {
        this.updateDateValue(date);
        if (this.showSelector) {
            this.calendarToggle.emit(closeReason);
        }
        this.removeGlobalListener();
        this.showSelector = false;
        this.setFocusToInputBox();
    };
    MyDatePicker.prototype.setFocusToInputBox = function () {
        var _this = this;
        if (!this.opts.inline && this.opts.showInputField) {
            setTimeout(function () {
                _this.inputBoxEl.nativeElement.focus();
            }, 100);
        }
    };
    MyDatePicker.prototype.updateDateValue = function (date) {
        var clear = !this.utilService.isInitializedDate(date);
        this.selectedDate = date;
        this.emitDateChanged(date);
        if (!this.opts.inline) {
            this.selectionDayTxt = clear ? "" : this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels);
            this.inputFieldChanged.emit({ value: this.selectionDayTxt, dateFormat: this.opts.dateFormat, valid: !clear });
            this.invalidDate = false;
        }
    };
    MyDatePicker.prototype.emitDateChanged = function (date) {
        if (this.utilService.isInitializedDate(date)) {
            var dateModel = this.getDateModel(date);
            this.dateChanged.emit(dateModel);
            this.onChangeCb(dateModel);
            this.onTouchedCb();
        }
        else {
            this.dateChanged.emit({ date: date, jsdate: null, formatted: "", epoc: 0 });
            this.onChangeCb(null);
            this.onTouchedCb();
        }
    };
    MyDatePicker.prototype.getDateModel = function (date) {
        // Creates a date model object from the given parameter
        return { date: date, jsdate: this.getDate(date.year, date.month, date.day), formatted: this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels), epoc: Math.round(this.getTimeInMilliseconds(date) / 1000.0) };
    };
    MyDatePicker.prototype.monthText = function (m) {
        // Returns month as a text
        return this.opts.monthLabels[m];
    };
    MyDatePicker.prototype.monthStartIdx = function (y, m) {
        // Month start index
        var d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        var idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    };
    MyDatePicker.prototype.daysInMonth = function (m, y) {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    };
    MyDatePicker.prototype.daysInPrevMonth = function (m, y) {
        // Return number of days of the previous month
        var d = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    };
    MyDatePicker.prototype.isCurrDay = function (d, m, y, cmo, today) {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year && cmo === this.currMonthId;
    };
    MyDatePicker.prototype.getToday = function () {
        var date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    MyDatePicker.prototype.getTimeInMilliseconds = function (date) {
        return this.getDate(date.year, date.month, date.day).getTime();
    };
    MyDatePicker.prototype.getWeekday = function (date) {
        // Get weekday: su, mo, tu, we ...
        var weekDays = this.utilService.getWeekDays();
        return weekDays[this.utilService.getDayNumber(date)];
    };
    MyDatePicker.prototype.getDate = function (year, month, day) {
        // Creates a date object from given year, month and day
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    };
    MyDatePicker.prototype.sundayIdx = function () {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    };
    MyDatePicker.prototype.generateCalendar = function (m, y, notifyChange) {
        this.dates.length = 0;
        var today = this.getToday();
        var monthStart = this.monthStartIdx(y, m);
        var dInThisM = this.daysInMonth(m, y);
        var dInPrevM = this.daysInPrevMonth(m, y);
        var dayNbr = 1;
        var cmo = this.prevMonthId;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                // First week
                var pm = dInPrevM - monthStart + 1;
                // Previous month
                for (var j = pm; j <= dInPrevM; j++) {
                    var date = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                }
                cmo = this.currMonthId;
                // Current month
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var date = { year: y, month: m, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.nextMonthId;
                    }
                    var date = { year: cmo === this.nextMonthId && m === 12 ? y + 1 : y, month: cmo === this.currMonthId ? m : cmo === this.nextMonthId && m < 12 ? m + 1 : 1, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                    dayNbr++;
                }
            }
            var weekNbr = this.opts.showWeekNumbers && this.opts.firstDayOfWeek === "mo" ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({ week: week, weekNbr: weekNbr });
        }
        this.setHeaderBtnDisabledState(m, y);
        if (notifyChange) {
            // Notify parent
            this.calendarViewChanged.emit({ year: y, month: m, first: { number: 1, weekday: this.getWeekday({ year: y, month: m, day: 1 }) }, last: { number: dInThisM, weekday: this.getWeekday({ year: y, month: m, day: dInThisM }) } });
        }
    };
    MyDatePicker.prototype.parseSelectedDate = function (selDate) {
        // Parse date value - it can be string or IMyDate object
        var date = { day: 0, month: 0, year: 0 };
        if (typeof selDate === "string") {
            var sd = selDate;
            var df = this.opts.dateFormat;
            var delimeters = this.utilService.getDateFormatDelimeters(df);
            var dateValue = this.utilService.getDateValue(sd, df, delimeters);
            date.year = this.utilService.getNumberByValue(dateValue[0]);
            date.month = df.indexOf(MMM) !== -1 ? this.utilService.getMonthNumberByMonthName(dateValue[1], this.opts.monthLabels) : this.utilService.getNumberByValue(dateValue[1]);
            date.day = this.utilService.getNumberByValue(dateValue[2]);
        }
        else if (typeof selDate === "object") {
            date = selDate;
        }
        this.selectionDayTxt = this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels);
        return date;
    };
    MyDatePicker.prototype.jsDateToMyDate = function (date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    MyDatePicker.prototype.parseSelectedMonth = function (ms) {
        return this.utilService.parseDefaultMonth(ms);
    };
    MyDatePicker.prototype.setHeaderBtnDisabledState = function (m, y) {
        var dpm = false;
        var dpy = false;
        var dnm = false;
        var dny = false;
        if (this.opts.disableHeaderButtons) {
            dpm = this.utilService.isMonthDisabledByDisableUntil({ year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.daysInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y) }, this.opts.disableUntil);
            dpy = this.utilService.isMonthDisabledByDisableUntil({ year: y - 1, month: m, day: this.daysInMonth(m, y - 1) }, this.opts.disableUntil);
            dnm = this.utilService.isMonthDisabledByDisableSince({ year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1 }, this.opts.disableSince);
            dny = this.utilService.isMonthDisabledByDisableSince({ year: y + 1, month: m, day: 1 }, this.opts.disableSince);
        }
        this.prevMonthDisabled = m === 1 && y === this.opts.minYear || dpm;
        this.prevYearDisabled = y - 1 < this.opts.minYear || dpy;
        this.nextMonthDisabled = m === 12 && y === this.opts.maxYear || dnm;
        this.nextYearDisabled = y + 1 > this.opts.maxYear || dny;
    };
    MyDatePicker.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: LocaleService },
        { type: UtilService }
    ]; };
    __decorate([
        Input()
    ], MyDatePicker.prototype, "options", void 0);
    __decorate([
        Input()
    ], MyDatePicker.prototype, "locale", void 0);
    __decorate([
        Input()
    ], MyDatePicker.prototype, "defaultMonth", void 0);
    __decorate([
        Input()
    ], MyDatePicker.prototype, "selDate", void 0);
    __decorate([
        Input()
    ], MyDatePicker.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], MyDatePicker.prototype, "selector", void 0);
    __decorate([
        Input()
    ], MyDatePicker.prototype, "disabled", void 0);
    __decorate([
        Output()
    ], MyDatePicker.prototype, "dateChanged", void 0);
    __decorate([
        Output()
    ], MyDatePicker.prototype, "inputFieldChanged", void 0);
    __decorate([
        Output()
    ], MyDatePicker.prototype, "calendarViewChanged", void 0);
    __decorate([
        Output()
    ], MyDatePicker.prototype, "calendarToggle", void 0);
    __decorate([
        Output()
    ], MyDatePicker.prototype, "inputFocusBlur", void 0);
    __decorate([
        ViewChild("selectorEl")
    ], MyDatePicker.prototype, "selectorEl", void 0);
    __decorate([
        ViewChild("inputBoxEl")
    ], MyDatePicker.prototype, "inputBoxEl", void 0);
    MyDatePicker = __decorate([
        Component({
            selector: "my-date-picker",
            exportAs: "mydatepicker",
            template: "<div class=\"mydp\" [ngStyle]=\"{'width': opts.showInputField ? opts.width : null, 'border': opts.inline ? 'none' : null}\">\n    <div class=\"selectiongroup\" *ngIf=\"!opts.inline\">\n        <input *ngIf=\"opts.showInputField\" #inputBoxEl ngtype=\"text\" class=\"selection\" [attr.aria-label]=\"opts.ariaLabelInputField\" (click)=\"opts.openSelectorOnInputClick&&!opts.editableDateField&&openBtnClicked()\" [ngClass]=\"{'invaliddate': invalidDate&&opts.indicateInvalidDate, 'inputnoteditable': opts.openSelectorOnInputClick&&!opts.editableDateField, 'selectiondisabled': opts.componentDisabled}\"\n               placeholder=\"{{placeholder}}\" [ngStyle]=\"{'height': opts.height, 'font-size': opts.selectionTxtFontSize}\" [ngModel]=\"selectionDayTxt\" (ngModelChange)=\"onUserDateInput($event)\" [value]=\"selectionDayTxt\" (keyup)=\"onCloseSelector($event)\"\n               (focus)=\"opts.editableDateField&&onFocusInput($event)\" (blur)=\"opts.editableDateField&&onBlurInput($event)\" [disabled]=\"opts.componentDisabled\" [readonly]=\"!opts.editableDateField\" autocomplete=\"off\" spellcheck=\"false\" autocorrect=\"off\">\n        <div class=\"selbtngroup\" [style.height]=\"opts.height\">\n            <button type=\"button\" [attr.aria-label]=\"opts.ariaLabelDecreaseDate\" class=\"btndecrease\" *ngIf=\"opts.showDecreaseDateBtn\" (click)=\"onDecreaseBtnClicked()\" [ngClass]=\"{'btndecreaseenabled': !opts.componentDisabled, 'btndecreasedisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showInputField}\" [disabled]=\"opts.componentDisabled\">\n                <span class=\"mydpicon icon-mydpleft\"></span>\n            </button>\n            <button type=\"button\" [attr.aria-label]=\"opts.ariaLabelIncreaseDate\" class=\"btnincrease\" *ngIf=\"opts.showIncreaseDateBtn\" (click)=\"onIncreaseBtnClicked()\" [ngClass]=\"{'btnincreaseenabled': !opts.componentDisabled, 'btnincreasedisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showDecreaseDateBtn&&!opts.showInputField}\" [disabled]=\"opts.componentDisabled\">\n                <span class=\"mydpicon icon-mydpright\"></span>\n            </button>\n            <button type=\"button\" [attr.aria-label]=\"opts.ariaLabelClearDate\" class=\"btnclear\" *ngIf=\"selectionDayTxt.length>0&&opts.showClearDateBtn\" (click)=\"removeBtnClicked()\" [ngClass]=\"{'btnclearenabled': !opts.componentDisabled, 'btncleardisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showIncreaseDateBtn&&!opts.showDecreaseDateBtn&&!opts.showInputField}\" [disabled]=\"opts.componentDisabled\">\n                <span class=\"mydpicon icon-mydpremove\"></span>\n            </button>\n            <button type=\"button\" [attr.aria-label]=\"opts.ariaLabelOpenCalendar\" class=\"btnpicker\" (click)=\"openBtnClicked()\" [ngClass]=\"{'btnpickerenabled': !opts.componentDisabled, 'btnpickerdisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showClearDateBtn&&!opts.showIncreaseDateBtn&&!opts.showDecreaseDateBtn&&!opts.showInputField||selectionDayTxt.length===0&&!opts.showInputField}\" [disabled]=\"opts.componentDisabled\">\n                <span class=\"mydpicon icon-mydpcalendar\"></span>\n            </button>\n        </div>\n    </div>\n    <div class=\"selector\" #selectorEl [ngStyle]=\"{'width': opts.selectorWidth, 'height' : opts.selectorHeight, 'bottom': getSelectorTopPosition()}\" *ngIf=\"showSelector||opts.inline\" [mydpfocus]=\"opts.inline?'0':'1'\" [ngClass]=\"{'inlinedp': opts.inline, 'alignselectorright': opts.alignSelectorRight, 'selectorarrow': opts.showSelectorArrow&&!opts.inline, 'selectorarrowleft': opts.showSelectorArrow&&!opts.alignSelectorRight&&!opts.inline, 'selectorarrowright': opts.showSelectorArrow&&opts.alignSelectorRight&&!opts.inline}\" (keyup)=\"onCloseSelector($event)\" tabindex=\"0\">\n        <table class=\"header\">\n            <tr>\n                <td>\n                    <div style=\"float:left\">\n                        <div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelPrevMonth\" class=\"headerbtn mydpicon icon-mydpleft\" (click)=\"onPrevMonth()\" [disabled]=\"prevMonthDisabled\" [ngClass]=\"{'headerbtnenabled': !prevMonthDisabled, 'headerbtndisabled': prevMonthDisabled}\"></button></div>\n                        <div class=\"headermonthtxt\">\n                            <button class=\"headerlabelbtn\" type=\"button\" [ngClass]=\"{'monthlabel': opts.monthSelector}\" (click)=\"opts.monthSelector&&onSelectMonthClicked($event)\" tabindex=\"{{opts.monthSelector?'0':'-1'}}\">{{visibleMonth.monthTxt}}</button>\n                        </div>\n                        <div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelNextMonth\" class=\"headerbtn mydpicon icon-mydpright\" (click)=\"onNextMonth()\" [disabled]=\"nextMonthDisabled\" [ngClass]=\"{'headerbtnenabled': !nextMonthDisabled, 'headerbtndisabled': nextMonthDisabled}\"></button></div>\n                    </div>\n                </td>\n                <td>\n                    <button *ngIf=\"opts.showTodayBtn\" type=\"button\" class=\"headertodaybtn\" (click)=\"onTodayClicked()\" [disabled]=\"disableTodayBtn\" [ngClass]=\"{'headertodaybtnenabled': !disableTodayBtn, 'headertodaybtndisabled': disableTodayBtn}\">\n                        <span class=\"mydpicon icon-mydptoday\"></span>\n                        <span>{{opts.todayBtnTxt}}</span>\n                    </button>\n                </td>\n                <td>\n                    <div style=\"float:right\">\n                        <div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelPrevYear\" class=\"headerbtn mydpicon icon-mydpleft\" (click)=\"onPrevYear()\" [disabled]=\"prevYearDisabled\" [ngClass]=\"{'headerbtnenabled': !prevYearDisabled, 'headerbtndisabled': prevYearDisabled}\"></button></div>\n                        <div class=\"headeryeartxt\">\n                            <button class=\"headerlabelbtn\" type=\"button\" [ngClass]=\"{'yearlabel': opts.yearSelector}\" (click)=\"opts.yearSelector&&onSelectYearClicked($event)\" tabindex=\"{{opts.yearSelector?'0':'-1'}}\">{{visibleMonth.year}}</button>\n                        </div>\n                        <div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelNextYear\" class=\"headerbtn mydpicon icon-mydpright\" (click)=\"onNextYear()\" [disabled]=\"nextYearDisabled\" [ngClass]=\"{'headerbtnenabled': !nextYearDisabled, 'headerbtndisabled': nextYearDisabled}\"></button></div>\n                    </div>\n                </td>\n            </tr>\n        </table>\n        <table class=\"caltable\" *ngIf=\"!selectMonth&&!selectYear\">\n            <thead><tr><th class=\"weekdaytitle weekdaytitleweeknbr\" *ngIf=\"opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'\">#</th><th class=\"weekdaytitle\" scope=\"col\" *ngFor=\"let d of weekDays\">{{d}}</th></tr></thead>\n            <tbody>\n                <tr *ngFor=\"let w of dates\">\n                    <td class=\"daycell daycellweeknbr\" *ngIf=\"opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'\">{{w.weekNbr}}</td>\n                    <td class=\"daycell\" *ngFor=\"let d of w.week\" [ngClass]=\"{'currmonth':d.cmo===currMonthId&&!d.disabled, 'selectedday':selectedDate.day===d.dateObj.day && selectedDate.month===d.dateObj.month && selectedDate.year===d.dateObj.year && d.cmo===currMonthId, 'disabled': d.disabled, 'tablesingleday':(!opts.allowSelectionOnlyInCurrentMonth||d.cmo===currMonthId&&opts.allowSelectionOnlyInCurrentMonth)&&!d.disabled}\" (click)=\"!d.disabled&&onCellClicked(d);$event.stopPropagation()\" (keydown)=\"onCellKeyDown($event, d)\" [attr.aria-label]=\"opts.ariaLabelDay + d.dateObj.day\" tabindex=\"0\">\n                        <div *ngIf=\"d.markedDate.marked\" class=\"markdate\" [ngStyle]=\"{'background-color': d.markedDate.color}\"></div>\n                        <div class=\"datevalue\" [ngClass]=\"{'prevmonth':d.cmo===prevMonthId,'currmonth':d.cmo===currMonthId,'nextmonth':d.cmo===nextMonthId,'highlight':d.highlight}\">\n                            <span [ngClass]=\"{'markcurrday':d.currDay&&opts.markCurrentDay, 'dimday': d.highlight && (d.cmo===prevMonthId || d.cmo===nextMonthId || d.disabled)}\">{{d.dateObj.day}}</span>\n                        </div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n        <table class=\"monthtable\" *ngIf=\"selectMonth\">\n            <tbody>\n                <tr *ngFor=\"let mr of months\">\n                    <td class=\"monthcell tablesinglemonth\" [ngClass]=\"{'selectedmonth': m.selected, 'disabled': m.disabled}\" *ngFor=\"let m of mr\" (click)=\"!m.disabled&&onMonthCellClicked(m);$event.stopPropagation()\" (keydown)=\"onMonthCellKeyDown($event, m)\" tabindex=\"0\">\n                        <div class=\"monthvalue\" [ngClass]=\"{'markcurrmonth':m.currMonth&&opts.markCurrentMonth}\">{{m.name}}</div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n        <table class=\"yeartable\" *ngIf=\"selectYear\">\n            <tbody>\n                <tr>\n                    <td colspan=\"5\" class=\"yearchangebtncell\" (click)=\"$event.stopPropagation()\">\n                        <button type=\"button\" class=\"yearchangebtn mydpicon icon-mydpup\" (click)=\"onPrevYears($event, years[0][0].year)\" [disabled]=\"prevYearsDisabled\" [ngClass]=\"{'yearchangebtnenabled': !prevYearsDisabled, 'yearchangebtndisabled': prevYearsDisabled}\"></button>\n                    </td>\n                </tr>\n                <tr *ngFor=\"let yr of years\">\n                    <td class=\"yearcell tablesingleyear\" [ngClass]=\"{'selectedyear': y.selected, 'disabled': y.disabled}\" *ngFor=\"let y of yr\" (click)=\"!y.disabled&&onYearCellClicked(y);$event.stopPropagation()\" (keydown)=\"onYearCellKeyDown($event, y)\" tabindex=\"0\">\n                        <div class=\"yearvalue\" [ngClass]=\"{'markcurryear':y.currYear&&opts.markCurrentYear}\">{{y.year}}</div>\n                    </td>\n                </tr>\n                <tr>\n                    <td colspan=\"5\" class=\"yearchangebtncell\" (click)=\"$event.stopPropagation()\">\n                        <button type=\"button\" class=\"yearchangebtn mydpicon icon-mydpdown\" (click)=\"onNextYears($event, years[0][0].year)\" [disabled]=\"nextYearsDisabled\" [ngClass]=\"{'yearchangebtnenabled': !nextYearsDisabled, 'yearchangebtndisabled': nextYearsDisabled}\"></button>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n",
            providers: [LocaleService, UtilService, MYDP_VALUE_ACCESSOR],
            encapsulation: ViewEncapsulation.None
        })
    ], MyDatePicker);
    return MyDatePicker;
}());
export { MyDatePicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlkYXRlcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL215ZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9teWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JMLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUFRO0lBQ3BDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsWUFBWSxFQUFaLENBQVksQ0FBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFFRixJQUFLLFNBQWdIO0FBQXJILFdBQUssU0FBUztJQUFFLHlDQUFRLENBQUE7SUFBRSw2REFBa0IsQ0FBQTtJQUFFLDJEQUFpQixDQUFBO0lBQUUsK0RBQW1CLENBQUE7SUFBRSxxREFBYyxDQUFBO0lBQUUscURBQWMsQ0FBQTtBQUFBLENBQUMsRUFBaEgsU0FBUyxLQUFULFNBQVMsUUFBdUc7QUFDckgsSUFBSyxJQUE2QjtBQUFsQyxXQUFLLElBQUk7SUFBRSxnQ0FBVSxDQUFBO0lBQUUsZ0NBQVUsQ0FBQTtBQUFBLENBQUMsRUFBN0IsSUFBSSxLQUFKLElBQUksUUFBeUI7QUFDbEMsSUFBSyxjQUFvQztBQUF6QyxXQUFLLGNBQWM7SUFBRSxxREFBUyxDQUFBO0lB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Q0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN6TSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsNkJBQTZCLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEosR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsNkJBQTZCLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2pIO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztRQUNuRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUM7UUFDekQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztRQUNwRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUM7SUFDN0QsQ0FBQzs7Z0JBN3NCd0IsVUFBVTtnQkFBZSxpQkFBaUI7Z0JBQXlCLGFBQWE7Z0JBQXVCLFdBQVc7O0lBekdsSTtRQUFSLEtBQUssRUFBRTtpREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7Z0RBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7c0RBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO2lEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTtxREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7a0RBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFO2tEQUFtQjtJQUNqQjtRQUFULE1BQU0sRUFBRTtxREFBNEU7SUFDM0U7UUFBVCxNQUFNLEVBQUU7MkRBQWtHO0lBQ2pHO1FBQVQsTUFBTSxFQUFFOzZEQUF3RztJQUN2RztRQUFULE1BQU0sRUFBRTt3REFBbUU7SUFDbEU7UUFBVCxNQUFNLEVBQUU7d0RBQXlGO0lBQ3pFO1FBQXhCLFNBQVMsQ0FBQyxZQUFZLENBQUM7b0RBQXdCO0lBQ3ZCO1FBQXhCLFNBQVMsQ0FBQyxZQUFZLENBQUM7b0RBQXdCO0lBZHZDLFlBQVk7UUFUeEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsY0FBYztZQUN4QiwyN1VBQTRDO1lBRTVDLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLENBQUM7WUFDNUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FBQztPQUVXLFlBQVksQ0F3ekJ4QjtJQUFELG1CQUFDO0NBQUEsQUF4ekJELElBd3pCQztTQXh6QlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWYsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkLCBmb3J3YXJkUmVmLCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBJTXlEYXRlLCBJTXlEYXRlUmFuZ2UsIElNeU1vbnRoLCBJTXlDYWxlbmRhckRheSwgSU15Q2FsZW5kYXJNb250aCwgSU15Q2FsZW5kYXJZZWFyLCBJTXlXZWVrLCBJTXlEYXlMYWJlbHMsIElNeU1vbnRoTGFiZWxzLCBJTXlPcHRpb25zLCBJTXlEYXRlTW9kZWwsIElNeUlucHV0RmllbGRDaGFuZ2VkLCBJTXlDYWxlbmRhclZpZXdDaGFuZ2VkLCBJTXlJbnB1dEZvY3VzQmx1ciwgSU15TWFya2VkRGF0ZXMsIElNeU1hcmtlZERhdGUsIElNeURhdGVGb3JtYXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2luZGV4XCI7XG5pbXBvcnQgeyBMb2NhbGVTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvbXlkYXRlcGlja2VyLmxvY2FsZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVdGlsU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL215ZGF0ZXBpY2tlci51dGlsLnNlcnZpY2VcIjtcblxuZXhwb3J0IGNvbnN0IE1ZRFBfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNeURhdGVQaWNrZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5lbnVtIENhbFRvZ2dsZSB7T3BlbiA9IDEsIENsb3NlQnlEYXRlU2VsID0gMiwgQ2xvc2VCeUNhbEJ0biA9IDMsIENsb3NlQnlPdXRDbGljayA9IDQsIENsb3NlQnlFc2MgPSA1LCBDbG9zZUJ5QXBpID0gNn1cbmVudW0gWWVhciB7bWluID0gMTAwMCwgbWF4ID0gOTk5OX1cbmVudW0gSW5wdXRGb2N1c0JsdXIge2ZvY3VzID0gMSwgYmx1ciA9IDJ9XG5lbnVtIEtleUNvZGUge2VudGVyID0gMTMsIGVzYyA9IDI3LCBzcGFjZSA9IDMyfVxuZW51bSBNb250aElkIHtwcmV2ID0gMSwgY3VyciA9IDIsIG5leHQgPSAzfVxuXG5jb25zdCBNTU0gPSBcIm1tbVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJteS1kYXRlLXBpY2tlclwiLFxuICAgIGV4cG9ydEFzOiBcIm15ZGF0ZXBpY2tlclwiLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9teWRhdGVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogW10sXG4gICAgcHJvdmlkZXJzOiBbTG9jYWxlU2VydmljZSwgVXRpbFNlcnZpY2UsIE1ZRFBfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5cbmV4cG9ydCBjbGFzcyBNeURhdGVQaWNrZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IElNeU9wdGlvbnM7XG4gICAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZGVmYXVsdE1vbnRoOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2VsRGF0ZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2VsZWN0b3I6IG51bWJlcjtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBAT3V0cHV0KCkgZGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxJTXlEYXRlTW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTXlEYXRlTW9kZWw+KCk7XG4gICAgQE91dHB1dCgpIGlucHV0RmllbGRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8SU15SW5wdXRGaWVsZENoYW5nZWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTXlJbnB1dEZpZWxkQ2hhbmdlZD4oKTtcbiAgICBAT3V0cHV0KCkgY2FsZW5kYXJWaWV3Q2hhbmdlZDogRXZlbnRFbWl0dGVyPElNeUNhbGVuZGFyVmlld0NoYW5nZWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTXlDYWxlbmRhclZpZXdDaGFuZ2VkPigpO1xuICAgIEBPdXRwdXQoKSBjYWxlbmRhclRvZ2dsZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgaW5wdXRGb2N1c0JsdXI6IEV2ZW50RW1pdHRlcjxJTXlJbnB1dEZvY3VzQmx1cj4gPSBuZXcgRXZlbnRFbWl0dGVyPElNeUlucHV0Rm9jdXNCbHVyPigpO1xuICAgIEBWaWV3Q2hpbGQoXCJzZWxlY3RvckVsXCIpIHNlbGVjdG9yRWw6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcImlucHV0Qm94RWxcIikgaW5wdXRCb3hFbDogRWxlbWVudFJlZjtcblxuICAgIG9uQ2hhbmdlQ2I6IChfOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG4gICAgb25Ub3VjaGVkQ2I6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgICBzaG93U2VsZWN0b3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB2aXNpYmxlTW9udGg6IElNeU1vbnRoID0ge21vbnRoVHh0OiBcIlwiLCBtb250aE5icjogMCwgeWVhcjogMH07XG4gICAgc2VsZWN0ZWRNb250aDogSU15TW9udGggPSB7bW9udGhUeHQ6IFwiXCIsIG1vbnRoTmJyOiAwLCB5ZWFyOiAwfTtcbiAgICBzZWxlY3RlZERhdGU6IElNeURhdGUgPSB7eWVhcjogMCwgbW9udGg6IDAsIGRheTogMH07XG4gICAgd2Vla0RheXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBkYXRlczogQXJyYXk8SU15V2Vlaz4gPSBbXTtcbiAgICBtb250aHM6IEFycmF5PEFycmF5PElNeUNhbGVuZGFyTW9udGg+PiA9IFtdO1xuICAgIHllYXJzOiBBcnJheTxBcnJheTxJTXlDYWxlbmRhclllYXI+PiA9IFtdO1xuICAgIHNlbGVjdGlvbkRheVR4dDogc3RyaW5nID0gXCJcIjtcbiAgICBpbnZhbGlkRGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGRpc2FibGVUb2RheUJ0bjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGRheUlkeDogbnVtYmVyID0gMDtcblxuICAgIHNlbGVjdE1vbnRoOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2VsZWN0WWVhcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJldk1vbnRoRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBuZXh0TW9udGhEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByZXZZZWFyRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBuZXh0WWVhckRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJldlllYXJzRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBuZXh0WWVhcnNEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJldk1vbnRoSWQ6IG51bWJlciA9IE1vbnRoSWQucHJldjtcbiAgICBjdXJyTW9udGhJZDogbnVtYmVyID0gTW9udGhJZC5jdXJyO1xuICAgIG5leHRNb250aElkOiBudW1iZXIgPSBNb250aElkLm5leHQ7XG5cbiAgICAvLyBEZWZhdWx0IG9wdGlvbnNcbiAgICBvcHRzOiBJTXlPcHRpb25zID0ge1xuICAgICAgICBkYXlMYWJlbHM6IDxJTXlEYXlMYWJlbHM+IHt9LFxuICAgICAgICBtb250aExhYmVsczogPElNeU1vbnRoTGFiZWxzPiB7fSxcbiAgICAgICAgZGF0ZUZvcm1hdDogPHN0cmluZz4gXCJcIixcbiAgICAgICAgc2hvd1RvZGF5QnRuOiA8Ym9vbGVhbj4gdHJ1ZSxcbiAgICAgICAgdG9kYXlCdG5UeHQ6IDxzdHJpbmc+IFwiXCIsXG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrOiA8c3RyaW5nPiBcIlwiLFxuICAgICAgICBzYXRIaWdobGlnaHQ6IDxib29sZWFuPiBmYWxzZSxcbiAgICAgICAgc3VuSGlnaGxpZ2h0OiA8Ym9vbGVhbj4gdHJ1ZSxcbiAgICAgICAgaGlnaGxpZ2h0RGF0ZXM6IDxBcnJheTxJTXlEYXRlPj4gW10sXG4gICAgICAgIG1hcmtDdXJyZW50RGF5OiA8Ym9vbGVhbj4gdHJ1ZSxcbiAgICAgICAgbWFya0N1cnJlbnRNb250aDogPGJvb2xlYW4+IHRydWUsXG4gICAgICAgIG1hcmtDdXJyZW50WWVhcjogPGJvb2xlYW4+IHRydWUsXG4gICAgICAgIGRpc2FibGVVbnRpbDogPElNeURhdGU+IHt5ZWFyOiAwLCBtb250aDogMCwgZGF5OiAwfSxcbiAgICAgICAgZGlzYWJsZVNpbmNlOiA8SU15RGF0ZT4ge3llYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDB9LFxuICAgICAgICBkaXNhYmxlRGF5czogPEFycmF5PElNeURhdGU+PiBbXSxcbiAgICAgICAgZW5hYmxlRGF5czogPEFycmF5PElNeURhdGU+PiBbXSxcbiAgICAgICAgbWFya0RhdGVzOiA8QXJyYXk8SU15TWFya2VkRGF0ZXM+PiBbXSxcbiAgICAgICAgbWFya1dlZWtlbmRzOiA8SU15TWFya2VkRGF0ZT4ge30sXG4gICAgICAgIGRpc2FibGVEYXRlUmFuZ2VzOiA8QXJyYXk8SU15RGF0ZVJhbmdlPj4gW10sXG4gICAgICAgIGRpc2FibGVXZWVrZW5kczogPGJvb2xlYW4+IGZhbHNlLFxuICAgICAgICBkaXNhYmxlV2Vla2RheXM6IDxBcnJheTxzdHJpbmc+PiBbXSxcbiAgICAgICAgc2hvd1dlZWtOdW1iZXJzOiA8Ym9vbGVhbj4gZmFsc2UsXG4gICAgICAgIGhlaWdodDogPHN0cmluZz4gXCIzNHB4XCIsXG4gICAgICAgIHdpZHRoOiA8c3RyaW5nPiBcIjEwMCVcIixcbiAgICAgICAgc2VsZWN0aW9uVHh0Rm9udFNpemU6IDxzdHJpbmc+IFwiMTRweFwiLFxuICAgICAgICBzZWxlY3RvckhlaWdodDogPHN0cmluZz4gXCIyMzJweFwiLFxuICAgICAgICBzZWxlY3RvcldpZHRoOiA8c3RyaW5nPiBcIjI1MnB4XCIsXG4gICAgICAgIGFsbG93RGVzZWxlY3REYXRlOiA8Ym9vbGVhbj4gZmFsc2UsXG4gICAgICAgIGlubGluZTogPGJvb2xlYW4+IGZhbHNlLFxuICAgICAgICBzaG93Q2xlYXJEYXRlQnRuOiA8Ym9vbGVhbj4gdHJ1ZSxcbiAgICAgICAgc2hvd0RlY3JlYXNlRGF0ZUJ0bjogPGJvb2xlYW4+IGZhbHNlLFxuICAgICAgICBzaG93SW5jcmVhc2VEYXRlQnRuOiA8Ym9vbGVhbj4gZmFsc2UsXG4gICAgICAgIGFsaWduU2VsZWN0b3JSaWdodDogPGJvb2xlYW4+IGZhbHNlLFxuICAgICAgICBvcGVuU2VsZWN0b3JUb3BPZklucHV0OiA8Ym9vbGVhbj4gZmFsc2UsXG4gICAgICAgIGluZGljYXRlSW52YWxpZERhdGU6IDxib29sZWFuPiB0cnVlLFxuICAgICAgICBlZGl0YWJsZURhdGVGaWVsZDogPGJvb2xlYW4+IHRydWUsXG4gICAgICAgIG1vbnRoU2VsZWN0b3I6IDxib29sZWFuPiB0cnVlLFxuICAgICAgICB5ZWFyU2VsZWN0b3I6IDxib29sZWFuPiB0cnVlLFxuICAgICAgICBkaXNhYmxlSGVhZGVyQnV0dG9uczogPGJvb2xlYW4+IHRydWUsXG4gICAgICAgIG1pblllYXI6IDxudW1iZXI+IFllYXIubWluLFxuICAgICAgICBtYXhZZWFyOiA8bnVtYmVyPiBZZWFyLm1heCxcbiAgICAgICAgY29tcG9uZW50RGlzYWJsZWQ6IDxib29sZWFuPiBmYWxzZSxcbiAgICAgICAgc2hvd1NlbGVjdG9yQXJyb3c6IDxib29sZWFuPiB0cnVlLFxuICAgICAgICBzaG93SW5wdXRGaWVsZDogPGJvb2xlYW4+IHRydWUsXG4gICAgICAgIG9wZW5TZWxlY3Rvck9uSW5wdXRDbGljazogPGJvb2xlYW4+IGZhbHNlLFxuICAgICAgICBhbGxvd1NlbGVjdGlvbk9ubHlJbkN1cnJlbnRNb250aDogPGJvb2xlYW4+IHRydWUsXG4gICAgICAgIGFyaWFMYWJlbElucHV0RmllbGQ6IDxzdHJpbmc+IFwiRGF0ZSBpbnB1dCBmaWVsZFwiLFxuICAgICAgICBhcmlhTGFiZWxDbGVhckRhdGU6IDxzdHJpbmc+IFwiQ2xlYXIgRGF0ZVwiLFxuICAgICAgICBhcmlhTGFiZWxEZWNyZWFzZURhdGU6IDxzdHJpbmc+IFwiRGVjcmVhc2UgRGF0ZVwiLFxuICAgICAgICBhcmlhTGFiZWxJbmNyZWFzZURhdGU6IDxzdHJpbmc+IFwiSW5jcmVhc2UgRGF0ZVwiLFxuICAgICAgICBhcmlhTGFiZWxPcGVuQ2FsZW5kYXI6IDxzdHJpbmc+IFwiT3BlbiBDYWxlbmRhclwiLFxuICAgICAgICBhcmlhTGFiZWxQcmV2TW9udGg6IDxzdHJpbmc+IFwiUHJldmlvdXMgTW9udGhcIixcbiAgICAgICAgYXJpYUxhYmVsTmV4dE1vbnRoOiA8c3RyaW5nPiBcIk5leHQgTW9udGhcIixcbiAgICAgICAgYXJpYUxhYmVsUHJldlllYXI6IDxzdHJpbmc+IFwiUHJldmlvdXMgWWVhclwiLFxuICAgICAgICBhcmlhTGFiZWxOZXh0WWVhcjogPHN0cmluZz4gXCJOZXh0IFllYXJcIixcbiAgICAgICAgYXJpYUxhYmVsRGF5OiA8c3RyaW5nPiBcIlNlbGVjdCBkYXlcIlxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbTogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGxvY2FsZVNlcnZpY2U6IExvY2FsZVNlcnZpY2UsIHByaXZhdGUgdXRpbFNlcnZpY2U6IFV0aWxTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxlT3B0aW9ucygpO1xuICAgIH1cblxuICAgIHNldExvY2FsZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIGxldCBvcHRzOiBJTXlPcHRpb25zID0gdGhpcy5sb2NhbGVTZXJ2aWNlLmdldExvY2FsZU9wdGlvbnModGhpcy5sb2NhbGUpO1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICAgICAoPElNeU9wdGlvbnM+dGhpcy5vcHRzKVtrXSA9IG9wdHNba107XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldE9wdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5vcHRpb25zKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICAgICAgICAgKDxJTXlPcHRpb25zPnRoaXMub3B0cylba10gPSB0aGlzLm9wdGlvbnNba107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRzLm1pblllYXIgPCBZZWFyLm1pbikge1xuICAgICAgICAgICAgdGhpcy5vcHRzLm1pblllYXIgPSBZZWFyLm1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRzLm1heFllYXIgPiBZZWFyLm1heCkge1xuICAgICAgICAgICAgdGhpcy5vcHRzLm1heFllYXIgPSBZZWFyLm1heDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMuY29tcG9uZW50RGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0b3JUb3BQb3NpdGlvbigpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5vcHRzLm9wZW5TZWxlY3RvclRvcE9mSW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5vZmZzZXRIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldE1vbnRoWWVhclNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RNb250aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGVjdFllYXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvblNlbGVjdE1vbnRoQ2xpY2tlZChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnNlbGVjdE1vbnRoID0gIXRoaXMuc2VsZWN0TW9udGg7XG4gICAgICAgIHRoaXMuc2VsZWN0WWVhciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdE1vbnRoKSB7XG4gICAgICAgICAgICBsZXQgdG9kYXk6IElNeURhdGUgPSB0aGlzLmdldFRvZGF5KCk7XG4gICAgICAgICAgICB0aGlzLm1vbnRocy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTI7IGkgKz0gMykge1xuICAgICAgICAgICAgICAgIGxldCByb3c6IEFycmF5PElNeUNhbGVuZGFyTW9udGg+ID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGk7IGogPCBpICsgMzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlZDogYm9vbGVhbiA9IHRoaXMudXRpbFNlcnZpY2UuaXNNb250aERpc2FibGVkQnlEaXNhYmxlVW50aWwoe3llYXI6IHRoaXMudmlzaWJsZU1vbnRoLnllYXIsIG1vbnRoOiBqLCBkYXk6IHRoaXMuZGF5c0luTW9udGgoaiwgdGhpcy52aXNpYmxlTW9udGgueWVhcil9LCB0aGlzLm9wdHMuZGlzYWJsZVVudGlsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVTaW5jZSh7eWVhcjogdGhpcy52aXNpYmxlTW9udGgueWVhciwgbW9udGg6IGosIGRheTogMX0sIHRoaXMub3B0cy5kaXNhYmxlU2luY2UpO1xuICAgICAgICAgICAgICAgICAgICByb3cucHVzaCh7bmJyOiBqLCBuYW1lOiB0aGlzLm9wdHMubW9udGhMYWJlbHNbal0sIGN1cnJNb250aDogaiA9PT0gdG9kYXkubW9udGggJiYgdGhpcy52aXNpYmxlTW9udGgueWVhciA9PT0gdG9kYXkueWVhciwgc2VsZWN0ZWQ6IGogPT09IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCBkaXNhYmxlZDogZGlzYWJsZWR9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tb250aHMucHVzaChyb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb250aENlbGxDbGlja2VkKGNlbGw6IElNeUNhbGVuZGFyTW9udGgpOiB2b2lkIHtcbiAgICAgICAgbGV0IG1jOiBib29sZWFuID0gY2VsbC5uYnIgIT09IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyO1xuICAgICAgICB0aGlzLnZpc2libGVNb250aCA9IHttb250aFR4dDogdGhpcy5tb250aFRleHQoY2VsbC5uYnIpLCBtb250aE5icjogY2VsbC5uYnIsIHllYXI6IHRoaXMudmlzaWJsZU1vbnRoLnllYXJ9O1xuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoY2VsbC5uYnIsIHRoaXMudmlzaWJsZU1vbnRoLnllYXIsIG1jKTtcbiAgICAgICAgdGhpcy5zZWxlY3RNb250aCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGVjdG9yRWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uTW9udGhDZWxsS2V5RG93bihldmVudDogYW55LCBjZWxsOiBJTXlDYWxlbmRhck1vbnRoKSB7XG4gICAgICAgIGlmICgoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5lbnRlciB8fCBldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLnNwYWNlKSAmJiAhY2VsbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMub25Nb250aENlbGxDbGlja2VkKGNlbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TZWxlY3RZZWFyQ2xpY2tlZChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnNlbGVjdFllYXIgPSAhdGhpcy5zZWxlY3RZZWFyO1xuICAgICAgICB0aGlzLnNlbGVjdE1vbnRoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0WWVhcikge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVllYXJzKE51bWJlcih0aGlzLnZpc2libGVNb250aC55ZWFyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblllYXJDZWxsQ2xpY2tlZChjZWxsOiBJTXlDYWxlbmRhclllYXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IHljOiBib29sZWFuID0gY2VsbC55ZWFyICE9PSB0aGlzLnZpc2libGVNb250aC55ZWFyO1xuICAgICAgICB0aGlzLnZpc2libGVNb250aCA9IHttb250aFR4dDogdGhpcy52aXNpYmxlTW9udGgubW9udGhUeHQsIG1vbnRoTmJyOiB0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgeWVhcjogY2VsbC55ZWFyfTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCBjZWxsLnllYXIsIHljKTtcbiAgICAgICAgdGhpcy5zZWxlY3RZZWFyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JFbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgb25ZZWFyQ2VsbEtleURvd24oZXZlbnQ6IGFueSwgY2VsbDogSU15Q2FsZW5kYXJZZWFyKSB7XG4gICAgICAgIGlmICgoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5lbnRlciB8fCBldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLnNwYWNlKSAmJiAhY2VsbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMub25ZZWFyQ2VsbENsaWNrZWQoY2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblByZXZZZWFycyhldmVudDogYW55LCB5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFycyhOdW1iZXIoeWVhcikgLSAyNSk7XG4gICAgfVxuXG4gICAgb25OZXh0WWVhcnMoZXZlbnQ6IGFueSwgeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlWWVhcnMoTnVtYmVyKHllYXIpICsgMjUpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlWWVhcnMoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMueWVhcnMubGVuZ3RoID0gMDtcbiAgICAgICAgbGV0IHRvZGF5OiBJTXlEYXRlID0gdGhpcy5nZXRUb2RheSgpO1xuICAgICAgICBmb3IgKGxldCBpID0geWVhcjsgaSA8PSAyMCArIHllYXI7IGkgKz0gNSkge1xuICAgICAgICAgICAgbGV0IHJvdzogQXJyYXk8SU15Q2FsZW5kYXJZZWFyPiA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGk7IGogPCBpICsgNTsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkOiBib29sZWFuID0gdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVVbnRpbCh7eWVhcjogaiwgbW9udGg6IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCBkYXk6IHRoaXMuZGF5c0luTW9udGgodGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIsIGopfSwgdGhpcy5vcHRzLmRpc2FibGVVbnRpbClcbiAgICAgICAgICAgICAgICAgfHwgdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVTaW5jZSh7eWVhcjogaiwgbW9udGg6IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCBkYXk6IDF9LCB0aGlzLm9wdHMuZGlzYWJsZVNpbmNlKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluTWF4OiBib29sZWFuID0gaiA8IHRoaXMub3B0cy5taW5ZZWFyIHx8IGogPiB0aGlzLm9wdHMubWF4WWVhcjtcbiAgICAgICAgICAgICAgICByb3cucHVzaCh7eWVhcjogaiwgY3VyclllYXI6IGogPT09IHRvZGF5LnllYXIsIHNlbGVjdGVkOiBqID09PSB0aGlzLnZpc2libGVNb250aC55ZWFyLCBkaXNhYmxlZDogZGlzYWJsZWQgfHwgbWluTWF4fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnllYXJzLnB1c2gocm93KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXZZZWFyc0Rpc2FibGVkID0gdGhpcy55ZWFyc1swXVswXS55ZWFyIDw9IHRoaXMub3B0cy5taW5ZZWFyIHx8IHRoaXMudXRpbFNlcnZpY2UuaXNNb250aERpc2FibGVkQnlEaXNhYmxlVW50aWwoe3llYXI6IHRoaXMueWVhcnNbMF1bMF0ueWVhciAtIDEsIG1vbnRoOiB0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgZGF5OiB0aGlzLmRheXNJbk1vbnRoKHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCB0aGlzLnllYXJzWzBdWzBdLnllYXIgLSAxKX0sIHRoaXMub3B0cy5kaXNhYmxlVW50aWwpO1xuICAgICAgICB0aGlzLm5leHRZZWFyc0Rpc2FibGVkID0gdGhpcy55ZWFyc1s0XVs0XS55ZWFyID49IHRoaXMub3B0cy5tYXhZZWFyIHx8IHRoaXMudXRpbFNlcnZpY2UuaXNNb250aERpc2FibGVkQnlEaXNhYmxlU2luY2Uoe3llYXI6IHRoaXMueWVhcnNbNF1bNF0ueWVhciArIDEsIG1vbnRoOiB0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgZGF5OiAxfSwgdGhpcy5vcHRzLmRpc2FibGVTaW5jZSk7XG4gICAgfVxuXG4gICAgb25Vc2VyRGF0ZUlucHV0KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUodGhpcy5zZWxlY3RlZERhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZElucHV0RmllbGRDaGFuZ2VkKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBkYXRlOiBJTXlEYXRlID0gdGhpcy51dGlsU2VydmljZS5pc0RhdGVWYWxpZCh2YWx1ZSwgdGhpcy5vcHRzLmRhdGVGb3JtYXQsIHRoaXMub3B0cy5taW5ZZWFyLCB0aGlzLm9wdHMubWF4WWVhciwgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCwgdGhpcy5vcHRzLmRpc2FibGVTaW5jZSwgdGhpcy5vcHRzLmRpc2FibGVXZWVrZW5kcywgdGhpcy5vcHRzLmRpc2FibGVXZWVrZGF5cywgdGhpcy5vcHRzLmRpc2FibGVEYXlzLCB0aGlzLm9wdHMuZGlzYWJsZURhdGVSYW5nZXMsIHRoaXMub3B0cy5tb250aExhYmVscywgdGhpcy5vcHRzLmVuYWJsZURheXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudXRpbFNlcnZpY2UuaXNTYW1lRGF0ZShkYXRlLCB0aGlzLnNlbGVjdGVkRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKGRhdGUsIENhbFRvZ2dsZS5DbG9zZUJ5RGF0ZVNlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGVWYWx1ZShkYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWRJbnB1dEZpZWxkQ2hhbmdlZCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZvY3VzSW5wdXQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0Rm9jdXNCbHVyLmVtaXQoe3JlYXNvbjogSW5wdXRGb2N1c0JsdXIuZm9jdXMsIHZhbHVlOiBldmVudC50YXJnZXQudmFsdWV9KTtcbiAgICB9XG5cbiAgICBvbkJsdXJJbnB1dChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRGF5VHh0ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENiKCk7XG4gICAgICAgIHRoaXMuaW5wdXRGb2N1c0JsdXIuZW1pdCh7cmVhc29uOiBJbnB1dEZvY3VzQmx1ci5ibHVyLCB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XG4gICAgfVxuXG4gICAgb25DbG9zZVNlbGVjdG9yKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuZXNjICYmIHRoaXMuc2hvd1NlbGVjdG9yICYmICF0aGlzLm9wdHMuaW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUdsb2JhbExpc3RlbmVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJUb2dnbGUuZW1pdChDYWxUb2dnbGUuQ2xvc2VCeUVzYyk7XG4gICAgICAgICAgICB0aGlzLnNob3dTZWxlY3RvciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW52YWxpZElucHV0RmllbGRDaGFuZ2VkKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkRGF0ZSA9IHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICAgIHRoaXMuaW5wdXRGaWVsZENoYW5nZWQuZW1pdCh7dmFsdWU6IHZhbHVlLCBkYXRlRm9ybWF0OiB0aGlzLm9wdHMuZGF0ZUZvcm1hdCwgdmFsaWQ6IGZhbHNlfSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYihudWxsKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYigpO1xuICAgIH1cblxuICAgIGlzVG9kYXlEaXNhYmxlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlVG9kYXlCdG4gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGlzYWJsZWREYXkodGhpcy5nZXRUb2RheSgpLCB0aGlzLm9wdHMubWluWWVhciwgdGhpcy5vcHRzLm1heFllYXIsIHRoaXMub3B0cy5kaXNhYmxlVW50aWwsIHRoaXMub3B0cy5kaXNhYmxlU2luY2UsIHRoaXMub3B0cy5kaXNhYmxlV2Vla2VuZHMsIHRoaXMub3B0cy5kaXNhYmxlV2Vla2RheXMsIHRoaXMub3B0cy5kaXNhYmxlRGF5cywgdGhpcy5vcHRzLmRpc2FibGVEYXRlUmFuZ2VzLCB0aGlzLm9wdHMuZW5hYmxlRGF5cyk7XG4gICAgfVxuXG4gICAgcGFyc2VPcHRpb25zKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5sb2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxlT3B0aW9ucygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgICAgICBsZXQgd2Vla0RheXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLnV0aWxTZXJ2aWNlLmdldFdlZWtEYXlzKCk7XG4gICAgICAgIHRoaXMuaXNUb2RheURpc2FibGVkKCk7XG4gICAgICAgIHRoaXMuZGF5SWR4ID0gd2Vla0RheXMuaW5kZXhPZih0aGlzLm9wdHMuZmlyc3REYXlPZldlZWspO1xuICAgICAgICBpZiAodGhpcy5kYXlJZHggIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgaWR4OiBudW1iZXIgPSB0aGlzLmRheUlkeDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2Vla0RheXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtEYXlzLnB1c2godGhpcy5vcHRzLmRheUxhYmVsc1t3ZWVrRGF5c1tpZHhdXSk7XG4gICAgICAgICAgICAgICAgaWR4ID0gd2Vla0RheXNbaWR4XSA9PT0gXCJzYVwiID8gMCA6IGlkeCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHZhbHVlICYmICh2YWx1ZVtcImRhdGVcIl0gfHwgdmFsdWVbXCJqc2RhdGVcIl0gfHwgdmFsdWVbXCJmb3JtYXR0ZWRcIl0pKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IHZhbHVlW1wiZGF0ZVwiXSA/IHRoaXMucGFyc2VTZWxlY3RlZERhdGUodmFsdWVbXCJkYXRlXCJdKSA6IHZhbHVlW1wianNkYXRlXCJdID8gdGhpcy5wYXJzZVNlbGVjdGVkRGF0ZSh0aGlzLmpzRGF0ZVRvTXlEYXRlKHZhbHVlW1wianNkYXRlXCJdKSkgOiB0aGlzLnBhcnNlU2VsZWN0ZWREYXRlKHZhbHVlW1wiZm9ybWF0dGVkXCJdKTtcbiAgICAgICAgICAgIGxldCBjdmM6IGJvb2xlYW4gPSB0aGlzLnZpc2libGVNb250aC55ZWFyICE9PSB0aGlzLnNlbGVjdGVkRGF0ZS55ZWFyIHx8IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyICE9PSB0aGlzLnNlbGVjdGVkRGF0ZS5tb250aDtcbiAgICAgICAgICAgIGlmIChjdmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGVNb250aCA9IHttb250aFR4dDogdGhpcy5vcHRzLm1vbnRoTGFiZWxzW3RoaXMuc2VsZWN0ZWREYXRlLm1vbnRoXSwgbW9udGhOYnI6IHRoaXMuc2VsZWN0ZWREYXRlLm1vbnRoLCB5ZWFyOiB0aGlzLnNlbGVjdGVkRGF0ZS55ZWFyfTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIodGhpcy5zZWxlY3RlZERhdGUubW9udGgsIHRoaXMuc2VsZWN0ZWREYXRlLnllYXIsIGN2Yyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkRheVR4dCA9IHRoaXMudXRpbFNlcnZpY2UuZm9ybWF0RGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZSwgdGhpcy5vcHRzLmRhdGVGb3JtYXQsIHRoaXMub3B0cy5tb250aExhYmVscyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0ge3llYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDB9O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25EYXlUeHQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5wdXRGaWVsZENoYW5nZWQuZW1pdCh7dmFsdWU6IHRoaXMuc2VsZWN0aW9uRGF5VHh0LCBkYXRlRm9ybWF0OiB0aGlzLm9wdHMuZGF0ZUZvcm1hdCwgdmFsaWQ6IHRoaXMuc2VsZWN0aW9uRGF5VHh0Lmxlbmd0aCA+IDB9KTtcbiAgICAgICAgdGhpcy5pbnZhbGlkRGF0ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcHRzLmNvbXBvbmVudERpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNiID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENiID0gZm47XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlR2xvYmFsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KFwic2VsZWN0b3JcIikpIHtcbiAgICAgICAgICAgIGxldCBzOiBhbnkgPSBjaGFuZ2VzW1wic2VsZWN0b3JcIl0uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMub3Blbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWxlY3RvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblNlbGVjdG9yKENhbFRvZ2dsZS5PcGVuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlbGVjdG9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTZWxlY3RvcihDYWxUb2dnbGUuQ2xvc2VCeUFwaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocyA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5CdG5DbGlja2VkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShcInBsYWNlaG9sZGVyXCIpKSB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gY2hhbmdlc1tcInBsYWNlaG9sZGVyXCJdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KFwibG9jYWxlXCIpKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsZSA9IGNoYW5nZXNbXCJsb2NhbGVcIl0uY3VycmVudFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoXCJkaXNhYmxlZFwiKSkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGNoYW5nZXNbXCJkaXNhYmxlZFwiXS5jdXJyZW50VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShcIm9wdGlvbnNcIikpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGNoYW5nZXNbXCJvcHRpb25zXCJdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2Vla0RheXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5wYXJzZU9wdGlvbnMoKTtcblxuICAgICAgICBsZXQgZG1DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoXCJkZWZhdWx0TW9udGhcIikpIHtcbiAgICAgICAgICAgIGxldCBkbTogYW55ID0gY2hhbmdlc1tcImRlZmF1bHRNb250aFwiXS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRtID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgZG0gPSBkbS5kZWZNb250aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkbSAhPT0gbnVsbCAmJiBkbSAhPT0gdW5kZWZpbmVkICYmIGRtICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gdGhpcy5wYXJzZVNlbGVjdGVkTW9udGgoZG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoID0ge21vbnRoVHh0OiBcIlwiLCBtb250aE5icjogMCwgeWVhcjogMH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkbUNoYW5nZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShcInNlbERhdGVcIikpIHtcbiAgICAgICAgICAgIGxldCBzZDogYW55ID0gY2hhbmdlc1tcInNlbERhdGVcIl07XG4gICAgICAgICAgICBpZiAoc2QuY3VycmVudFZhbHVlICE9PSBudWxsICYmIHNkLmN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIHNkLmN1cnJlbnRWYWx1ZSAhPT0gXCJcIiAmJiBPYmplY3Qua2V5cyhzZC5jdXJyZW50VmFsdWUpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5wYXJzZVNlbGVjdGVkRGF0ZShzZC5jdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2IodGhpcy5nZXREYXRlTW9kZWwodGhpcy5zZWxlY3RlZERhdGUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBjbGVhciBvbiBpbml0XG4gICAgICAgICAgICAgICAgaWYgKCFzZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZU1vbnRoLnllYXIgPT09IDAgJiYgdGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIgPT09IDAgfHwgZG1DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJsZU1vbnRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZpc2libGVNb250aC5tb250aFR4dCA9IHRoaXMub3B0cy5tb250aExhYmVsc1t0aGlzLnZpc2libGVNb250aC5tb250aE5icl07XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIodGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIsIHRoaXMudmlzaWJsZU1vbnRoLnllYXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUJ0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIC8vIFJlbW92ZSBkYXRlIGJ1dHRvbiBjbGlja2VkXG4gICAgICAgIHRoaXMuY2xlYXJEYXRlKCk7XG4gICAgICAgIGlmICh0aGlzLnNob3dTZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KENhbFRvZ2dsZS5DbG9zZUJ5Q2FsQnRuKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlR2xvYmFsTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hvd1NlbGVjdG9yID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25EZWNyZWFzZUJ0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIC8vIERlY3JlYXNlIGRhdGUgYnV0dG9uIGNsaWNrZWRcbiAgICAgICAgdGhpcy5kZWNyZWFzZUluY3JlYXNlRGF0ZSh0cnVlKTtcbiAgICB9XG5cbiAgICBvbkluY3JlYXNlQnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgLy8gSW5jcmVhc2UgZGF0ZSBidXR0b24gY2xpY2tlZFxuICAgICAgICB0aGlzLmRlY3JlYXNlSW5jcmVhc2VEYXRlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBvcGVuQnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgLy8gT3BlbiBzZWxlY3RvciBidXR0b24gY2xpY2tlZFxuICAgICAgICB0aGlzLnNob3dTZWxlY3RvciA9ICF0aGlzLnNob3dTZWxlY3RvcjtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICBpZiAodGhpcy5zaG93U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMub3BlblNlbGVjdG9yKENhbFRvZ2dsZS5PcGVuKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTZWxlY3RvcihDYWxUb2dnbGUuQ2xvc2VCeUNhbEJ0bik7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUdsb2JhbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrTGlzdGVuZXIgPSAoZXZ0OiBNb3VzZUV2ZW50KSA9PiB0aGlzLm9uQ2xpY2tEb2N1bWVudChldnQpO1xuXG4gICAgYWRkR2xvYmFsTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVtb3ZlR2xvYmFsTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2tMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgb25DbGlja0RvY3VtZW50KGV2dDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNob3dTZWxlY3RvciAmJiBldmVudC50YXJnZXQgJiYgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJiAhdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5zaG93U2VsZWN0b3IgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJUb2dnbGUuZW1pdChDYWxUb2dnbGUuQ2xvc2VCeU91dENsaWNrKTtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVHbG9iYWxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdHMubW9udGhTZWxlY3RvciB8fCB0aGlzLm9wdHMueWVhclNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0TW9udGhZZWFyU2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuU2VsZWN0b3IocmVhc29uOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRHbG9iYWxMaXN0ZW5lcigpO1xuXG4gICAgICAgIHRoaXMuc2V0VmlzaWJsZU1vbnRoKCk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJUb2dnbGUuZW1pdChyZWFzb24pO1xuICAgIH1cblxuICAgIGNsb3NlU2VsZWN0b3IocmVhc29uOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KHJlYXNvbik7XG4gICAgfVxuXG4gICAgc2V0VmlzaWJsZU1vbnRoKCk6IHZvaWQge1xuICAgICAgICAvLyBTZXRzIHZpc2libGUgbW9udGggb2YgY2FsZW5kYXJcbiAgICAgICAgbGV0IHk6IG51bWJlciA9IDAsIG06IG51bWJlciA9IDA7XG4gICAgICAgIGlmICghdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTW9udGgueWVhciA9PT0gMCAmJiB0aGlzLnNlbGVjdGVkTW9udGgubW9udGhOYnIgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgdG9kYXk6IElNeURhdGUgPSB0aGlzLmdldFRvZGF5KCk7XG4gICAgICAgICAgICAgICAgeSA9IHRvZGF5LnllYXI7XG4gICAgICAgICAgICAgICAgbSA9IHRvZGF5Lm1vbnRoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5zZWxlY3RlZE1vbnRoLnllYXI7XG4gICAgICAgICAgICAgICAgbSA9IHRoaXMuc2VsZWN0ZWRNb250aC5tb250aE5icjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHkgPSB0aGlzLnNlbGVjdGVkRGF0ZS55ZWFyO1xuICAgICAgICAgICAgbSA9IHRoaXMuc2VsZWN0ZWREYXRlLm1vbnRoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm9wdHMubW9udGhMYWJlbHNbbV0sIG1vbnRoTmJyOiBtLCB5ZWFyOiB5fTtcblxuICAgICAgICAvLyBDcmVhdGUgY3VycmVudCBtb250aFxuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIobSwgeSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgb25QcmV2TW9udGgoKTogdm9pZCB7XG4gICAgICAgIC8vIFByZXZpb3VzIG1vbnRoIGZyb20gY2FsZW5kYXJcbiAgICAgICAgbGV0IGQ6IERhdGUgPSB0aGlzLmdldERhdGUodGhpcy52aXNpYmxlTW9udGgueWVhciwgdGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIsIDEpO1xuICAgICAgICBkLnNldE1vbnRoKGQuZ2V0TW9udGgoKSAtIDEpO1xuXG4gICAgICAgIGxldCB5OiBudW1iZXIgPSBkLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGxldCBtOiBudW1iZXIgPSBkLmdldE1vbnRoKCkgKyAxO1xuXG4gICAgICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm1vbnRoVGV4dChtKSwgbW9udGhOYnI6IG0sIHllYXI6IHl9O1xuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIobSwgeSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgb25OZXh0TW9udGgoKTogdm9pZCB7XG4gICAgICAgIC8vIE5leHQgbW9udGggZnJvbSBjYWxlbmRhclxuICAgICAgICBsZXQgZDogRGF0ZSA9IHRoaXMuZ2V0RGF0ZSh0aGlzLnZpc2libGVNb250aC55ZWFyLCB0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgMSk7XG4gICAgICAgIGQuc2V0TW9udGgoZC5nZXRNb250aCgpICsgMSk7XG5cbiAgICAgICAgbGV0IHk6IG51bWJlciA9IGQuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgbGV0IG06IG51bWJlciA9IGQuZ2V0TW9udGgoKSArIDE7XG5cbiAgICAgICAgdGhpcy52aXNpYmxlTW9udGggPSB7bW9udGhUeHQ6IHRoaXMubW9udGhUZXh0KG0pLCBtb250aE5icjogbSwgeWVhcjogeX07XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihtLCB5LCB0cnVlKTtcbiAgICB9XG5cbiAgICBvblByZXZZZWFyKCk6IHZvaWQge1xuICAgICAgICAvLyBQcmV2aW91cyB5ZWFyIGZyb20gY2FsZW5kYXJcbiAgICAgICAgdGhpcy52aXNpYmxlTW9udGgueWVhci0tO1xuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIodGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIsIHRoaXMudmlzaWJsZU1vbnRoLnllYXIsIHRydWUpO1xuICAgIH1cblxuICAgIG9uTmV4dFllYXIoKTogdm9pZCB7XG4gICAgICAgIC8vIE5leHQgeWVhciBmcm9tIGNhbGVuZGFyXG4gICAgICAgIHRoaXMudmlzaWJsZU1vbnRoLnllYXIrKztcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCB0aGlzLnZpc2libGVNb250aC55ZWFyLCB0cnVlKTtcbiAgICB9XG5cbiAgICBvblRvZGF5Q2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgLy8gVG9kYXkgYnV0dG9uIGNsaWNrZWRcbiAgICAgICAgbGV0IHRvZGF5OiBJTXlEYXRlID0gdGhpcy5nZXRUb2RheSgpO1xuICAgICAgICB0aGlzLnNlbGVjdERhdGUodG9kYXksIENhbFRvZ2dsZS5DbG9zZUJ5RGF0ZVNlbCk7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuaW5saW5lICYmIHRvZGF5LnllYXIgIT09IHRoaXMudmlzaWJsZU1vbnRoLnllYXIgfHwgdG9kYXkubW9udGggIT09IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2libGVNb250aCA9IHttb250aFR4dDogdGhpcy5vcHRzLm1vbnRoTGFiZWxzW3RvZGF5Lm1vbnRoXSwgbW9udGhOYnI6IHRvZGF5Lm1vbnRoLCB5ZWFyOiB0b2RheS55ZWFyfTtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcih0b2RheS5tb250aCwgdG9kYXkueWVhciwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNlbGxDbGlja2VkKGNlbGw6IGFueSk6IHZvaWQge1xuICAgICAgICAvLyBDZWxsIGNsaWNrZWQgb24gdGhlIGNhbGVuZGFyXG4gICAgICAgIGlmIChjZWxsLmNtbyA9PT0gdGhpcy5wcmV2TW9udGhJZCkge1xuICAgICAgICAgICAgLy8gUHJldmlvdXMgbW9udGggZGF5XG4gICAgICAgICAgICB0aGlzLm9uUHJldk1vbnRoKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0cy5hbGxvd1NlbGVjdGlvbk9ubHlJbkN1cnJlbnRNb250aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShjZWxsLmRhdGVPYmosIENhbFRvZ2dsZS5DbG9zZUJ5RGF0ZVNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2VsbC5jbW8gPT09IHRoaXMuY3Vyck1vbnRoSWQpIHtcbiAgICAgICAgICAgIC8vIEN1cnJlbnQgbW9udGggZGF5IC0gaWYgZGF0ZSBpcyBhbHJlYWR5IHNlbGVjdGVkIGNsZWFyIGl0XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmFsbG93RGVzZWxlY3REYXRlICYmIHRoaXMudXRpbFNlcnZpY2UuaXNTYW1lRGF0ZShjZWxsLmRhdGVPYmosIHRoaXMuc2VsZWN0ZWREYXRlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoY2VsbC5kYXRlT2JqLCBDYWxUb2dnbGUuQ2xvc2VCeURhdGVTZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNlbGwuY21vID09PSB0aGlzLm5leHRNb250aElkKSB7XG4gICAgICAgICAgICAvLyBOZXh0IG1vbnRoIGRheVxuICAgICAgICAgICAgdGhpcy5vbk5leHRNb250aCgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMuYWxsb3dTZWxlY3Rpb25Pbmx5SW5DdXJyZW50TW9udGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoY2VsbC5kYXRlT2JqLCBDYWxUb2dnbGUuQ2xvc2VCeURhdGVTZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRNb250aFllYXJTZWxlY3QoKTtcbiAgICB9XG5cbiAgICBvbkNlbGxLZXlEb3duKGV2ZW50OiBhbnksIGNlbGw6IGFueSkge1xuICAgICAgICAvLyBDZWxsIGtleWJvYXJkIGhhbmRsaW5nXG4gICAgICAgIGlmICgoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5lbnRlciB8fCBldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLnNwYWNlKSAmJiAhY2VsbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMub25DZWxsQ2xpY2tlZChjZWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyRGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gQ2xlYXJzIHRoZSBkYXRlXG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZVZhbHVlKHt5ZWFyOiAwLCBtb250aDogMCwgZGF5OiAwfSk7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXNUb0lucHV0Qm94KCk7XG4gICAgfVxuXG4gICAgZGVjcmVhc2VJbmNyZWFzZURhdGUoZGVjcmVhc2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgLy8gRGVjcmVhc2VzIG9yIGluY3JlYXNlcyB0aGUgZGF0ZSBkZXBlbmRpbmcgb24gdGhlIHBhcmFtZXRlclxuICAgICAgICBsZXQgZGF0ZTogSU15RGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlO1xuICAgICAgICBpZiAodGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgbGV0IGQ6IERhdGUgPSB0aGlzLmdldERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XG4gICAgICAgICAgICBkLnNldERhdGUoZGVjcmVhc2UgPyBkLmdldERhdGUoKSAtIDEgOiBkLmdldERhdGUoKSArIDEpO1xuICAgICAgICAgICAgZGF0ZSA9IHt5ZWFyOiBkLmdldEZ1bGxZZWFyKCksIG1vbnRoOiBkLmdldE1vbnRoKCkgKyAxLCBkYXk6IGQuZ2V0RGF0ZSgpfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLmdldFRvZGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3REYXRlKGRhdGUsIENhbFRvZ2dsZS5DbG9zZUJ5Q2FsQnRuKTtcbiAgICB9XG5cbiAgICBzZWxlY3REYXRlKGRhdGU6IElNeURhdGUsIGNsb3NlUmVhc29uOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlVmFsdWUoZGF0ZSk7XG4gICAgICAgIGlmICh0aGlzLnNob3dTZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KGNsb3NlUmVhc29uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlR2xvYmFsTGlzdGVuZXIoKTtcblxuICAgICAgICB0aGlzLnNob3dTZWxlY3RvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldEZvY3VzVG9JbnB1dEJveCgpO1xuICAgIH1cblxuICAgIHNldEZvY3VzVG9JbnB1dEJveCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdHMuaW5saW5lICYmIHRoaXMub3B0cy5zaG93SW5wdXRGaWVsZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEJveEVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVEYXRlVmFsdWUoZGF0ZTogSU15RGF0ZSk6IHZvaWQge1xuICAgICAgICBsZXQgY2xlYXI6IGJvb2xlYW4gPSAhdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShkYXRlKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGU7XG4gICAgICAgIHRoaXMuZW1pdERhdGVDaGFuZ2VkKGRhdGUpO1xuXG4gICAgICAgIGlmICghdGhpcy5vcHRzLmlubGluZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25EYXlUeHQgPSBjbGVhciA/IFwiXCIgOiB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUoZGF0ZSwgdGhpcy5vcHRzLmRhdGVGb3JtYXQsIHRoaXMub3B0cy5tb250aExhYmVscyk7XG4gICAgICAgICAgICB0aGlzLmlucHV0RmllbGRDaGFuZ2VkLmVtaXQoe3ZhbHVlOiB0aGlzLnNlbGVjdGlvbkRheVR4dCwgZGF0ZUZvcm1hdDogdGhpcy5vcHRzLmRhdGVGb3JtYXQsIHZhbGlkOiAhY2xlYXJ9KTtcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZERhdGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVtaXREYXRlQ2hhbmdlZChkYXRlOiBJTXlEYXRlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICBsZXQgZGF0ZU1vZGVsOiBJTXlEYXRlTW9kZWwgPSB0aGlzLmdldERhdGVNb2RlbChkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUNoYW5nZWQuZW1pdChkYXRlTW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUNiKGRhdGVNb2RlbCk7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENiKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVDaGFuZ2VkLmVtaXQoe2RhdGU6IGRhdGUsIGpzZGF0ZTogbnVsbCwgZm9ybWF0dGVkOiBcIlwiLCBlcG9jOiAwfSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2IobnVsbCk7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZENiKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREYXRlTW9kZWwoZGF0ZTogSU15RGF0ZSk6IElNeURhdGVNb2RlbCB7XG4gICAgICAgIC8vIENyZWF0ZXMgYSBkYXRlIG1vZGVsIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBwYXJhbWV0ZXJcbiAgICAgICAgcmV0dXJuIHtkYXRlOiBkYXRlLCBqc2RhdGU6IHRoaXMuZ2V0RGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KSwgZm9ybWF0dGVkOiB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUoZGF0ZSwgdGhpcy5vcHRzLmRhdGVGb3JtYXQsIHRoaXMub3B0cy5tb250aExhYmVscyksIGVwb2M6IE1hdGgucm91bmQodGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZSkgLyAxMDAwLjApfTtcbiAgICB9XG5cbiAgICBtb250aFRleHQobTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgLy8gUmV0dXJucyBtb250aCBhcyBhIHRleHRcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0cy5tb250aExhYmVsc1ttXTtcbiAgICB9XG5cbiAgICBtb250aFN0YXJ0SWR4KHk6IG51bWJlciwgbTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgLy8gTW9udGggc3RhcnQgaW5kZXhcbiAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkLnNldERhdGUoMSk7XG4gICAgICAgIGQuc2V0TW9udGgobSAtIDEpO1xuICAgICAgICBkLnNldEZ1bGxZZWFyKHkpO1xuICAgICAgICBsZXQgaWR4ID0gZC5nZXREYXkoKSArIHRoaXMuc3VuZGF5SWR4KCk7XG4gICAgICAgIHJldHVybiBpZHggPj0gNyA/IGlkeCAtIDcgOiBpZHg7XG4gICAgfVxuXG4gICAgZGF5c0luTW9udGgobTogbnVtYmVyLCB5OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICAvLyBSZXR1cm4gbnVtYmVyIG9mIGRheXMgb2YgY3VycmVudCBtb250aFxuICAgICAgICByZXR1cm4gbmV3IERhdGUoeSwgbSwgMCkuZ2V0RGF0ZSgpO1xuICAgIH1cblxuICAgIGRheXNJblByZXZNb250aChtOiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIC8vIFJldHVybiBudW1iZXIgb2YgZGF5cyBvZiB0aGUgcHJldmlvdXMgbW9udGhcbiAgICAgICAgbGV0IGQ6IERhdGUgPSB0aGlzLmdldERhdGUoeSwgbSwgMSk7XG4gICAgICAgIGQuc2V0TW9udGgoZC5nZXRNb250aCgpIC0gMSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRheXNJbk1vbnRoKGQuZ2V0TW9udGgoKSArIDEsIGQuZ2V0RnVsbFllYXIoKSk7XG4gICAgfVxuXG4gICAgaXNDdXJyRGF5KGQ6IG51bWJlciwgbTogbnVtYmVyLCB5OiBudW1iZXIsIGNtbzogbnVtYmVyLCB0b2RheTogSU15RGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBDaGVjayBpcyBhIGdpdmVuIGRhdGUgdGhlIHRvZGF5XG4gICAgICAgIHJldHVybiBkID09PSB0b2RheS5kYXkgJiYgbSA9PT0gdG9kYXkubW9udGggJiYgeSA9PT0gdG9kYXkueWVhciAmJiBjbW8gPT09IHRoaXMuY3Vyck1vbnRoSWQ7XG4gICAgfVxuXG4gICAgZ2V0VG9kYXkoKTogSU15RGF0ZSB7XG4gICAgICAgIGxldCBkYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksIG1vbnRoOiBkYXRlLmdldE1vbnRoKCkgKyAxLCBkYXk6IGRhdGUuZ2V0RGF0ZSgpfTtcbiAgICB9XG5cbiAgICBnZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZTogSU15RGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSkuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIGdldFdlZWtkYXkoZGF0ZTogSU15RGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIC8vIEdldCB3ZWVrZGF5OiBzdSwgbW8sIHR1LCB3ZSAuLi5cbiAgICAgICAgbGV0IHdlZWtEYXlzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy51dGlsU2VydmljZS5nZXRXZWVrRGF5cygpO1xuICAgICAgICByZXR1cm4gd2Vla0RheXNbdGhpcy51dGlsU2VydmljZS5nZXREYXlOdW1iZXIoZGF0ZSldO1xuICAgIH1cblxuICAgIGdldERhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk6IG51bWJlcik6IERhdGUge1xuICAgICAgICAvLyBDcmVhdGVzIGEgZGF0ZSBvYmplY3QgZnJvbSBnaXZlbiB5ZWFyLCBtb250aCBhbmQgZGF5XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSwgMCwgMCwgMCwgMCk7XG4gICAgfVxuXG4gICAgc3VuZGF5SWR4KCk6IG51bWJlciB7XG4gICAgICAgIC8vIEluZGV4IG9mIFN1bmRheSBkYXlcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5SWR4ID4gMCA/IDcgLSB0aGlzLmRheUlkeCA6IDA7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVDYWxlbmRhcihtOiBudW1iZXIsIHk6IG51bWJlciwgbm90aWZ5Q2hhbmdlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0ZXMubGVuZ3RoID0gMDtcbiAgICAgICAgbGV0IHRvZGF5OiBJTXlEYXRlID0gdGhpcy5nZXRUb2RheSgpO1xuICAgICAgICBsZXQgbW9udGhTdGFydDogbnVtYmVyID0gdGhpcy5tb250aFN0YXJ0SWR4KHksIG0pO1xuICAgICAgICBsZXQgZEluVGhpc006IG51bWJlciA9IHRoaXMuZGF5c0luTW9udGgobSwgeSk7XG4gICAgICAgIGxldCBkSW5QcmV2TTogbnVtYmVyID0gdGhpcy5kYXlzSW5QcmV2TW9udGgobSwgeSk7XG5cbiAgICAgICAgbGV0IGRheU5icjogbnVtYmVyID0gMTtcbiAgICAgICAgbGV0IGNtbzogbnVtYmVyID0gdGhpcy5wcmV2TW9udGhJZDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3ZWVrOiBBcnJheTxJTXlDYWxlbmRhckRheT4gPSBbXTtcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gRmlyc3Qgd2Vla1xuICAgICAgICAgICAgICAgIGxldCBwbSA9IGRJblByZXZNIC0gbW9udGhTdGFydCArIDE7XG4gICAgICAgICAgICAgICAgLy8gUHJldmlvdXMgbW9udGhcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gcG07IGogPD0gZEluUHJldk07IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZTogSU15RGF0ZSA9IHt5ZWFyOiBtID09PSAxID8geSAtIDEgOiB5LCBtb250aDogbSA9PT0gMSA/IDEyIDogbSAtIDEsIGRheTogan07XG4gICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF0ZU9iajogZGF0ZSwgY21vOiBjbW8sIGN1cnJEYXk6IHRoaXMuaXNDdXJyRGF5KGosIG0sIHksIGNtbywgdG9kYXkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZERheShkYXRlLCB0aGlzLm9wdHMubWluWWVhciwgdGhpcy5vcHRzLm1heFllYXIsIHRoaXMub3B0cy5kaXNhYmxlVW50aWwsIHRoaXMub3B0cy5kaXNhYmxlU2luY2UsIHRoaXMub3B0cy5kaXNhYmxlV2Vla2VuZHMsIHRoaXMub3B0cy5kaXNhYmxlV2Vla2RheXMsIHRoaXMub3B0cy5kaXNhYmxlRGF5cywgdGhpcy5vcHRzLmRpc2FibGVEYXRlUmFuZ2VzLCB0aGlzLm9wdHMuZW5hYmxlRGF5cyksXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLmlzTWFya2VkRGF0ZShkYXRlLCB0aGlzLm9wdHMubWFya0RhdGVzLCB0aGlzLm9wdHMubWFya1dlZWtlbmRzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogdGhpcy51dGlsU2VydmljZS5pc0hpZ2hsaWdodGVkRGF0ZShkYXRlLCB0aGlzLm9wdHMuc3VuSGlnaGxpZ2h0LCB0aGlzLm9wdHMuc2F0SGlnaGxpZ2h0LCB0aGlzLm9wdHMuaGlnaGxpZ2h0RGF0ZXMpfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY21vID0gdGhpcy5jdXJyTW9udGhJZDtcbiAgICAgICAgICAgICAgICAvLyBDdXJyZW50IG1vbnRoXG4gICAgICAgICAgICAgICAgbGV0IGRheXNMZWZ0OiBudW1iZXIgPSA3IC0gd2Vlay5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXlzTGVmdDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlOiBJTXlEYXRlID0ge3llYXI6IHksIG1vbnRoOiBtLCBkYXk6IGRheU5icn07XG4gICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF0ZU9iajogZGF0ZSwgY21vOiBjbW8sIGN1cnJEYXk6IHRoaXMuaXNDdXJyRGF5KGRheU5iciwgbSwgeSwgY21vLCB0b2RheSksXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkRGF5KGRhdGUsIHRoaXMub3B0cy5taW5ZZWFyLCB0aGlzLm9wdHMubWF4WWVhciwgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCwgdGhpcy5vcHRzLmRpc2FibGVTaW5jZSwgdGhpcy5vcHRzLmRpc2FibGVXZWVrZW5kcywgdGhpcy5vcHRzLmRpc2FibGVXZWVrZGF5cywgdGhpcy5vcHRzLmRpc2FibGVEYXlzLCB0aGlzLm9wdHMuZGlzYWJsZURhdGVSYW5nZXMsIHRoaXMub3B0cy5lbmFibGVEYXlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERhdGU6IHRoaXMudXRpbFNlcnZpY2UuaXNNYXJrZWREYXRlKGRhdGUsIHRoaXMub3B0cy5tYXJrRGF0ZXMsIHRoaXMub3B0cy5tYXJrV2Vla2VuZHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiB0aGlzLnV0aWxTZXJ2aWNlLmlzSGlnaGxpZ2h0ZWREYXRlKGRhdGUsIHRoaXMub3B0cy5zdW5IaWdobGlnaHQsIHRoaXMub3B0cy5zYXRIaWdobGlnaHQsIHRoaXMub3B0cy5oaWdobGlnaHREYXRlcyl9KTtcbiAgICAgICAgICAgICAgICAgICAgZGF5TmJyKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmVzdCBvZiB0aGUgd2Vla3NcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5TmJyID4gZEluVGhpc00pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5leHQgbW9udGhcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU5iciA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbW8gPSB0aGlzLm5leHRNb250aElkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlOiBJTXlEYXRlID0ge3llYXI6IGNtbyA9PT0gdGhpcy5uZXh0TW9udGhJZCAmJiBtID09PSAxMiA/IHkgKyAxIDogeSwgbW9udGg6IGNtbyA9PT0gdGhpcy5jdXJyTW9udGhJZCA/IG0gOiBjbW8gPT09IHRoaXMubmV4dE1vbnRoSWQgJiYgbSA8IDEyID8gbSArIDEgOiAxLCBkYXk6IGRheU5icn07XG4gICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF0ZU9iajogZGF0ZSwgY21vOiBjbW8sIGN1cnJEYXk6IHRoaXMuaXNDdXJyRGF5KGRheU5iciwgbSwgeSwgY21vLCB0b2RheSksXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkRGF5KGRhdGUsIHRoaXMub3B0cy5taW5ZZWFyLCB0aGlzLm9wdHMubWF4WWVhciwgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCwgdGhpcy5vcHRzLmRpc2FibGVTaW5jZSwgdGhpcy5vcHRzLmRpc2FibGVXZWVrZW5kcywgdGhpcy5vcHRzLmRpc2FibGVXZWVrZGF5cywgdGhpcy5vcHRzLmRpc2FibGVEYXlzLCB0aGlzLm9wdHMuZGlzYWJsZURhdGVSYW5nZXMsIHRoaXMub3B0cy5lbmFibGVEYXlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERhdGU6IHRoaXMudXRpbFNlcnZpY2UuaXNNYXJrZWREYXRlKGRhdGUsIHRoaXMub3B0cy5tYXJrRGF0ZXMsIHRoaXMub3B0cy5tYXJrV2Vla2VuZHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiB0aGlzLnV0aWxTZXJ2aWNlLmlzSGlnaGxpZ2h0ZWREYXRlKGRhdGUsIHRoaXMub3B0cy5zdW5IaWdobGlnaHQsIHRoaXMub3B0cy5zYXRIaWdobGlnaHQsIHRoaXMub3B0cy5oaWdobGlnaHREYXRlcyl9KTtcbiAgICAgICAgICAgICAgICAgICAgZGF5TmJyKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHdlZWtOYnI6IG51bWJlciA9IHRoaXMub3B0cy5zaG93V2Vla051bWJlcnMgICYmIHRoaXMub3B0cy5maXJzdERheU9mV2VlayA9PT0gXCJtb1wiID8gdGhpcy51dGlsU2VydmljZS5nZXRXZWVrTnVtYmVyKHdlZWtbMF0uZGF0ZU9iaikgOiAwO1xuICAgICAgICAgICAgdGhpcy5kYXRlcy5wdXNoKHt3ZWVrOiB3ZWVrLCB3ZWVrTmJyOiB3ZWVrTmJyfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEhlYWRlckJ0bkRpc2FibGVkU3RhdGUobSwgeSk7XG5cbiAgICAgICAgaWYgKG5vdGlmeUNoYW5nZSkge1xuICAgICAgICAgICAgLy8gTm90aWZ5IHBhcmVudFxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhclZpZXdDaGFuZ2VkLmVtaXQoe3llYXI6IHksIG1vbnRoOiBtLCBmaXJzdDoge251bWJlcjogMSwgd2Vla2RheTogdGhpcy5nZXRXZWVrZGF5KHt5ZWFyOiB5LCBtb250aDogbSwgZGF5OiAxfSl9LCBsYXN0OiB7bnVtYmVyOiBkSW5UaGlzTSwgd2Vla2RheTogdGhpcy5nZXRXZWVrZGF5KHt5ZWFyOiB5LCBtb250aDogbSwgZGF5OiBkSW5UaGlzTX0pfX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFyc2VTZWxlY3RlZERhdGUoc2VsRGF0ZTogYW55KTogSU15RGF0ZSB7XG4gICAgICAgIC8vIFBhcnNlIGRhdGUgdmFsdWUgLSBpdCBjYW4gYmUgc3RyaW5nIG9yIElNeURhdGUgb2JqZWN0XG4gICAgICAgIGxldCBkYXRlOiBJTXlEYXRlID0ge2RheTogMCwgbW9udGg6IDAsIHllYXI6IDB9O1xuICAgICAgICBpZiAodHlwZW9mIHNlbERhdGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGxldCBzZDogc3RyaW5nID0gPHN0cmluZz4gc2VsRGF0ZTtcbiAgICAgICAgICAgIGxldCBkZjogc3RyaW5nID0gdGhpcy5vcHRzLmRhdGVGb3JtYXQ7XG5cbiAgICAgICAgICAgIGxldCBkZWxpbWV0ZXJzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy51dGlsU2VydmljZS5nZXREYXRlRm9ybWF0RGVsaW1ldGVycyhkZik7XG4gICAgICAgICAgICBsZXQgZGF0ZVZhbHVlOiBBcnJheTxJTXlEYXRlRm9ybWF0PiA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF0ZVZhbHVlKHNkLCBkZiwgZGVsaW1ldGVycyk7XG4gICAgICAgICAgICBkYXRlLnllYXIgPSB0aGlzLnV0aWxTZXJ2aWNlLmdldE51bWJlckJ5VmFsdWUoZGF0ZVZhbHVlWzBdKTtcbiAgICAgICAgICAgIGRhdGUubW9udGggPSBkZi5pbmRleE9mKE1NTSkgIT09IC0xID8gdGhpcy51dGlsU2VydmljZS5nZXRNb250aE51bWJlckJ5TW9udGhOYW1lKGRhdGVWYWx1ZVsxXSwgdGhpcy5vcHRzLm1vbnRoTGFiZWxzKSA6IHRoaXMudXRpbFNlcnZpY2UuZ2V0TnVtYmVyQnlWYWx1ZShkYXRlVmFsdWVbMV0pO1xuICAgICAgICAgICAgZGF0ZS5kYXkgID0gdGhpcy51dGlsU2VydmljZS5nZXROdW1iZXJCeVZhbHVlKGRhdGVWYWx1ZVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNlbERhdGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGRhdGUgPSBzZWxEYXRlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRGF5VHh0ID0gdGhpcy51dGlsU2VydmljZS5mb3JtYXREYXRlKGRhdGUsIHRoaXMub3B0cy5kYXRlRm9ybWF0LCB0aGlzLm9wdHMubW9udGhMYWJlbHMpO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBqc0RhdGVUb015RGF0ZShkYXRlOiBEYXRlKTogSU15RGF0ZSB7XG4gICAgICAgIHJldHVybiB7eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aDogZGF0ZS5nZXRNb250aCgpICsgMSwgZGF5OiBkYXRlLmdldERhdGUoKX07XG4gICAgfVxuXG4gICAgcGFyc2VTZWxlY3RlZE1vbnRoKG1zOiBzdHJpbmcpOiBJTXlNb250aCB7XG4gICAgICAgIHJldHVybiB0aGlzLnV0aWxTZXJ2aWNlLnBhcnNlRGVmYXVsdE1vbnRoKG1zKTtcbiAgICB9XG5cbiAgICBzZXRIZWFkZXJCdG5EaXNhYmxlZFN0YXRlKG06IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBkcG06IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgbGV0IGRweTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBsZXQgZG5tOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGxldCBkbnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5kaXNhYmxlSGVhZGVyQnV0dG9ucykge1xuICAgICAgICAgICAgZHBtID0gdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVVbnRpbCh7eWVhcjogbSA9PT0gMSA/IHkgLSAxIDogeSwgbW9udGg6IG0gPT09IDEgPyAxMiA6IG0gLSAxLCBkYXk6IHRoaXMuZGF5c0luTW9udGgobSA9PT0gMSA/IDEyIDogbSAtIDEsIG0gPT09IDEgPyB5IC0gMSA6IHkpfSwgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCk7XG4gICAgICAgICAgICBkcHkgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzTW9udGhEaXNhYmxlZEJ5RGlzYWJsZVVudGlsKHt5ZWFyOiB5IC0gMSwgbW9udGg6IG0sIGRheTogdGhpcy5kYXlzSW5Nb250aChtLCB5IC0gMSl9LCB0aGlzLm9wdHMuZGlzYWJsZVVudGlsKTtcbiAgICAgICAgICAgIGRubSA9IHRoaXMudXRpbFNlcnZpY2UuaXNNb250aERpc2FibGVkQnlEaXNhYmxlU2luY2Uoe3llYXI6IG0gPT09IDEyID8geSArIDEgOiB5LCBtb250aDogbSA9PT0gMTIgPyAxIDogbSArIDEsIGRheTogMX0sIHRoaXMub3B0cy5kaXNhYmxlU2luY2UpO1xuICAgICAgICAgICAgZG55ID0gdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVTaW5jZSh7eWVhcjogeSArIDEsIG1vbnRoOiBtLCBkYXk6IDF9LCB0aGlzLm9wdHMuZGlzYWJsZVNpbmNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXZNb250aERpc2FibGVkID0gbSA9PT0gMSAmJiB5ID09PSB0aGlzLm9wdHMubWluWWVhciB8fCBkcG07XG4gICAgICAgIHRoaXMucHJldlllYXJEaXNhYmxlZCA9IHkgLSAxIDwgdGhpcy5vcHRzLm1pblllYXIgfHwgZHB5O1xuICAgICAgICB0aGlzLm5leHRNb250aERpc2FibGVkID0gbSA9PT0gMTIgJiYgeSA9PT0gdGhpcy5vcHRzLm1heFllYXIgfHwgZG5tO1xuICAgICAgICB0aGlzLm5leHRZZWFyRGlzYWJsZWQgPSB5ICsgMSA+IHRoaXMub3B0cy5tYXhZZWFyIHx8IGRueTtcbiAgICB9XG59XG4iXX0=