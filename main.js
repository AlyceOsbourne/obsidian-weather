const obsidian = require('obsidian');

class Weather extends obsidian.Plugin {
    async onload() {
        await this.loadSettings();

        this.settingsTab = new WeatherSettings(this.app, this);
        this.addSettingTab(this.settingsTab);

        this.registerMarkdownPostProcessor((el, ctx) => {
            const weatherTags = el.querySelectorAll('span.weather-tag');
            weatherTags.forEach(span => {
                this.processWeatherTag(span);
            });
        });

        this.addRibbonIcon('cloud', 'Weather', async () => {
            await this.fetchWeather();
            this.refreshViews();
        });
    }

    async fetchWeather() {
        const apiKey = this.settings.apiKey;
        const cityName = this.settings.cityName;
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                this.weatherData = {
                    city: cityName,
                    weather: data.current.condition.text,
                    temp_c: `${data.current.temp_c}°C`,
                    temp_f: `${data.current.temp_f}°F`,
                    humidity: `${data.current.humidity}%`,
                    wind_kph: `${data.current.wind_kph} kph`,
                    wind_mph: `${data.current.wind_mph} mph`,
                    uv: data.current.uv,
                    icon: `https:${data.current.condition.icon}`, // Ensure the URL is correct
                    // Add more data elements as needed, matching the API response
                };
                return this.weatherData;
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                this.weatherData = {
                    error: 'Error fetching weather. Check console for details.'
                };
                return this.weatherData;
            });
    }

processWeatherTag(span) {
    const textContent = span.textContent;
    const placeholders = textContent.match(/&\w+/g) || [];

    if (placeholders.length > 0) {
        this.fetchWeather().then(() => {
            placeholders.forEach(placeholder => {
                const key = placeholder.substring(1); // Remove '&' prefix
                if (key === 'icon' && this.weatherData[key]) {
                    // Create an image element for the icon
                    const img = document.createElement('img');
                    img.src = this.weatherData[key];
                    img.alt = "Weather Icon";

                    // Use custom attributes for width and height if available, or default to 20px
                    const iconWidth = span.getAttribute('data-icon-width') || '20px';
                    const iconHeight = span.getAttribute('data-icon-height') || '20px';

                    img.style.width = iconWidth;
                    img.style.height = iconHeight;
                    img.style.verticalAlign = 'middle'; // Align with text

                    // Replace the span with the image
                    span.replaceWith(img);
                } else {
                    // Replace text placeholders
                    const value = this.weatherData[key] || `No data for ${key}`;
                    span.textContent = span.textContent.replace(placeholder, value);
                }
            });
        });
    }
}

	
    refreshViews() {
        this.app.workspace.iterateRootLeaves(leaf => {
            if (leaf.view.getViewType() === 'markdown') {
                leaf.view.previewMode.rerender(true);
            }
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class WeatherSettings extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Weather Settings' });

        new obsidian.Setting(containerEl)
            .setName('API Key')
            .setDesc('Enter your WeatherAPI.com API Key')
            .addText(text => text
                .setPlaceholder('API Key')
                .setValue(this.plugin.settings.apiKey || '')
                .onChange(async (value) => {
                    this.plugin.settings.apiKey = value;
                    await this.plugin.saveSettings();
                }));

        new obsidian.Setting(containerEl)
            .setName('City Name')
            .setDesc('Enter the city name for which you want the weather')
            .addText(text => text
                .setPlaceholder('City Name')
                .setValue(this.plugin.settings.cityName || '')
                .onChange(async (value) => {
                    this.plugin.settings.cityName = value;
                    await this.plugin.saveSettings();
                }));
    }
}

module.exports = Weather;
