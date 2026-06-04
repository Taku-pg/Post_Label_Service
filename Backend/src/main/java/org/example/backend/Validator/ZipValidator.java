package org.example.backend.Validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ZipValidator implements ConstraintValidator<Zip, String> {
    @Override
    public void initialize(Zip constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        String regex = "^[0-9]{5,9}$";
        return value.matches(regex);
    }
}
