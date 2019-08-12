import { ElementRef } from '@angular/core';

declare var M // искусственно задаю переменную чтобы избежать ошибок

export class MaterialService {
    static toast(message: string) {
        M.toast({html: message})
    }

    static initializeFloatingButton(ref: ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement)
    }
}