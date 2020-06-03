import { EventEmitter, OnChanges, SimpleChanges, ElementRef, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { IMyDate, IMyMonth, IMyCalendarMonth, IMyCalendarYear, IMyWeek, IMyOptions, IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged, IMyInputFocusBlur } from "./interfaces/index";
import { LocaleService } from "./services/mydatepicker.locale.service";
import { UtilService } from "./services/mydatepicker.util.service";
export declare const MYDP_VALUE_ACCESSOR: any;
export declare class MyDatePicker implements OnChanges, ControlValueAccessor, OnDestroy {
    elem: ElementRef;
    private cdr;
    private localeService;
    private utilService;
    options: IMyOptions;
    locale: string;
    defaultMonth: string;
    selDate: string;
    placeholder: string;
    selector: number;
    disabled: boolean;
    dateChanged: EventEmitter<IMyDateModel>;
    inputFieldChanged: EventEmitter<IMyInputFieldChanged>;
    calendarViewChanged: EventEmitter<IMyCalendarViewChanged>;
    calendarToggle: EventEmitter<number>;
    inputFocusBlur: EventEmitter<IMyInputFocusBlur>;
    selectorEl: ElementRef;
    inputBoxEl: ElementRef;
    onChangeCb: (_: any) => void;
    onTouchedCb: () => void;
    showSelector: boolean;
    visibleMonth: IMyMonth;
    selectedMonth: IMyMonth;
    selectedDate: IMyDate;
    weekDays: Array<string>;
    dates: Array<IMyWeek>;
    months: Array<Array<IMyCalendarMonth>>;
    years: Array<Array<IMyCalendarYear>>;
    selectionDayTxt: string;
    invalidDate: boolean;
    disableTodayBtn: boolean;
    dayIdx: number;
    selectMonth: boolean;
    selectYear: boolean;
    prevMonthDisabled: boolean;
    nextMonthDisabled: boolean;
    prevYearDisabled: boolean;
    nextYearDisabled: boolean;
    prevYearsDisabled: boolean;
    nextYearsDisabled: boolean;
    prevMonthId: number;
    currMonthId: number;
    nextMonthId: number;
    opts: IMyOptions;
    constructor(elem: ElementRef, cdr: ChangeDetectorRef, localeService: LocaleService, utilService: UtilService);
    setLocaleOptions(): void;
    setOptions(): void;
    getSelectorTopPosition(): string;
    resetMonthYearSelect(): void;
    onSelectMonthClicked(event: any): void;
    onMonthCellClicked(cell: IMyCalendarMonth): void;
    onMonthCellKeyDown(event: any, cell: IMyCalendarMonth): void;
    onSelectYearClicked(event: any): void;
    onYearCellClicked(cell: IMyCalendarYear): void;
    onYearCellKeyDown(event: any, cell: IMyCalendarYear): void;
    onPrevYears(event: any, year: number): void;
    onNextYears(event: any, year: number): void;
    generateYears(year: number): void;
    onUserDateInput(value: string): void;
    onFocusInput(event: any): void;
    onBlurInput(event: any): void;
    onCloseSelector(event: any): void;
    invalidInputFieldChanged(value: string): void;
    isTodayDisabled(): void;
    parseOptions(): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    removeBtnClicked(): void;
    onDecreaseBtnClicked(): void;
    onIncreaseBtnClicked(): void;
    openBtnClicked(): void;
    onClickListener: (evt: MouseEvent) => void;
    addGlobalListener(): void;
    removeGlobalListener(): void;
    onClickDocument(evt: any): void;
    openSelector(reason: number): void;
    closeSelector(reason: number): void;
    setVisibleMonth(): void;
    onPrevMonth(): void;
    onNextMonth(): void;
    onPrevYear(): void;
    onNextYear(): void;
    onTodayClicked(): void;
    onCellClicked(cell: any): void;
    onCellKeyDown(event: any, cell: any): void;
    clearDate(): void;
    decreaseIncreaseDate(decrease: boolean): void;
    selectDate(date: IMyDate, closeReason: number): void;
    setFocusToInputBox(): void;
    updateDateValue(date: IMyDate): void;
    emitDateChanged(date: IMyDate): void;
    getDateModel(date: IMyDate): IMyDateModel;
    monthText(m: number): string;
    monthStartIdx(y: number, m: number): number;
    daysInMonth(m: number, y: number): number;
    daysInPrevMonth(m: number, y: number): number;
    isCurrDay(d: number, m: number, y: number, cmo: number, today: IMyDate): boolean;
    getToday(): IMyDate;
    getTimeInMilliseconds(date: IMyDate): number;
    getWeekday(date: IMyDate): string;
    getDate(year: number, month: number, day: number): Date;
    sundayIdx(): number;
    generateCalendar(m: number, y: number, notifyChange: boolean): void;
    parseSelectedDate(selDate: any): IMyDate;
    jsDateToMyDate(date: Date): IMyDate;
    parseSelectedMonth(ms: string): IMyMonth;
    setHeaderBtnDisabledState(m: number, y: number): void;
}