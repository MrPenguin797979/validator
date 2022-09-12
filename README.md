# Validator

A validate form library

# Demo

## Rules

### Required

```
Validator({
  form: "#form",
  rules: {
    required: ["#form-input", "#form-password"]
  }
});
```

### Email

```
Validator({
  form: "#form",
  rules: {
    email: ["#form-email"]
  }
});
```

### Password

```
Validator({
  form: "#form",
  rules: {
    password: ["#form-password"]
  }
});
```

### Password length

```
Validator({
  form: "#form",
  rules: {
    passwordLength: 9
  }
});
```

## Message

- If you wouldn't like to edit a message, we will take the default

### Required

```
Validator({
  form: "#form",
  message: {
    requiredMessage: "Enter this field"
  }
});
```

### Email

```
Validator({
  form: "#form",
  message: {
    emailMessage: "Your email is invalid"
  }
});
```

### Password

```
Validator({
  form: "#form",
  message: {
    passwordMessage: "Your password is easy to hack"
  }
});
```
