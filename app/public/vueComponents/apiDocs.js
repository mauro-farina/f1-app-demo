export const ApiDocs = {
    data: function() {
        return {
            apiEndpointsList : [
                '/api/drivers',
                '/api/drivers?year=2022',
                '/api/drivers/sebastian_vettel',
                '/api/constructors',
                '/api/constructors?year=2023',
                '/api/constructors/ferrari',
                '/api/circuits',
                '/api/circuits?year=2022',
                '/api/circuits/monza_circuit',
                '/api/races',
                '/api/races?year=2021',
                '/api/races/2021/',
                '/api/races/2021/14',
                //'/api/races/2021/01/grid',
                '/api/races/2021/14/results',
                '/api/races/2021/14/quali',
                '/api/races/2021/14/lap_times',
                '/api/races/2021/14/lap_times/lap/50',
                '/api/races/2021/14/lap_times/driver/daniel_ricciardo',
                '/api/sprint/2021/14/results',
                '/api/standings/2021/14/drivers',
                '/api/standings/2021/14/constructors',
                '/api/dataset',
                '/api/dataset/drivers.csv'
            ],
            apiResponseExample : ''
        }
    },
    template: `
        <div class="container my-3"> <!-- container -->

            <h1>REST API Documentation</h1>

            <div class="list-group mb-5"> <!-- API Documentation List Group -->

                <div class="list-group-item">
                    <h4>GET <code>/api/drivers</code></h4>
                    <p>
                        Returns information about all drivers across all seasons in the Formula One
                        championship. Year-filter is available
                    </p>
                    <p>Example: <code>GET /api/driver?year=2022</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/drivers/[driver_id]</code></h4>
                    <p>
                        Returns information about a single driver with the provided <code>driver_id</code>
                        parameter. The <code>driver_id</code> parameter should be replaced with the id of the
                        driver you are querying, which is given by the formula
                        <code>driver_id = driver_name.toLowerCase().replace(' ','_')</code>.
                    </p>
                    <p>Example: <code>GET /api/drivers/sebastian_vettel</code></p>
                </div>

                <div class="list-group-item">
                    <h4>GET <code>/api/constructors</code></h4>
                    <p>
                        Returns information about all constructors across all seasons 
                        in the Formula One championship. Year-filter is available.
                    </p>
                    <p>Example: <code>GET /api/constructors?year=2022</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/constructors/[constructor_id]</code></h4>
                    <p>
                        Returns information about a single constructor with the provided
                        <code>constructor_id</code> parameter. The <code>constructor_id</code> parameter
                        should be replaced with the name of the constructor you are querying, which is given
                        by the formula <code>constructor_id = constructorName.toLowerCase().replace(' ','_')</code>
                    </p>
                    <p>Example: <code>GET /api/constructors/ferrari</code></p>
                </div>

                <div class="list-group-item">
                    <h4>GET <code>/api/circuits</code></h4>
                    <p>
                        Returns information about all circuits that hosted Formula One races. 
                        Year-filter is available.
                    </p>
                    <p>Example: <code>GET /api/circuits?year=2022</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/circuits/[circuit_id]</code></h4>
                    <p>
                        Returns information about a single circuit with the provided <code>circuit_id</code>
                        parameter.
                    </p>
                    <p>Example: <code>GET /api/circuits/monza_circuit</code></p>
                </div>

                <div class="list-group-item">
                    <h4>GET <code>/api/races</code></h4>
                    <p>
                        Returns information about all races across all seasons in the Formula One championship. 
                        Year-filter is available.
                    </p>
                    <p>Example: <code>GET /api/races?year=2023</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/races/[year]</code></h4>
                    <p>
                        Returns general information about all races in the <code>year</code> F1 season.
                        Same as <code>GET /api/races?year=[year]</code>
                    </p>
                    <p>Example: <code>GET /api/races/2023</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/races/[year]/[round]</code></h4>
                    <p>
                        Returns information about the race for the given <code>year</code> and
                        <code>round</code>. Replace <code>year</code> with the year you want to query in
                        four-digit format, and <code>round</code> with the round of the championship in which
                        the race occurred.
                    </p>
                    <p>Example: <code>GET /api/races/2023/5</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/races/[year]/[round]/results</code></h4>
                    <p>
                        Returns the results of the race for the given <code>year</code> and
                        <code>round</code>. Replace <code>year</code> with the year you want to query in
                        four-digit format, and <code>round</code> with the round of the championship in which
                        the race occurred.
                    </p>
                    <p>Example: <code>GET /api/races/2023/5/results</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/races/[year]/[round]/quali</code></h4>
                    <p>
                        Returns the results of the race qualifying session for the given <code>year</code> and
                        <code>round</code>.
                    </p>
                    <p>Example: <code>GET /api/races/2023/5/quali</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/races/[year]/[round]/lap_times</code></h4>
                    <p>
                        Returns the lap times of all drivers in the given race for the given <code>year</code>
                        and <code>round</code>. Replace <code>year</code> with the year you want to query in
                        four-digit format, and <code>round</code> with the round of the championship in which
                        the race occurred.
                    </p>
                    <p>Example: <code>GET /api/races/2023/5/lap_times</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/races/[year]/[round]/lap_times/lap/[lap]</code></h4>
                    <p>
                        Returns the lap times of all drivers on lap <code>lap</code> in the given race for the
                        given <code>year</code> and <code>round</code>. Replace <code>year</code> with the
                        year you want to query in four-digit format, <code>round</code> with the round of the
                        championship in which the race occurred, and <code>lap</code> with the lap number you
                        want to query.
                    </p>
                    <p>Example: <code>GET /api/races/2023/5/lap_times/lap/38</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/races/[year]/[round]/lap_times/driver/[driver_id]</code></h4>
                    <p>
                        Returns the lap times of the specified driver in the given race for the given
                        <code>year</code> and <code>round</code>. Replace <code>year</code> with the year you
                        want to query in four-digit format, <code>round</code> with the round of the
                        championship in which the race occurred, and <code>driver_id</code> with the id of the
                        driver you want to query.
                    </p>
                    <p>Example: <code>GET /api/races/2023/5/lap_times/driver/max_verstappen</code></p>
                </div>
                
                <div class="list-group-item">
                    <h4>GET <code>/api/sprint/[year]/[round]/results</code></h4>
                    <p>
                        Returns the results of the sprint race for the given <code>year</code> and
                        <code>round</code>
                    </p>
                    <p>Example: <code>GET /api/sprint/2021/20/results</code></p>
                </div>

                <div class="list-group-item">
                    <h4>GET <code>/api/standings/[year]/[round]/drivers</code></h4>
                    <p>
                        Returns the driver standings after the given race (<code>round</code>) of a given 
                        <code>year</code> (F1 season).
                    </p>
                    <p>Example: <code>GET /api/standings/2022/3/drivers</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/standings/[year]/[round]/constructors</code></h4>
                    <p>
                        Returns the constructor standings after the given race (<code>round</code>) of a given 
                        <code>year</code> (F1 season).
                    </p>
                    <p>Example: <code>GET /api/standings/2021/18/constructors</code></p>
                </div>

                <div class="list-group-item">
                    <h4>GET <code>/api/dataset</code></h4>
                    <p>
                        Returns information about the csv files that compose the dataset. 
                        You can learn more about the dataset <a class="link-light" href='#/datasetDocs'>here</a>
                    </p>
                    <p>Example: <code>GET /api/dataset</code></p>
                </div>
                <div class="list-group-item">
                    <h4>GET <code>/api/dataset/[filename]</code></h4>
                    <p>
                        Returns the content of <code>filename</code>.
                        If visited from a browser, automatically starts the download of the file.
                    </p>
                    <p>Example: <code>GET /api/dataset/drivers.csv</code></p>
                </div>
                
                
            </div> <!-- API Documentation List Group -->

            <h2 id="api-examples">API Response Examples</h2>
            <p>Click a Request to display the corresponding Response</p>

            <div class="list-group mb-5"> <!-- examples container -->

                <div v-for="apiExample of apiEndpointsList" class="list-group-item">
                    <button data-bs-toggle="collapse" class="btn btn-dark" :href="'#'.concat(apiExample)" @click="fetchResponse(apiExample)">
                        <code>GET {{apiExample}}</code> <i class="bi bi-chevron-expand"></i>
                    </button>
                    <div class="collapse" :id="apiExample">
                        <pre v-if="apiResponseExample">
                            <code>
                                {{apiResponseExample}}
                            </code>
                        </pre>
                    </div>
                </div>

            </div> <!-- api responses examples list group -->

        </div>
    `,
    methods : {
        fetchResponse: async function(url) {
            this.apiResponseExample = '';

            let apiRequest = fetch(url).then(res => {
                if(url !== '/api/dataset/drivers.csv')
                    return res.json();
                else
                    return res.text();
            });

            const collapseElements = document.querySelectorAll('.collapse');

            for(let element of collapseElements) {
                element.setAttribute('aria-expanded', 'false');
                element.classList.remove('show');
            }

            this.apiResponseExample = await (Promise.resolve(apiRequest));
        }
    }
}