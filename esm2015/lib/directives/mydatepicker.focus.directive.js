import { __decorate } from "tslib";
import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";
let FocusDirective = class FocusDirective {
    constructor(el) {
        this.el = el;
    }
    // Focus to element: if value 0 = don't set focus, 1 = set focus
    ngAfterViewInit() {
        if (this.value === "0") {
            return;
        }
        this.el.nativeElement.focus();
    }
};
FocusDirective.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input("mydpfocus")
], FocusDirective.prototype, "value", void 0);
FocusDirective = __decorate([
    Directive({
        selector: "[mydpfocus]"
    })
], FocusDirective);
export { FocusDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlkYXRlcGlja2VyLmZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL215ZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL215ZGF0ZXBpY2tlci5mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNNUUsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUd2QixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUFHLENBQUM7SUFFdEMsZ0VBQWdFO0lBQ2hFLGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xDLENBQUM7Q0FDSixDQUFBOztZQVQyQixVQUFVOztBQUZkO0lBQW5CLEtBQUssQ0FBQyxXQUFXLENBQUM7NkNBQWU7QUFEekIsY0FBYztJQUoxQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtLQUMxQixDQUFDO0dBRVcsY0FBYyxDQVkxQjtTQVpZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW215ZHBmb2N1c11cIlxufSlcblxuZXhwb3J0IGNsYXNzIEZvY3VzRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KFwibXlkcGZvY3VzXCIpIHZhbHVlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgLy8gRm9jdXMgdG8gZWxlbWVudDogaWYgdmFsdWUgMCA9IGRvbid0IHNldCBmb2N1cywgMSA9IHNldCBmb2N1c1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IFwiMFwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufSJdfQ==