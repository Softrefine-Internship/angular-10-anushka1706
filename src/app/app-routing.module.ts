import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ViewComponent } from './view/view.component';
import { UploadFileComponent } from './upload-file/upload-file.component'

const routes: Routes = [

    {
        path: '',
        component: GalleryComponent,
    }, {
        path: 'upload',
        component: UploadFileComponent
    },
    { path: 'view/:id', component: ViewComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }