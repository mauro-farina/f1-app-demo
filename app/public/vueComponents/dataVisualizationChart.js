export const DataVisualizationChart = {
    data : function() {
        return {
            chartData : {},
            chartID : null,
            chartYear : '',
            chartRound: '',
            numberRoundsOfYear: '',
            selectedChart: '',
            CHART_COLORS: [
                'rgb(255, 99, 132)', //red
                'rgb(255, 159, 64)', //orange
                'rgb(255, 205, 86)', //yellow
                'rgb(75, 192, 192)', //green
                'rgb(54, 162, 235)', //blue
                'rgb(153, 102, 255)', //purple
                'rgb(201, 203, 207)', //grey
                'rgb(255, 192, 203)', //pink
                'rgb(0, 128, 128)', //teal
                'rgb(0, 255, 0)', //lime
                'rgb(0, 255, 255)', //cyan
                'rgb(75, 0, 130)', //indigo
                'rgb(255, 0, 255)', //magenta
                'rgb(255, 215, 0)', //gold
                'rgb(128, 0, 0)', //maroon
                'rgb(0, 0, 128)', //navy
                'rgb(128, 128, 0)', //olive
                'rgb(255, 192, 203)', //pink
                'rgb(250, 128, 114)', //salmon
                'rgb(160, 82, 45)', //sienna
                'rgb(135, 206, 235)', //skyBlue
                'rgb(210, 180, 140)', //tan
                'rgb(255, 99, 71)', //tomato
            ]
        }
    },
    template : `
        <section class="container my-3">

            <div class="form-floating col-sm-4 col-md-4 mb-3">
                <select class="form-select bg-dark" id="floatingChartSelection" v-model="selectedChart">
                    <option value="driversChampionshipChart">Drivers Championship</option>
                    <option value="constructorChampionshipChart">Constructors Championship</option>
                    <option value="lapTimesChart">Lap Times</option>
                </select>
                <label for="floatingChartSelection">Chart</label>
            </div>

            <div class="form-floating col-sm-3 col-md-3 mb-3" v-if="selectedChart.includes('ChampionshipChart')">
                <select class="form-select bg-dark" id="floatingYear" v-model="chartYear">
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
                <label for="floatingYear">Year</label>
            </div>
            <div class="input-group mb-4" v-if="selectedChart === 'lapTimesChart'">
                <div class="form-floating col-sm-3 col-md-3 mb-3">
                    <select class="form-select bg-dark" id="floatingYear" v-model="chartYear">
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                    <label for="floatingYear">Year</label>
                </div>
                <div class="form-floating col-sm-3 col-md-3 mb-3">
                    <select class="form-select bg-dark" id="floatingRound" v-model="chartRound">
                        <option v-for="r in numberRoundsOfYear" :value="r">{{r}}</option>
                    </select>
                    <label for="floatingRound">Round</label>
                </div>
            </div>

            <div>
                <canvas id="f1chart" class="mx-1"></canvas>
            </div>
        </section>
    `,
    watch: {
        chartYear: async function (newVal, oldVal) {
            if (this.selectedChart.includes('ChampionshipChart')) {
                if (this.chartID != null){
                    this.chartID.destroy();
                }
                if (newVal.length === 0)
                    return;
                if (this.selectedChart.includes('driver')) {
                    this.getChampionshipChartData('drivers');
                } else if (this.selectedChart.includes('constructor')) {
                    this.getChampionshipChartData('constructors');
                }
            } else {
                this.numberRoundsOfYear = (await (await fetch(`/api/races/${newVal}`)).json()).length;
                this.chartRound = '';
            }
        },
        chartData: function (newVal, oldVal) {
            this.loadChart();
        },
        chartRound: async function (newVal, oldVal) {
            if (this.chartID != null){
                this.chartID.destroy();
            }
            if(newVal.length === 0) return;
            this.getLapTimesChartData();
        },
        selectedChart: function(newVal, oldVal) {
            if (this.chartID != null){
                this.chartID.destroy();
            }
            this.chartYear = '';
            this.chartRound = '';
        }
    },
    methods : {
        convertTimeStringToSeconds: function(timeString) {
            const timeStringSplit = timeString.split(':');
            const minutes = parseInt(timeStringSplit[0]);
            const seconds = parseInt(timeStringSplit[1].split('.')[0]);
            const milliseconds = parseInt(timeStringSplit[1].split('.')[1]);
            const totalSeconds = minutes * 60 + seconds + milliseconds / 1000;
            return totalSeconds;
        },
        loadChart: function() {
            const ctx = document.getElementById('f1chart');
            const chartOptions = {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'snow'
                        },
                        title: {
                            text: 'Drivers',
                            display: true,
                            color: 'snow'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: "snow",
                        },
                        title: {
                            text: 'Points',
                            display: true,
                            color: 'snow'
                        }
                    },
                    x: {
                        beginAtZero: true,
                        ticks: {
                            color: "snow",
                        },
                        title: {
                            text: 'Round',
                            display: true,
                            color: 'snow'
                        }
                    }
                }
            }

            if(this.selectedChart === 'lapTimesChart') {
                const extractedLapTimes = this.chartData.datasets[0].data;
                let sumLapTimes = 0;
                _.forEach(extractedLapTimes, t => sumLapTimes += t);
                const avrgLapTimeApprox = sumLapTimes / extractedLapTimes.length;     
                chartOptions.scales.y.max = avrgLapTimeApprox + 5;
                chartOptions.scales.y.beginAtZero = false;
                chartOptions.scales.y.title.text = 'Lap Time (s)'
                chartOptions.scales.x.title.text = 'Lap'
            }

            this.chartID = new Chart(ctx, {
                type: 'line',
                data: this.chartData,
                options: chartOptions
            });
        },
        getChampionshipChartData: async function(driversOrConstructors) {
            let entriesQuery = await fetch(`/api/${driversOrConstructors}?year=${this.chartYear}`);
            let racesQuery = await fetch(`/api/races/${this.chartYear}`);

            if (entriesQuery.status !== 200
                || racesQuery.status !== 200) {

                throw new Error();
            }

            let entries = await entriesQuery.json();
            let races = await racesQuery.json();
            let standings = [];

            const numRaces = races.length;

            let standingsApiUrls = [];
            for (let race of races) {
                standingsApiUrls.push(`/api/standings/${this.chartYear}/${race.round}/${driversOrConstructors}`);
            }
            let fetchAllStandings = await this.fetchStandings(standingsApiUrls);
            for(let singleStandings of fetchAllStandings) {
                standings.push.apply(standings, singleStandings);
            }

            let datasets = [];
            let count = 0;
            for (let entry of entries) {
                const datasetElement = {
                    label: entry.driver_name || entry.constructor_name,
                    data: [],
                    borderColor: this.CHART_COLORS[count],
                    backgroundColor: this.CHART_COLORS[count],
                    hidden: Math.round(Math.random())
                };
                if (driversOrConstructors.includes('driver')) {
                    datasetElement.data = this.zeroPadArray(_.filter(standings, { driver_id: entry.driver_id }).map(s => s.points), numRaces)
                } else if (driversOrConstructors.includes('constructor')) {
                    datasetElement.data = this.zeroPadArray(_.filter(standings, { constructor_id: entry.constructor_id }).map(s => s.points), numRaces)
                }
                count++;
                datasets.push(datasetElement);
            }

            this.chartData = {
                labels: races.map(r => r.round),
                datasets: datasets
            };
        },
        getLapTimesChartData: async function() {
            const lap_times = (await (await fetch(`/api/races/${this.chartYear}/${this.chartRound}/lap_times`)).json()).lap_times;
            let drivers = (await (await fetch(`/api/drivers?year=${this.chartYear}`)).json());

            let count = 0;
            let datasets = [];

            for (let driver of drivers) {
                let driversLapTimes = []
                _.forEach(lap_times, lapData => {
                    driversLapTimes.push.apply(
                        driversLapTimes, 
                        _.filter(lapData.times, {driver_id: driver.driver_id})
                            .map(driverLapData => this.convertTimeStringToSeconds(driverLapData.lap_time))
                    );
                });
                const datasetElement = {
                    label: driver.driver_name,
                    data: driversLapTimes,
                    borderColor: this.CHART_COLORS[count],
                    backgroundColor: this.CHART_COLORS[count],
                    hidden: 1
                };
                count++;
                datasets.push(datasetElement);
            }
            this.chartData = {
                labels: Array.from({ length: lap_times.length }, (_, index) => index + 1),
                datasets: datasets
            };
        },
        zeroPadArray: function (arr, desiredLength) {
            while (arr.length < desiredLength) {
                arr.unshift(0);
            }
            return arr;
        },
        fetchStandings: async function (urls) {
            const fetchPromises = urls.map(url => fetch(url).then(response => response.json()).then(res => res.driver_standings || res.constructor_standings));
            const results = await Promise.all(fetchPromises);
            return results;
        }
    }
};