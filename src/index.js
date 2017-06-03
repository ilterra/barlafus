// @flow
import path from 'path';

/**
 * Flow type aliases
 */
type SettingsType = {
  destination: string,
  source: string
};

type BarlafusType = {
  projectDir: string,
  settings: SettingsType
};

const Barlafus = {
  /**
   * Initialize a Barlafus generator object
   * @param {String} projectDir Project's root directory
   * @return {Barlafus} Generator object
   */
  init(projectDir: string): BarlafusType {
    this.setProjectDir(projectDir);
    this.loadSettings();
    return this;
  },

  /**
   * Set the project's root directory
   * @param {String} projectDir Project's root directory
   * @return {undefined}
   */
  setProjectDir(projectDir: string): void {
    if (!projectDir.length) {
      throw new Error('Empty string provided as project directory');
    }
    this.projectDir = projectDir;
  },

  /**
   * Get the project's root directory
   * @return {String} Project's root directory
   */
  getProjectDir(): string {
    return path.resolve(this.projectDir);
  },

  /**
   * Load custom settings from settings.json and merge them with default ones
   * @return {undefined}
   */
  loadSettings(): void {
    const customSettingsPath = path.join(this.getProjectDir(), 'settings.json');

    try {
      const customSettings = require(customSettingsPath);
      this.settings = Object.assign(this.getDefaultSettings(), customSettings);
    } catch (e) {
      throw new Error('Can\'t load settings from settings.json');
    }
  },

  /**
   * Get default settings
   * @return {Object} Deafualt generator settings
   */
  getDefaultSettings(): SettingsType {
    const defaultSettingsPath = path.join(__dirname, 'settings', 'default.json');

    try {
      return require(defaultSettingsPath);
    } catch (e) {
      throw new Error('Can\'t load settings from default.json');
    }
  },

  /**
   * Get settings
   * @return {Object} Generator settings
   */
  getSettings(): SettingsType {
    return this.settings;
  }
};

module.exports = Barlafus;
