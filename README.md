# csslocals-from-js-loader
Transfer css classname-localizedId maps to css-loader's import format witch is used in ```:import(...)``` in css/less file.

When use module css with webpack, the :import() statement will look for ``` { locals }```, which has the format:
```
{
    class_A: localized_id_A,
    class_B: localized_id_B,
    ...
}
```

If a JS module exports some classname-localizedId map to exports.moduleXXX, the csslocals-from-js-loader will import it according to the option and export all the imported key maps to exports.locals.
Options:
```
{
  exports: [
    "locals",           // default, the name of css module imported. 
    "moduleXXX"
  ]
}
```

