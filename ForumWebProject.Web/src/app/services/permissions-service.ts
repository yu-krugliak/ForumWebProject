import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class PermissionsManager{
    permissions: Array<string> = [];

    public setPermissions(permissions: Array<string>){
        this.permissions = permissions;
        localStorage.setItem('permissions', JSON.stringify(this.permissions));
        console.log(`set ${this.permissions}`);
    }

    public hasPermission(permission: string) : boolean{
        return this.permissions.includes(permission);
    }

    public clear(){
        this.permissions = [];
        localStorage.removeItem('permissions');
    }
    constructor(){
        console.log('Permissions manager created!');
        this.permissions = JSON.parse(localStorage.getItem('permissions') ?? '[]');
    }
}