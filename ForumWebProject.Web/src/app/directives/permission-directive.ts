import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { PermissionsManager } from "../services/permissions-service";


@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
    private permission = '';
    
    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private permissionsManager: PermissionsManager
    ) {
    }

    ngOnInit() {
        
    }

    @Input()
    set hasPermission(value: string) {
        this.permission = value;
        this.updateView();
    }

    private updateView() {
        if (this.checkPermission()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    private checkPermission() {
       return this.permissionsManager.hasPermission(this.permission);
    }
}