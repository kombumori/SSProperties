/**
 * A class representing properties stored in a Google Sheets spreadsheet.
 * @class
 */
class SSProperties {
  /**
   * Creates an instance of SSProperties.
   * @constructor
   * @param {string} id - The ID of the Google Sheets spreadsheet.
   * @param {string} name - The name of the sheet within the spreadsheet.
   * @param {boolean} [updateEachTime=true] - Flag indicating whether to update the sheet each time a property is modified.
   */
  constructor(id, name, updateEachTime = true) {
    this.sheet = SpreadsheetApp.openById(id).getSheetByName(name);
    this.length = this.sheet.getLastRow();
    this.propertiesMap = this.length ? new Map(this.sheet.getRange(1, 1, this.length, 2).getValues()) : new Map();
    this.updateEachTime = updateEachTime;
  }

  /**
   * Deletes all properties from the spreadsheet.
   * @returns {SSProperties} The SSProperties instance for method chaining.
   */
  deleteAllProperties() {
    this.propertiesMap.clear();
    this.updateEachTime && this.updateSheet_();
    return this;
  }

  /**
   * Deletes a property with the specified key.
   * @param {string} key - The key of the property to delete.
   * @returns {SSProperties} The SSProperties instance for method chaining.
   */
  deleteProperty(key) {
    this.propertiesMap.delete(key);
    this.updateEachTime && this.updateSheet_();
    return this;
  }

  /**
   * Retrieves an array of all keys present in the properties.
   * @returns {Array<string>} An array containing all keys.
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
   * Retrieves the value of the property with the specified key.
   * @param {string} key - The key of the property to retrieve.
   * @returns {string} The value of the property, or null if the property does not exist.
   */
  getProperty(key) {
    return this.propertiesMap.get(key) || null;
  }

  /**
   * Sets properties from the provided object.
   * @param {Object} properties - An object containing key-value pairs of properties.
   * @param {boolean} [deleteAllOthers=false] - Flag indicating whether to delete all other properties before setting new ones.
   * @returns {SSProperties} The SSProperties instance for method chaining.
   */
  setProperties(properties, deleteAllOthers = false) {
    deleteAllOthers && this.propertiesMap.clear();
    Object.keys(properties).forEach(key => this.propertiesMap.set(key, properties[key]));
    this.updateEachTime && this.updateSheet_();
    return this;
  }

  /**
   * Sets the value of a property with the specified key.
   * @param {string} key - The key of the property to set.
   * @param {string} value - The value to set for the property.
   * @returns {SSProperties} The SSProperties instance for method chaining.
   */
  setProperty(key, value) {
    this.propertiesMap.set(key, value);
    this.updateEachTime && this.updateSheet_();
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

  /**
   * Forces an update of the Google Sheets spreadsheet with the current properties.
   * @returns {SSProperties} The SSProperties instance for method chaining.
   */
  update() {
    this.updateSheet_();
    return this;
  }
}

/**
 * Factory function to create an instance of SSProperties.
 * @param {string} id - The ID of the Google Sheets spreadsheet.
 * @param {string} name - The name of the sheet within the spreadsheet.
 * @param {boolean} [updateEachTime=true] - Flag indicating whether to update the sheet each time a property is modified.
 * @returns {SSProperties} An instance of SSProperties.
 */
function getSSProperties(id, name, updateEachTime = true) {
  return new SSProperties(id, name, updateEachTime);
}
