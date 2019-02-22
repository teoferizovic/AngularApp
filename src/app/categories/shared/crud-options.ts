import { NgForm } from '@angular/forms';

export interface CrudOptions {

    create(form: NgForm);
    read();
    delete(id : string);
    update?(id : string);

}
