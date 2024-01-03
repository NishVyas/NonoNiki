import { FormControl, ValidationErrors } from "@angular/forms";

export class NonoNikiValidators {

    // Whitespace validation
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors {
        // Check if string only contains whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {
            // Invalid, return error object
            return { 'notOnlyWhiteSpace': true };
        }
        else {
            // Valid, return null
            return null;
        }
    }
}
