document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todas as imagens que devem ter o comportamento de zoom
    const images = document.querySelectorAll('.zoom-on-click');

    // Percorre cada imagem selecionada
    images.forEach(img => {
        // Adiciona um 'listener' de clique para cada imagem
        img.addEventListener('click', function() {
            // Verifica se a imagem clicada JÁ ESTÁ com zoom
            const isZoomed = this.classList.contains('zoomed');

            // Remove a classe 'zoomed' de TODAS as outras imagens
            // Isso garante que apenas uma imagem esteja com zoom de cada  vez
            images.forEach(otherImg => {
                otherImg.classList.remove('zoomed');
            });

            // Se a imagem clicada NÃO ESTAVA com zoom, adicione a classe 'zoomed' a ela
            // Se ela JÁ ESTAVA com zoom (isZoomed é true), a classe já foi removida no loop acima, desfazendo o zoom
            if (!isZoomed) {
                this.classList.add('zoomed');
            }
        });
    });

    // Opcional: reduzir a imagem quando o utilizador clica FORA dela
    document.addEventListener('click', function(event) {
        // Verifica se o clique ocorreu fora de qualquer imagem com a classe 'zoom-on-click'
        if (!event.target.closest('.zoom-on-click')) {
            images.forEach(img => {
                img.classList.remove('zoomed'); // Remove o zoom de todas as imagens
            });
        }
    });
});

// Meteorologia

document.addEventListener('DOMContentLoaded', function() {
    const weatherInfoDiv = document.getElementById('weather-info');

    // Coordenadas fixas para Lisboa, Portugal
    const LISBON_LATITUDE = 38.7223;
    const LISBON_LONGITUDE = -9.1393;
    // Não precisamos de LISBON_NAME se não vamos exibi-lo

    // Mapeamento de códigos meteorológicos para descrições em português
    function getWeatherDescription(code) {
        switch(code) {
            case 0: return 'Céu Limpo'; case 1: return 'Principalmente Limpo';
            case 2: return 'Parcialmente Nublado'; case 3: return 'Nublado';
            case 45: return 'Nevoeiro'; case 48: return 'Nevoeiro de Geada';
            case 51: return 'Chuvisco Leve'; case 53: return 'Chuvisco Moderado'; case 55: return 'Chuvisco Denso';
            case 56: return 'Chuvisco Congelante Leve'; case 57: return 'Chuvisco Congelante Denso';
            case 61: return 'Chuva Leve'; case 63: return 'Chuva Moderada'; case 65: return 'Chuva Forte';
            case 66: return 'Chuva Congelante Leve'; case 67: return 'Chuva Congelante Forte';
            case 71: return 'Queda de Neve Fraca'; case 73: return 'Queda de Neve Moderada'; case 75: return 'Queda de Neve Forte';
            case 77: return 'Grãos de Neve';
            case 80: return 'Aguaceiros Leves'; case 81: return 'Aguaceiros Moderados'; case 82: return 'Aguaceiros Violentos';
            case 85: return 'Queda de Neve Leve'; case 86: return 'Queda de Neve Forte';
            case 95: return 'Trovoada Leve ou Moderada'; case 96: return 'Trovoada com Granizo Leve'; case 99: return 'Trovoada com Granizo Forte';
            default: return 'Condição Desconhecida';
        }
    }

    // Função para obter o ícone do tempo (usando emojis para simplificar)
    function getWeatherIcon(code) {
        if (code >= 0 && code <= 3) return '☀️'; // Sol / Nublado
        if (code >= 51 && code <= 67) return '🌧️'; // Chuva
        if (code >= 71 && code <= 77) return '❄️'; // Neve
        if (code >= 80 && code <= 82) return '☔'; // Aguaceiros
        if (code >= 95) return '⛈️'; // Trovoada
        return '❓'; // Desconhecido
    }

    // Função para obter e exibir a meteorologia com base nas coordenadas
    async function fetchAndDisplayWeather(latitude, longitude) {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&wind_speed_unit=ms&precipitation_unit=mm&timezone=auto`; 
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Erro ao obter dados meteorológicos: Status ${response.status}`);
            }
            
            const data = await response.json();
            
            const currentWeather = data.current_weather;
            const temperature = Math.round(currentWeather.temperature);
            const weatherCode = currentWeather.weathercode;
            const description = getWeatherDescription(weatherCode);
            const icon = getWeatherIcon(weatherCode);

            weatherInfoDiv.innerHTML = `
                <span style="font-size: 1.2em; margin-right: 5px;">${icon}</span>
                <span>${temperature}°C</span>
                `;

        } catch (error) {
            console.error('Erro ao carregar a meteorologia:', error);
            weatherInfoDiv.innerHTML = `
                <span class="text-danger small">Erro ao carregar tempo.</span>
            `;
        }
    }

    // Função para lidar com o sucesso da obtenção da localização
    function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Localização obtida via GPS: Lat ${latitude}, Lng ${longitude}`);
        fetchAndDisplayWeather(latitude, longitude);
    }

    // Função para lidar com o erro na obtenção da localização (fallback para Lisboa)
    function errorCallback(error) {
        console.warn(`ERRO GEOLOCALIZAÇÃO (${error.code}): ${error.message}`);
        // Fallback direto para Lisboa
        console.info('A carregar meteorologia de Lisboa como padrão.');
        fetchAndDisplayWeather(LISBON_LATITUDE, LISBON_LONGITUDE); // Não passamos mais o LISBON_NAME
    }

    // Iniciar o processo: tentar primeiro a Geolocation API
    function startWeatherProcess() {
         weatherInfoDiv.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span>A carregar tempo...</span>
        `;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                successCallback,
                errorCallback,
                {
                    enableHighAccuracy: true,
                    timeout: 7000,          
                    maximumAge: 0            
                }
            );
        } else {
            // Browser não suporta Geolocation API, ir direto para Lisboa
            console.warn("Geolocation não suportada no seu navegador. A carregar Lisboa como padrão.");
            fetchAndDisplayWeather(LISBON_LATITUDE, LISBON_LONGITUDE);
        }
    }

    // Chamar a função principal para iniciar o processo quando a página carrega
    startWeatherProcess();

    // Opcional: Atualizar a meteorologia a cada 10 minutos (600000 ms)
    // Isso vai reiniciar todo o processo de localização, pedindo novamente a geolocalização.
    // setInterval(startWeatherProcess, 600000); 
});