new Vue({
    el: '#app',

    data: {
        currencies: {},
        amount: 0,
        from: 'BDT',
        to: 'USD',
        result: 0,
        loading: false,
    },

    mounted() {
        //good place to make an API request
        this.getCurrencies();
    },

    computed: {
        formattedCurrencies() {
            return Object.values(this.currencies);
        },
        calculateResult() {
            return (Number(this.amount) * this.result).toFixed(3);
        },
        disabled() {
            return this.amount === 0 || !this.amount || this.loading;
        }
    },
    methods: {
        getCurrencies() {

            const currencies = localStorage.getItem('currencies');
            if (currencies) {
                this.currencies = JSON.parse(currencies);

                return;
            }

            axios.get('https://free.currencyconverterapi.com/api/v6/currencies?apiKey=04c5d9af4e84838c14be')
                .then(response => {
                    this.currencies = response.data.results;
                    localStorage.setItem('currencies', JSON.stringify(response.data.results));
                });
        },

        convertCurrency() {

            this.loading = true;

            const format = this.from + '_' + this.to;
            console.log(format);
            axios.get('https://free.currencyconverterapi.com/api/v6/convert?q=' + format + '&compact=ultra&apiKey=04c5d9af4e84838c14be')
                .then(response => {
                    this.loading = false;
                    this.result = response.data[format];
                });
        }
    },

    watch: {
        from() {
            this.result = 0;
        },
        to() {
            this.result = 0;
        }
    },

})