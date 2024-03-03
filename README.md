## SSProperties - Google Sheets Key-Value Database on Google Apps Script

SSProperties is a Google Apps Script Library designed to manage key-value properties stored within a Google Sheets spreadsheet. It serves as a convenient Key-Value Database solution that integrates seamlessly with Google Sheets, offering functionalities similar to the [PropertiesService](https://developers.google.com/apps-script/reference/properties/properties-service) in Google Apps Script.

### Features

- **Google Sheets Integration**: Utilize Google Sheets as a Key-Value Database for your projects.
- **Flexible Configuration**: Easily handle properties within your Google Sheets environment.
- **Efficient Operations**: Supports various property operations while efficiently interacting with Google Sheets.

### Installation

To integrate SSProperties into your Google Sheets project, follow these steps:

1. Import SSProperties library and select latest version

Library ID : `1Ps1uMS5O65dsidmhs4TJZS5b6OVCiuqcFEuAE1iGhwO_huOF6JCb7IId`

2. Ensure your Google Apps Script project is linked to your Google Sheets spreadsheet.

### Usage

Here's how you can use SSProperties in your project:

1. Initialize SSProperties:

```javascript
const properties = SSProperties.getSSProperties('spreadsheet_id', 'sheet_name');
```

2. Set properties:

```javascript
properties.setProperties({
  'key1': 'value1',
  'key2': 'value2'
});
```

3. Retrieve properties:

```javascript
const value = properties.getProperty('key1');
```

4. Delete properties:

```javascript
properties.deleteProperty('key1');
```

### Behavior Consideration

Setting `updateEachTime` to `false` may improve performance by reducing the frequency of sheet updates. However, it increases the risk of conflicts with other SSProperties instances accessing the same spreadsheet simultaneously.

### API Reference

#### `getSSProperties(id: string, name: string, updateEachTime: boolean = true): SSProperties`

Factory function to create an instance of SSProperties.

- `id`: The ID of the Google Sheets spreadsheet.
- `name`: The name of the sheet within the spreadsheet.
- `updateEachTime`: Flag indicating whether to update the sheet each time a property is modified (default is `true`). If this is `true`, there is no need to `update()` every time. **Note that if each `get` method is executed, the sheet will not be updated.**

#### `SSProperties` Class

##### `deleteAllProperties(): SSProperties`

Deletes all properties from the spreadsheet.

##### `deleteProperty(key: string): SSProperties`

Deletes a property with the specified key.

- `key`: The key of the property to delete.

##### `getKeys(): Array<string>`

Retrieves an array of all keys present in the properties.

##### `getProperties(): Object`

Retrieves all properties as an object.

##### `getProperty(key: string): string`

Retrieves the value of the property with the specified key.

- `key`: The key of the property to retrieve.

##### `setProperties(properties: Object, deleteAllOthers: boolean = false): SSProperties`

Sets properties from the provided object.

- `properties`: An object containing key-value pairs of properties.
- `deleteAllOthers`: Flag indicating whether to delete all other properties before setting new ones (default is `false`).

##### `setProperty(key: string, value: string): SSProperties`

Sets the value of a property with the specified key.

- `key`: The key of the property to set.
- `value`: The value to set for the property.

##### `update(): SSProperties`

Forces an update of the Google Sheets spreadsheet with the current properties. If `updateEachTime` is `true`, there is no need to `update()` every time.

### License

This project is licensed under the [CC0 1.0 Universal (CC0 1.0) Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/). You are free to use, modify, and distribute the code without any restrictions.

### This Readme was written by ChatGPT