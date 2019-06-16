#REACT-super-simple-form#

This is a lightweight form component for REACT, built with Hooks.

##API##
Here are the exported components:

###Form###
Form can take three arguments:

-`onSubmit`: Required. The function to execute on Submit,
-`validator`: Takes the `values` object, returns the `errors` one,
-`defaultValues`: Object with the default values for the form.

Moreover, any other argument is passed to the `<form>` element (e.g. `class`).
It is a wrapper component, so it can take any children elemeny.

```javascript
Form.propTypes = {
  onSubmit: PropTypes.func,
  validator: PropTypes.func,
  defaultValues: PropTypes.object
  children: PropTypes.arrayOf(PropTypes.element),
};
```

###Input###
Input element is required to use inputs. It takes:

-`types`: Required. The type of input (`text`, `checkbox`, `submit`, etc.)
-`name`: Required. The name under which the value will go in `values`.

Any other props is passed to the HTML element.

```javascript
Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
```


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).