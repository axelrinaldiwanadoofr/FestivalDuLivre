import { NgModule } from '@angular/core';
import { PlanComponent } from './plan/plan';
import { ListeFrmSqlModeleComponent } from './liste-frm-sql-modele/liste-frm-sql-modele';
import { ListeFrmLineComponent } from './liste-frm-line/liste-frm-line';
import { TabFormComponent } from './tab-form/tab-form';
import { TabRowComponent } from './tab-row/tab-row';
import { TabCellComponent } from './tab-cell/tab-cell';
import { TabColHeaderComponent } from './tab-col-header/tab-col-header';
import { TabBtSaveComponent } from './tab-bt-save/tab-bt-save';
import { TabLineSelectorComponent } from './tab-line-selector/tab-line-selector';
import { TabBtCancelComponent } from './tab-bt-cancel/tab-bt-cancel';
import { TabBtRemoveComponent } from './tab-bt-remove/tab-bt-remove';
import { TabBtNewComponent } from './tab-bt-new/tab-bt-new';
import { FileSelectorComponent } from './file-selector/file-selector';
import { TextAreaComponent } from './text-area/text-area';
@NgModule({
	declarations: [ListeFrmSqlModeleComponent,
	PlanComponent,
    ListeFrmLineComponent,
    TabFormComponent,
    TabRowComponent,
    TabCellComponent,
    TabColHeaderComponent,
    TabBtSaveComponent,
    TabBtSaveComponent,
    TabBtSaveComponent,
    TabLineSelectorComponent,
    TabBtCancelComponent,
    TabBtRemoveComponent,
    TabBtNewComponent,
    FileSelectorComponent,
    TextAreaComponent],
	imports: [],
	exports: [ListeFrmSqlModeleComponent,
	PlanComponent,
    ListeFrmLineComponent,
    TabFormComponent,
    TabRowComponent,
    TabCellComponent,
    TabColHeaderComponent,
    TabBtSaveComponent,
    TabBtSaveComponent,
    TabBtSaveComponent,
    TabLineSelectorComponent,
    TabBtCancelComponent,
    TabBtRemoveComponent,
    TabBtNewComponent,
    FileSelectorComponent,
    TextAreaComponent]
})
export class ComponentsModule {}
