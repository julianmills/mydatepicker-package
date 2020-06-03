import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, ViewEncapsulation, ChangeDetectorRef, ViewChild, forwardRef, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { LocaleService } from "./services/mydatepicker.locale.service";
import { UtilService } from "./services/mydatepicker.util.service";
export const MYDP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MyDatePicker),
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
const MMM = "mmm";
let MyDatePicker = class MyDatePicker {
    constructor(elem, cdr, localeService, utilService) {
        this.elem = elem;
        this.cdr = cdr;
        this.localeService = localeService;
        this.utilService = utilService;
        this.dateChanged = new EventEmitter();
        this.inputFieldChanged = new EventEmitter();
        this.calendarViewChanged = new EventEmitter();
        this.calendarToggle = new EventEmitter();
        this.inputFocusBlur = new EventEmitter();
        this.onChangeCb = () => { };
        this.onTouchedCb = () => { };
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
        this.onClickListener = (evt) => this.onClickDocument(evt);
        this.setLocaleOptions();
    }
    setLocaleOptions() {
        let opts = this.localeService.getLocaleOptions(this.locale);
        Object.keys(opts).forEach((k) => {
            this.opts[k] = opts[k];
        });
    }
    setOptions() {
        if (this.options !== undefined) {
            Object.keys(this.options).forEach((k) => {
                this.opts[k] = this.options[k];
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
    }
    getSelectorTopPosition() {
        if (this.opts.openSelectorTopOfInput) {
            return this.elem.nativeElement.children[0].offsetHeight + "px";
        }
    }
    resetMonthYearSelect() {
        this.selectMonth = false;
        this.selectYear = false;
    }
    onSelectMonthClicked(event) {
        event.stopPropagation();
        this.selectMonth = !this.selectMonth;
        this.selectYear = false;
        this.cdr.detectChanges();
        if (this.selectMonth) {
            let today = this.getToday();
            this.months.length = 0;
            for (let i = 1; i <= 12; i += 3) {
                let row = [];
                for (let j = i; j < i + 3; j++) {
                    let disabled = this.utilService.isMonthDisabledByDisableUntil({ year: this.visibleMonth.year, month: j, day: this.daysInMonth(j, this.visibleMonth.year) }, this.opts.disableUntil)
                        || this.utilService.isMonthDisabledByDisableSince({ year: this.visibleMonth.year, month: j, day: 1 }, this.opts.disableSince);
                    row.push({ nbr: j, name: this.opts.monthLabels[j], currMonth: j === today.month && this.visibleMonth.year === today.year, selected: j === this.visibleMonth.monthNbr, disabled: disabled });
                }
                this.months.push(row);
            }
        }
    }
    onMonthCellClicked(cell) {
        let mc = cell.nbr !== this.visibleMonth.monthNbr;
        this.visibleMonth = { monthTxt: this.monthText(cell.nbr), monthNbr: cell.nbr, year: this.visibleMonth.year };
        this.generateCalendar(cell.nbr, this.visibleMonth.year, mc);
        this.selectMonth = false;
        this.selectorEl.nativeElement.focus();
    }
    onMonthCellKeyDown(event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onMonthCellClicked(cell);
        }
    }
    onSelectYearClicked(event) {
        event.stopPropagation();
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.cdr.detectChanges();
        if (this.selectYear) {
            this.generateYears(Number(this.visibleMonth.year));
        }
    }
    onYearCellClicked(cell) {
        let yc = cell.year !== this.visibleMonth.year;
        this.visibleMonth = { monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: cell.year };
        this.generateCalendar(this.visibleMonth.monthNbr, cell.year, yc);
        this.selectYear = false;
        this.selectorEl.nativeElement.focus();
    }
    onYearCellKeyDown(event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onYearCellClicked(cell);
        }
    }
    onPrevYears(event, year) {
        event.stopPropagation();
        this.generateYears(Number(year) - 25);
    }
    onNextYears(event, year) {
        event.stopPropagation();
        this.generateYears(Number(year) + 25);
    }
    generateYears(year) {
        this.years.length = 0;
        let today = this.getToday();
        for (let i = year; i <= 20 + year; i += 5) {
            let row = [];
            for (let j = i; j < i + 5; j++) {
                let disabled = this.utilService.isMonthDisabledByDisableUntil({ year: j, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, j) }, this.opts.disableUntil)
                    || this.utilService.isMonthDisabledByDisableSince({ year: j, month: this.visibleMonth.monthNbr, day: 1 }, this.opts.disableSince);
                let minMax = j < this.opts.minYear || j > this.opts.maxYear;
                row.push({ year: j, currYear: j === today.year, selected: j === this.visibleMonth.year, disabled: disabled || minMax });
            }
            this.years.push(row);
        }
        this.prevYearsDisabled = this.years[0][0].year <= this.opts.minYear || this.utilService.isMonthDisabledByDisableUntil({ year: this.years[0][0].year - 1, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, this.years[0][0].year - 1) }, this.opts.disableUntil);
        this.nextYearsDisabled = this.years[4][4].year >= this.opts.maxYear || this.utilService.isMonthDisabledByDisableSince({ year: this.years[4][4].year + 1, month: this.visibleMonth.monthNbr, day: 1 }, this.opts.disableSince);
    }
    onUserDateInput(value) {
        if (value.length === 0) {
            if (this.utilService.isInitializedDate(this.selectedDate)) {
                this.clearDate();
            }
            else {
                this.invalidInputFieldChanged(value);
            }
        }
        else {
            let date = this.utilService.isDateValid(value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDays);
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
    }
    onFocusInput(event) {
        this.inputFocusBlur.emit({ reason: InputFocusBlur.focus, value: event.target.value });
    }
    onBlurInput(event) {
        this.selectionDayTxt = event.target.value;
        this.onTouchedCb();
        this.inputFocusBlur.emit({ reason: InputFocusBlur.blur, value: event.target.value });
    }
    onCloseSelector(event) {
        if (event.keyCode === KeyCode.esc && this.showSelector && !this.opts.inline) {
            this.removeGlobalListener();
            this.calendarToggle.emit(CalToggle.CloseByEsc);
            this.showSelector = false;
        }
    }
    invalidInputFieldChanged(value) {
        this.invalidDate = value.length > 0;
        this.inputFieldChanged.emit({ value: value, dateFormat: this.opts.dateFormat, valid: false });
        this.onChangeCb(null);
        this.onTouchedCb();
    }
    isTodayDisabled() {
        this.disableTodayBtn = this.utilService.isDisabledDay(this.getToday(), this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays);
    }
    parseOptions() {
        if (this.locale) {
            this.setLocaleOptions();
        }
        this.setOptions();
        let weekDays = this.utilService.getWeekDays();
        this.isTodayDisabled();
        this.dayIdx = weekDays.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx = this.dayIdx;
            for (let i = 0; i < weekDays.length; i++) {
                this.weekDays.push(this.opts.dayLabels[weekDays[idx]]);
                idx = weekDays[idx] === "sa" ? 0 : idx + 1;
            }
        }
    }
    writeValue(value) {
        if (value && (value["date"] || value["jsdate"] || value["formatted"])) {
            this.selectedDate = value["date"] ? this.parseSelectedDate(value["date"]) : value["jsdate"] ? this.parseSelectedDate(this.jsDateToMyDate(value["jsdate"])) : this.parseSelectedDate(value["formatted"]);
            let cvc = this.visibleMonth.year !== this.selectedDate.year || this.visibleMonth.monthNbr !== this.selectedDate.month;
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
    }
    setDisabledState(disabled) {
        this.opts.componentDisabled = disabled;
        this.cdr.detectChanges();
    }
    registerOnChange(fn) {
        this.onChangeCb = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCb = fn;
    }
    ngOnDestroy() {
        this.removeGlobalListener();
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty("selector")) {
            let s = changes["selector"].currentValue;
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
        let dmChange = false;
        if (changes.hasOwnProperty("defaultMonth")) {
            let dm = changes["defaultMonth"].currentValue;
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
            let sd = changes["selDate"];
            if (sd.currentValue !== null && sd.currentValue !== undefined && sd.currentValue !== "" && Object.keys(sd.currentValue).length !== 0) {
                this.selectedDate = this.parseSelectedDate(sd.currentValue);
                setTimeout(() => {
                    this.onChangeCb(this.getDateModel(this.selectedDate));
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
    }
    removeBtnClicked() {
        // Remove date button clicked
        this.clearDate();
        if (this.showSelector) {
            this.calendarToggle.emit(CalToggle.CloseByCalBtn);
            this.removeGlobalListener();
        }
        this.showSelector = false;
    }
    onDecreaseBtnClicked() {
        // Decrease date button clicked
        this.decreaseIncreaseDate(true);
    }
    onIncreaseBtnClicked() {
        // Increase date button clicked
        this.decreaseIncreaseDate(false);
    }
    openBtnClicked() {
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
    }
    addGlobalListener() {
        document.addEventListener("click", this.onClickListener);
    }
    removeGlobalListener() {
        document.removeEventListener("click", this.onClickListener);
    }
    onClickDocument(evt) {
        if (this.showSelector && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
            this.showSelector = false;
            this.cdr.detectChanges();
            this.calendarToggle.emit(CalToggle.CloseByOutClick);
            this.removeGlobalListener();
        }
        if (this.opts.monthSelector || this.opts.yearSelector) {
            this.resetMonthYearSelect();
        }
    }
    openSelector(reason) {
        this.addGlobalListener();
        this.setVisibleMonth();
        this.calendarToggle.emit(reason);
    }
    closeSelector(reason) {
        this.calendarToggle.emit(reason);
    }
    setVisibleMonth() {
        // Sets visible month of calendar
        let y = 0, m = 0;
        if (!this.utilService.isInitializedDate(this.selectedDate)) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                let today = this.getToday();
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
    }
    onPrevMonth() {
        // Previous month from calendar
        let d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);
        let y = d.getFullYear();
        let m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    }
    onNextMonth() {
        // Next month from calendar
        let d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);
        let y = d.getFullYear();
        let m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    }
    onPrevYear() {
        // Previous year from calendar
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }
    onNextYear() {
        // Next year from calendar
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }
    onTodayClicked() {
        // Today button clicked
        let today = this.getToday();
        this.selectDate(today, CalToggle.CloseByDateSel);
        if (this.opts.inline && today.year !== this.visibleMonth.year || today.month !== this.visibleMonth.monthNbr) {
            this.visibleMonth = { monthTxt: this.opts.monthLabels[today.month], monthNbr: today.month, year: today.year };
            this.generateCalendar(today.month, today.year, true);
        }
    }
    onCellClicked(cell) {
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
    }
    onCellKeyDown(event, cell) {
        // Cell keyboard handling
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onCellClicked(cell);
        }
    }
    clearDate() {
        // Clears the date
        this.updateDateValue({ year: 0, month: 0, day: 0 });
        this.setFocusToInputBox();
    }
    decreaseIncreaseDate(decrease) {
        // Decreases or increases the date depending on the parameter
        let date = this.selectedDate;
        if (this.utilService.isInitializedDate(date)) {
            let d = this.getDate(date.year, date.month, date.day);
            d.setDate(decrease ? d.getDate() - 1 : d.getDate() + 1);
            date = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
        }
        else {
            date = this.getToday();
        }
        this.selectDate(date, CalToggle.CloseByCalBtn);
    }
    selectDate(date, closeReason) {
        this.updateDateValue(date);
        if (this.showSelector) {
            this.calendarToggle.emit(closeReason);
        }
        this.removeGlobalListener();
        this.showSelector = false;
        this.setFocusToInputBox();
    }
    setFocusToInputBox() {
        if (!this.opts.inline && this.opts.showInputField) {
            setTimeout(() => {
                this.inputBoxEl.nativeElement.focus();
            }, 100);
        }
    }
    updateDateValue(date) {
        let clear = !this.utilService.isInitializedDate(date);
        this.selectedDate = date;
        this.emitDateChanged(date);
        if (!this.opts.inline) {
            this.selectionDayTxt = clear ? "" : this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels);
            this.inputFieldChanged.emit({ value: this.selectionDayTxt, dateFormat: this.opts.dateFormat, valid: !clear });
            this.invalidDate = false;
        }
    }
    emitDateChanged(date) {
        if (this.utilService.isInitializedDate(date)) {
            let dateModel = this.getDateModel(date);
            this.dateChanged.emit(dateModel);
            this.onChangeCb(dateModel);
            this.onTouchedCb();
        }
        else {
            this.dateChanged.emit({ date: date, jsdate: null, formatted: "", epoc: 0 });
            this.onChangeCb(null);
            this.onTouchedCb();
        }
    }
    getDateModel(date) {
        // Creates a date model object from the given parameter
        return { date: date, jsdate: this.getDate(date.year, date.month, date.day), formatted: this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels), epoc: Math.round(this.getTimeInMilliseconds(date) / 1000.0) };
    }
    monthText(m) {
        // Returns month as a text
        return this.opts.monthLabels[m];
    }
    monthStartIdx(y, m) {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }
    daysInMonth(m, y) {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }
    daysInPrevMonth(m, y) {
        // Return number of days of the previous month
        let d = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    }
    isCurrDay(d, m, y, cmo, today) {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year && cmo === this.currMonthId;
    }
    getToday() {
        let date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    getTimeInMilliseconds(date) {
        return this.getDate(date.year, date.month, date.day).getTime();
    }
    getWeekday(date) {
        // Get weekday: su, mo, tu, we ...
        let weekDays = this.utilService.getWeekDays();
        return weekDays[this.utilService.getDayNumber(date)];
    }
    getDate(year, month, day) {
        // Creates a date object from given year, month and day
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }
    sundayIdx() {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }
    generateCalendar(m, y, notifyChange) {
        this.dates.length = 0;
        let today = this.getToday();
        let monthStart = this.monthStartIdx(y, m);
        let dInThisM = this.daysInMonth(m, y);
        let dInPrevM = this.daysInPrevMonth(m, y);
        let dayNbr = 1;
        let cmo = this.prevMonthId;
        for (let i = 1; i < 7; i++) {
            let week = [];
            if (i === 1) {
                // First week
                let pm = dInPrevM - monthStart + 1;
                // Previous month
                for (let j = pm; j <= dInPrevM; j++) {
                    let date = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                }
                cmo = this.currMonthId;
                // Current month
                let daysLeft = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let date = { year: y, month: m, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.nextMonthId;
                    }
                    let date = { year: cmo === this.nextMonthId && m === 12 ? y + 1 : y, month: cmo === this.currMonthId ? m : cmo === this.nextMonthId && m < 12 ? m + 1 : 1, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                    dayNbr++;
                }
            }
            let weekNbr = this.opts.showWeekNumbers && this.opts.firstDayOfWeek === "mo" ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({ week: week, weekNbr: weekNbr });
        }
        this.setHeaderBtnDisabledState(m, y);
        if (notifyChange) {
            // Notify parent
            this.calendarViewChanged.emit({ year: y, month: m, first: { number: 1, weekday: this.getWeekday({ year: y, month: m, day: 1 }) }, last: { number: dInThisM, weekday: this.getWeekday({ year: y, month: m, day: dInThisM }) } });
        }
    }
    parseSelectedDate(selDate) {
        // Parse date value - it can be string or IMyDate object
        let date = { day: 0, month: 0, year: 0 };
        if (typeof selDate === "string") {
            let sd = selDate;
            let df = this.opts.dateFormat;
            let delimeters = this.utilService.getDateFormatDelimeters(df);
            let dateValue = this.utilService.getDateValue(sd, df, delimeters);
            date.year = this.utilService.getNumberByValue(dateValue[0]);
            date.month = df.indexOf(MMM) !== -1 ? this.utilService.getMonthNumberByMonthName(dateValue[1], this.opts.monthLabels) : this.utilService.getNumberByValue(dateValue[1]);
            date.day = this.utilService.getNumberByValue(dateValue[2]);
        }
        else if (typeof selDate === "object") {
            date = selDate;
        }
        this.selectionDayTxt = this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels);
        return date;
    }
    jsDateToMyDate(date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    parseSelectedMonth(ms) {
        return this.utilService.parseDefaultMonth(ms);
    }
    setHeaderBtnDisabledState(m, y) {
        let dpm = false;
        let dpy = false;
        let dnm = false;
        let dny = false;
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
    }
};
MyDatePicker.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: LocaleService },
    { type: UtilService }
];
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
export { MyDatePicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlkYXRlcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL215ZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9teWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JMLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFRO0lBQ3BDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBRUYsSUFBSyxTQUFnSDtBQUFySCxXQUFLLFNBQVM7SUFBRSx5Q0FBUSxDQUFBO0lBQUUsNkRBQWtCLENBQUE7SUFBRSwyREFBaUIsQ0FBQTtJQUFFLCtEQUFtQixDQUFBO0lBQUUscURBQWMsQ0FBQTtJQUFFLHFEQUFjLENBQUE7QUFBQSxDQUFDLEVBQWhILFNBQVMsS0FBVCxTQUFTLFFBQXVHO0FBQ3JILElBQUssSUFBNkI7QUFBbEMsV0FBSyxJQUFJO0lBQUUsZ0NBQVUsQ0FBQTtJQUFFLGdDQUFVLENBQUE7QUFBQSxDQUFDLEVBQTdCLElBQUksS0FBSixJQUFJLFFBQXlCO0FBQ2xDLElBQUssY0FBb0M7QUFBekMsV0FBSyxjQUFjO0lBQUUscURBQVMsQ0FBQTtJQUFFLG1E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RUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsR0FBVyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFdBQVc7UUFDUCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLEdBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsR0FBVyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENB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R0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztJQUM3RCxDQUFDO0NBQ0osQ0FBQTs7WUE5c0I0QixVQUFVO1lBQWUsaUJBQWlCO1lBQXlCLGFBQWE7WUFBdUIsV0FBVzs7QUF6R2xJO0lBQVIsS0FBSyxFQUFFOzZDQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTs0Q0FBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTtrREFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7NkNBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFO2lEQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTs4Q0FBa0I7QUFDakI7SUFBUixLQUFLLEVBQUU7OENBQW1CO0FBQ2pCO0lBQVQsTUFBTSxFQUFFO2lEQUE0RTtBQUMzRTtJQUFULE1BQU0sRUFBRTt1REFBa0c7QUFDakc7SUFBVCxNQUFNLEVBQUU7eURBQXdHO0FBQ3ZHO0lBQVQsTUFBTSxFQUFFO29EQUFtRTtBQUNsRTtJQUFULE1BQU0sRUFBRTtvREFBeUY7QUFDekU7SUFBeEIsU0FBUyxDQUFDLFlBQVksQ0FBQztnREFBd0I7QUFDdkI7SUFBeEIsU0FBUyxDQUFDLFlBQVksQ0FBQztnREFBd0I7QUFkdkMsWUFBWTtJQVR4QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLDI3VUFBNEM7UUFFNUMsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQztRQUM1RCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtLQUN4QyxDQUFDO0dBRVcsWUFBWSxDQXd6QnhCO1NBeHpCWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgRWxlbWVudFJlZiwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IElNeURhdGUsIElNeURhdGVSYW5nZSwgSU15TW9udGgsIElNeUNhbGVuZGFyRGF5LCBJTXlDYWxlbmRhck1vbnRoLCBJTXlDYWxlbmRhclllYXIsIElNeVdlZWssIElNeURheUxhYmVscywgSU15TW9udGhMYWJlbHMsIElNeU9wdGlvbnMsIElNeURhdGVNb2RlbCwgSU15SW5wdXRGaWVsZENoYW5nZWQsIElNeUNhbGVuZGFyVmlld0NoYW5nZWQsIElNeUlucHV0Rm9jdXNCbHVyLCBJTXlNYXJrZWREYXRlcywgSU15TWFya2VkRGF0ZSwgSU15RGF0ZUZvcm1hdCB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW5kZXhcIjtcbmltcG9ydCB7IExvY2FsZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9teWRhdGVwaWNrZXIubG9jYWxlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFV0aWxTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvbXlkYXRlcGlja2VyLnV0aWwuc2VydmljZVwiO1xuXG5leHBvcnQgY29uc3QgTVlEUF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE15RGF0ZVBpY2tlciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbmVudW0gQ2FsVG9nZ2xlIHtPcGVuID0gMSwgQ2xvc2VCeURhdGVTZWwgPSAyLCBDbG9zZUJ5Q2FsQnRuID0gMywgQ2xvc2VCeU91dENsaWNrID0gNCwgQ2xvc2VCeUVzYyA9IDUsIENsb3NlQnlBcGkgPSA2fVxuZW51bSBZZWFyIHttaW4gPSAxMDAwLCBtYXggPSA5OTk5fVxuZW51bSBJbnB1dEZvY3VzQmx1ciB7Zm9jdXMgPSAxLCBibHVyID0gMn1cbmVudW0gS2V5Q29kZSB7ZW50ZXIgPSAxMywgZXNjID0gMjcsIHNwYWNlID0gMzJ9XG5lbnVtIE1vbnRoSWQge3ByZXYgPSAxLCBjdXJyID0gMiwgbmV4dCA9IDN9XG5cbmNvbnN0IE1NTSA9IFwibW1tXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm15LWRhdGUtcGlja2VyXCIsXG4gICAgZXhwb3J0QXM6IFwibXlkYXRlcGlja2VyXCIsXG4gICAgdGVtcGxhdGVVcmw6ICcuL215ZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbXSxcbiAgICBwcm92aWRlcnM6IFtMb2NhbGVTZXJ2aWNlLCBVdGlsU2VydmljZSwgTVlEUF9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcblxuZXhwb3J0IGNsYXNzIE15RGF0ZVBpY2tlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgb3B0aW9uczogSU15T3B0aW9ucztcbiAgICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBkZWZhdWx0TW9udGg6IHN0cmluZztcbiAgICBASW5wdXQoKSBzZWxEYXRlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBzZWxlY3RvcjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICAgIEBPdXRwdXQoKSBkYXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPElNeURhdGVNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNeURhdGVNb2RlbD4oKTtcbiAgICBAT3V0cHV0KCkgaW5wdXRGaWVsZENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxJTXlJbnB1dEZpZWxkQ2hhbmdlZD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNeUlucHV0RmllbGRDaGFuZ2VkPigpO1xuICAgIEBPdXRwdXQoKSBjYWxlbmRhclZpZXdDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8SU15Q2FsZW5kYXJWaWV3Q2hhbmdlZD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNeUNhbGVuZGFyVmlld0NoYW5nZWQ+KCk7XG4gICAgQE91dHB1dCgpIGNhbGVuZGFyVG9nZ2xlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIEBPdXRwdXQoKSBpbnB1dEZvY3VzQmx1cjogRXZlbnRFbWl0dGVyPElNeUlucHV0Rm9jdXNCbHVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8SU15SW5wdXRGb2N1c0JsdXI+KCk7XG4gICAgQFZpZXdDaGlsZChcInNlbGVjdG9yRWxcIikgc2VsZWN0b3JFbDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiaW5wdXRCb3hFbFwiKSBpbnB1dEJveEVsOiBFbGVtZW50UmVmO1xuXG4gICAgb25DaGFuZ2VDYjogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcbiAgICBvblRvdWNoZWRDYjogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcblxuICAgIHNob3dTZWxlY3RvcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHZpc2libGVNb250aDogSU15TW9udGggPSB7bW9udGhUeHQ6IFwiXCIsIG1vbnRoTmJyOiAwLCB5ZWFyOiAwfTtcbiAgICBzZWxlY3RlZE1vbnRoOiBJTXlNb250aCA9IHttb250aFR4dDogXCJcIiwgbW9udGhOYnI6IDAsIHllYXI6IDB9O1xuICAgIHNlbGVjdGVkRGF0ZTogSU15RGF0ZSA9IHt5ZWFyOiAwLCBtb250aDogMCwgZGF5OiAwfTtcbiAgICB3ZWVrRGF5czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGRhdGVzOiBBcnJheTxJTXlXZWVrPiA9IFtdO1xuICAgIG1vbnRoczogQXJyYXk8QXJyYXk8SU15Q2FsZW5kYXJNb250aD4+ID0gW107XG4gICAgeWVhcnM6IEFycmF5PEFycmF5PElNeUNhbGVuZGFyWWVhcj4+ID0gW107XG4gICAgc2VsZWN0aW9uRGF5VHh0OiBzdHJpbmcgPSBcIlwiO1xuICAgIGludmFsaWREYXRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgZGlzYWJsZVRvZGF5QnRuOiBib29sZWFuID0gZmFsc2U7XG4gICAgZGF5SWR4OiBudW1iZXIgPSAwO1xuXG4gICAgc2VsZWN0TW9udGg6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzZWxlY3RZZWFyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcmV2TW9udGhEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG5leHRNb250aERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJldlllYXJEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG5leHRZZWFyRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcmV2WWVhcnNEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG5leHRZZWFyc0Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcmV2TW9udGhJZDogbnVtYmVyID0gTW9udGhJZC5wcmV2O1xuICAgIGN1cnJNb250aElkOiBudW1iZXIgPSBNb250aElkLmN1cnI7XG4gICAgbmV4dE1vbnRoSWQ6IG51bWJlciA9IE1vbnRoSWQubmV4dDtcblxuICAgIC8vIERlZmF1bHQgb3B0aW9uc1xuICAgIG9wdHM6IElNeU9wdGlvbnMgPSB7XG4gICAgICAgIGRheUxhYmVsczogPElNeURheUxhYmVscz4ge30sXG4gICAgICAgIG1vbnRoTGFiZWxzOiA8SU15TW9udGhMYWJlbHM+IHt9LFxuICAgICAgICBkYXRlRm9ybWF0OiA8c3RyaW5nPiBcIlwiLFxuICAgICAgICBzaG93VG9kYXlCdG46IDxib29sZWFuPiB0cnVlLFxuICAgICAgICB0b2RheUJ0blR4dDogPHN0cmluZz4gXCJcIixcbiAgICAgICAgZmlyc3REYXlPZldlZWs6IDxzdHJpbmc+IFwiXCIsXG4gICAgICAgIHNhdEhpZ2hsaWdodDogPGJvb2xlYW4+IGZhbHNlLFxuICAgICAgICBzdW5IaWdobGlnaHQ6IDxib29sZWFuPiB0cnVlLFxuICAgICAgICBoaWdobGlnaHREYXRlczogPEFycmF5PElNeURhdGU+PiBbXSxcbiAgICAgICAgbWFya0N1cnJlbnREYXk6IDxib29sZWFuPiB0cnVlLFxuICAgICAgICBtYXJrQ3VycmVudE1vbnRoOiA8Ym9vbGVhbj4gdHJ1ZSxcbiAgICAgICAgbWFya0N1cnJlbnRZZWFyOiA8Ym9vbGVhbj4gdHJ1ZSxcbiAgICAgICAgZGlzYWJsZVVudGlsOiA8SU15RGF0ZT4ge3llYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDB9LFxuICAgICAgICBkaXNhYmxlU2luY2U6IDxJTXlEYXRlPiB7eWVhcjogMCwgbW9udGg6IDAsIGRheTogMH0sXG4gICAgICAgIGRpc2FibGVEYXlzOiA8QXJyYXk8SU15RGF0ZT4+IFtdLFxuICAgICAgICBlbmFibGVEYXlzOiA8QXJyYXk8SU15RGF0ZT4+IFtdLFxuICAgICAgICBtYXJrRGF0ZXM6IDxBcnJheTxJTXlNYXJrZWREYXRlcz4+IFtdLFxuICAgICAgICBtYXJrV2Vla2VuZHM6IDxJTXlNYXJrZWREYXRlPiB7fSxcbiAgICAgICAgZGlzYWJsZURhdGVSYW5nZXM6IDxBcnJheTxJTXlEYXRlUmFuZ2U+PiBbXSxcbiAgICAgICAgZGlzYWJsZVdlZWtlbmRzOiA8Ym9vbGVhbj4gZmFsc2UsXG4gICAgICAgIGRpc2FibGVXZWVrZGF5czogPEFycmF5PHN0cmluZz4+IFtdLFxuICAgICAgICBzaG93V2Vla051bWJlcnM6IDxib29sZWFuPiBmYWxzZSxcbiAgICAgICAgaGVpZ2h0OiA8c3RyaW5nPiBcIjM0cHhcIixcbiAgICAgICAgd2lkdGg6IDxzdHJpbmc+IFwiMTAwJVwiLFxuICAgICAgICBzZWxlY3Rpb25UeHRGb250U2l6ZTogPHN0cmluZz4gXCIxNHB4XCIsXG4gICAgICAgIHNlbGVjdG9ySGVpZ2h0OiA8c3RyaW5nPiBcIjIzMnB4XCIsXG4gICAgICAgIHNlbGVjdG9yV2lkdGg6IDxzdHJpbmc+IFwiMjUycHhcIixcbiAgICAgICAgYWxsb3dEZXNlbGVjdERhdGU6IDxib29sZWFuPiBmYWxzZSxcbiAgICAgICAgaW5saW5lOiA8Ym9vbGVhbj4gZmFsc2UsXG4gICAgICAgIHNob3dDbGVhckRhdGVCdG46IDxib29sZWFuPiB0cnVlLFxuICAgICAgICBzaG93RGVjcmVhc2VEYXRlQnRuOiA8Ym9vbGVhbj4gZmFsc2UsXG4gICAgICAgIHNob3dJbmNyZWFzZURhdGVCdG46IDxib29sZWFuPiBmYWxzZSxcbiAgICAgICAgYWxpZ25TZWxlY3RvclJpZ2h0OiA8Ym9vbGVhbj4gZmFsc2UsXG4gICAgICAgIG9wZW5TZWxlY3RvclRvcE9mSW5wdXQ6IDxib29sZWFuPiBmYWxzZSxcbiAgICAgICAgaW5kaWNhdGVJbnZhbGlkRGF0ZTogPGJvb2xlYW4+IHRydWUsXG4gICAgICAgIGVkaXRhYmxlRGF0ZUZpZWxkOiA8Ym9vbGVhbj4gdHJ1ZSxcbiAgICAgICAgbW9udGhTZWxlY3RvcjogPGJvb2xlYW4+IHRydWUsXG4gICAgICAgIHllYXJTZWxlY3RvcjogPGJvb2xlYW4+IHRydWUsXG4gICAgICAgIGRpc2FibGVIZWFkZXJCdXR0b25zOiA8Ym9vbGVhbj4gdHJ1ZSxcbiAgICAgICAgbWluWWVhcjogPG51bWJlcj4gWWVhci5taW4sXG4gICAgICAgIG1heFllYXI6IDxudW1iZXI+IFllYXIubWF4LFxuICAgICAgICBjb21wb25lbnREaXNhYmxlZDogPGJvb2xlYW4+IGZhbHNlLFxuICAgICAgICBzaG93U2VsZWN0b3JBcnJvdzogPGJvb2xlYW4+IHRydWUsXG4gICAgICAgIHNob3dJbnB1dEZpZWxkOiA8Ym9vbGVhbj4gdHJ1ZSxcbiAgICAgICAgb3BlblNlbGVjdG9yT25JbnB1dENsaWNrOiA8Ym9vbGVhbj4gZmFsc2UsXG4gICAgICAgIGFsbG93U2VsZWN0aW9uT25seUluQ3VycmVudE1vbnRoOiA8Ym9vbGVhbj4gdHJ1ZSxcbiAgICAgICAgYXJpYUxhYmVsSW5wdXRGaWVsZDogPHN0cmluZz4gXCJEYXRlIGlucHV0IGZpZWxkXCIsXG4gICAgICAgIGFyaWFMYWJlbENsZWFyRGF0ZTogPHN0cmluZz4gXCJDbGVhciBEYXRlXCIsXG4gICAgICAgIGFyaWFMYWJlbERlY3JlYXNlRGF0ZTogPHN0cmluZz4gXCJEZWNyZWFzZSBEYXRlXCIsXG4gICAgICAgIGFyaWFMYWJlbEluY3JlYXNlRGF0ZTogPHN0cmluZz4gXCJJbmNyZWFzZSBEYXRlXCIsXG4gICAgICAgIGFyaWFMYWJlbE9wZW5DYWxlbmRhcjogPHN0cmluZz4gXCJPcGVuIENhbGVuZGFyXCIsXG4gICAgICAgIGFyaWFMYWJlbFByZXZNb250aDogPHN0cmluZz4gXCJQcmV2aW91cyBNb250aFwiLFxuICAgICAgICBhcmlhTGFiZWxOZXh0TW9udGg6IDxzdHJpbmc+IFwiTmV4dCBNb250aFwiLFxuICAgICAgICBhcmlhTGFiZWxQcmV2WWVhcjogPHN0cmluZz4gXCJQcmV2aW91cyBZZWFyXCIsXG4gICAgICAgIGFyaWFMYWJlbE5leHRZZWFyOiA8c3RyaW5nPiBcIk5leHQgWWVhclwiLFxuICAgICAgICBhcmlhTGFiZWxEYXk6IDxzdHJpbmc+IFwiU2VsZWN0IGRheVwiXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgbG9jYWxlU2VydmljZTogTG9jYWxlU2VydmljZSwgcHJpdmF0ZSB1dGlsU2VydmljZTogVXRpbFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5zZXRMb2NhbGVPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgc2V0TG9jYWxlT3B0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgbGV0IG9wdHM6IElNeU9wdGlvbnMgPSB0aGlzLmxvY2FsZVNlcnZpY2UuZ2V0TG9jYWxlT3B0aW9ucyh0aGlzLmxvY2FsZSk7XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdHMpLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgICg8SU15T3B0aW9ucz50aGlzLm9wdHMpW2tdID0gb3B0c1trXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0T3B0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMpLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgICAgICAoPElNeU9wdGlvbnM+dGhpcy5vcHRzKVtrXSA9IHRoaXMub3B0aW9uc1trXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdHMubWluWWVhciA8IFllYXIubWluKSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMubWluWWVhciA9IFllYXIubWluO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdHMubWF4WWVhciA+IFllYXIubWF4KSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMubWF4WWVhciA9IFllYXIubWF4O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0cy5jb21wb25lbnREaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RvclRvcFBvc2l0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLm9wdHMub3BlblNlbGVjdG9yVG9wT2ZJbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLm9mZnNldEhlaWdodCArIFwicHhcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0TW9udGhZZWFyU2VsZWN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdE1vbnRoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0WWVhciA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uU2VsZWN0TW9udGhDbGlja2VkKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0TW9udGggPSAhdGhpcy5zZWxlY3RNb250aDtcbiAgICAgICAgdGhpcy5zZWxlY3RZZWFyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0TW9udGgpIHtcbiAgICAgICAgICAgIGxldCB0b2RheTogSU15RGF0ZSA9IHRoaXMuZ2V0VG9kYXkoKTtcbiAgICAgICAgICAgIHRoaXMubW9udGhzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMjsgaSArPSAzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvdzogQXJyYXk8SU15Q2FsZW5kYXJNb250aD4gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gaTsgaiA8IGkgKyAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkOiBib29sZWFuID0gdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVVbnRpbCh7eWVhcjogdGhpcy52aXNpYmxlTW9udGgueWVhciwgbW9udGg6IGosIGRheTogdGhpcy5kYXlzSW5Nb250aChqLCB0aGlzLnZpc2libGVNb250aC55ZWFyKX0sIHRoaXMub3B0cy5kaXNhYmxlVW50aWwpXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnV0aWxTZXJ2aWNlLmlzTW9udGhEaXNhYmxlZEJ5RGlzYWJsZVNpbmNlKHt5ZWFyOiB0aGlzLnZpc2libGVNb250aC55ZWFyLCBtb250aDogaiwgZGF5OiAxfSwgdGhpcy5vcHRzLmRpc2FibGVTaW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIHJvdy5wdXNoKHtuYnI6IGosIG5hbWU6IHRoaXMub3B0cy5tb250aExhYmVsc1tqXSwgY3Vyck1vbnRoOiBqID09PSB0b2RheS5tb250aCAmJiB0aGlzLnZpc2libGVNb250aC55ZWFyID09PSB0b2RheS55ZWFyLCBzZWxlY3RlZDogaiA9PT0gdGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIsIGRpc2FibGVkOiBkaXNhYmxlZH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1vbnRocy5wdXNoKHJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vbnRoQ2VsbENsaWNrZWQoY2VsbDogSU15Q2FsZW5kYXJNb250aCk6IHZvaWQge1xuICAgICAgICBsZXQgbWM6IGJvb2xlYW4gPSBjZWxsLm5iciAhPT0gdGhpcy52aXNpYmxlTW9udGgubW9udGhOYnI7XG4gICAgICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm1vbnRoVGV4dChjZWxsLm5iciksIG1vbnRoTmJyOiBjZWxsLm5iciwgeWVhcjogdGhpcy52aXNpYmxlTW9udGgueWVhcn07XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihjZWxsLm5iciwgdGhpcy52aXNpYmxlTW9udGgueWVhciwgbWMpO1xuICAgICAgICB0aGlzLnNlbGVjdE1vbnRoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JFbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgb25Nb250aENlbGxLZXlEb3duKGV2ZW50OiBhbnksIGNlbGw6IElNeUNhbGVuZGFyTW9udGgpIHtcbiAgICAgICAgaWYgKChldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLmVudGVyIHx8IGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuc3BhY2UpICYmICFjZWxsLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5vbk1vbnRoQ2VsbENsaWNrZWQoY2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNlbGVjdFllYXJDbGlja2VkKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0WWVhciA9ICF0aGlzLnNlbGVjdFllYXI7XG4gICAgICAgIHRoaXMuc2VsZWN0TW9udGggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RZZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlWWVhcnMoTnVtYmVyKHRoaXMudmlzaWJsZU1vbnRoLnllYXIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uWWVhckNlbGxDbGlja2VkKGNlbGw6IElNeUNhbGVuZGFyWWVhcik6IHZvaWQge1xuICAgICAgICBsZXQgeWM6IGJvb2xlYW4gPSBjZWxsLnllYXIgIT09IHRoaXMudmlzaWJsZU1vbnRoLnllYXI7XG4gICAgICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLnZpc2libGVNb250aC5tb250aFR4dCwgbW9udGhOYnI6IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCB5ZWFyOiBjZWxsLnllYXJ9O1xuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIodGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIsIGNlbGwueWVhciwgeWMpO1xuICAgICAgICB0aGlzLnNlbGVjdFllYXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RvckVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBvblllYXJDZWxsS2V5RG93bihldmVudDogYW55LCBjZWxsOiBJTXlDYWxlbmRhclllYXIpIHtcbiAgICAgICAgaWYgKChldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLmVudGVyIHx8IGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuc3BhY2UpICYmICFjZWxsLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5vblllYXJDZWxsQ2xpY2tlZChjZWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUHJldlllYXJzKGV2ZW50OiBhbnksIHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVllYXJzKE51bWJlcih5ZWFyKSAtIDI1KTtcbiAgICB9XG5cbiAgICBvbk5leHRZZWFycyhldmVudDogYW55LCB5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFycyhOdW1iZXIoeWVhcikgKyAyNSk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVZZWFycyh5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy55ZWFycy5sZW5ndGggPSAwO1xuICAgICAgICBsZXQgdG9kYXk6IElNeURhdGUgPSB0aGlzLmdldFRvZGF5KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSB5ZWFyOyBpIDw9IDIwICsgeWVhcjsgaSArPSA1KSB7XG4gICAgICAgICAgICBsZXQgcm93OiBBcnJheTxJTXlDYWxlbmRhclllYXI+ID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaTsgaiA8IGkgKyA1OyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWQ6IGJvb2xlYW4gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzTW9udGhEaXNhYmxlZEJ5RGlzYWJsZVVudGlsKHt5ZWFyOiBqLCBtb250aDogdGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIsIGRheTogdGhpcy5kYXlzSW5Nb250aCh0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgail9LCB0aGlzLm9wdHMuZGlzYWJsZVVudGlsKVxuICAgICAgICAgICAgICAgICB8fCB0aGlzLnV0aWxTZXJ2aWNlLmlzTW9udGhEaXNhYmxlZEJ5RGlzYWJsZVNpbmNlKHt5ZWFyOiBqLCBtb250aDogdGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIsIGRheTogMX0sIHRoaXMub3B0cy5kaXNhYmxlU2luY2UpO1xuICAgICAgICAgICAgICAgIGxldCBtaW5NYXg6IGJvb2xlYW4gPSBqIDwgdGhpcy5vcHRzLm1pblllYXIgfHwgaiA+IHRoaXMub3B0cy5tYXhZZWFyO1xuICAgICAgICAgICAgICAgIHJvdy5wdXNoKHt5ZWFyOiBqLCBjdXJyWWVhcjogaiA9PT0gdG9kYXkueWVhciwgc2VsZWN0ZWQ6IGogPT09IHRoaXMudmlzaWJsZU1vbnRoLnllYXIsIGRpc2FibGVkOiBkaXNhYmxlZCB8fCBtaW5NYXh9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueWVhcnMucHVzaChyb3cpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJldlllYXJzRGlzYWJsZWQgPSB0aGlzLnllYXJzWzBdWzBdLnllYXIgPD0gdGhpcy5vcHRzLm1pblllYXIgfHwgdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVVbnRpbCh7eWVhcjogdGhpcy55ZWFyc1swXVswXS55ZWFyIC0gMSwgbW9udGg6IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCBkYXk6IHRoaXMuZGF5c0luTW9udGgodGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIsIHRoaXMueWVhcnNbMF1bMF0ueWVhciAtIDEpfSwgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCk7XG4gICAgICAgIHRoaXMubmV4dFllYXJzRGlzYWJsZWQgPSB0aGlzLnllYXJzWzRdWzRdLnllYXIgPj0gdGhpcy5vcHRzLm1heFllYXIgfHwgdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVTaW5jZSh7eWVhcjogdGhpcy55ZWFyc1s0XVs0XS55ZWFyICsgMSwgbW9udGg6IHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCBkYXk6IDF9LCB0aGlzLm9wdHMuZGlzYWJsZVNpbmNlKTtcbiAgICB9XG5cbiAgICBvblVzZXJEYXRlSW5wdXQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkSW5wdXRGaWVsZENoYW5nZWQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGRhdGU6IElNeURhdGUgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkKHZhbHVlLCB0aGlzLm9wdHMuZGF0ZUZvcm1hdCwgdGhpcy5vcHRzLm1pblllYXIsIHRoaXMub3B0cy5tYXhZZWFyLCB0aGlzLm9wdHMuZGlzYWJsZVVudGlsLCB0aGlzLm9wdHMuZGlzYWJsZVNpbmNlLCB0aGlzLm9wdHMuZGlzYWJsZVdlZWtlbmRzLCB0aGlzLm9wdHMuZGlzYWJsZVdlZWtkYXlzLCB0aGlzLm9wdHMuZGlzYWJsZURheXMsIHRoaXMub3B0cy5kaXNhYmxlRGF0ZVJhbmdlcywgdGhpcy5vcHRzLm1vbnRoTGFiZWxzLCB0aGlzLm9wdHMuZW5hYmxlRGF5cyk7XG4gICAgICAgICAgICBpZiAodGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShkYXRlKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy51dGlsU2VydmljZS5pc1NhbWVEYXRlKGRhdGUsIHRoaXMuc2VsZWN0ZWREYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoZGF0ZSwgQ2FsVG9nZ2xlLkNsb3NlQnlEYXRlU2VsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0ZVZhbHVlKGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZElucHV0RmllbGRDaGFuZ2VkKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXNJbnB1dChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRGb2N1c0JsdXIuZW1pdCh7cmVhc29uOiBJbnB1dEZvY3VzQmx1ci5mb2N1cywgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xuICAgIH1cblxuICAgIG9uQmx1cklucHV0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25EYXlUeHQgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2IoKTtcbiAgICAgICAgdGhpcy5pbnB1dEZvY3VzQmx1ci5lbWl0KHtyZWFzb246IElucHV0Rm9jdXNCbHVyLmJsdXIsIHZhbHVlOiBldmVudC50YXJnZXQudmFsdWV9KTtcbiAgICB9XG5cbiAgICBvbkNsb3NlU2VsZWN0b3IoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5lc2MgJiYgdGhpcy5zaG93U2VsZWN0b3IgJiYgIXRoaXMub3B0cy5pbmxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlR2xvYmFsTGlzdGVuZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KENhbFRvZ2dsZS5DbG9zZUJ5RXNjKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1NlbGVjdG9yID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnZhbGlkSW5wdXRGaWVsZENoYW5nZWQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmludmFsaWREYXRlID0gdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgdGhpcy5pbnB1dEZpZWxkQ2hhbmdlZC5lbWl0KHt2YWx1ZTogdmFsdWUsIGRhdGVGb3JtYXQ6IHRoaXMub3B0cy5kYXRlRm9ybWF0LCB2YWxpZDogZmFsc2V9KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNiKG51bGwpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENiKCk7XG4gICAgfVxuXG4gICAgaXNUb2RheURpc2FibGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVUb2RheUJ0biA9IHRoaXMudXRpbFNlcnZpY2UuaXNEaXNhYmxlZERheSh0aGlzLmdldFRvZGF5KCksIHRoaXMub3B0cy5taW5ZZWFyLCB0aGlzLm9wdHMubWF4WWVhciwgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCwgdGhpcy5vcHRzLmRpc2FibGVTaW5jZSwgdGhpcy5vcHRzLmRpc2FibGVXZWVrZW5kcywgdGhpcy5vcHRzLmRpc2FibGVXZWVrZGF5cywgdGhpcy5vcHRzLmRpc2FibGVEYXlzLCB0aGlzLm9wdHMuZGlzYWJsZURhdGVSYW5nZXMsIHRoaXMub3B0cy5lbmFibGVEYXlzKTtcbiAgICB9XG5cbiAgICBwYXJzZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbGVPcHRpb25zKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgICAgIGxldCB3ZWVrRGF5czogQXJyYXk8c3RyaW5nPiA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0V2Vla0RheXMoKTtcbiAgICAgICAgdGhpcy5pc1RvZGF5RGlzYWJsZWQoKTtcbiAgICAgICAgdGhpcy5kYXlJZHggPSB3ZWVrRGF5cy5pbmRleE9mKHRoaXMub3B0cy5maXJzdERheU9mV2Vlayk7XG4gICAgICAgIGlmICh0aGlzLmRheUlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBpZHg6IG51bWJlciA9IHRoaXMuZGF5SWR4O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWVrRGF5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMud2Vla0RheXMucHVzaCh0aGlzLm9wdHMuZGF5TGFiZWxzW3dlZWtEYXlzW2lkeF1dKTtcbiAgICAgICAgICAgICAgICBpZHggPSB3ZWVrRGF5c1tpZHhdID09PSBcInNhXCIgPyAwIDogaWR4ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUgJiYgKHZhbHVlW1wiZGF0ZVwiXSB8fCB2YWx1ZVtcImpzZGF0ZVwiXSB8fCB2YWx1ZVtcImZvcm1hdHRlZFwiXSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdmFsdWVbXCJkYXRlXCJdID8gdGhpcy5wYXJzZVNlbGVjdGVkRGF0ZSh2YWx1ZVtcImRhdGVcIl0pIDogdmFsdWVbXCJqc2RhdGVcIl0gPyB0aGlzLnBhcnNlU2VsZWN0ZWREYXRlKHRoaXMuanNEYXRlVG9NeURhdGUodmFsdWVbXCJqc2RhdGVcIl0pKSA6IHRoaXMucGFyc2VTZWxlY3RlZERhdGUodmFsdWVbXCJmb3JtYXR0ZWRcIl0pO1xuICAgICAgICAgICAgbGV0IGN2YzogYm9vbGVhbiA9IHRoaXMudmlzaWJsZU1vbnRoLnllYXIgIT09IHRoaXMuc2VsZWN0ZWREYXRlLnllYXIgfHwgdGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIgIT09IHRoaXMuc2VsZWN0ZWREYXRlLm1vbnRoO1xuICAgICAgICAgICAgaWYgKGN2Yykge1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm9wdHMubW9udGhMYWJlbHNbdGhpcy5zZWxlY3RlZERhdGUubW9udGhdLCBtb250aE5icjogdGhpcy5zZWxlY3RlZERhdGUubW9udGgsIHllYXI6IHRoaXMuc2VsZWN0ZWREYXRlLnllYXJ9O1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcih0aGlzLnNlbGVjdGVkRGF0ZS5tb250aCwgdGhpcy5zZWxlY3RlZERhdGUueWVhciwgY3ZjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uRGF5VHh0ID0gdGhpcy51dGlsU2VydmljZS5mb3JtYXREYXRlKHRoaXMuc2VsZWN0ZWREYXRlLCB0aGlzLm9wdHMuZGF0ZUZvcm1hdCwgdGhpcy5vcHRzLm1vbnRoTGFiZWxzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB7eWVhcjogMCwgbW9udGg6IDAsIGRheTogMH07XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkRheVR4dCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnB1dEZpZWxkQ2hhbmdlZC5lbWl0KHt2YWx1ZTogdGhpcy5zZWxlY3Rpb25EYXlUeHQsIGRhdGVGb3JtYXQ6IHRoaXMub3B0cy5kYXRlRm9ybWF0LCB2YWxpZDogdGhpcy5zZWxlY3Rpb25EYXlUeHQubGVuZ3RoID4gMH0pO1xuICAgICAgICB0aGlzLmludmFsaWREYXRlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9wdHMuY29tcG9uZW50RGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2IgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2IgPSBmbjtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVHbG9iYWxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoXCJzZWxlY3RvclwiKSkge1xuICAgICAgICAgICAgbGV0IHM6IGFueSA9IGNoYW5nZXNbXCJzZWxlY3RvclwiXS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5vcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlbGVjdG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuU2VsZWN0b3IoQ2FsVG9nZ2xlLk9wZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2VsZWN0b3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVNlbGVjdG9yKENhbFRvZ2dsZS5DbG9zZUJ5QXBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkJ0bkNsaWNrZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KFwicGxhY2Vob2xkZXJcIikpIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBjaGFuZ2VzW1wicGxhY2Vob2xkZXJcIl0uY3VycmVudFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoXCJsb2NhbGVcIikpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlID0gY2hhbmdlc1tcImxvY2FsZVwiXS5jdXJyZW50VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShcImRpc2FibGVkXCIpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gY2hhbmdlc1tcImRpc2FibGVkXCJdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KFwib3B0aW9uc1wiKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gY2hhbmdlc1tcIm9wdGlvbnNcIl0uY3VycmVudFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53ZWVrRGF5cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnBhcnNlT3B0aW9ucygpO1xuXG4gICAgICAgIGxldCBkbUNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRNb250aFwiKSkge1xuICAgICAgICAgICAgbGV0IGRtOiBhbnkgPSBjaGFuZ2VzW1wiZGVmYXVsdE1vbnRoXCJdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBkbSA9IGRtLmRlZk1vbnRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRtICE9PSBudWxsICYmIGRtICE9PSB1bmRlZmluZWQgJiYgZG0gIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSB0aGlzLnBhcnNlU2VsZWN0ZWRNb250aChkbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGggPSB7bW9udGhUeHQ6IFwiXCIsIG1vbnRoTmJyOiAwLCB5ZWFyOiAwfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRtQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KFwic2VsRGF0ZVwiKSkge1xuICAgICAgICAgICAgbGV0IHNkOiBhbnkgPSBjaGFuZ2VzW1wic2VsRGF0ZVwiXTtcbiAgICAgICAgICAgIGlmIChzZC5jdXJyZW50VmFsdWUgIT09IG51bGwgJiYgc2QuY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQgJiYgc2QuY3VycmVudFZhbHVlICE9PSBcIlwiICYmIE9iamVjdC5rZXlzKHNkLmN1cnJlbnRWYWx1ZSkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB0aGlzLnBhcnNlU2VsZWN0ZWREYXRlKHNkLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYih0aGlzLmdldERhdGVNb2RlbCh0aGlzLnNlbGVjdGVkRGF0ZSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNsZWFyIG9uIGluaXRcbiAgICAgICAgICAgICAgICBpZiAoIXNkLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52aXNpYmxlTW9udGgueWVhciA9PT0gMCAmJiB0aGlzLnZpc2libGVNb250aC5tb250aE5iciA9PT0gMCB8fCBkbUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRWaXNpYmxlTW9udGgoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoVHh0ID0gdGhpcy5vcHRzLm1vbnRoTGFiZWxzW3RoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyXTtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcih0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgdGhpcy52aXNpYmxlTW9udGgueWVhciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgLy8gUmVtb3ZlIGRhdGUgYnV0dG9uIGNsaWNrZWRcbiAgICAgICAgdGhpcy5jbGVhckRhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1NlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyVG9nZ2xlLmVtaXQoQ2FsVG9nZ2xlLkNsb3NlQnlDYWxCdG4pO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVHbG9iYWxMaXN0ZW5lcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93U2VsZWN0b3IgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkRlY3JlYXNlQnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgLy8gRGVjcmVhc2UgZGF0ZSBidXR0b24gY2xpY2tlZFxuICAgICAgICB0aGlzLmRlY3JlYXNlSW5jcmVhc2VEYXRlKHRydWUpO1xuICAgIH1cblxuICAgIG9uSW5jcmVhc2VCdG5DbGlja2VkKCk6IHZvaWQge1xuICAgICAgICAvLyBJbmNyZWFzZSBkYXRlIGJ1dHRvbiBjbGlja2VkXG4gICAgICAgIHRoaXMuZGVjcmVhc2VJbmNyZWFzZURhdGUoZmFsc2UpO1xuICAgIH1cblxuICAgIG9wZW5CdG5DbGlja2VkKCk6IHZvaWQge1xuICAgICAgICAvLyBPcGVuIHNlbGVjdG9yIGJ1dHRvbiBjbGlja2VkXG4gICAgICAgIHRoaXMuc2hvd1NlbGVjdG9yID0gIXRoaXMuc2hvd1NlbGVjdG9yO1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIGlmICh0aGlzLnNob3dTZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5vcGVuU2VsZWN0b3IoQ2FsVG9nZ2xlLk9wZW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVNlbGVjdG9yKENhbFRvZ2dsZS5DbG9zZUJ5Q2FsQnRuKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlR2xvYmFsTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tMaXN0ZW5lciA9IChldnQ6IE1vdXNlRXZlbnQpID0+IHRoaXMub25DbGlja0RvY3VtZW50KGV2dCk7XG5cbiAgICBhZGRHbG9iYWxMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGlja0xpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZW1vdmVHbG9iYWxMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25DbGlja0xpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrRG9jdW1lbnQoZXZ0OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1NlbGVjdG9yICYmIGV2ZW50LnRhcmdldCAmJiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmICF0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dTZWxlY3RvciA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KENhbFRvZ2dsZS5DbG9zZUJ5T3V0Q2xpY2spO1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUdsb2JhbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0cy5tb250aFNlbGVjdG9yIHx8IHRoaXMub3B0cy55ZWFyU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRNb250aFllYXJTZWxlY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5TZWxlY3RvcihyZWFzb246IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmFkZEdsb2JhbExpc3RlbmVyKCk7XG5cbiAgICAgICAgdGhpcy5zZXRWaXNpYmxlTW9udGgoKTtcbiAgICAgICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KHJlYXNvbik7XG4gICAgfVxuXG4gICAgY2xvc2VTZWxlY3RvcihyZWFzb246IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNhbGVuZGFyVG9nZ2xlLmVtaXQocmVhc29uKTtcbiAgICB9XG5cbiAgICBzZXRWaXNpYmxlTW9udGgoKTogdm9pZCB7XG4gICAgICAgIC8vIFNldHMgdmlzaWJsZSBtb250aCBvZiBjYWxlbmRhclxuICAgICAgICBsZXQgeTogbnVtYmVyID0gMCwgbTogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKCF0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKHRoaXMuc2VsZWN0ZWREYXRlKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRNb250aC55ZWFyID09PSAwICYmIHRoaXMuc2VsZWN0ZWRNb250aC5tb250aE5iciA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxldCB0b2RheTogSU15RGF0ZSA9IHRoaXMuZ2V0VG9kYXkoKTtcbiAgICAgICAgICAgICAgICB5ID0gdG9kYXkueWVhcjtcbiAgICAgICAgICAgICAgICBtID0gdG9kYXkubW9udGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLnNlbGVjdGVkTW9udGgueWVhcjtcbiAgICAgICAgICAgICAgICBtID0gdGhpcy5zZWxlY3RlZE1vbnRoLm1vbnRoTmJyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeSA9IHRoaXMuc2VsZWN0ZWREYXRlLnllYXI7XG4gICAgICAgICAgICBtID0gdGhpcy5zZWxlY3RlZERhdGUubW9udGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aXNpYmxlTW9udGggPSB7bW9udGhUeHQ6IHRoaXMub3B0cy5tb250aExhYmVsc1ttXSwgbW9udGhOYnI6IG0sIHllYXI6IHl9O1xuXG4gICAgICAgIC8vIENyZWF0ZSBjdXJyZW50IG1vbnRoXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihtLCB5LCB0cnVlKTtcbiAgICB9XG5cbiAgICBvblByZXZNb250aCgpOiB2b2lkIHtcbiAgICAgICAgLy8gUHJldmlvdXMgbW9udGggZnJvbSBjYWxlbmRhclxuICAgICAgICBsZXQgZDogRGF0ZSA9IHRoaXMuZ2V0RGF0ZSh0aGlzLnZpc2libGVNb250aC55ZWFyLCB0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgMSk7XG4gICAgICAgIGQuc2V0TW9udGgoZC5nZXRNb250aCgpIC0gMSk7XG5cbiAgICAgICAgbGV0IHk6IG51bWJlciA9IGQuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgbGV0IG06IG51bWJlciA9IGQuZ2V0TW9udGgoKSArIDE7XG5cbiAgICAgICAgdGhpcy52aXNpYmxlTW9udGggPSB7bW9udGhUeHQ6IHRoaXMubW9udGhUZXh0KG0pLCBtb250aE5icjogbSwgeWVhcjogeX07XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihtLCB5LCB0cnVlKTtcbiAgICB9XG5cbiAgICBvbk5leHRNb250aCgpOiB2b2lkIHtcbiAgICAgICAgLy8gTmV4dCBtb250aCBmcm9tIGNhbGVuZGFyXG4gICAgICAgIGxldCBkOiBEYXRlID0gdGhpcy5nZXREYXRlKHRoaXMudmlzaWJsZU1vbnRoLnllYXIsIHRoaXMudmlzaWJsZU1vbnRoLm1vbnRoTmJyLCAxKTtcbiAgICAgICAgZC5zZXRNb250aChkLmdldE1vbnRoKCkgKyAxKTtcblxuICAgICAgICBsZXQgeTogbnVtYmVyID0gZC5nZXRGdWxsWWVhcigpO1xuICAgICAgICBsZXQgbTogbnVtYmVyID0gZC5nZXRNb250aCgpICsgMTtcblxuICAgICAgICB0aGlzLnZpc2libGVNb250aCA9IHttb250aFR4dDogdGhpcy5tb250aFRleHQobSksIG1vbnRoTmJyOiBtLCB5ZWFyOiB5fTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKG0sIHksIHRydWUpO1xuICAgIH1cblxuICAgIG9uUHJldlllYXIoKTogdm9pZCB7XG4gICAgICAgIC8vIFByZXZpb3VzIHllYXIgZnJvbSBjYWxlbmRhclxuICAgICAgICB0aGlzLnZpc2libGVNb250aC55ZWFyLS07XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcih0aGlzLnZpc2libGVNb250aC5tb250aE5iciwgdGhpcy52aXNpYmxlTW9udGgueWVhciwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgb25OZXh0WWVhcigpOiB2b2lkIHtcbiAgICAgICAgLy8gTmV4dCB5ZWFyIGZyb20gY2FsZW5kYXJcbiAgICAgICAgdGhpcy52aXNpYmxlTW9udGgueWVhcisrO1xuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIodGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIsIHRoaXMudmlzaWJsZU1vbnRoLnllYXIsIHRydWUpO1xuICAgIH1cblxuICAgIG9uVG9kYXlDbGlja2VkKCk6IHZvaWQge1xuICAgICAgICAvLyBUb2RheSBidXR0b24gY2xpY2tlZFxuICAgICAgICBsZXQgdG9kYXk6IElNeURhdGUgPSB0aGlzLmdldFRvZGF5KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0RGF0ZSh0b2RheSwgQ2FsVG9nZ2xlLkNsb3NlQnlEYXRlU2VsKTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5pbmxpbmUgJiYgdG9kYXkueWVhciAhPT0gdGhpcy52aXNpYmxlTW9udGgueWVhciB8fCB0b2RheS5tb250aCAhPT0gdGhpcy52aXNpYmxlTW9udGgubW9udGhOYnIpIHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZU1vbnRoID0ge21vbnRoVHh0OiB0aGlzLm9wdHMubW9udGhMYWJlbHNbdG9kYXkubW9udGhdLCBtb250aE5icjogdG9kYXkubW9udGgsIHllYXI6IHRvZGF5LnllYXJ9O1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKHRvZGF5Lm1vbnRoLCB0b2RheS55ZWFyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2VsbENsaWNrZWQoY2VsbDogYW55KTogdm9pZCB7XG4gICAgICAgIC8vIENlbGwgY2xpY2tlZCBvbiB0aGUgY2FsZW5kYXJcbiAgICAgICAgaWYgKGNlbGwuY21vID09PSB0aGlzLnByZXZNb250aElkKSB7XG4gICAgICAgICAgICAvLyBQcmV2aW91cyBtb250aCBkYXlcbiAgICAgICAgICAgIHRoaXMub25QcmV2TW9udGgoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLmFsbG93U2VsZWN0aW9uT25seUluQ3VycmVudE1vbnRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKGNlbGwuZGF0ZU9iaiwgQ2FsVG9nZ2xlLkNsb3NlQnlEYXRlU2VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjZWxsLmNtbyA9PT0gdGhpcy5jdXJyTW9udGhJZCkge1xuICAgICAgICAgICAgLy8gQ3VycmVudCBtb250aCBkYXkgLSBpZiBkYXRlIGlzIGFscmVhZHkgc2VsZWN0ZWQgY2xlYXIgaXRcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYWxsb3dEZXNlbGVjdERhdGUgJiYgdGhpcy51dGlsU2VydmljZS5pc1NhbWVEYXRlKGNlbGwuZGF0ZU9iaiwgdGhpcy5zZWxlY3RlZERhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShjZWxsLmRhdGVPYmosIENhbFRvZ2dsZS5DbG9zZUJ5RGF0ZVNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2VsbC5jbW8gPT09IHRoaXMubmV4dE1vbnRoSWQpIHtcbiAgICAgICAgICAgIC8vIE5leHQgbW9udGggZGF5XG4gICAgICAgICAgICB0aGlzLm9uTmV4dE1vbnRoKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0cy5hbGxvd1NlbGVjdGlvbk9ubHlJbkN1cnJlbnRNb250aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShjZWxsLmRhdGVPYmosIENhbFRvZ2dsZS5DbG9zZUJ5RGF0ZVNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldE1vbnRoWWVhclNlbGVjdCgpO1xuICAgIH1cblxuICAgIG9uQ2VsbEtleURvd24oZXZlbnQ6IGFueSwgY2VsbDogYW55KSB7XG4gICAgICAgIC8vIENlbGwga2V5Ym9hcmQgaGFuZGxpbmdcbiAgICAgICAgaWYgKChldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLmVudGVyIHx8IGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuc3BhY2UpICYmICFjZWxsLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5vbkNlbGxDbGlja2VkKGNlbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJEYXRlKCk6IHZvaWQge1xuICAgICAgICAvLyBDbGVhcnMgdGhlIGRhdGVcbiAgICAgICAgdGhpcy51cGRhdGVEYXRlVmFsdWUoe3llYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDB9KTtcbiAgICAgICAgdGhpcy5zZXRGb2N1c1RvSW5wdXRCb3goKTtcbiAgICB9XG5cbiAgICBkZWNyZWFzZUluY3JlYXNlRGF0ZShkZWNyZWFzZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICAvLyBEZWNyZWFzZXMgb3IgaW5jcmVhc2VzIHRoZSBkYXRlIGRlcGVuZGluZyBvbiB0aGUgcGFyYW1ldGVyXG4gICAgICAgIGxldCBkYXRlOiBJTXlEYXRlID0gdGhpcy5zZWxlY3RlZERhdGU7XG4gICAgICAgIGlmICh0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICBsZXQgZDogRGF0ZSA9IHRoaXMuZ2V0RGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KTtcbiAgICAgICAgICAgIGQuc2V0RGF0ZShkZWNyZWFzZSA/IGQuZ2V0RGF0ZSgpIC0gMSA6IGQuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgICAgICBkYXRlID0ge3llYXI6IGQuZ2V0RnVsbFllYXIoKSwgbW9udGg6IGQuZ2V0TW9udGgoKSArIDEsIGRheTogZC5nZXREYXRlKCl9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuZ2V0VG9kYXkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdERhdGUoZGF0ZSwgQ2FsVG9nZ2xlLkNsb3NlQnlDYWxCdG4pO1xuICAgIH1cblxuICAgIHNlbGVjdERhdGUoZGF0ZTogSU15RGF0ZSwgY2xvc2VSZWFzb246IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGVWYWx1ZShkYXRlKTtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1NlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyVG9nZ2xlLmVtaXQoY2xvc2VSZWFzb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVHbG9iYWxMaXN0ZW5lcigpO1xuXG4gICAgICAgIHRoaXMuc2hvd1NlbGVjdG9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXNUb0lucHV0Qm94KCk7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXNUb0lucHV0Qm94KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMub3B0cy5pbmxpbmUgJiYgdGhpcy5vcHRzLnNob3dJbnB1dEZpZWxkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Qm94RWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZURhdGVWYWx1ZShkYXRlOiBJTXlEYXRlKTogdm9pZCB7XG4gICAgICAgIGxldCBjbGVhcjogYm9vbGVhbiA9ICF0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGRhdGUpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5lbWl0RGF0ZUNoYW5nZWQoZGF0ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdHMuaW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkRheVR4dCA9IGNsZWFyID8gXCJcIiA6IHRoaXMudXRpbFNlcnZpY2UuZm9ybWF0RGF0ZShkYXRlLCB0aGlzLm9wdHMuZGF0ZUZvcm1hdCwgdGhpcy5vcHRzLm1vbnRoTGFiZWxzKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGaWVsZENoYW5nZWQuZW1pdCh7dmFsdWU6IHRoaXMuc2VsZWN0aW9uRGF5VHh0LCBkYXRlRm9ybWF0OiB0aGlzLm9wdHMuZGF0ZUZvcm1hdCwgdmFsaWQ6ICFjbGVhcn0pO1xuICAgICAgICAgICAgdGhpcy5pbnZhbGlkRGF0ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW1pdERhdGVDaGFuZ2VkKGRhdGU6IElNeURhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgIGxldCBkYXRlTW9kZWw6IElNeURhdGVNb2RlbCA9IHRoaXMuZ2V0RGF0ZU1vZGVsKGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5kYXRlQ2hhbmdlZC5lbWl0KGRhdGVNb2RlbCk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2IoZGF0ZU1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUNoYW5nZWQuZW1pdCh7ZGF0ZTogZGF0ZSwganNkYXRlOiBudWxsLCBmb3JtYXR0ZWQ6IFwiXCIsIGVwb2M6IDB9KTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDYihudWxsKTtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2IoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERhdGVNb2RlbChkYXRlOiBJTXlEYXRlKTogSU15RGF0ZU1vZGVsIHtcbiAgICAgICAgLy8gQ3JlYXRlcyBhIGRhdGUgbW9kZWwgb2JqZWN0IGZyb20gdGhlIGdpdmVuIHBhcmFtZXRlclxuICAgICAgICByZXR1cm4ge2RhdGU6IGRhdGUsIGpzZGF0ZTogdGhpcy5nZXREYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpLCBmb3JtYXR0ZWQ6IHRoaXMudXRpbFNlcnZpY2UuZm9ybWF0RGF0ZShkYXRlLCB0aGlzLm9wdHMuZGF0ZUZvcm1hdCwgdGhpcy5vcHRzLm1vbnRoTGFiZWxzKSwgZXBvYzogTWF0aC5yb3VuZCh0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlKSAvIDEwMDAuMCl9O1xuICAgIH1cblxuICAgIG1vbnRoVGV4dChtOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICAvLyBSZXR1cm5zIG1vbnRoIGFzIGEgdGV4dFxuICAgICAgICByZXR1cm4gdGhpcy5vcHRzLm1vbnRoTGFiZWxzW21dO1xuICAgIH1cblxuICAgIG1vbnRoU3RhcnRJZHgoeTogbnVtYmVyLCBtOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICAvLyBNb250aCBzdGFydCBpbmRleFxuICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGQuc2V0RGF0ZSgxKTtcbiAgICAgICAgZC5zZXRNb250aChtIC0gMSk7XG4gICAgICAgIGQuc2V0RnVsbFllYXIoeSk7XG4gICAgICAgIGxldCBpZHggPSBkLmdldERheSgpICsgdGhpcy5zdW5kYXlJZHgoKTtcbiAgICAgICAgcmV0dXJuIGlkeCA+PSA3ID8gaWR4IC0gNyA6IGlkeDtcbiAgICB9XG5cbiAgICBkYXlzSW5Nb250aChtOiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIC8vIFJldHVybiBudW1iZXIgb2YgZGF5cyBvZiBjdXJyZW50IG1vbnRoXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtLCAwKS5nZXREYXRlKCk7XG4gICAgfVxuXG4gICAgZGF5c0luUHJldk1vbnRoKG06IG51bWJlciwgeTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgLy8gUmV0dXJuIG51bWJlciBvZiBkYXlzIG9mIHRoZSBwcmV2aW91cyBtb250aFxuICAgICAgICBsZXQgZDogRGF0ZSA9IHRoaXMuZ2V0RGF0ZSh5LCBtLCAxKTtcbiAgICAgICAgZC5zZXRNb250aChkLmdldE1vbnRoKCkgLSAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5c0luTW9udGgoZC5nZXRNb250aCgpICsgMSwgZC5nZXRGdWxsWWVhcigpKTtcbiAgICB9XG5cbiAgICBpc0N1cnJEYXkoZDogbnVtYmVyLCBtOiBudW1iZXIsIHk6IG51bWJlciwgY21vOiBudW1iZXIsIHRvZGF5OiBJTXlEYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIC8vIENoZWNrIGlzIGEgZ2l2ZW4gZGF0ZSB0aGUgdG9kYXlcbiAgICAgICAgcmV0dXJuIGQgPT09IHRvZGF5LmRheSAmJiBtID09PSB0b2RheS5tb250aCAmJiB5ID09PSB0b2RheS55ZWFyICYmIGNtbyA9PT0gdGhpcy5jdXJyTW9udGhJZDtcbiAgICB9XG5cbiAgICBnZXRUb2RheSgpOiBJTXlEYXRlIHtcbiAgICAgICAgbGV0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXR1cm4ge3llYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSwgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSArIDEsIGRheTogZGF0ZS5nZXREYXRlKCl9O1xuICAgIH1cblxuICAgIGdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlOiBJTXlEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgZ2V0V2Vla2RheShkYXRlOiBJTXlEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgLy8gR2V0IHdlZWtkYXk6IHN1LCBtbywgdHUsIHdlIC4uLlxuICAgICAgICBsZXQgd2Vla0RheXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLnV0aWxTZXJ2aWNlLmdldFdlZWtEYXlzKCk7XG4gICAgICAgIHJldHVybiB3ZWVrRGF5c1t0aGlzLnV0aWxTZXJ2aWNlLmdldERheU51bWJlcihkYXRlKV07XG4gICAgfVxuXG4gICAgZ2V0RGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIC8vIENyZWF0ZXMgYSBkYXRlIG9iamVjdCBmcm9tIGdpdmVuIHllYXIsIG1vbnRoIGFuZCBkYXlcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5LCAwLCAwLCAwLCAwKTtcbiAgICB9XG5cbiAgICBzdW5kYXlJZHgoKTogbnVtYmVyIHtcbiAgICAgICAgLy8gSW5kZXggb2YgU3VuZGF5IGRheVxuICAgICAgICByZXR1cm4gdGhpcy5kYXlJZHggPiAwID8gNyAtIHRoaXMuZGF5SWR4IDogMDtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUNhbGVuZGFyKG06IG51bWJlciwgeTogbnVtYmVyLCBub3RpZnlDaGFuZ2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRlcy5sZW5ndGggPSAwO1xuICAgICAgICBsZXQgdG9kYXk6IElNeURhdGUgPSB0aGlzLmdldFRvZGF5KCk7XG4gICAgICAgIGxldCBtb250aFN0YXJ0OiBudW1iZXIgPSB0aGlzLm1vbnRoU3RhcnRJZHgoeSwgbSk7XG4gICAgICAgIGxldCBkSW5UaGlzTTogbnVtYmVyID0gdGhpcy5kYXlzSW5Nb250aChtLCB5KTtcbiAgICAgICAgbGV0IGRJblByZXZNOiBudW1iZXIgPSB0aGlzLmRheXNJblByZXZNb250aChtLCB5KTtcblxuICAgICAgICBsZXQgZGF5TmJyOiBudW1iZXIgPSAxO1xuICAgICAgICBsZXQgY21vOiBudW1iZXIgPSB0aGlzLnByZXZNb250aElkO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdlZWs6IEFycmF5PElNeUNhbGVuZGFyRGF5PiA9IFtdO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBGaXJzdCB3ZWVrXG4gICAgICAgICAgICAgICAgbGV0IHBtID0gZEluUHJldk0gLSBtb250aFN0YXJ0ICsgMTtcbiAgICAgICAgICAgICAgICAvLyBQcmV2aW91cyBtb250aFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBwbTsgaiA8PSBkSW5QcmV2TTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlOiBJTXlEYXRlID0ge3llYXI6IG0gPT09IDEgPyB5IC0gMSA6IHksIG1vbnRoOiBtID09PSAxID8gMTIgOiBtIC0gMSwgZGF5OiBqfTtcbiAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHtkYXRlT2JqOiBkYXRlLCBjbW86IGNtbywgY3VyckRheTogdGhpcy5pc0N1cnJEYXkoaiwgbSwgeSwgY21vLCB0b2RheSksXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy51dGlsU2VydmljZS5pc0Rpc2FibGVkRGF5KGRhdGUsIHRoaXMub3B0cy5taW5ZZWFyLCB0aGlzLm9wdHMubWF4WWVhciwgdGhpcy5vcHRzLmRpc2FibGVVbnRpbCwgdGhpcy5vcHRzLmRpc2FibGVTaW5jZSwgdGhpcy5vcHRzLmRpc2FibGVXZWVrZW5kcywgdGhpcy5vcHRzLmRpc2FibGVXZWVrZGF5cywgdGhpcy5vcHRzLmRpc2FibGVEYXlzLCB0aGlzLm9wdHMuZGlzYWJsZURhdGVSYW5nZXMsIHRoaXMub3B0cy5lbmFibGVEYXlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERhdGU6IHRoaXMudXRpbFNlcnZpY2UuaXNNYXJrZWREYXRlKGRhdGUsIHRoaXMub3B0cy5tYXJrRGF0ZXMsIHRoaXMub3B0cy5tYXJrV2Vla2VuZHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiB0aGlzLnV0aWxTZXJ2aWNlLmlzSGlnaGxpZ2h0ZWREYXRlKGRhdGUsIHRoaXMub3B0cy5zdW5IaWdobGlnaHQsIHRoaXMub3B0cy5zYXRIaWdobGlnaHQsIHRoaXMub3B0cy5oaWdobGlnaHREYXRlcyl9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjbW8gPSB0aGlzLmN1cnJNb250aElkO1xuICAgICAgICAgICAgICAgIC8vIEN1cnJlbnQgbW9udGhcbiAgICAgICAgICAgICAgICBsZXQgZGF5c0xlZnQ6IG51bWJlciA9IDcgLSB3ZWVrLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRheXNMZWZ0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGU6IElNeURhdGUgPSB7eWVhcjogeSwgbW9udGg6IG0sIGRheTogZGF5TmJyfTtcbiAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHtkYXRlT2JqOiBkYXRlLCBjbW86IGNtbywgY3VyckRheTogdGhpcy5pc0N1cnJEYXkoZGF5TmJyLCBtLCB5LCBjbW8sIHRvZGF5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnV0aWxTZXJ2aWNlLmlzRGlzYWJsZWREYXkoZGF0ZSwgdGhpcy5vcHRzLm1pblllYXIsIHRoaXMub3B0cy5tYXhZZWFyLCB0aGlzLm9wdHMuZGlzYWJsZVVudGlsLCB0aGlzLm9wdHMuZGlzYWJsZVNpbmNlLCB0aGlzLm9wdHMuZGlzYWJsZVdlZWtlbmRzLCB0aGlzLm9wdHMuZGlzYWJsZVdlZWtkYXlzLCB0aGlzLm9wdHMuZGlzYWJsZURheXMsIHRoaXMub3B0cy5kaXNhYmxlRGF0ZVJhbmdlcywgdGhpcy5vcHRzLmVuYWJsZURheXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGF0ZTogdGhpcy51dGlsU2VydmljZS5pc01hcmtlZERhdGUoZGF0ZSwgdGhpcy5vcHRzLm1hcmtEYXRlcywgdGhpcy5vcHRzLm1hcmtXZWVrZW5kcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IHRoaXMudXRpbFNlcnZpY2UuaXNIaWdobGlnaHRlZERhdGUoZGF0ZSwgdGhpcy5vcHRzLnN1bkhpZ2hsaWdodCwgdGhpcy5vcHRzLnNhdEhpZ2hsaWdodCwgdGhpcy5vcHRzLmhpZ2hsaWdodERhdGVzKX0pO1xuICAgICAgICAgICAgICAgICAgICBkYXlOYnIrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXN0IG9mIHRoZSB3ZWVrc1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXlOYnIgPiBkSW5UaGlzTSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV4dCBtb250aFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5TmJyID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNtbyA9IHRoaXMubmV4dE1vbnRoSWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGU6IElNeURhdGUgPSB7eWVhcjogY21vID09PSB0aGlzLm5leHRNb250aElkICYmIG0gPT09IDEyID8geSArIDEgOiB5LCBtb250aDogY21vID09PSB0aGlzLmN1cnJNb250aElkID8gbSA6IGNtbyA9PT0gdGhpcy5uZXh0TW9udGhJZCAmJiBtIDwgMTIgPyBtICsgMSA6IDEsIGRheTogZGF5TmJyfTtcbiAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHtkYXRlT2JqOiBkYXRlLCBjbW86IGNtbywgY3VyckRheTogdGhpcy5pc0N1cnJEYXkoZGF5TmJyLCBtLCB5LCBjbW8sIHRvZGF5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnV0aWxTZXJ2aWNlLmlzRGlzYWJsZWREYXkoZGF0ZSwgdGhpcy5vcHRzLm1pblllYXIsIHRoaXMub3B0cy5tYXhZZWFyLCB0aGlzLm9wdHMuZGlzYWJsZVVudGlsLCB0aGlzLm9wdHMuZGlzYWJsZVNpbmNlLCB0aGlzLm9wdHMuZGlzYWJsZVdlZWtlbmRzLCB0aGlzLm9wdHMuZGlzYWJsZVdlZWtkYXlzLCB0aGlzLm9wdHMuZGlzYWJsZURheXMsIHRoaXMub3B0cy5kaXNhYmxlRGF0ZVJhbmdlcywgdGhpcy5vcHRzLmVuYWJsZURheXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGF0ZTogdGhpcy51dGlsU2VydmljZS5pc01hcmtlZERhdGUoZGF0ZSwgdGhpcy5vcHRzLm1hcmtEYXRlcywgdGhpcy5vcHRzLm1hcmtXZWVrZW5kcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IHRoaXMudXRpbFNlcnZpY2UuaXNIaWdobGlnaHRlZERhdGUoZGF0ZSwgdGhpcy5vcHRzLnN1bkhpZ2hsaWdodCwgdGhpcy5vcHRzLnNhdEhpZ2hsaWdodCwgdGhpcy5vcHRzLmhpZ2hsaWdodERhdGVzKX0pO1xuICAgICAgICAgICAgICAgICAgICBkYXlOYnIrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgd2Vla05icjogbnVtYmVyID0gdGhpcy5vcHRzLnNob3dXZWVrTnVtYmVycyAgJiYgdGhpcy5vcHRzLmZpcnN0RGF5T2ZXZWVrID09PSBcIm1vXCIgPyB0aGlzLnV0aWxTZXJ2aWNlLmdldFdlZWtOdW1iZXIod2Vla1swXS5kYXRlT2JqKSA6IDA7XG4gICAgICAgICAgICB0aGlzLmRhdGVzLnB1c2goe3dlZWs6IHdlZWssIHdlZWtOYnI6IHdlZWtOYnJ9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0SGVhZGVyQnRuRGlzYWJsZWRTdGF0ZShtLCB5KTtcblxuICAgICAgICBpZiAobm90aWZ5Q2hhbmdlKSB7XG4gICAgICAgICAgICAvLyBOb3RpZnkgcGFyZW50XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyVmlld0NoYW5nZWQuZW1pdCh7eWVhcjogeSwgbW9udGg6IG0sIGZpcnN0OiB7bnVtYmVyOiAxLCB3ZWVrZGF5OiB0aGlzLmdldFdlZWtkYXkoe3llYXI6IHksIG1vbnRoOiBtLCBkYXk6IDF9KX0sIGxhc3Q6IHtudW1iZXI6IGRJblRoaXNNLCB3ZWVrZGF5OiB0aGlzLmdldFdlZWtkYXkoe3llYXI6IHksIG1vbnRoOiBtLCBkYXk6IGRJblRoaXNNfSl9fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJzZVNlbGVjdGVkRGF0ZShzZWxEYXRlOiBhbnkpOiBJTXlEYXRlIHtcbiAgICAgICAgLy8gUGFyc2UgZGF0ZSB2YWx1ZSAtIGl0IGNhbiBiZSBzdHJpbmcgb3IgSU15RGF0ZSBvYmplY3RcbiAgICAgICAgbGV0IGRhdGU6IElNeURhdGUgPSB7ZGF5OiAwLCBtb250aDogMCwgeWVhcjogMH07XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsRGF0ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbGV0IHNkOiBzdHJpbmcgPSA8c3RyaW5nPiBzZWxEYXRlO1xuICAgICAgICAgICAgbGV0IGRmOiBzdHJpbmcgPSB0aGlzLm9wdHMuZGF0ZUZvcm1hdDtcblxuICAgICAgICAgICAgbGV0IGRlbGltZXRlcnM6IEFycmF5PHN0cmluZz4gPSB0aGlzLnV0aWxTZXJ2aWNlLmdldERhdGVGb3JtYXREZWxpbWV0ZXJzKGRmKTtcbiAgICAgICAgICAgIGxldCBkYXRlVmFsdWU6IEFycmF5PElNeURhdGVGb3JtYXQ+ID0gdGhpcy51dGlsU2VydmljZS5nZXREYXRlVmFsdWUoc2QsIGRmLCBkZWxpbWV0ZXJzKTtcbiAgICAgICAgICAgIGRhdGUueWVhciA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0TnVtYmVyQnlWYWx1ZShkYXRlVmFsdWVbMF0pO1xuICAgICAgICAgICAgZGF0ZS5tb250aCA9IGRmLmluZGV4T2YoTU1NKSAhPT0gLTEgPyB0aGlzLnV0aWxTZXJ2aWNlLmdldE1vbnRoTnVtYmVyQnlNb250aE5hbWUoZGF0ZVZhbHVlWzFdLCB0aGlzLm9wdHMubW9udGhMYWJlbHMpIDogdGhpcy51dGlsU2VydmljZS5nZXROdW1iZXJCeVZhbHVlKGRhdGVWYWx1ZVsxXSk7XG4gICAgICAgICAgICBkYXRlLmRheSAgPSB0aGlzLnV0aWxTZXJ2aWNlLmdldE51bWJlckJ5VmFsdWUoZGF0ZVZhbHVlWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc2VsRGF0ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgZGF0ZSA9IHNlbERhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25EYXlUeHQgPSB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUoZGF0ZSwgdGhpcy5vcHRzLmRhdGVGb3JtYXQsIHRoaXMub3B0cy5tb250aExhYmVscyk7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIGpzRGF0ZVRvTXlEYXRlKGRhdGU6IERhdGUpOiBJTXlEYXRlIHtcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksIG1vbnRoOiBkYXRlLmdldE1vbnRoKCkgKyAxLCBkYXk6IGRhdGUuZ2V0RGF0ZSgpfTtcbiAgICB9XG5cbiAgICBwYXJzZVNlbGVjdGVkTW9udGgobXM6IHN0cmluZyk6IElNeU1vbnRoIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXRpbFNlcnZpY2UucGFyc2VEZWZhdWx0TW9udGgobXMpO1xuICAgIH1cblxuICAgIHNldEhlYWRlckJ0bkRpc2FibGVkU3RhdGUobTogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IGRwbTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBsZXQgZHB5OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGxldCBkbm06IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgbGV0IGRueTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmRpc2FibGVIZWFkZXJCdXR0b25zKSB7XG4gICAgICAgICAgICBkcG0gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzTW9udGhEaXNhYmxlZEJ5RGlzYWJsZVVudGlsKHt5ZWFyOiBtID09PSAxID8geSAtIDEgOiB5LCBtb250aDogbSA9PT0gMSA/IDEyIDogbSAtIDEsIGRheTogdGhpcy5kYXlzSW5Nb250aChtID09PSAxID8gMTIgOiBtIC0gMSwgbSA9PT0gMSA/IHkgLSAxIDogeSl9LCB0aGlzLm9wdHMuZGlzYWJsZVVudGlsKTtcbiAgICAgICAgICAgIGRweSA9IHRoaXMudXRpbFNlcnZpY2UuaXNNb250aERpc2FibGVkQnlEaXNhYmxlVW50aWwoe3llYXI6IHkgLSAxLCBtb250aDogbSwgZGF5OiB0aGlzLmRheXNJbk1vbnRoKG0sIHkgLSAxKX0sIHRoaXMub3B0cy5kaXNhYmxlVW50aWwpO1xuICAgICAgICAgICAgZG5tID0gdGhpcy51dGlsU2VydmljZS5pc01vbnRoRGlzYWJsZWRCeURpc2FibGVTaW5jZSh7eWVhcjogbSA9PT0gMTIgPyB5ICsgMSA6IHksIG1vbnRoOiBtID09PSAxMiA/IDEgOiBtICsgMSwgZGF5OiAxfSwgdGhpcy5vcHRzLmRpc2FibGVTaW5jZSk7XG4gICAgICAgICAgICBkbnkgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzTW9udGhEaXNhYmxlZEJ5RGlzYWJsZVNpbmNlKHt5ZWFyOiB5ICsgMSwgbW9udGg6IG0sIGRheTogMX0sIHRoaXMub3B0cy5kaXNhYmxlU2luY2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJldk1vbnRoRGlzYWJsZWQgPSBtID09PSAxICYmIHkgPT09IHRoaXMub3B0cy5taW5ZZWFyIHx8IGRwbTtcbiAgICAgICAgdGhpcy5wcmV2WWVhckRpc2FibGVkID0geSAtIDEgPCB0aGlzLm9wdHMubWluWWVhciB8fCBkcHk7XG4gICAgICAgIHRoaXMubmV4dE1vbnRoRGlzYWJsZWQgPSBtID09PSAxMiAmJiB5ID09PSB0aGlzLm9wdHMubWF4WWVhciB8fCBkbm07XG4gICAgICAgIHRoaXMubmV4dFllYXJEaXNhYmxlZCA9IHkgKyAxID4gdGhpcy5vcHRzLm1heFllYXIgfHwgZG55O1xuICAgIH1cbn1cbiJdfQ==