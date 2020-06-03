import { __decorate } from "tslib";
import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";
var FocusDirective = /** @class */ (function () {
    function FocusDirective(el) {
        this.el = el;
    }
    // Focus to element: if value 0 = don't set focus, 1 = set focus
    FocusDirective.prototype.ngAfterViewInit = function () {
        if (this.value === "0") {
            return;
        }
        this.el.nativeElement.focus();
    };
    FocusDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input("mydpfocus")
    ], FocusDirective.prototype, "value", void 0);
    FocusDirective = __decorate([
        Directive({
            selector: "[mydpfocus]"
        })
    ], FocusDirective);
    return FocusDirective;
}());
export { FocusDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlkYXRlcGlja2VyLmZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL215ZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL215ZGF0ZXBpY2tlci5mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNNUU7SUFHSSx3QkFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDO0lBRXRDLGdFQUFnRTtJQUNoRSx3Q0FBZSxHQUFmO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsRUFBRTtZQUNwQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDOztnQkFSdUIsVUFBVTs7SUFGZDtRQUFuQixLQUFLLENBQUMsV0FBVyxDQUFDO2lEQUFlO0lBRHpCLGNBQWM7UUFKMUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7U0FDMUIsQ0FBQztPQUVXLGNBQWMsQ0FZMUI7SUFBRCxxQkFBQztDQUFBLEFBWkQsSUFZQztTQVpZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW215ZHBmb2N1c11cIlxufSlcblxuZXhwb3J0IGNsYXNzIEZvY3VzRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KFwibXlkcGZvY3VzXCIpIHZhbHVlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgLy8gRm9jdXMgdG8gZWxlbWVudDogaWYgdmFsdWUgMCA9IGRvbid0IHNldCBmb2N1cywgMSA9IHNldCBmb2N1c1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IFwiMFwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufSJdfQ==