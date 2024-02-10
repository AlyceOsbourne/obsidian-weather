# Obsidian Weather Plugin

The Obsidian Weather Plugin is a powerful addition to your Obsidian note-taking application, allowing you to seamlessly integrate real-time weather information directly into your notes. This plugin fetches current weather data, including temperature, humidity, wind speed, and more, based on your specified location.

## Features

- **Weather Tags**: Embed weather information using `span` tags with the class `.weather-tag` in your markdown notes. The plugin dynamically replaces these tags with the current weather data.
- **Dynamic Weather Data**: Fetches the latest weather data for your specified city using the WeatherAPI.com service.
- **Customizable Settings**: Easily configure the plugin with your API key and preferred city directly within Obsidian's settings.
- **Ribbon Icon**: Quick access to refresh weather data with a dedicated ribbon icon.
- **Error Handling**: Graceful error handling and messaging in case of issues fetching weather data.

Installation via Community Plugins
Note: This will be available shortly

Open Settings > Community Plugins in Obsidian.
Disable Safe Mode.
Click on Browse and search for "Weather".
Install the plugin and activate it from your installed plugins list.

Manual Installation
For manual installation, download main.js and manifest.json from the latest release in the Weather GitHub repository. Place these files in a new folder named weather within the .obsidian/plugins directory of your Obsidian vault. Activate the plugin through the Community Plugins section in Obsidian's settings.

## Usage

After installation, perform the following steps to start using the plugin:

1. **Set API Key and City**:
    - Go to `Settings` > `Plugin Options` > `Weather`.
    - Enter your WeatherAPI.com API key and the city name for which you want the weather information.

2. **Insert Weather Tags**:
    - In your markdown notes, insert `span` tags with the class `.weather-tag` and include placeholders for the weather data you want to display (e.g., `&temp_c`, `&humidity`).

3. **Refresh Weather Data**:
    - Click on the cloud icon in the ribbon to fetch the latest weather data.
    - The plugin will automatically replace the placeholders in your notes with the current weather information.

## Customization

You can customize the appearance of weather icons by adding `data-icon-width` and `data-icon-height` attributes to the `span.weather-tag` elements in your markdown notes to specify the size of the weather icons.

## API Key

To use this plugin, you'll need an API key from WeatherAPI.com. Sign up on their website and generate an API key to be used with this plugin.

## Contributing

Contributions to the plugin are welcome! Please refer to the repository's issues and pull requests sections for current work and contribution guidelines.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Please note that this README is a template and might need adjustments based on your specific implementation details and repository structure.
