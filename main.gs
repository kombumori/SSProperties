/**
 * Class representing a set of properties stored in a Google Sheets spreadsheet.
 */
class SSProperties {
  /**
   * Creates an instance of SSProperties.
   * @param {string} id - The ID of the Google Sheets spreadsheet.
   * @param {string} name - The name of the sheet within the spreadsheet.
   */
  constructor(id, name) {
    this.sheet = SpreadsheetApp.openById(id).getSheetByName(name);
    this.length = this.sheet.getLastRow();
    this.propertiesMap = this.length ? new Map(this.sheet.getRange(1, 1, this.length, 2).getValues()) : new Map();
  }

  /**
   * Deletes all properties from the spreadsheet.
   * @returns {SSProperties} The instance of SSProperties.
   */
  deleteAllProperties() {
    this.propertiesMap.clear();
    this.updateSheet_();
    return this;
  }

  /**
   * Deletes a property with the specified key.
   * @param {string} key - The key of the property to delete.
   * @returns {SSProperties} The instance of SSProperties.
   */
  deleteProperty(key) {
    this.propertiesMap.delete(key);
    this.updateSheet_();
    return this;
  }

  /**
   * Retrieves an array containing all keys of the properties.
   * @returns {string[]} An array containing all keys of the properties.
   */
  getKeys() {
    return [...this.propertiesMap.keys()];
  }

  /**
   * Retrieves all properties as an object.
   * @returns {Object} An object containing all properties.
   */
  getProperties() {
    return Object.fromEntries(this.propertiesMap);
  }

  /**
   * Retrieves the value of the property associated with the specified key.
   * @param {string} key - The key of the property to retrieve.
   * @returns {any} The value of the property, or null if not found.
   */
  getProperty(key) {
    return this.propertiesMap.get(key) || null;
  }

  /**
   * Sets properties from the provided object. Optionally, deletes all other properties.
   * @param {Object} properties - The properties to set.
   * @param {boolean} [deleteAllOthers=false] - Indicates whether to delete all other properties.
   * @returns {SSProperties} The instance of SSProperties.
   */
  setProperties(properties, deleteAllOthers = false) {
    deleteAllOthers && this.propertiesMap.clear();
    Object.keys(properties).forEach(key => this.propertiesMap.set(key, properties[key]));
    this.updateSheet_();
    return this;
  }

  /**
   * Sets a property with the specified key and value.
   * @param {string} key - The key of the property to set.
   * @param {any} value - The value of the property.
   * @returns {SSProperties} The instance of SSProperties.
   */
  setProperty(key, value) {
    this.propertiesMap.set(key, value);
    this.updateSheet_();
    return this;
  }

  /**
   * Updates the Google Sheets spreadsheet with the current properties.
   * @private
   */
  updateSheet_() {
    this.length && this.sheet.deleteRows(1, this.length);
    this.sheet.getRange(1, 1, this.propertiesMap.size, 2).setValues([...this.propertiesMap.entries()]);
    this.length = this.sheet.getLastRow();
  }
}

/**
 * Factory function to create an instance of SSProperties.
 * @param {string} id - The ID of the Google Sheets spreadsheet.
 * @param {string} name - The name of the sheet within the spreadsheet.
 * @returns {SSProperties} An instance of SSProperties.
 */
function getSSProperties(id, name) {
  return new SSProperties(id, name);
}
