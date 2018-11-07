import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BlockUICustomComponent } from './block-ui.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/blockui';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        ProgressSpinnerModule,
        BlockUIModule,
        //RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BlockUICustomComponent
    ],
    entryComponents: [
        BlockUICustomComponent,
    ],
    providers: [],
    exports: [
        BlockUICustomComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlockUICustomComponentModule {
}
