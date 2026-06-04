package org.example.backend.Validator;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ZipValidator.class)
public @interface Zip {
    String message() default "Invalid Zip Code";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
